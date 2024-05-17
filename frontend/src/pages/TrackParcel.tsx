import {
  Box,
  Button,
  CircularProgress,
  Paper,
  TextField,
  Tooltip,
} from "@mui/material";
import { useEffect, useState } from "react";
import { trackParcel } from "../api/Api";
import { useAlertsStore } from "../+state/alerts-store";
import Parcel from "../components/Parcel";
import UpdateParcelStatus from "../components/UpdateParcelStatus";
import { useParams } from "react-router-dom";
import { ShareOutlined } from "@mui/icons-material";

export default function TrackParcel() {
  const [parcelId, setParcelId] = useState(null);
  const [parcel, setParcel] = useState(null);

  const { id: pathId } = useParams();
  const [isParcelLoading, setIsParcelLoading] = useState(false);
  const { showAlert } = useAlertsStore();

  const track = (pathId?: string) => {
    const id = parcelId || Number(pathId);
    if (!id) return;
    setIsParcelLoading(true);
    trackParcel(id)
      .then((res) => {
        console.log(res);
        setParcel(res.data);
      })
      .catch((e: any) => {
        showAlert({
          message: "No parcel found with this tracking number",
          level: "error",
        });
      })
      .finally(() => {
        setIsParcelLoading(false);
      });
  };

  useEffect(() => {
    if (pathId) {
      setParcelId(pathId);
      track(pathId);
    }
  }, []);

  const onParcelUpdate = () => {
    track();
  };

  const shareParcel = () => {
    console.log(window.location.href);
  };

  return (
    <>
      <Paper
        sx={{
          minWidth: 1200,
          padding: "2rem",
          marginTop: "1rem",
          boxSizing: "border-box",
        }}
      >
        <Box sx={{ display: "flex", gap: "1rem" }}>
          <TextField
            value={parcelId}
            onChange={(e) => setParcelId(Number(e.target.value))}
            fullWidth
            type="number"
            placeholder="Please enter the Tracking number"
          />{" "}
          <Tooltip
            title={
              parcelId !== null && parcel?.id === parcelId
                ? "This parcel is already loaded"
                : ""
            }
          >
            <div style={{ display: "flex" }}>
              <Button
                variant="contained"
                disabled={
                  String(parcelId).length === 0 ||
                  isParcelLoading ||
                  (parcelId !== null && parcel?.id === parcelId)
                }
                onClick={track}
              >
                Track
              </Button>
            </div>
          </Tooltip>
        </Box>
      </Paper>

      {isParcelLoading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "5rem",
          }}
        >
          <CircularProgress />
        </div>
      ) : (
        parcel?.id && (
          <Paper sx={{ mt: 4, p: 3, display: "flex", flexDirection: "column" }}>
            <Button
              sx={{ ml: "auto" }}
              startIcon={<ShareOutlined />}
              onClick={shareParcel}
            >
              Share
            </Button>

            <Parcel parcel={parcel} />
          </Paper>
        )
      )}

      {parcel?.id && (
        <UpdateParcelStatus parcel_id={parcel?.id} onUpdate={onParcelUpdate} />
      )}
    </>
  );
}
