import { Box, Paper, TextField, Typography, Button } from "@mui/material";
import * as React from "react";
import { Send } from "@mui/icons-material";
import { sendParcel } from "../api/Api";
import { useAlertsStore } from "../+state/alerts-store";
import { useNavigate } from "react-router-dom";
import useUserStore from "../+state/user-store";

export default function SendParcel() {
  const { showAlert } = useAlertsStore();
  const currentUser = useUserStore((state) => state.currentUser);
  const navigate = useNavigate();
  const handleSend = async (event) => {
    event.preventDefault(); // Prevent default form submission behavior
    const formData = new FormData(event.currentTarget); // Get form data
    const formProps = Object.fromEntries(formData); // Convert to dictionary

    // Structuring the data according to sender and recipient details
    const data: any = {
      sender: {
        first_name: formProps.sender_first_name,
        last_name: formProps.sender_last_name,
        email: formProps.sender_email,
        phone_number: formProps.sender_phone_number,
        address: {
          zip_code: formProps.sender_zip_code,
          city: formProps.sender_city,
          street: formProps.sender_street,
        },
      },
      recipient: {
        first_name: formProps.recipient_first_name,
        last_name: formProps.recipient_last_name,
        email: formProps.recipient_email,
        phone_number: formProps.recipient_phone_number,
        address: {
          zip_code: formProps.recipient_zip_code,
          city: formProps.recipient_city,
          street: formProps.recipient_street,
        },
      },
    };

    // Check if recipient address is valid - if its different than the sender's address
    const areAddressesTheSame = Object.keys(data.sender.address).every(
      (key) => data.sender.address[key] === data.recipient.address[key]
    );

    if (areAddressesTheSame) {
      showAlert({
        message: "Sender and recipient addresses can't be the same",
        level: "error",
      });
      return;
    }

    // Call your API endpoint with axios
    try {
      console.log("sending");
      const response = await sendParcel(data);
      console.log("API Response:", response.data);
      navigate("/parcels");
    } catch (error) {
      console.error("API call failed:", error);
      showAlert({ message: "Couldn't process the data", level: "error" });
    }
  };

  return (
    <Paper
      sx={{
        minWidth: 1200,
        padding: "2rem",
        marginTop: "1rem",
        boxSizing: "border-box",
      }}
    >
      <Typography variant="h4" gutterBottom>
        Send parcel
      </Typography>
      <Box sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <form style={{ width: "100%" }} onSubmit={handleSend}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
              mb: "2rem",
            }}
          >
            <Typography variant="h5">Sender details</Typography>
            <div style={{ display: "flex", gap: "1rem" }}>
              <TextField
                defaultValue={currentUser?.firstName}
                required
                name="sender_first_name"
                type="text"
                placeholder="First name"
                size="small"
              />
              <TextField
                defaultValue={currentUser?.lastName}
                required
                name="sender_last_name"
                type="text"
                placeholder="Last name"
                size="small"
              />
              <TextField
                defaultValue={currentUser?.email}
                required
                name="sender_email"
                type="email"
                placeholder="Email"
                size="small"
              />
              <TextField
                required
                name="sender_phone_number"
                type="phone"
                placeholder="Phone number"
                size="small"
              />
            </div>
            <div style={{ display: "flex", gap: "1rem" }}>
              <TextField
                required
                name="sender_zip_code"
                type="text"
                placeholder="Zip code"
                size="small"
              />
              <TextField
                required
                name="sender_city"
                type="text"
                placeholder="City"
                size="small"
              />
              <TextField
                required
                name="sender_street"
                type="text"
                placeholder="Street"
                size="small"
              />
            </div>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
              mb: "2rem",
            }}
          >
            <Typography variant="h5">Recipient details</Typography>
            <div style={{ display: "flex", gap: "1rem" }}>
              <TextField
                required
                name="recipient_first_name"
                type="text"
                placeholder="First name"
                size="small"
              />
              <TextField
                required
                name="recipient_last_name"
                type="text"
                placeholder="Last name"
                size="small"
              />
              <TextField
                required
                name="recipient_email"
                type="email"
                placeholder="Email"
                size="small"
              />
              <TextField
                required
                name="recipient_phone_number"
                type="phone"
                placeholder="Phone number"
                size="small"
              />
            </div>
            <div style={{ display: "flex", gap: "1rem" }}>
              <TextField
                required
                name="recipient_zip_code"
                type="text"
                placeholder="Zip code"
                size="small"
              />
              <TextField
                required
                name="recipient_city"
                type="text"
                placeholder="City"
                size="small"
              />
              <TextField
                required
                name="recipient_street"
                type="text"
                placeholder="Street"
                size="small"
              />
            </div>
          </Box>
          <div style={{ display: "flex", width: "100%" }}>
            <Button
              type="submit"
              variant="contained"
              sx={{ ml: "auto" }}
              startIcon={<Send />}
            >
              Send Parcel
            </Button>
          </div>
        </form>
      </Box>
    </Paper>
  );
}
