import Anthropic from "@anthropic-ai/sdk";

export interface Env {
  ANTHROPIC_API_KEY: string;
  AGENT_ID: string;
  AGENT_VERSION: string;
  ENVIRONMENT_ID: string;
}

// HTML for the chat UI. Uses String.fromCharCode(10) for newline in JS strings
// to avoid escape-sequence issues inside the TypeScript template literal.
const CHAT_HTML = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Claude Agent</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: system-ui, -apple-system, sans-serif; background: #f0f2f5; height: 100vh; display: flex; flex-direction: column; }
    header { background: #1a1a2e; color: #fff; padding: 14px 24px; display: flex; align-items: center; gap: 12px; }
    header h1 { font-size: 1.1rem; font-weight: 600; }
    header span { font-size: 0.75rem; opacity: 0.6; }
    #messages { flex: 1; overflow-y: auto; padding: 20px 24px; display: flex; flex-direction: column; gap: 14px; }
    .msg { padding: 12px 16px; border-radius: 12px; line-height: 1.55; white-space: pre-wrap; word-break: break-word; max-width: 72%; font-size: 0.95rem; }
    .msg.user   { align-self: flex-end; background: #1a1a2e; color: #fff; border-bottom-right-radius: 4px; }
    .msg.agent  { align-self: flex-start; background: #fff; border: 1px solid #e2e8f0; border-bottom-left-radius: 4px; }
    .msg.system { align-self: center; background: transparent; color: #94a3b8; font-size: 0.82rem; font-style: italic; padding: 4px 0; max-width: 100%; }
    .msg.error  { align-self: center; background: #fef2f2; border: 1px solid #fecaca; color: #dc2626; font-size: 0.85rem; max-width: 90%; }
    .msg .lbl   { font-size: 0.72rem; font-weight: 700; letter-spacing: 0.04em; text-transform: uppercase; opacity: 0.55; margin-bottom: 5px; }
    #input-area { background: #fff; border-top: 1px solid #e2e8f0; padding: 14px 24px; display: flex; gap: 10px; align-items: flex-end; }
    #msg-input  { flex: 1; border: 1px solid #cbd5e1; border-radius: 8px; padding: 10px 14px; font-size: 0.95rem; font-family: inherit; resize: none; outline: none; line-height: 1.45; max-height: 130px; transition: border-color .15s; }
    #msg-input:focus { border-color: #1a1a2e; }
    #send-btn   { background: #1a1a2e; color: #fff; border: none; border-radius: 8px; padding: 10px 22px; font-size: 0.95rem; cursor: pointer; height: 42px; }
    #send-btn:disabled { background: #94a3b8; cursor: not-allowed; }
    .tool-badge { display: inline-block; background: #f1f5f9; border: 1px solid #e2e8f0; border-radius: 6px; padding: 2px 8px; font-size: 0.78rem; color: #64748b; margin-top: 6px; }
  </style>
</head>
<body>
  <header>
    <h1>Claude Agent</h1>
    <span>Powered by Anthropic Managed Agents &amp; Cloudflare Workers</span>
  </header>
  <div id="messages">
    <div class="msg system">Ask me anything. I can browse the web, run code, read and write files, and more.</div>
  </div>
  <div id="input-area">
    <textarea id="msg-input" placeholder="Type a message… (Enter to send, Shift+Enter for newline)" rows="1"></textarea>
    <button id="send-btn" onclick="send()">Send</button>
  </div>
  <script>
    const NL = String.fromCharCode(10);
    const msgsEl  = document.getElementById('messages');
    const inputEl = document.getElementById('msg-input');
    const btnEl   = document.getElementById('send-btn');

    function esc(s) {
      return String(s)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
    }

    function addMsg(role, html, id) {
      const el = document.createElement('div');
      el.className = 'msg ' + role;
      if (id) el.id = id;
      el.innerHTML = html;
      msgsEl.appendChild(el);
      msgsEl.scrollTop = msgsEl.scrollHeight;
      return el;
    }

    inputEl.addEventListener('input', function() {
      this.style.height = 'auto';
      this.style.height = Math.min(this.scrollHeight, 130) + 'px';
    });

    inputEl.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(); }
    });

    async function send() {
      const text = inputEl.value.trim();
      if (!text || btnEl.disabled) return;

      inputEl.value = '';
      inputEl.style.height = '';
      btnEl.disabled = true;

      addMsg('user',   '<div class="lbl">You</div>' + esc(text));
      const statusEl = addMsg('system', 'Thinking…');

      let agentEl   = null;
      let agentText = '';

      try {
        const res = await fetch('/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ message: text }),
        });

        if (!res.ok) {
          const err = await res.json().catch(function() { return { error: res.statusText }; });
          statusEl.className = 'msg error';
          statusEl.textContent = 'Error: ' + (err.error || res.statusText);
          return;
        }

        const reader = res.body.getReader();
        const dec    = new TextDecoder();
        let buf      = '';

        while (true) {
          var chunk = await reader.read();
          if (chunk.done) break;
          buf += dec.decode(chunk.value, { stream: true });
          var lines = buf.split(NL);
          buf = lines.pop() || '';

          for (var i = 0; i < lines.length; i++) {
            var line = lines[i];
            if (!line.startsWith('data: ')) continue;
            var evt;
            try { evt = JSON.parse(line.slice(6)); } catch(e) { continue; }

            if (evt.type === 'agent.message') {
              var blocks = evt.content || [];
              for (var b = 0; b < blocks.length; b++) {
                var block = blocks[b];
                if (block.type === 'text' && block.text) {
                  if (!agentEl) {
                    statusEl.remove();
                    agentEl = addMsg('agent', '<div class="lbl">Claude</div>');
                  }
                  agentText += block.text;
                  var lbl = agentEl.querySelector('.lbl');
                  agentEl.innerHTML = (lbl ? lbl.outerHTML : '<div class="lbl">Claude</div>') + esc(agentText);
                  msgsEl.scrollTop = msgsEl.scrollHeight;
                }
              }
            } else if (evt.type === 'agent.custom_tool_use') {
              statusEl.style.display = '';
              statusEl.innerHTML = 'Using tool: <span class="tool-badge">' + esc(evt.name) + '</span>';
            } else if (evt.type === 'session.status_idle' || evt.type === 'done') {
              statusEl.remove();
            } else if (evt.type === 'error') {
              statusEl.className = 'msg error';
              statusEl.textContent = 'Error: ' + esc(evt.message);
            }
          }
        }
      } catch(err) {
        statusEl.className = 'msg error';
        statusEl.textContent = 'Error: ' + esc(String(err));
      } finally {
        btnEl.disabled = false;
        inputEl.focus();
      }
    }
  </script>
</body>
</html>`;

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url);

    if (request.method === "OPTIONS") {
      return new Response(null, { headers: corsHeaders() });
    }

    if (url.pathname === "/" && request.method === "GET") {
      return new Response(CHAT_HTML, {
        headers: { "Content-Type": "text/html; charset=utf-8" },
      });
    }

    if (url.pathname === "/chat" && request.method === "POST") {
      return handleChat(request, env, ctx);
    }

    return new Response("Not Found", { status: 404 });
  },
};

function corsHeaders(): HeadersInit {
  return {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  };
}

async function handleChat(
  request: Request,
  env: Env,
  ctx: ExecutionContext,
): Promise<Response> {
  if (!env.ANTHROPIC_API_KEY || !env.AGENT_ID || !env.ENVIRONMENT_ID) {
    return new Response(
      JSON.stringify({
        error:
          "Worker not configured. Run setup/setup.ts to create the agent and environment, then set the secrets via `wrangler secret put`.",
      }),
      { status: 503, headers: { "Content-Type": "application/json" } },
    );
  }

  let message: string;
  try {
    const body = (await request.json()) as { message?: string };
    message = (body.message ?? "").trim();
    if (!message) throw new Error("empty");
  } catch {
    return new Response(
      JSON.stringify({ error: 'Expected JSON body: { "message": "string" }' }),
      { status: 400, headers: { "Content-Type": "application/json" } },
    );
  }

  const client = new Anthropic({ apiKey: env.ANTHROPIC_API_KEY });

  // Create a fresh session for this request.
  // Agent and environment are long-lived resources created once via setup/setup.ts.
  let sessionId: string;
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const betaSessions = client.beta.sessions as any;
    const session = await betaSessions.create({
      agent: {
        type: "agent",
        id: env.AGENT_ID,
        version: parseInt(env.AGENT_VERSION || "1", 10),
      },
      environment_id: env.ENVIRONMENT_ID,
    });
    sessionId = session.id as string;
  } catch (err) {
    return new Response(
      JSON.stringify({ error: `Failed to create agent session: ${err}` }),
      { status: 500, headers: { "Content-Type": "application/json" } },
    );
  }

  const { readable, writable } = new TransformStream<Uint8Array, Uint8Array>();
  const writer = writable.getWriter();
  const encoder = new TextEncoder();

  const writeSSE = (data: unknown): Promise<void> =>
    writer.write(encoder.encode(`data: ${JSON.stringify(data)}\n\n`));

  // keepAlive: ctx.waitUntil ensures the worker stays alive while streaming.
  ctx.waitUntil(
    (async () => {
      try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const betaEvents = client.beta.sessions.events as any;

        // Stream-first: open the SSE stream and send the user message concurrently
        // so no events are missed before the stream is established.
        const [stream] = (await Promise.all([
          betaEvents.stream(sessionId),
          betaEvents.send(sessionId, {
            events: [
              {
                type: "user.message",
                content: [{ type: "text", text: message }],
              },
            ],
          }),
        ])) as [AsyncIterable<{ type: string; [k: string]: unknown }>, unknown];

        for await (const event of stream) {
          await writeSSE(event);

          // Break when the agent is done or waiting for a custom tool result.
          // For a simple single-turn chat we stop at idle; for multi-turn or
          // custom tools, extend this loop to handle agent.custom_tool_use events.
          if (
            event.type === "session.status_terminated" ||
            event.type === "session.status_idle"
          ) {
            break;
          }
        }

        await writeSSE({ type: "done", session_id: sessionId });
      } catch (err) {
        await writeSSE({ type: "error", message: String(err) }).catch(() => undefined);
      } finally {
        await writer.close().catch(() => undefined);
      }
    })(),
  );

  return new Response(readable, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      ...corsHeaders(),
    },
  });
}
