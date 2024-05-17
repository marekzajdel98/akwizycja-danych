import { Inbox, LocationSearching, Send } from "@mui/icons-material";
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
export default function Home() {
  const navigate = useNavigate();

  return (
    <Paper
      sx={{
        padding: "2rem 3rem",
        boxSizing: "border-box",
      }}
    >
      <List sx={{ width: 400 }}>
        <ListItem>
          <ListItemButton onClick={() => navigate("send-parcel")}>
            <ListItemIcon>
              <Send />
            </ListItemIcon>
            <ListItemText primary="Send parcel" />
          </ListItemButton>
        </ListItem>
        <ListItem>
          <ListItemButton onClick={() => navigate("parcels")}>
            <ListItemIcon>
              <Inbox />
            </ListItemIcon>
            <ListItemText primary="Parcels" />
          </ListItemButton>
        </ListItem>
        <ListItem>
          <ListItemButton onClick={() => navigate("track")}>
            <ListItemIcon>
              <LocationSearching />
            </ListItemIcon>
            <ListItemText primary="Track parcel" />
          </ListItemButton>
        </ListItem>
        <ListItem>
          <ListItemButton onClick={() => navigate("real-time-tracking")}>
            <ListItemIcon>
              <LocationSearching />{" "}
            </ListItemIcon>
            <ListItemText primary="Real time tracking" />
          </ListItemButton>
        </ListItem>
      </List>
    </Paper>
  );
}
