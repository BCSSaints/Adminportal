const ITEMS_PER_PAGE = 24;

const announcements = [
  {
    title: "Field Day Concessions - Bring cash!",
    subtitle: "Snacks, sweets, and sips for a full day of play",
    contentUpload: "assets/announcements/01-field-day-concessions-bring-cash.jpg",
    badges: ["NEW"],
    tags: ["Activities", "K-6th Grammar"],
    category: "Public",
    publishDate: "2026-05-01",
    closeDate: "2026-05-16",
    pinned: true,
    priority: 1,
    featured: true,
    visible: true,
    link: "https://byneschool.org/field-day-concessions",
    additionalLink: "https://byneschool.org/field-day",
  },
  {
    title: "House Games at Fun Park - Monday, May 11 | 12:00-2:00 PM",
    subtitle: "A new location, same house pride - join us for an afternoon of competition and fun!",
    contentUpload: "assets/announcements/02-house-games-at-fun-park-monday-may-11-12-00-2-00-pm.jpg",
    badges: ["NEW"],
    tags: ["Activities", "Athletics", "9-12th Rhetoric"],
    category: "Public",
    publishDate: "2026-05-02",
    closeDate: "2026-05-12",
    pinned: true,
    priority: 2,
    featured: true,
    visible: true,
    link: "https://byneschool.org/house-games",
    additionalLink: "https://funpark.com",
  },
  {
    title: "Saints in the Summer 2026 T-Shirt Orders Are Open",
    subtitle: "Gear up for summer adventures - and the Pedal, Scoot, & Ride Parade",
    contentUpload: "assets/announcements/03-saints-in-the-summer-2026-t-shirt-orders-are-open.jpg",
    badges: ["NEW"],
    tags: ["Activities", "K-6th Grammar", "Spirit Wear"],
    category: "Public",
    publishDate: "2026-05-03",
    closeDate: "2026-06-01",
    pinned: false,
    priority: 3,
    featured: false,
    visible: true,
    link: "https://byneschool.org/saints-in-the-summer-shirts",
    additionalLink: "https://byneschool.org/spirit-wear",
  },
  {
    title: "8th Grade Celebration - Wednesday, May 13 at 8:30 AM",
    subtitle: "Honoring the journey. Looking ahead.",
    contentUpload: "assets/announcements/04-8th-grade-celebration-wednesday-may-13-at-8-30-am.jpg",
    badges: ["NEW"],
    tags: ["Academics", "7-8th Logic"],
    category: "Public",
    publishDate: "2026-05-01",
    closeDate: "2026-05-14",
    pinned: false,
    priority: 4,
    featured: false,
    visible: true,
    link: "https://byneschool.org/8th-grade-celebration",
    additionalLink: "",
  },
  {
    title: "Curtain Up: A Celebration of Broadway - Tuesday, May 12 at 6:30 PM",
    subtitle: "An evening of live Broadway favorites at Byne Church - free and open to the public",
    contentUpload: "assets/announcements/05-curtain-up-a-celebration-of-broadway-tuesday-may-12-at-6-30-pm.jpg",
    badges: ["NEW"],
    tags: ["Activities", "Fine Arts"],
    category: "Public",
    publishDate: "2026-05-01",
    closeDate: "2026-05-13",
    pinned: false,
    priority: 5,
    featured: false,
    visible: true,
    link: "https://byneschool.org/curtain-up-broadway",
    additionalLink: "https://bynechurch.org",
  },
  {
    title: "Cross Country Coach Opening | 2026-2027 School Year",
    subtitle: "Help Us Launch a New Program - Middle & High School",
    contentUpload: "assets/announcements/06-cross-country-coach-opening-2026-2027-school-year.jpg",
    badges: [],
    tags: ["Athletics", "7-8th Logic", "9-12th Rhetoric"],
    category: "Public",
    publishDate: "2026-05-01",
    closeDate: "2026-06-15",
    pinned: false,
    priority: 6,
    featured: false,
    visible: true,
    link: "https://byneschool.org/cross-country-coach",
    additionalLink: "mailto:athletics@byneschool.org",
  },
  {
    title: "Keepers of the Kingdom VBS | June 22-25",
    subtitle: "An exciting week of faith, fun, and fellowship for rising 5th grade and under!",
    contentUpload: "assets/announcements/07-keepers-of-the-kingdom-vbs-june-22-25.jpg",
    badges: ["NEW"],
    tags: ["Activities", "K-6th Grammar", "Church"],
    category: "Public",
    publishDate: "2026-05-01",
    closeDate: "2026-06-26",
    pinned: false,
    priority: 7,
    featured: false,
    visible: true,
    link: "https://byneschool.org/vbs",
    additionalLink: "https://bynechurch.org/vbs",
  },
  {
    title: "Thespian Troupe Service Project | Sleep in Heavenly Peace",
    subtitle: "Don't Miss It - Help Us Serve Our Community",
    contentUpload: "assets/announcements/08-thespian-troupe-service-project-sleep-in-heavenly-peace.jpg",
    badges: [],
    tags: ["Activities", "Fine Arts", "Service"],
    category: "Public",
    publishDate: "2026-04-25",
    closeDate: "2026-05-31",
    pinned: false,
    priority: 8,
    featured: false,
    visible: true,
    link: "https://byneschool.org/thespian-service-project",
    additionalLink: "https://shpbeds.org",
  },
  {
    title: "Last Day of School | May 15",
    subtitle: "Celebrate the Day - Early Dismissal at 11:30 AM",
    contentUpload: "assets/announcements/09-last-day-of-school-may-15.jpg",
    badges: ["NEW"],
    tags: ["Academics", "K-6th Grammar", "7-8th Logic", "9-12th Rhetoric"],
    category: "Public",
    publishDate: "2026-05-01",
    closeDate: "2026-05-16",
    pinned: false,
    priority: 9,
    featured: false,
    visible: true,
    link: "https://byneschool.org/last-day",
    additionalLink: "",
  },
  {
    title: "Pedal, Scoot & Ride Parade | May 15",
    subtitle: "Kick Off Summer in Style - 10:30 AM Parade | 11:30 AM Early Dismissal",
    contentUpload: "assets/announcements/10-pedal-scoot-ride-parade-may-15.jpg",
    badges: [],
    tags: ["Activities", "K-6th Grammar"],
    category: "Public",
    publishDate: "2026-05-01",
    closeDate: "2026-05-16",
    pinned: false,
    priority: 10,
    featured: false,
    visible: true,
    link: "https://byneschool.org/pedal-scoot-ride",
    additionalLink: "",
  },
  {
    title: "Volleyball Camp | May 26-28",
    subtitle: "6th-12th Grade - 9:00 AM-12:00 PM",
    contentUpload: "assets/announcements/11-volleyball-camp-may-26-28.jpg",
    badges: [],
    tags: ["Athletics", "7-8th Logic", "9-12th Rhetoric"],
    category: "Public",
    publishDate: "2026-05-01",
    closeDate: "2026-05-29",
    pinned: false,
    priority: 11,
    featured: false,
    visible: true,
    link: "https://byneschool.org/volleyball-camp",
    additionalLink: "",
  },
  {
    title: "Basketball Camp | June 2-4",
    subtitle: "Train Hard - Two Age Groups",
    contentUpload: "assets/announcements/12-basketball-camp-june-2-4.jpg",
    badges: [],
    tags: ["Athletics", "K-6th Grammar", "7-8th Logic"],
    category: "Public",
    publishDate: "2026-05-01",
    closeDate: "2026-06-05",
    pinned: false,
    priority: 12,
    featured: false,
    visible: true,
    link: "https://byneschool.org/basketball-camp",
    additionalLink: "",
  },
  {
    title: "Awards Ceremony | May 15",
    subtitle: "You're Invited - 8:30 AM",
    contentUpload: "assets/announcements/13-awards-ceremony-may-15.jpg",
    badges: [],
    tags: ["Academics", "K-6th Grammar", "7-8th Logic", "9-12th Rhetoric"],
    category: "Public",
    publishDate: "2026-05-01",
    closeDate: "2026-05-16",
    pinned: false,
    priority: 13,
    featured: false,
    visible: true,
    link: "https://byneschool.org/awards",
    additionalLink: "",
  },
  {
    title: "Field Day | May 11 - Rain or Shine! RSVP for lunch",
    subtitle: "A Full Day of Fun, Food, and Friendly Competition",
    contentUpload: "assets/announcements/14-field-day-may-11-rain-or-shine-rsvp-for-lunch.jpg",
    badges: ["UPDATE"],
    tags: ["Activities", "K-6th Grammar", "Athletics"],
    category: "Public",
    publishDate: "2026-04-28",
    closeDate: "2026-05-12",
    pinned: false,
    priority: 14,
    featured: false,
    visible: true,
    link: "https://byneschool.org/field-day-rsvp",
    additionalLink: "https://byneschool.org/lunch",
  },
  {
    title: "Kindergarten Graduation | May 14",
    subtitle: "Don't Miss It - 6:00 PM (Doors Open at 5:30 PM)",
    contentUpload: "assets/announcements/15-kindergarten-graduation-may-14.jpg",
    badges: [],
    tags: ["Academics", "K-6th Grammar"],
    category: "Public",
    publishDate: "2026-05-01",
    closeDate: "2026-05-15",
    pinned: false,
    priority: 15,
    featured: false,
    visible: true,
    link: "https://byneschool.org/kindergarten-graduation",
    additionalLink: "",
  },
  {
    title: "Spring 2026 Lunch Menu",
    subtitle: "3/2 through 3/5",
    contentUpload: "",
    badges: [],
    tags: ["Lunch", "K-6th Grammar", "7-8th Logic", "9-12th Rhetoric"],
    category: "Public",
    publishDate: "2026-03-01",
    closeDate: "2026-06-01",
    pinned: false,
    priority: 16,
    featured: false,
    visible: true,
    link: "https://byneschool.org/spring-lunch-menu",
    additionalLink: "https://byneschool.org/menu.pdf",
  },
  {
    title: "Domino's Fundraiser Notice",
    subtitle: "Domino's Slice the Price Card Update & Refund Details",
    contentUpload: "assets/announcements/16-domino-s-fundraiser-notice.jpg",
    badges: [],
    tags: ["Activities", "Fundraiser"],
    category: "Public",
    publishDate: "2026-04-15",
    closeDate: "2026-05-31",
    pinned: false,
    priority: 17,
    featured: false,
    visible: true,
    link: "https://byneschool.org/dominos-fundraiser",
    additionalLink: "",
  },
  {
    title: "Saints in Camo",
    subtitle: "A New Approved Uniform Favorite from Auti Love",
    contentUpload: "assets/announcements/17-saints-in-camo.jpg",
    badges: [],
    tags: ["Spirit Wear", "Uniforms"],
    category: "Public",
    publishDate: "2026-04-10",
    closeDate: "2026-07-01",
    pinned: false,
    priority: 18,
    featured: false,
    visible: true,
    link: "https://byneschool.org/saints-in-camo",
    additionalLink: "https://autilove.com",
  },
  {
    title: "School Calendar",
    subtitle: "26/27 Full Year at a Glance",
    contentUpload: "assets/announcements/18-loading.jpg",
    badges: [],
    tags: ["Calendar", "Academics"],
    category: "Public",
    publishDate: "2026-04-01",
    closeDate: "2026-09-01",
    pinned: false,
    priority: 19,
    featured: false,
    visible: true,
    link: "https://byneschool.org/school-calendar",
    additionalLink: "",
  },
  {
    title: "BCS Families Facebook Group",
    subtitle: "Join Our Online Community",
    contentUpload: "assets/announcements/19-loading.jpg",
    badges: [],
    tags: ["Community", "Parent Resources"],
    category: "Public",
    publishDate: "2026-04-01",
    closeDate: "2026-12-31",
    pinned: false,
    priority: 20,
    featured: false,
    visible: true,
    link: "https://facebook.com/groups/bcsfamilies",
    additionalLink: "",
  },
  {
    title: "Summer Office Hours",
    subtitle: "Front office availability for June and July",
    contentUpload: "",
    badges: ["NEW"],
    tags: ["Parent Resources", "Calendar"],
    category: "Public",
    publishDate: "2026-05-04",
    closeDate: "2026-07-31",
    pinned: false,
    priority: 21,
    featured: false,
    visible: true,
    link: "https://byneschool.org/summer-office-hours",
    additionalLink: "mailto:office@byneschool.org",
  },
  {
    title: "Report Card Pickup",
    subtitle: "Final report cards available in the school office",
    contentUpload: "",
    badges: [],
    tags: ["Academics", "Parent Resources"],
    category: "Public",
    publishDate: "2026-05-04",
    closeDate: "2026-06-15",
    pinned: false,
    priority: 22,
    featured: false,
    visible: true,
    link: "https://byneschool.org/report-card-pickup",
    additionalLink: "https://secure.gradelink.com/Gradelink",
  },
  {
    title: "Used Uniform Exchange",
    subtitle: "Bring gently used items and shop for next year's sizes",
    contentUpload: "",
    badges: [],
    tags: ["Uniforms", "Parent Resources"],
    category: "Public",
    publishDate: "2026-05-04",
    closeDate: "2026-06-30",
    pinned: false,
    priority: 23,
    featured: false,
    visible: true,
    link: "https://byneschool.org/used-uniform-exchange",
    additionalLink: "https://www.globalschoolwear.com/school/BYNE01",
  },
  {
    title: "Logic School Book Return",
    subtitle: "7th-8th grade families may return school-owned texts after exams",
    contentUpload: "",
    badges: [],
    tags: ["7-8th Logic", "Academics"],
    category: "Public",
    publishDate: "2026-05-04",
    closeDate: "2026-05-22",
    pinned: false,
    priority: 24,
    featured: false,
    visible: true,
    link: "https://byneschool.org/logic-book-return",
    additionalLink: "",
  },
  {
    title: "Rhetoric Summer Reading",
    subtitle: "Required reading lists for rising high school students",
    contentUpload: "",
    badges: ["NEW"],
    tags: ["9-12th Rhetoric", "Academics"],
    category: "Public",
    publishDate: "2026-05-04",
    closeDate: "2026-08-10",
    pinned: false,
    priority: 25,
    featured: false,
    visible: true,
    link: "https://byneschool.org/rhetoric-summer-reading",
    additionalLink: "",
  },
  {
    title: "Grammar School Supply Lists",
    subtitle: "Supply lists for rising K3-6th grade students",
    contentUpload: "",
    badges: [],
    tags: ["K-6th Grammar", "Academics"],
    category: "Public",
    publishDate: "2026-05-04",
    closeDate: "2026-08-10",
    pinned: false,
    priority: 26,
    featured: false,
    visible: true,
    link: "https://byneschool.org/grammar-supply-lists",
    additionalLink: "",
  },
  {
    title: "Expired Spring Break Notice",
    subtitle: "This expired record demonstrates close-date filtering.",
    contentUpload: "",
    badges: [],
    tags: ["Calendar"],
    category: "Public",
    publishDate: "2026-03-01",
    closeDate: "2026-04-01",
    pinned: false,
    priority: 99,
    featured: false,
    visible: true,
    link: "https://byneschool.org/expired-spring-break",
    additionalLink: "",
  },
];

const state = {
  search: "",
  tag: "",
  visibleCount: ITEMS_PER_PAGE,
  lastFocusedElement: null,
};

const elements = {
  featuredGrid: document.querySelector("[data-featured-grid]"),
  featuredEmpty: document.querySelector("[data-featured-empty]"),
  announcementGrid: document.querySelector("[data-announcement-grid]"),
  announcementEmpty: document.querySelector("[data-announcement-empty]"),
  search: document.querySelector("[data-search]"),
  tagFilter: document.querySelector("[data-tag-filter]"),
  loadMore: document.querySelector("[data-load-more]"),
  resultsMeta: document.querySelector("[data-results-meta]"),
  modalShell: document.querySelector("[data-modal-shell]"),
  modalBadges: document.querySelector("[data-modal-badges]"),
  modalTitle: document.querySelector("[data-modal-title]"),
  modalSubtitle: document.querySelector("[data-modal-subtitle]"),
  modalDescription: document.querySelector("[data-modal-description]"),
  modalMedia: document.querySelector("[data-modal-media]"),
  modalLinks: document.querySelector("[data-modal-links]"),
  modalCloseButton: document.querySelector(".modal-close"),
  modalCloseControls: document.querySelectorAll("[data-modal-close]"),
};

function parseDate(value) {
  return new Date(`${value}T00:00:00`);
}

function todayAtMidnight() {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth(), now.getDate());
}

function isNonEmpty(value) {
  return Array.isArray(value) ? value.length > 0 : Boolean(value);
}

function isLivePublicItem(item) {
  const today = todayAtMidnight();
  return (
    item.category === "Public" &&
    parseDate(item.publishDate) <= today &&
    parseDate(item.closeDate) > today
  );
}

function compareAnnouncements(a, b) {
  if (a.pinned !== b.pinned) return a.pinned ? -1 : 1;
  return a.priority - b.priority;
}

function getFeaturedItems() {
  return announcements
    .filter((item) => isLivePublicItem(item) && isNonEmpty(item.featured))
    .sort(compareAnnouncements);
}

function getBaseAnnouncementItems() {
  return announcements
    .filter((item) => isLivePublicItem(item) && isNonEmpty(item.visible))
    .sort(compareAnnouncements);
}

function matchesSearch(item) {
  if (!state.search) return true;
  const searchable = [item.link, item.additionalLink, ...item.tags].join(" ").toLowerCase();
  return searchable.includes(state.search);
}

function matchesTag(item) {
  return !state.tag || item.tags.includes(state.tag);
}

function getFilteredAnnouncements() {
  return getBaseAnnouncementItems().filter((item) => matchesSearch(item) && matchesTag(item));
}

function uniqueSortedTags() {
  return [...new Set(getBaseAnnouncementItems().flatMap((item) => item.tags))].sort((a, b) =>
    a.localeCompare(b),
  );
}

function cardTemplate(item) {
  const index = announcements.indexOf(item);
  const badges = item.badges
    .map((badge) => `<span class="badge ${badge.toLowerCase()}">${badge}</span>`)
    .join("");
  const media = item.contentUpload
    ? `<img src="${item.contentUpload}" alt="${item.title} flyer" loading="lazy">`
    : `<span class="media-placeholder" aria-label="No image available">${imageIcon()}</span>`;

  return `
    <button class="card" type="button" data-announcement-card="${index}" aria-label="Open ${item.title}">
      <span class="media-wrap">
        ${media}
        ${badges ? `<span class="badge-list">${badges}</span>` : ""}
      </span>
      <span class="card-body">
        <span class="card-title">${item.title}</span>
        <span class="card-subtitle">${item.subtitle}</span>
      </span>
    </button>
  `;
}

function imageIcon() {
  return `
    <svg viewBox="0 0 24 24" role="img">
      <rect x="3" y="4" width="18" height="16" rx="3"></rect>
      <circle cx="8.5" cy="9" r="1.8"></circle>
      <path d="m21 15-4.5-4.5L7 20"></path>
    </svg>
  `;
}

function renderFeatured() {
  const featured = getFeaturedItems();
  elements.featuredGrid.innerHTML = featured.map(cardTemplate).join("");
  elements.featuredGrid.classList.toggle("is-hidden", featured.length === 0);
  elements.featuredEmpty.classList.toggle("is-hidden", featured.length > 0);
}

function renderTagOptions() {
  const options = uniqueSortedTags()
    .map((tag) => `<option value="${tag}">${tag}</option>`)
    .join("");
  elements.tagFilter.insertAdjacentHTML("beforeend", options);
}

function renderAnnouncements() {
  const filtered = getFilteredAnnouncements();
  const visibleItems = filtered.slice(0, state.visibleCount);
  const hasResults = filtered.length > 0;

  elements.announcementGrid.innerHTML = visibleItems.map(cardTemplate).join("");
  elements.announcementGrid.classList.toggle("is-hidden", !hasResults);
  elements.announcementEmpty.classList.toggle("is-hidden", hasResults);
  elements.loadMore.classList.toggle("is-hidden", visibleItems.length >= filtered.length);

  if (hasResults) {
    elements.resultsMeta.textContent = `Showing ${visibleItems.length} of ${filtered.length} announcements`;
  } else {
    elements.resultsMeta.textContent = "";
  }
}

function badgeTemplate(badge) {
  return `<span class="badge ${badge.toLowerCase()}">${badge}</span>`;
}

function linkTemplate(url, label) {
  if (!url) return "";
  return `<a class="modal-link" href="${url}" target="_blank" rel="noreferrer"><span>${label}</span><strong>${url}</strong></a>`;
}

function openModal(item, trigger) {
  state.lastFocusedElement = trigger;
  elements.modalBadges.innerHTML = item.badges.map(badgeTemplate).join("");
  elements.modalTitle.textContent = item.title;
  elements.modalSubtitle.textContent = item.subtitle;
  elements.modalDescription.textContent = item.description || item.subtitle;
  elements.modalMedia.innerHTML = item.contentUpload
    ? `<img src="${item.contentUpload}" alt="${item.title} artwork">`
    : `<span class="media-placeholder" aria-label="No image available">${imageIcon()}</span>`;
  elements.modalLinks.innerHTML =
    linkTemplate(item.link, "Link") +
    linkTemplate(item.additionalLink, "Additional Link");
  elements.modalLinks.classList.toggle("is-hidden", !item.link && !item.additionalLink);
  elements.modalShell.classList.remove("is-hidden");
  document.body.classList.add("modal-open");
  elements.modalCloseButton?.focus();
}

function closeModal() {
  elements.modalShell.classList.add("is-hidden");
  document.body.classList.remove("modal-open");
  state.lastFocusedElement?.focus();
}

function handleCardClick(event) {
  const card = event.target.closest("[data-announcement-card]");
  if (!card) return;
  const item = announcements[Number(card.dataset.announcementCard)];
  if (item) openModal(item, card);
}

function resetVisibleCount() {
  state.visibleCount = ITEMS_PER_PAGE;
}

elements.search.addEventListener("input", (event) => {
  state.search = event.target.value.trim().toLowerCase();
  resetVisibleCount();
  renderAnnouncements();
});

elements.tagFilter.addEventListener("change", (event) => {
  state.tag = event.target.value;
  resetVisibleCount();
  renderAnnouncements();
});

elements.loadMore.addEventListener("click", () => {
  state.visibleCount += ITEMS_PER_PAGE;
  renderAnnouncements();
});

elements.featuredGrid.addEventListener("click", handleCardClick);
elements.announcementGrid.addEventListener("click", handleCardClick);

elements.modalCloseControls.forEach((control) => {
  control.addEventListener("click", closeModal);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !elements.modalShell.classList.contains("is-hidden")) {
    closeModal();
  }
});

renderTagOptions();
renderFeatured();
renderAnnouncements();
