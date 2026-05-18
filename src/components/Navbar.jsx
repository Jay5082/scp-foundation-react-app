/**
 * Navbar Component
 * 
 * Fixed top navigation bar with SCP Foundation branding.
 * Features a custom SVG logo, foundation name, navigation links,
 * dark/light theme toggle, and database title.
 * Active link has a red underline accent.
 */

import { useTheme } from '../context/ThemeContext';

/* ---- SVG Icons ---- */

const SCPLogo = () => (
  <svg
    className="navbar__logo-icon"
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <circle cx="50" cy="50" r="46" stroke="currentColor" strokeWidth="3" fill="none" className="logo-ring" />
    <circle cx="50" cy="50" r="36" stroke="currentColor" strokeWidth="1.5" fill="none" opacity="0.5" className="logo-ring" />
    <path d="M50 4 L50 20 L44 14 M50 20 L56 14" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" className="logo-arrow" />
    <path d="M96 50 L80 50 L86 44 M80 50 L86 56" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" className="logo-arrow" />
    <path d="M50 96 L50 80 L44 86 M50 80 L56 86" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" className="logo-arrow" />
    <path d="M4 50 L20 50 L14 44 M20 50 L14 56" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" className="logo-arrow" />
    <circle cx="50" cy="50" r="10" fill="currentColor" opacity="0.15" className="logo-center" />
    <circle cx="50" cy="50" r="5" fill="currentColor" opacity="0.4" className="logo-center" />
  </svg>
);

/** Sun icon for light mode */
const SunIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="12" cy="12" r="5" />
    <line x1="12" y1="1" x2="12" y2="3" />
    <line x1="12" y1="21" x2="12" y2="23" />
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
    <line x1="1" y1="12" x2="3" y2="12" />
    <line x1="21" y1="12" x2="23" y2="12" />
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
  </svg>
);

/** Moon icon for dark mode */
const MoonIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
  </svg>
);

/** Navigation link configuration */
const NAV_LINKS = [
  { key: 'home', label: 'Database' },
  { key: 'about', label: 'About Us' },
  { key: 'contact', label: 'Contact Us' },
];

export default function Navbar({ activePage, setActivePage }) {
  const { theme, toggleTheme } = useTheme();

  return (
    <nav className="navbar" role="navigation" aria-label="Main navigation">
      <div className="navbar__inner">
        {/* Logo & Foundation Name */}
        <button
          className="navbar__logo"
          onClick={() => setActivePage('home')}
          aria-label="Go to home page"
        >
          <SCPLogo />
          <div className="navbar__logo-text">
            <span className="navbar__logo-title">SCP Foundation</span>
            <span className="navbar__logo-subtitle">Secure · Contain · Protect</span>
          </div>
        </button>

        {/* Navigation Links */}
        <div className="navbar__nav" role="menubar">
          {NAV_LINKS.map(({ key, label }) => (
            <button
              key={key}
              id={`nav-${key}`}
              className={`navbar__link ${activePage === key ? 'navbar__link--active' : ''}`}
              onClick={() => setActivePage(key)}
              role="menuitem"
              aria-current={activePage === key ? 'page' : undefined}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Theme Toggle */}
        <button
          id="theme-toggle"
          className="theme-toggle"
          onClick={toggleTheme}
          aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
        >
          <span className={`theme-toggle__icon ${theme === 'dark' ? 'theme-toggle__icon--visible' : ''}`}>
            <SunIcon />
          </span>
          <span className={`theme-toggle__icon ${theme === 'light' ? 'theme-toggle__icon--visible' : ''}`}>
            <MoonIcon />
          </span>
        </button>

        {/* Database Title */}
        <h1 className="navbar__title">
          <span>SCP</span> DATABASE
        </h1>
      </div>
    </nav>
  );
}
