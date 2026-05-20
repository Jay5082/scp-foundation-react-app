import { useState } from 'react';

export default function EditSCPForm({
  scp,
  onUpdate,
  onClose
}) {
  const [item, setItem] = useState(scp.item);
  const [scpClass, setScpClass] = useState(scp.class);
  const [description, setDescription] = useState(scp.description);
  const [containment, setContainment] = useState(scp.containment);

  const handleSubmit = (e) => {
    e.preventDefault();

    onUpdate({
      ...scp,
      item,
      class: scpClass,
      description,
      containment
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        padding: '20px',
        background: '#111',
        margin: '20px',
        borderRadius: '10px'
      }}
    >
      <h2>Edit SCP</h2>

      <input
        value={item}
        onChange={(e) => setItem(e.target.value)}
        placeholder="SCP Item"
      />

      <input
        value={scpClass}
        onChange={(e) => setScpClass(e.target.value)}
        placeholder="Class"
      />

      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
      />

      <textarea
        value={containment}
        onChange={(e) => setContainment(e.target.value)}
        placeholder="Containment"
      />

      <br /><br />

      <button type="submit">
        Update SCP
      </button>

      <button
        type="button"
        onClick={onClose}
        style={{ marginLeft: '10px' }}
      >
        Cancel
      </button>
    </form>
  );
}