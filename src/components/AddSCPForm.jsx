import { useState } from "react";

export default function AddSCPForm({ onAdd }) {
  const [formData, setFormData] = useState({
    item: "",
    class: "",
    description: "",
    containment: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:5000/items", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData)
    });

    const data = await response.json();

    onAdd(data[0]);

    setFormData({
      item: "",
      class: "",
      description: "",
      containment: ""
    });
  };

  return (
    <form onSubmit={handleSubmit} className="add-form">
      <input
        type="text"
        name="item"
        placeholder="SCP Item"
        value={formData.item}
        onChange={handleChange}
        required
      />

      <input
        type="text"
        name="class"
        placeholder="Class"
        value={formData.class}
        onChange={handleChange}
        required
      />

      <input
        type="text"
        name="description"
        placeholder="Description"
        value={formData.description}
        onChange={handleChange}
        required
      />

      <input
        type="text"
        name="containment"
        placeholder="Containment"
        value={formData.containment}
        onChange={handleChange}
        required
      />

      <button type="submit">
        Add SCP
      </button>
    </form>
  );
}