/**
 * AboutPage Component
 * 
 * Full About Us page with SCP Foundation lore.
 * Includes header with red divider, body paragraph,
 * 2x2 stats grid, and classified footer note.
 */

export default function AboutPage() {
  return (
    <div className="page-container">
      <div className="page">
        {/* Header */}
        <header className="page__header">
          <span className="page__label">▸ ABOUT THE FOUNDATION</span>
          <h2 className="page__title">WHO WE ARE</h2>
          <div className="page__divider" />
        </header>

        {/* Body Paragraph */}
        <p className="page__body">
          The SCP Foundation is a secret organisation tasked with containing and 
          studying anomalous entities, objects, and phenomena that defy natural law. 
          Operating in the shadows of every government and institution on Earth, we 
          exist so that humanity does not have to confront what lurks beyond the 
          boundaries of the understood world.
        </p>

        {/* Stats Grid (2x2) */}
        <div className="stats-grid">
          {/* Card 1 — Our Mission */}
          <div className="stats-card">
            <h3 className="stats-card__title">OUR MISSION</h3>
            <div className="stats-card__divider" />
            <p className="stats-card__text">
              To secure anomalies before they endanger civilians, contain them under 
              strict protocols, and protect normalcy at any cost necessary.
            </p>
          </div>

          {/* Card 2 — Classification System */}
          <div className="stats-card">
            <h3 className="stats-card__title">CLASSIFICATION SYSTEM</h3>
            <div className="stats-card__divider" />
            <p className="stats-card__text">
              Objects are classified as Safe (easily contained), Euclid (unpredictable), 
              or Keter (extremely dangerous). Each class dictates resource allocation and 
              containment urgency.
            </p>
          </div>

          {/* Card 3 — Contained Objects */}
          <div className="stats-card">
            <span className="stats-card__number">5,000+</span>
            <h3 className="stats-card__title">CONTAINED OBJECTS</h3>
            <div className="stats-card__divider" />
            <p className="stats-card__text">
              Across dozens of classified facilities worldwide, the Foundation maintains 
              containment over thousands of anomalous items and entities.
            </p>
          </div>

          {/* Card 4 — Council Oversight */}
          <div className="stats-card">
            <span className="stats-card__number">O5</span>
            <h3 className="stats-card__title">COUNCIL OVERSIGHT</h3>
            <div className="stats-card__divider" />
            <p className="stats-card__text">
              The O5 Council — thirteen individuals with the highest clearance — govern 
              all Foundation decisions. Their identities are unknown even to most senior staff.
            </p>
          </div>
        </div>

        {/* Footer Note */}
        <div className="page__footer-note">
          <p>▸ CLEARANCE LEVEL 1 INFORMATION</p>
          <p>▸ FURTHER ACCESS REQUIRES AUTHORISATION</p>
          <p>▸ SECURE · CONTAIN · PROTECT</p>
        </div>
      </div>
    </div>
  );
}
