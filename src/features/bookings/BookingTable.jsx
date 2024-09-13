import BookingRow from "./BookingRow";
import { useBookings } from "./useBookings";
import Pagination from "../../ui/Pagination";

function BookingTable() {
  const { bookings = [], isLoading, error, count } = useBookings();

  if (isLoading) return <span>Loading...</span>;

  if (error) return <span>Error loading bookings.</span>;

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg border border-gray-200">
      <header className="grid grid-cols-5 gap-6 font-semibold text-gray-700 mb-4">
        <div className="col-span-1">Cabin</div>
        <div className="text-center">Dates</div>
        <div className="text-center">Status</div>
        <div className="text-center">Amount</div>
        {/* <div className="text-center">Actions</div> */}
      </header>
      <div>
        {bookings.length > 0 ? (
          <div className="space-y-4">
            {bookings.map((booking) => (
              <BookingRow key={booking.id} booking={booking} />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">No bookings available.</p>
        )}
      </div>
      <Pagination count={count} />
    </div>
  );
}

export default BookingTable;
