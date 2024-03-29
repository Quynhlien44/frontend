import React, { useState } from "react";
import { Modal, Typography, TextField, Button } from "@mui/material";
import visitApi from "../../services/visitApi";

const AddVisitModalById = ({ isOpen, handleClose, petId }) => {
  const [date, setDate] = useState("");
  const [comment, setComment] = useState("");

  const handleDateChange = (event) => {
    setDate(event.target.value);
  };

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handleAddVisit = async () => {
    try {
      await visitApi.create({ petId, date, comment });
      handleClose();
    } catch (error) {
      console.error("Error adding visit:", error);
      //console.log("Pet id is: ", petId);
    }
  };

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
          <TextField
            label="Date"
            type="date"
            value={date}
            onChange={handleDateChange}
            fullWidth
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            label="Comment (Optional)"
            value={comment}
            onChange={handleCommentChange}
            fullWidth
            multiline
            rows={4}
            margin="normal"
            variant="outlined"
          />
          <div style={{ textAlign: "right", marginTop: 20 }}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleAddVisit}
            >
              Add Visit
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default AddVisitModalById;
