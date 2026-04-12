// ============================================================
// CHURCH CENTER CONFIGURATION
// ============================================================
// Set CHURCH_CENTER_SUBDOMAIN to your church's subdomain.
// Your Church Center URL looks like:
//   https://YOUR_SUBDOMAIN.churchcenter.com
//
// Example: if your URL is https://byne.churchcenter.com
//   set CHURCH_CENTER_SUBDOMAIN = 'byne'
// ============================================================

export const CHURCH_CENTER_SUBDOMAIN = 'byne';

export const CHURCH_NAME = 'Byne';

// Derived base URL — do not change this
export const CHURCH_CENTER_BASE_URL = `https://${CHURCH_CENTER_SUBDOMAIN}.churchcenter.com`;

// Tab destinations within Church Center
// Groups is accessible from the Home tab inside Church Center.
export const TABS = [
  {
    key: 'home',
    label: 'Home',
    path: '/',
    icon: 'home',
  },
  {
    key: 'giving',
    label: 'Give',
    path: '/giving',
    icon: 'heart',
  },
  {
    key: 'checkin',
    label: 'Check In',
    path: '/check-ins',
    icon: 'checkbox',
  },
  {
    key: 'events',
    label: 'Events',
    path: '/registrations',
    icon: 'calendar',
  },
  {
    key: 'profile',
    label: 'Me',
    path: '/me',
    icon: 'person',
  },
];

// Brand colors — Byne Church
// Primary blue extracted from the logo wordmark
export const COLORS = {
  primary: '#5BB8D4',       // Byne Church blue
  accent: '#3A9BBF',        // Slightly deeper blue for pressed states
  tabBar: '#ffffff',
  tabBarActive: '#5BB8D4',  // Active tab uses brand blue
  tabBarInactive: '#AAAAAA',
  header: '#ffffff',        // White header to match logo background
  headerText: '#5BB8D4',    // Blue text in header
  loadingBg: '#f5f5f5',
  splashBg: '#ffffff',      // White splash to match logo
};
