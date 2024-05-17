import * as React from "react";
import MUISnackbar from "@mui/material/Snackbar";
import { useEffect } from "react";
import { useAlertsStore } from "../+state/alerts-store";
import MUIAlert from "@mui/material/Alert";

const DEFAULT_ALERT_TIMEOUT = 5000;

export default function Alert() {
  const { hideAlert } = useAlertsStore();
  const [open, setOpen] = React.useState(false);
  const { alertVisible, alertMessage, alertLevel } = useAlertsStore().alerts;

  useEffect(() => {
    setOpen(alertVisible);
    if (alertVisible) setTimeout(() => hideAlert(), DEFAULT_ALERT_TIMEOUT);
  }, [alertVisible]);

  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") return;
    setOpen(false);
  };

  return (
    <MUISnackbar
      open={open}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
    >
      <MUIAlert
        onClose={handleClose}
        severity={alertLevel}
        sx={{ width: "100%" }}
      >
        {alertMessage}
      </MUIAlert>
    </MUISnackbar>
  );
}
