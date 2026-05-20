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
import AddSCPForm from './components/AddSCPForm';
import EditSCPForm from './components/EditSCPForm';
// import scpData from './data/scpData.json';

export default function App() {
  /* --- State --- */
  const [activePage, setActivePage] = useState('home');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');
  const [selectedSCP, setSelectedSCP] = useState(null);
  const [scpData, setScpData] = useState([]);
  const [editingSCP, setEditingSCP] = useState(null);

  /**
   * Scroll to top when changing pages
   */
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activePage]);
  useEffect(() => {
  fetch('https://scp-foundation-react-app.onrender.com/')
    .then((response) => response.json())
    .then((data) => setScpData(data))
    .catch((error) => console.error('Error fetching SCP data:', error));
}, []);

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
          scp.item.toLowerCase().includes(query) ||
scp.description.toLowerCase().includes(query) ||
scp.containment.toLowerCase().includes(query)
      );
    }

    return entries;
  }, [searchQuery, activeFilter]);

  /* --- Handlers --- */
  const handleCardClick = (scp) => setSelectedSCP(scp);
  const handleCloseModal = () => setSelectedSCP(null);
  const handleUpdateSCP = async (updatedSCP) => {
  try {
    const response = await fetch(
      `http://localhost:5000/items/${updatedSCP.id}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedSCP)
      }
    );

    const data = await response.json();

    setScpData((prevData) =>
  prevData.map((scp) =>
    scp.id === updatedSCP.id ? data[0] : scp
  )
);

    setEditingSCP(null);
    alert("SCP updated successfully!");

  } catch (error) {
    console.error('Error updating SCP:', error);
  }
};
  const handleAddSCP = (newSCP) => {
  setScpData([...scpData, newSCP]);
};
  const handleDelete = async (id) => {
  const confirmDelete = window.confirm(
    "Are you sure you want to delete this SCP?"
  );

  if (!confirmDelete) return;

  try {
    await fetch(`https://scp-foundation-react-app.onrender.com/items/${id}`, {
      method: 'DELETE'
    });

    setScpData(scpData.filter((scp) => scp.id !== id));
  } catch (error) {
    console.error('Error deleting SCP:', error);
  }
};
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

            <AddSCPForm onAdd={handleAddSCP} />
            {editingSCP && (
  <EditSCPForm
    scp={editingSCP}
    onUpdate={handleUpdateSCP}
    onClose={() => setEditingSCP(null)}
  />
)}

            {/* SCP Entry Grid */}
            <SCPList scpEntries={filteredEntries} onCardClick={handleCardClick} onDelete={handleDelete} onEdit={setEditingSCP} />

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
