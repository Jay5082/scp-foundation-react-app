/**
 * SCPDetail Component (Modal)
 * 
 * Full-screen overlay modal displaying detailed SCP information.
 * Styled like a classified SCP document with:
 * - Cinematic image filter or classified placeholder
 * - SCP ID and classification badge
 * - Containment Procedures section
 * - Description section
 * - Classification watermark stamp
 * 
 * Features:
 * - Smooth open/close animations
 * - Closes on backdrop click or × button
 * - Closes on Escape key press
 * - Body scroll lock while open
 */

import { useState, useEffect, useCallback } from 'react';

/**
 * Class badge (inline for modal)
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

export default function SCPDetail({ scp, onClose }) {
  const [imgError, setImgError] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  const hasImage = scp.image && scp.image.length > 0 && !imgError;

  /**
   * Handles the close animation before unmounting
   */
  const handleClose = useCallback(() => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
    }, 250);
  }, [onClose]);

  /**
   * Close modal on Escape key press + lock body scroll
   */
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') handleClose();
    };
    document.addEventListener('keydown', handleEscape);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [handleClose]);

  /**
   * Close on backdrop click (not on modal content click)
   */
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  return (
    <div
      className={`modal-overlay ${isClosing ? 'modal-overlay--closing' : ''}`}
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
      aria-label={`${scp.item} detail view`}
    >
      <div className="modal">
        {/* Close Button */}
        <button
          id="modal-close"
          className="modal__close"
          onClick={handleClose}
          aria-label="Close modal"
        >
          ✕
        </button>

        {/* Image / Classified Placeholder */}
        <div className="modal__image-wrapper">
          {hasImage ? (
            <img
              className="modal__image modal__image--cinematic"
              src={scp.image}
              alt={`${scp.item} documentation photograph`}
              onError={() => setImgError(true)}
            />
          ) : (
            <div className="classified-placeholder classified-placeholder--large">
              <div className="classified-placeholder__stripes" />
              <div className="classified-placeholder__content">
                <span className="classified-placeholder__label">◼ CLASSIFIED ◼</span>
                <span className="classified-placeholder__sub">{scp.item} — IMAGE REDACTED</span>
              </div>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="modal__content">
          {/* Header: ID + Badge */}
          <div className="modal__header">
            <h2 className="modal__id">{scp.item}</h2>
            <ClassBadge classification={scp.class} />
          </div>

          {/* Containment Procedures */}
          <div className="modal__section">
            <h3 className="modal__section-label">Containment Procedures</h3>
            <p className="modal__section-text">{scp.containment}</p>
          </div>

          {/* Description */}
          <div className="modal__section">
            <h3 className="modal__section-label">Description</h3>
            <p className="modal__section-text">{scp.description}</p>
          </div>
        </div>

        {/* Classification Watermark Stamp */}
        <div className="modal__stamp" aria-hidden="true">
          {scp.class}
        </div>
      </div>
    </div>
  );
}
