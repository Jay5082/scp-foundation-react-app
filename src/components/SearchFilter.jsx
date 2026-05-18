/**
 * SearchFilter Component
 * 
 * Sticky search bar with text input and classification filter buttons.
 * Filters: All, Safe, Euclid, Keter
 * Updates parent state on input change or filter click.
 */

const FILTERS = ['All', 'Safe', 'Euclid', 'Keter'];

/**
 * Search icon SVG for the input field
 */
const SearchIcon = () => (
  <svg
    className="search-filter__icon"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

export default function SearchFilter({ searchQuery, onSearchChange, activeFilter, onFilterChange }) {
  return (
    <div className="search-filter" role="search" aria-label="Search and filter SCP entries">
      <div className="search-filter__inner">
        {/* Search Input */}
        <div className="search-filter__input-wrapper">
          <SearchIcon />
          <input
            id="scp-search"
            type="text"
            className="search-filter__input"
            placeholder="Search by SCP ID or keyword..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            autoComplete="off"
            aria-label="Search SCP entries"
          />
        </div>

        {/* Filter Buttons */}
        <div className="search-filter__buttons" role="group" aria-label="Filter by classification">
          {FILTERS.map((filter) => (
            <button
              key={filter}
              id={`filter-${filter.toLowerCase()}`}
              className={`filter-btn ${activeFilter === filter ? 'filter-btn--active' : ''}`}
              onClick={() => onFilterChange(filter)}
              aria-pressed={activeFilter === filter}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
