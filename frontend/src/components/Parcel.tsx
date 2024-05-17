import { ParcelType } from "../api/Api";

interface Properties {
  parcel: ParcelType;
}

export default function Parcel(props: Properties) {
  return (
    <div>
      <p>Parcel ID: {props.parcel.id}</p>
      <p>Sender: {props.parcel.sender.first_name}</p>
      <p>
        Origin:{" "}
        {props.parcel.origin?.street +
          ", " +
          props.parcel.origin?.zip_code +
          " " +
          props.parcel.origin?.city}
      </p>
      <p>Recipient: {props.parcel.recipient.first_name}</p>
      <p>
        Destination:{" "}
        {props.parcel.destination?.street +
          ", " +
          props.parcel.destination?.zip_code +
          " " +
          props.parcel.destination?.city}
      </p>
      <p>Sent Date: {props.parcel.sent_date}</p>
      <p>Delivery Date: {props.parcel.delivery_date}</p>
      <p>Is Delivered: {props.parcel.is_delivered ? "Yes" : "No"}</p>
      Status:
      <div>{JSON.stringify(props.parcel.status_history)}</div>
    </div>
  );
}
