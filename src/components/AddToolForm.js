import React, { useState } from 'react';
import './AddToolForm.css';

function AddToolForm({ onAdd }) {
  const [form, setForm] = useState({
    name: '',
    version: '',
    category: '',
    sourceUrl: ''
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Convert all fields to lowercase before sending
    const formattedForm = {
      name: form.name.trim().toLowerCase(),
      version: form.version.trim().toLowerCase(),
      category: form.category.trim().toLowerCase(),
      sourceUrl: form.sourceUrl.trim().toLowerCase(),
    };

    try {
      await fetch('http://localhost:5000/api/ver/addtools', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formattedForm)
      });

      setForm({ name: '', version: '', category: '', sourceUrl: '' });
      onAdd(); // Refresh list or handle update in parent
      window.location.reload();
    } catch (err) {
      console.error('Error adding tool:', err);
    }
  };

  return (
    <form className="add-tool-form" onSubmit={handleSubmit}>
      <input
        name="name"
        value={form.name}
        onChange={handleChange}
        placeholder="Tool Name"
        required
      />
      <select
  name="category"
  value={form.category}
  onChange={handleChange}
  required
>
  <option value="">Select Category</option>
  <option value="frontend">frontend</option>
  <option value="backend">backend</option>
  <option value="database">database</option>
</select>

      <input
        name="sourceUrl"
        value={form.sourceUrl}
        onChange={handleChange}
        placeholder="Source URL"
      />
      <button type="submit">Add Tool</button>
    </form>
  );
}

export default AddToolForm;
