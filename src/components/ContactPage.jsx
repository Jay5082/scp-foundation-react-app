/**
 * ContactPage Component
 * 
 * Full Contact Us page with a themed dark form.
 * Features:
 * - Two-column row (name + clearance level)
 * - Subject/Object reference input
 * - Message textarea
 * - Full-width submit button
 * - Client-side validation (name + message required)
 * - Success state replacing the form after submission
 */

import { useState } from 'react';

export default function ContactPage() {
  /* Form field state */
  const [formData, setFormData] = useState({
    name: '',
    clearance: '',
    subject: '',
    message: '',
  });

  /* Validation error messages */
  const [errors, setErrors] = useState({});

  /* Whether the form has been submitted successfully */
  const [isSubmitted, setIsSubmitted] = useState(false);

  /**
   * Updates a single form field
   */
  const handleChange = (field) => (e) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));
    // Clear error for this field as user types
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }));
    }
  };

  /**
   * Validates required fields and submits
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Designation is required.';
    }
    if (!formData.message.trim()) {
      newErrors.message = 'Message body is required.';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Success — replace form with confirmation
    setIsSubmitted(true);
  };

  return (
    <div className="page-container">
      <div className="page">
        {/* Header */}
        <header className="page__header">
          <span className="page__label">▸ SECURE COMMUNICATION CHANNEL</span>
          <h2 className="page__title">CONTACT US</h2>
          <div className="page__divider" />
        </header>

        {/* Intro Paragraph */}
        <p className="page__body">
          All communications are encrypted and monitored. Provide your security 
          clearance level where applicable. Unauthorised contact attempts will be 
          logged and investigated.
        </p>

        {/* Form or Success Message */}
        {!isSubmitted ? (
          <form className="contact-form" onSubmit={handleSubmit} noValidate>
            {/* Row 1: Name + Clearance (side by side) */}
            <div className="contact-form__row contact-form__row--2col">
              <div className="contact-form__field">
                <label className="contact-form__label" htmlFor="contact-name">
                  FULL NAME / DESIGNATION
                </label>
                <input
                  id="contact-name"
                  type="text"
                  className={`contact-form__input ${errors.name ? 'contact-form__input--error' : ''}`}
                  placeholder="Dr. ████████"
                  value={formData.name}
                  onChange={handleChange('name')}
                  autoComplete="off"
                />
                {errors.name && (
                  <span className="contact-form__error">{errors.name}</span>
                )}
              </div>

              <div className="contact-form__field">
                <label className="contact-form__label" htmlFor="contact-clearance">
                  SECURITY CLEARANCE LEVEL
                </label>
                <input
                  id="contact-clearance"
                  type="text"
                  className="contact-form__input"
                  placeholder="Level 1 — Level 5"
                  value={formData.clearance}
                  onChange={handleChange('clearance')}
                  autoComplete="off"
                />
              </div>
            </div>

            {/* Row 2: Subject (full width) */}
            <div className="contact-form__row">
              <div className="contact-form__field">
                <label className="contact-form__label" htmlFor="contact-subject">
                  SUBJECT / OBJECT REFERENCE
                </label>
                <input
                  id="contact-subject"
                  type="text"
                  className="contact-form__input"
                  placeholder="e.g. SCP-002, Containment Breach"
                  value={formData.subject}
                  onChange={handleChange('subject')}
                  autoComplete="off"
                />
              </div>
            </div>

            {/* Row 3: Message (full width, textarea) */}
            <div className="contact-form__row">
              <div className="contact-form__field">
                <label className="contact-form__label" htmlFor="contact-message">
                  MESSAGE
                </label>
                <textarea
                  id="contact-message"
                  className={`contact-form__textarea ${errors.message ? 'contact-form__input--error' : ''}`}
                  placeholder="Describe your inquiry. Redact sensitive information where appropriate..."
                  value={formData.message}
                  onChange={handleChange('message')}
                  rows={6}
                />
                {errors.message && (
                  <span className="contact-form__error">{errors.message}</span>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <button type="submit" id="contact-submit" className="contact-form__submit">
              ▸ TRANSMIT SECURE MESSAGE
            </button>
          </form>
        ) : (
          /* Success State */
          <div className="contact-success">
            <div className="contact-success__icon">✓</div>
            <h3 className="contact-success__title">▸ TRANSMISSION RECEIVED</h3>
            <p className="contact-success__text">
              Your message has been logged and encrypted. A Foundation liaison will 
              contact you through secure channels if your inquiry warrants a response.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
