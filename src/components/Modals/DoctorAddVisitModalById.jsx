import React from "react";
import { Modal, Typography, TextField, Button } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import visitApi from "../../services/visitApi";
import { useNavigate } from "react-router-dom";

const DoctorAddVisitModalById = ({ isOpen, handleClose, petId }) => {
  const navigate = useNavigate();

  const initialValues = {
    date: null,
    comment: "",
  };

  const validationSchema = Yup.object().shape({
    date: Yup.date().required("Date is required"),
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      try {
        await visitApi.create({ petId, ...values });
        handleClose();
        navigate("/doctor/doctor/visits");
      } catch (error) {
        console.error("Error adding visit:", error);
      }
    },
  });

  return (
    <Modal open={isOpen} onClose={handleClose}>
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <div
          style={{
            backgroundColor: "#fff",
            padding: 20,
            borderRadius: 8,
            maxWidth: 400,
            width: "100%",
          }}
        >
          {/* Close button */}
          <Button
            onClick={handleClose}
            style={{ position: "absolute", top: 15, right: 10, color: "red" }}
          >
            Close
          </Button>
          <Typography variant="h5" gutterBottom>
            Book a Visit
          </Typography>
          <form onSubmit={formik.handleSubmit}>
            <TextField
              id="date"
              name="date"
              label="Date"
              type="date"
              value={formik.values.date}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              fullWidth
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
              error={formik.touched.date && Boolean(formik.errors.date)}
              helperText={formik.touched.date && formik.errors.date}
            />
            <TextField
              id="comment"
              name="comment"
              label="Comment (Optional)"
              value={formik.values.comment}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              fullWidth
              multiline
              rows={4}
              margin="normal"
              variant="outlined"
            />
            <div style={{ textAlign: "right", marginTop: 20 }}>
              <Button variant="contained" color="primary" type="submit">
                Add Visit
              </Button>
            </div>
          </form>
        </div>
      </div>
    </Modal>
  );
};

export default DoctorAddVisitModalById;
