import React from "react";
import { Modal, Box, TextField, Button } from "@mui/material";
import { Formik, Form, Field } from "formik";
import petApi from "../../services/petApi";

const CreateNewPetModal = ({ isOpen, handleClose }) => {
  const initialValues = {
    name: "",
    petType: "",
    dob: "",
    ownerId: "",
  };

  const handleSubmit = async (values) => {
    try {
      const response = await petApi.create(values);
      console.log("New Pet Created:", response);
      // Close the modal or handle success message
      handleClose();
    } catch (error) {
      console.error("Error creating pet:", error);
      // Handle error, maybe show an error message
    }
  };

  

  return (
    <Modal open={isOpen} onClose={handleClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          width: 400,
          maxWidth: "90%",
        }}
      >
        <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={""}>
          <Form>
            <Box mb={2}>
              <Field
                as={TextField}
                fullWidth
                name="name"
                label="Name"
                variant="outlined"
                required
              />
            </Box>
            <Box mb={2}>
              <Field
                as={TextField}
                fullWidth
                name="petType"
                label="Pet Type"
                variant="outlined"
                required
              />
            </Box>
            <Box mb={2}>
              <Field
                as={TextField}
                fullWidth
                name="dob"
                label="Date of Birth"
                type="date"
                InputLabelProps={{
                  shrink: true,
                }}
                variant="outlined"
                required
              />
            </Box>
            <Box mb={2}>
              <Field
                as={TextField}
                fullWidth
                name="ownerId"
                label="Owner ID"
                variant="outlined"
                required
              />
            </Box>
            <Box textAlign="right">
              <Button type="submit" variant="contained" color="primary">
                Create Pet
              </Button>
            </Box>
          </Form>
        </Formik>
      </Box>
    </Modal>
  );
};

export default CreateNewPetModal;
