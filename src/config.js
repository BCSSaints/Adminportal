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
    key: 'events',
    label: 'Events',
    path: '/registrations',
    icon: 'calendar',
  },
  {
    key: 'groups',
    label: 'Groups',
    path: '/groups',
    icon: 'people',
  },
  {
    key: 'profile',
    label: 'Me',
    path: '/me',
    icon: 'person',
  },
];

// Brand colors — customize to match your church
export const COLORS = {
  primary: '#1a1a2e',
  accent: '#e94560',
  tabBar: '#ffffff',
  tabBarActive: '#1a1a2e',
  tabBarInactive: '#999999',
  header: '#1a1a2e',
  headerText: '#ffffff',
  loadingBg: '#f5f5f5',
};
