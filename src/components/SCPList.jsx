/**
 * SCPList Component
 * 
 * Renders the responsive grid of SCP cards.
 * Shows a filtered result count and handles empty states gracefully.
 */

import SCPCard from './SCPCard';

export default function SCPList({ scpEntries, onCardClick }) {
  return (
    <main className="scp-list">
      {/* Results Count Header */}
      <div className="scp-list__header">
        <span className="scp-list__count">
          {scpEntries.length} {scpEntries.length === 1 ? 'ENTRY' : 'ENTRIES'} FOUND
        </span>
      </div>

      {/* Card Grid */}
      <div className="scp-list__grid">
        {scpEntries.length > 0 ? (
          scpEntries.map((scp) => (
            <SCPCard key={scp.id} scp={scp} onClick={onCardClick} />
          ))
        ) : (
          /* Empty State */
          <div className="scp-list__empty">
            <div className="scp-list__empty-icon">⊘</div>
            <p className="scp-list__empty-text">NO MATCHING ENTRIES</p>
            <p className="scp-list__empty-sub">
              Try adjusting your search query or classification filter.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
