import { Button } from "@mui/material";
import { updateParcelStatus } from "../api/Api";

export default function UpdateParcelStatus({
  parcel_id,
  onUpdate,
}: {
  parcel_id: number;
  onUpdate: () => void;
}) {
  const update = () => {
    updateParcelStatus({ parcel_id, status: "Sent" });
    onUpdate();
  };
  return (
    <Button variant="contained" onClick={update} sx={{ mt: 2 }}>
      Update
    </Button>
  );
}
