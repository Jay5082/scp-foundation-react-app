/**
 * SCPCard Component
 * 
 * Displays an individual SCP entry as a card in the grid.
 * Shows image (with cinematic filter) or classified placeholder,
 * SCP ID, class badge, truncated shortDesc, and a VIEW FILE button.
 * 
 * Features:
 * - Cinematic image filter: grayscale(30%) + contrast(1.1)
 * - Classified placeholder with red diagonal stripes
 * - Hover scale + glow animation (CSS-driven)
 * - Staggered fade-in on mount (CSS animation-delay)
 * - Image error fallback to classified placeholder
 */

import { useState } from 'react';

/**
 * Class badge component with colored dot indicator
 */
function ClassBadge({ classification }) {
  const classKey = classification.toLowerCase();
  return (
    <span className={`class-badge class-badge--${classKey}`}>
      <span className="class-badge__dot" />
      {classification}
    </span>
  );
}

export default function SCPCard({
  scp,
  onClick,
  onDelete,
  onEdit
}) {
  const [imgError, setImgError] = useState(false);
  const hasImage = scp.image && scp.image.length > 0 && !imgError;

  return (
    <article
      className="scp-card"
      onClick={() => onClick(scp)}
      tabIndex={0}
      role="button"
      aria-label={`View details for ${scp.item}`}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick(scp);
        }
      }}
    >
      {/* Image / Classified Placeholder */}
      <div className="scp-card__image-wrapper">
        {hasImage ? (
          <img
            className="scp-card__image scp-card__image--cinematic"
            src={scp.image}
            alt={`${scp.item} containment photograph`}
            loading="lazy"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="classified-placeholder">
            <div className="classified-placeholder__stripes" />
            <div className="classified-placeholder__content">
              <span className="classified-placeholder__label">◼ CLASSIFIED ◼</span>
              <span className="classified-placeholder__sub">{scp.item} — IMAGE REDACTED</span>
            </div>
          </div>
        )}
        {/* Class badge overlay */}
        <div className="scp-card__class-stripe">
          <ClassBadge classification={scp.class} />
        </div>
      </div>

      {/* Card Body */}
      <div className="scp-card__body">
        <h2 className="scp-card__id">{scp.item}</h2>
        <p className="scp-card__desc">{scp.description}</p>
        <div className="scp-card__footer">
  <ClassBadge classification={scp.class} />

  <div style={{ display: 'flex', gap: '10px' }}>
    
    <button
      className="scp-card__view-btn"
      tabIndex={-1}
    >
      View File →
    </button>

    <button
      className="scp-card__view-btn"
      tabIndex={-1}
      onClick={(e) => {
        e.stopPropagation();
        onEdit(scp);
      }}
    >
      Edit
    </button>

    <button
  className="scp-card__view-btn"
  tabIndex={-1}
  onClick={(e) => {
    e.stopPropagation();
    onDelete(scp.id);
  }}
>
  Delete
</button>

  </div>
</div>
      </div>
    </article>
  );
}
