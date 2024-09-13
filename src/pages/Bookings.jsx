import BookingTable from "../features/bookings/BookingTable";
import BookingTableOperations from "../features/bookings/BookingTableOperations";
import { useBookings } from "../features/bookings/useBookings";

function Bookings() {
  const { isLoading, error, bookings } = useBookings(); // Fetch filtered bookings

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading bookings</p>;

  return (
    <div>
      <BookingTableOperations />
      <BookingTable bookings={bookings} /> {/* Pass filtered bookings */}
    </div>
  );
}

export default Bookings;
