/**
 * One-time setup script. Run this once to create the Managed Agent and
 * its execution environment, then store the returned IDs as Worker secrets.
 *
 * Usage:
 *   ANTHROPIC_API_KEY=sk-ant-... npm run setup
 *
 * After running, execute the wrangler commands printed at the end.
 */

import Anthropic from "@anthropic-ai/sdk";

async function main() {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    console.error("Error: ANTHROPIC_API_KEY environment variable is required.");
    process.exit(1);
  }

  const client = new Anthropic({ apiKey });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const beta = client.beta as any;

  console.log("Creating execution environment…");
  const environment = await beta.environments.create({
    name: "cloudflare-worker-environment",
    config: {
      type: "cloud",
      networking: { type: "unrestricted" },
    },
  });
  console.log(`  Environment ID : ${environment.id}`);

  console.log("Creating agent…");
  const agent = await beta.agents.create({
    name: "cloudflare-claude-agent",
    model: "claude-opus-4-7",
    system:
      "You are a helpful AI assistant with access to powerful tools including " +
      "web browsing, code execution, and file operations. You help users accomplish " +
      "their tasks efficiently, clearly, and accurately. When using tools, explain " +
      "what you are doing so the user can follow along.",
    thinking: { type: "adaptive" },
    tools: [
      {
        type: "agent_toolset_20260401",
        default_config: { enabled: true },
      },
    ],
  });
  console.log(`  Agent ID      : ${agent.id}`);
  console.log(`  Agent version : ${agent.version}`);

  console.log("\n=== Setup complete ===");
  console.log("Run the following commands to store the IDs as Worker secrets:\n");
  console.log(`echo "${environment.id}" | wrangler secret put ENVIRONMENT_ID`);
  console.log(`echo "${agent.id}" | wrangler secret put AGENT_ID`);
  console.log(`echo "${agent.version}" | wrangler secret put AGENT_VERSION`);
  console.log(`wrangler secret put ANTHROPIC_API_KEY`);
  console.log("\nThen deploy with: npm run deploy");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
