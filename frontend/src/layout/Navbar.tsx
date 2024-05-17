import React, { useState } from "react";
import {
  AppBar,
  Avatar,
  Box,
  Button,
  IconButton,
  Link,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";
import UserModal from "../components/UserModal"; // Importujemy komponent modalu użytkownika
import { useNavigate } from "react-router-dom";
import useUserStore from "../+state/user-store";

const Navbar = () => {
  const [openModal, setOpenModal] = useState(false);
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null); // Dodajemy stan dla kotwicy menu
  const { currentUser, logout } = useUserStore();

  const handleLogout = () => {
    handleCloseMenu();
    localStorage.removeItem("token"); // Wyloguj użytkownika
    logout();
  };

  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget); // Ustaw kotwicę na aktualny element, który otwiera menu
    setOpen(true); // Otwórz menu
  };

  const handleCloseMenu = () => {
    setAnchorEl(null); // Wyzeruj kotwicę
    setOpen(false); // Zamknij menu
  };

  const handleOpenModal = () => {
    setOpenModal(true);
    handleCloseMenu(); // Zamknij menu po otwarciu modala
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };
  const pathname = window.location.pathname;
  const navigate = useNavigate();
  return (
    <AppBar position="fixed" sx={{ top: 0 }}>
      <Toolbar>
        <Box
          sx={{
            flexGrow: 1,
            textAlign: "left",
            cursor: "pointer",
            transition: "all .3s ease",
            width: 200,
            "&:hover": {
              color: "#517bde",
            },
          }}
          onClick={() => navigate("/")}
        >
          <Typography variant="h6">Akwizycja danych</Typography>
        </Box>
        <Button component={Link} href="/track">
          Track parcel
        </Button>

        {!currentUser && pathname !== "/login" && (
          <Button component={Link} href="/login">
            Login
          </Button>
        )}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            ml: 2,
            xs: "none",
            sm: "flex",
            gap: "20px",
          }}
        >
          {currentUser && (
            <IconButton onClick={handleOpenMenu}>
              <Avatar sx={{ width: 30, height: 30 }} />
            </IconButton>
          )}
        </Box>
      </Toolbar>
      <Menu
        id="demo-positioned-menu"
        anchorEl={anchorEl} // Ustawiamy kotwicę na wartość anchorEl
        open={open}
        onClose={handleCloseMenu}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <MenuItem onClick={handleOpenModal}>Profile</MenuItem>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>{" "}
        {/* Wylogowanie użytkownika */}
      </Menu>
      <UserModal
        open={openModal}
        handleClose={handleCloseModal}
        currentUser={currentUser}
      />
    </AppBar>
  );
};

export default Navbar;
