import "./App.css";
import Login from "./pages/Signin";
import Register from "./pages/Signup";
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import Home from "./pages/Home";
import { useEffect, useState } from "react";
import { Backdrop, CircularProgress, ThemeProvider } from "@mui/material";
import Navbar from "./layout/Navbar";
import { theme } from "./lib/mui/theme";
import SendParcel from "./pages/SendParcel";
import Parcels from "./pages/Parcels";
import axios from "axios";
import useUserStore from "./+state/user-store";
import TrackParcel from "./pages/TrackParcel";
import Alert from "./components/Alert";
import RealTimeTracking from "./pages/RealTimeTracking";

function App() {
  const [isUserLoading, setIsUserLoading] = useState(true);
  const { currentUser, setCurrentUser } = useUserStore();

  useEffect(() => {
    console.log("getting");
    console.log(localStorage.getItem("token"));
    axios
      .get("http://localhost:8000/user/me", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        const user = response.data;
        setCurrentUser({
          id: user.id,
          email: user.email,
          firstName: user.person.first_name,
          lastName: user.person.last_name,
        });
        setIsUserLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
        setIsUserLoading(false);
        setCurrentUser(null);
      });
  }, []);
  return (
    <ThemeProvider theme={theme}>
      <Router>
        {isUserLoading ? (
          <Backdrop
            sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open
          >
            <CircularProgress color="inherit" />
          </Backdrop>
        ) : (
          <div className="page-layout">
            <Navbar />
            <Alert />
            <Routes>
              {currentUser ? (
                <>
                  <Route element={<Home />} path="/"></Route>
                  <Route element={<SendParcel />} path="/send-parcel"></Route>
                  <Route
                    element={<RealTimeTracking />}
                    path="/real-time-tracking"
                  ></Route>
                  <Route element={<Parcels />} path="/parcels"></Route>
                  <Route element={<Navigate to="/" />} path="*"></Route>
                </>
              ) : (
                <>
                  <Route element={<Login />} path="/login" />
                  <Route element={<Register />} path="/signup" />
                  <Route element={<Navigate to="/login" />} path="*"></Route>
                </>
              )}
              <Route element={<TrackParcel />} path="/track"></Route>
              <Route element={<TrackParcel />} path="/parcels/:id"></Route>
            </Routes>
          </div>
        )}
      </Router>
    </ThemeProvider>
  );
}

export default App;
