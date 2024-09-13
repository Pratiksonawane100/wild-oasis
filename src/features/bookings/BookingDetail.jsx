import styled from "styled-components";
import BookingDataBox from "./BookingDataBox";
import { useBooking } from "./useBooking";
// import { useNavigate } from "react-router-dom";

const HeadingGroup = styled.div`
  @apply flex gap-6 items-center; /* Using Tailwind with styled-components */
`;

function BookingDetail() {
  const { booking, isLoading } = useBooking();
  // const navigate = useNavigate();

  if (isLoading) return <span>Loading...</span>;

  const { status, id } = booking;

  return (
    <div className="container mx-auto p-6 bg-white rounded-lg shadow-lg">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <HeadingGroup>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
            Booking #{id}
          </h1>
          <span
            className={`text-base md:text-lg font-semibold py-1 px-3 rounded-full ${
              status === "unconfirmed"
                ? "bg-yellow-200 text-yellow-800"
                : "bg-green-200 text-green-800"
            }`}
          >
            {status.replace("-", " ")}
          </span>
        </HeadingGroup>
      </div>

      {/* Action Buttons */}
      <div className="mt-6 flex flex-wrap gap-4">
        {/* {status === "unconfirmed" && (
          <button
            onClick={() => navigate(`/checkin/${id}`)}
            className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition-colors"
          >
            Check in
          </button>
        )} */}

        {/* Uncomment below for Checkout and Delete buttons */}
        {/* {status === "checked-in" && (
          <button
            onClick={() => checkout(bookingId)}
            disabled={isCheckingOut}
            className="px-6 py-2 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition-colors"
          >
            Check out
          </button>
        )}
        <button
          onClick={handleDelete}
          disabled={isDeleting}
          className="px-6 py-2 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition-colors"
        >
          Delete booking
        </button> */}
      </div>

      {/* Booking Data Box */}
      <div className="mt-8">
        <BookingDataBox booking={booking} />
      </div>
    </div>
  );
}

export default BookingDetail;
