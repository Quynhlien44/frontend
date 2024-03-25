// PetCreateForm.js
import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';

const PetCreateForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    petype: '',
    status: '',
    dob: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Call API to create pet with formData
    console.log(formData); // Replace with API call
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="Name"
        name="name"
        value={formData.name}
        onChange={handleChange}
        required
      />
      <TextField
        label="Type"
        name="type"
        value={formData.type}
        onChange={handleChange}
        required
      />
      <TextField
        label="Status"
        name="status"
        value={formData.status}
        onChange={handleChange}
        required
      />
      <TextField
        label="Date of Birth"
        name="dob"
        type="date"
        value={formData.dob}
        onChange={handleChange}
        required
      />
      <Button type="submit">Create Pet</Button>
    </form>
  );
};

export default PetCreateForm;
