import React from "react";
import { Modal, Box, TextField, Button } from "@mui/material";
import { Formik, Form, Field } from "formik";

const CreateNewPetModal = ({
  isOpen,
  handleClose,
  ownerId,
  handleAddNewPet,
}) => {
  const initialValues = {
    name: "",
    petType: "",
    dob: "",
    ownerId: ownerId,
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
        {/* Close button */}
        <Button
          onClick={handleClose}
          style={{ position: "absolute", top: 5, right: 5, color: "red" }}
        >
          Close
        </Button>
        <Formik
          initialValues={initialValues}
          onSubmit={handleAddNewPet}
          validationSchema={""}
        >
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
