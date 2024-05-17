import { NavLink, useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import axios from "axios";

const Register = () => {
  const navigate = useNavigate();

  const handleRegister = async (event) => {
    event.preventDefault(); // Prevent default form submission behavior
    const formData = new FormData(event.currentTarget); // Get form data
    const formProps = Object.fromEntries(formData); // Convert to dictionary

    // Structuring the data according to sender and recipient details
    const data = {
      first_name: formProps.first_name,
      last_name: formProps.last_name,
      email: formProps.email,
      password: formProps.password,
    };

    try {
      const response = await axios.post(
        "http://localhost:8000/auth/signup",
        data
      );
      console.log("User signed up:", response.data);
      navigate("/");
      // Optionally save the token in local storage or context
    } catch (error: any) {
      console.error("There was an error!", error.response);
    }
  };

  return (
    <main>
      <Card
        sx={{
          minWidth: 400,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: "20px",
        }}
      >
        <CardContent>
          <Typography variant="h5" component="div" gutterBottom>
            Sign up
          </Typography>
          <form style={{ width: "100%" }} onSubmit={handleRegister}>
            <div style={{ display: "flex", gap: "1rem" }}>
              <TextField
                required
                id="first_name"
                label="First name"
                name="first_name"
                placeholder="First name"
                style={{ marginBottom: "16px", width: "100%" }}
              />
              <TextField
                required
                id="last_name"
                label="Last name"
                name="last_name"
                placeholder="Last name"
                style={{ marginBottom: "16px", width: "100%" }}
              />
            </div>
            <TextField
              required
              id="email_address"
              label="Email address"
              name="email"
              type="email"
              placeholder="Email address"
              style={{ marginBottom: "16px", width: "100%" }}
            />
            <TextField
              required
              id="password"
              label="Password"
              name="password"
              type="password"
              placeholder="Password"
              style={{ marginBottom: "16px", width: "100%" }}
            />

            <CardActions style={{ justifyContent: "center" }}>
              <Button variant="contained" type="submit" size="medium">
                Register
              </Button>
            </CardActions>
            <CardActions style={{ justifyContent: "center" }}>
              <Typography
                variant="body2"
                component="p"
                className="text-sm text-center"
              >
                You have accout? <NavLink to="/">Log in</NavLink>
              </Typography>
            </CardActions>
          </form>
        </CardContent>
      </Card>
    </main>
  );
};

export default Register;
