import React, { useState } from 'react';
import { TextField, Button, Card, CardContent, Typography } from '@mui/material';

const VisitCreateForm = () => {
  const [formData, setFormData] = useState({
    petId: '',
    visitDate: '',
    comment: ''
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
    // Call API to create visit with formData
    console.log(formData); // Replace with API call
    // Redirect back to the previous page
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h5" gutterBottom>Create Visit</Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Pet ID"
            name="petId"
            value={formData.petId}
            onChange={handleChange}
            required
            fullWidth
            margin="normal"
          />
          <TextField
            type="date"
            value={formData.visitDate}
            onChange={handleChange}
            required
            fullWidth
            margin="normal"
          />
          <TextField
            label="Comment"
            name="comment"
            multiline
            rows={4}
            value={formData.comment}
            onChange={handleChange}
            required
            fullWidth
            margin="normal"
          />
          <Button type="submit" variant="contained" color="primary">
            Create Visit
          </Button>
          <Button onClick={() =>  window.history.back()} variant="outlined" color="primary" style={{ marginLeft: '8px' }}>
            Back
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default VisitCreateForm;
