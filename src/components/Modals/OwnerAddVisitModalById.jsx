import React, { useEffect, useState } from "react";
import { Modal, Typography, TextField, Button } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import visitApi from "../../services/visitApi";
import { useNavigate } from "react-router-dom";

const OwnerAddVisitModalById = ({ isOpen, handleClose, petId }) => {
  const navigate = useNavigate();

  const initialValues = {
    date: null,
    comment: "",
  };

  const [existingVisits, setExistingVisits] = useState([]);

  // Function to format date to UTC
  const formatToUTCDate = (dateString) => {
    const date = new Date(dateString);
    const utcDate = new Date(
      Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())
    );
    return utcDate.toISOString().split("T")[0];
  };

  const validationSchema = Yup.object().shape({
    date: Yup.date()
      .required("Date is required")
      .min(new Date(), "Date must be in the future")
      .test(
        "unique-date",
        "A visit already exists for this pet on the chosen date.",
        (value) => {
          // Format the chosen date for comparison
          const chosenDate = formatToUTCDate(value);
          console.log("chosen date: ", chosenDate);

          // Check if any existing visit matches the chosen date
          return (
            existingVisits.filter((visit) => visit === chosenDate).length === 0
          );
        }
      ),
    comment: Yup.string()
      .required("Comment is required")
      .min(3, "Comment must be at least 3 characters"),
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      try {
        await visitApi.create({ petId, ...values });
        handleClose();
        navigate("/owner/owner/visits");
      } catch (error) {
        console.error("Error adding visit:", error);
      }
    },
  });

  useEffect(() => {
    const fetchExistingVisits = async () => {
      try {
        const res = await visitApi.getAll();
        let visitedDates = res.map((visit) => visit.date);
        console.log("visited dates: ", visitedDates);
        setExistingVisits(visitedDates);
      } catch (err) {
        console.log(err);
      }
    };
    fetchExistingVisits();
  }, []);

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
              label="Comment (Mandatory)"
              value={formik.values.comment}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              fullWidth
              multiline
              rows={4}
              margin="normal"
              variant="outlined"
              error={formik.touched.comment && Boolean(formik.errors.comment)}
              helperText={formik.touched.comment && formik.errors.comment}
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

export default OwnerAddVisitModalById;
