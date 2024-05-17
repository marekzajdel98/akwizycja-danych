import React from "react";
import {
    Avatar,
    Box,
    Button,
    Modal,
    Paper,
    Typography,
} from "@mui/material";

const UserModal = ({ open, handleClose, currentUser }) => {
    if (!currentUser) {
        return null; // Jeśli currentUser nie jest zdefiniowany, zwróć null, aby nie renderować modalu
    }
    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="user-modal"
            aria-describedby="user-modal-description"
            >
            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
                <Paper sx={{ p: 4, maxWidth: 400 }}>
                    <Box sx={{ display: "flex", justifyContent: "center" }}>
                        <Avatar
                            sx={{ width: 100, height: 100 }}
                            src={currentUser.photoURL}
                        />
                    </Box>
                    <Typography variant="h6" sx={{ mt: 2, textAlign: "center" }}>
                        {currentUser.displayName}
                    </Typography>
                    <Typography variant="body1" sx={{ mt: 1, textAlign: "center" }}>
                        Email: {currentUser.email}
                    </Typography>
                    <Typography variant="body2" sx={{ mt: 1, textAlign: "center" }}>
                        UID: {currentUser.uid}
                    </Typography>
                    <Button onClick={handleClose} variant="contained" sx={{ mt: 3, width: "100%" }}>
                        Close
                    </Button>
                </Paper>
            </Box>
        </Modal>
        );
};

export default UserModal;