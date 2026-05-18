/**
 * App Component — Root of the SCP Foundation Database
 * 
 * Manages global state:
 * - Active page ('home' | 'about' | 'contact')
 * - Search query (text filtering by ID or description)
 * - Active classification filter (All / Safe / Euclid / Keter)
 * - Selected SCP for detail modal view
 * - Theme (dark / light) via ThemeProvider context
 * 
 * Data is imported directly from scpData.json.
 * No routing — pages and modal are toggled via state.
 */

import { useState, useMemo, useEffect } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/Navbar';
import SearchFilter from './components/SearchFilter';
import SCPList from './components/SCPList';
import SCPDetail from './components/SCPDetail';
import AboutPage from './components/AboutPage';
import ContactPage from './components/ContactPage';
import scpData from './data/scpData.json';

export default function App() {
  /* --- State --- */
  const [activePage, setActivePage] = useState('home');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');
  const [selectedSCP, setSelectedSCP] = useState(null);

  /**
   * Scroll to top when changing pages
   */
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activePage]);

  /**
   * Derived filtered data (memoized).
   * Filters by classification first, then by search term
   * (matches against SCP ID, shortDesc, description, and containment).
   */
  const filteredEntries = useMemo(() => {
    let entries = scpData;

    // Apply classification filter
    if (activeFilter !== 'All') {
      entries = entries.filter(
        (scp) => scp.class.toLowerCase() === activeFilter.toLowerCase()
      );
    }

    // Apply search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      entries = entries.filter(
        (scp) =>
          scp.id.toLowerCase().includes(query) ||
          scp.shortDesc.toLowerCase().includes(query) ||
          scp.description.toLowerCase().includes(query) ||
          scp.containment.toLowerCase().includes(query)
      );
    }

    return entries;
  }, [searchQuery, activeFilter]);

  /* --- Handlers --- */
  const handleCardClick = (scp) => setSelectedSCP(scp);
  const handleCloseModal = () => setSelectedSCP(null);

  /**
   * Renders the correct page content based on activePage state
   */
  const renderPage = () => {
    switch (activePage) {
      case 'about':
        return <AboutPage />;
      case 'contact':
        return <ContactPage />;
      case 'home':
      default:
        return (
          <>
            {/* Search & Filter Bar */}
            <SearchFilter
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              activeFilter={activeFilter}
              onFilterChange={setActiveFilter}
            />

            {/* SCP Entry Grid */}
            <SCPList scpEntries={filteredEntries} onCardClick={handleCardClick} />

            {/* Detail Modal */}
            {selectedSCP && (
              <SCPDetail scp={selectedSCP} onClose={handleCloseModal} />
            )}
          </>
        );
    }
  };

  return (
    <ThemeProvider>
      {/* Navigation */}
      <Navbar activePage={activePage} setActivePage={setActivePage} />

      {/* Spacer for fixed navbar */}
      <div style={{ height: 'var(--navbar-height)' }} />

      {/* Page Content */}
      {renderPage()}

      {/* Footer */}
      <footer className="footer">
        <p className="footer__text">
          <span>SCP Foundation</span> — Secure · Contain · Protect — All rights reserved
        </p>
      </footer>
    </ThemeProvider>
  );
}
