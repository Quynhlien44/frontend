import React from "react";
import { Modal, Box, TextField, Button, MenuItem } from "@mui/material";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

const UpdateAPetModal = ({ isOpen, handleClose, pet, handleUpdate }) => {
  const initialValues = {
    name: pet ? pet.name : "",
    petType: pet ? pet.type : "",
    dob: pet ? pet.dob : "",
    status: pet ? pet.status : "",
    doctorsComment: pet ? pet.doctorsComment : "",
  };

  const validationSchema = Yup.object().shape({
    status: Yup.string().required("Status is required"),
  });

  const handleSubmit = (values) => {
    handleUpdate({
      id: pet.id,
      ...values,
    });
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
          width: 500,
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
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          <Form>
            <Box mb={2}>
              <Field
                as={TextField}
                fullWidth
                name="status"
                label="Status"
                select
                variant="outlined"
                required
              >
                <MenuItem value="alive">Alive</MenuItem>
                <MenuItem value="deceased">Deceased</MenuItem>
                <MenuItem value="missing">Missing</MenuItem>
                <MenuItem value="other">Other</MenuItem>
              </Field>
            </Box>
            <Box mb={2}>
              <Field
                as={TextField}
                fullWidth
                multiline
                rows={4}
                name="doctorsComment"
                label="Doctor's Comment"
                variant="outlined"
              />
            </Box>
            <Box textAlign="right">
              <Button type="submit" variant="contained" color="primary">
                Update Pet
              </Button>
            </Box>
          </Form>
        </Formik>
      </Box>
    </Modal>
  );
};

export default UpdateAPetModal;
