import { Send } from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  CardActionArea,
  List,
  ListItem,
  Paper,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getParcels } from "../api/Api";
import Parcel from "../components/Parcel";

export default function Parcels() {
  const navigate = useNavigate();

  const [parcels, setParcels] = useState<any[]>([]);

  useEffect(() => {
    getParcels()
      .then((response) => {
        setParcels(response);
      })
      .catch((error) => {
        console.error("API call failed:", error);
      });
  }, []);

  return (
    <Paper
      sx={{
        minWidth: 1200,
        padding: "2rem",
        marginTop: "1rem",
        boxSizing: "border-box",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant={!parcels?.length ? "h6" : "h4"} gutterBottom>
          {!parcels?.length
            ? "You haven't sent any parcels yet."
            : `My parcels (${parcels?.length})`}
        </Typography>
        <Button
          onClick={() => navigate("/send-parcel")}
          startIcon={<Send />}
          variant="contained"
          sx={{ height: 35 }}
        >
          Send parcel
        </Button>
      </Box>

      <Box>
        <List sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {parcels?.map((parcel) => (
            <Card elevation={4}>
              <CardActionArea onClick={() => navigate(`/parcels/${parcel.id}`)}>
                <ListItem>
                  <Parcel parcel={parcel} />
                </ListItem>
              </CardActionArea>
            </Card>
          ))}
        </List>
      </Box>
    </Paper>
  );
}
