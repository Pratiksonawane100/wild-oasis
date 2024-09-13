import { useParams } from "react-router-dom";

function CheckIn() {
  const { id } = useParams();

  return (
    <div>
      <h1>Check In Page</h1>
      <p>Booking ID: {id}</p>
      {/* Your check-in logic here */}
    </div>
  );
}

export default CheckIn;
