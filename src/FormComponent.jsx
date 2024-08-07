// src/FormComponent.jsx
import React, { useState } from 'react';
import axios from 'axios';

function FormComponent() {
  const [formData, setFormData] = useState({
    field1: '',
    field2: '',
    field3: false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  console.log('Form Data:', formData); // Log the form data
  try {
    const response = await axios.post('http://localhost:5000/api/data', formData);
    if (response.status === 201) {
      alert('Data submitted successfully');
    } else {
      alert('Failed to submit data');
    }
  } catch (error) {
    console.error('Error:', error.response ? error.response.data : error.message);
  }
};


  return (
    <form onSubmit={handleSubmit}>
      <label>
        Field 1:
        <input
          type="text"
          name="field1"
          value={formData.field1}
          onChange={handleChange}
        />
      </label>
      <br />
      <label>
        Field 2:
        <input
          type="number"
          name="field2"
          value={formData.field2}
          onChange={handleChange}
        />
      </label>
      <br />
      <label>
        Field 3:
        <input
          type="checkbox"
          name="field3"
          checked={formData.field3}
          onChange={handleChange}
        />
      </label>
      <br />
      <button type="submit">Submit</button>
    </form>
  );
}

export default FormComponent;
