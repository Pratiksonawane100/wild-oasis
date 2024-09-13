import PropTypes from "prop-types";
import {
  HiOutlineChatBubbleBottomCenterText,
  HiOutlineCheckCircle,
  HiOutlineCurrencyDollar,
  HiOutlineHomeModern,
} from "react-icons/hi2";
import { format, isToday } from "date-fns";
import { useNavigate } from "react-router-dom";
import DataItem from "../../ui/DataItem.jsx";
import { Flag } from "../../ui/Flag";
import { formatDistanceFromNow, formatCurrency } from "../../utils/helpers";
import { useCheckin } from "../check-in-out/useCheckin.js"; // Import useCheckin
import { useDeleteBooking } from "./useDeleteBooking.js"; // Import useDeleteBooking

function BookingDataBox({ booking }) {
  const navigate = useNavigate(); // Initialize the useNavigate hook
  const { checkin, isCheckingIn } = useCheckin(); // Initialize useCheckin hook
  const { isDeleting, deleteBooking } = useDeleteBooking(); // Initialize useDeleteBooking hook

  const {
    created_at,
    startDate,
    endDate,
    numNights,
    numGuests,
    cabinPrice,
    extrasPrice,
    totalPrice,
    hasBreakfast,
    observations,
    isPaid,
    guests: { fullName: guestName, email, country, countryFlag, nationalID },
    cabins: { name: cabinName },
    status, // Added status
    id: bookingId, // Added bookingId
  } = booking;

  const handleCheckin = () => {
    checkin({ id: bookingId, breakfast: { hasBreakfast } });
  };

  const handleDelete = () => {
    deleteBooking(bookingId);
  };

  return (
    <section className="bg-gray-50 border border-gray-200 rounded-lg overflow-hidden">
      <header className="bg-blue-500 text-blue-100 p-8 flex items-center justify-between">
        <div className="flex items-center gap-6 font-semibold text-lg">
          <HiOutlineHomeModern className="h-8 w-8" />
          <p>
            {numNights} nights in Cabin{" "}
            <span className="font-semibold">{cabinName}</span>
          </p>
        </div>

        <p className="text-xl">
          {format(new Date(startDate), "EEE, MMM dd yyyy")} (
          {isToday(new Date(startDate))
            ? "Today"
            : formatDistanceFromNow(startDate)}
          ) &mdash; {format(new Date(endDate), "EEE, MMM dd yyyy")}
        </p>
      </header>

      <section className="p-8 pb-4">
        <div className="flex items-center gap-4 mb-6 text-gray-500">
          {countryFlag && <Flag src={countryFlag} alt={`Flag of ${country}`} />}
          <p className="font-semibold text-gray-700">
            {guestName} {numGuests > 1 ? `+ ${numGuests - 1} guests` : ""}
          </p>
          <span>&bull;</span>
          <p>{email}</p>
          <span>&bull;</span>
          <p>National ID {nationalID}</p>
        </div>

        {observations && (
          <DataItem
            icon={<HiOutlineChatBubbleBottomCenterText />}
            label="Observations"
          >
            {observations}
          </DataItem>
        )}

        <DataItem icon={<HiOutlineCheckCircle />} label="Breakfast included?">
          {hasBreakfast ? "Yes" : "No"}
        </DataItem>

        <div
          className={`flex items-center justify-between p-6 rounded-lg mt-6 ${
            isPaid
              ? "bg-green-100 text-green-700"
              : "bg-yellow-100 text-yellow-700"
          }`}
        >
          <DataItem icon={<HiOutlineCurrencyDollar />} label="Total price">
            {formatCurrency(totalPrice)}
            {hasBreakfast &&
              ` (${formatCurrency(cabinPrice)} cabin + ${formatCurrency(
                extrasPrice
              )} breakfast)`}
          </DataItem>

          <p className="uppercase text-sm font-semibold">
            {isPaid ? "Paid" : "Will pay at property"}
          </p>
        </div>
      </section>

      <footer className="p-6 text-sm text-gray-500 text-right">
        <p>Booked {format(new Date(created_at), "EEE, MMM dd yyyy, p")}</p>
      </footer>

      {/* Buttons */}
      <div className="p-4 flex space-x-4">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          onClick={() => navigate(-1)}
        >
          Go Back
        </button>

        {status === "unconfirmed" && (
          <button
            className={`bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 ${
              isCheckingIn ? "opacity-50 cursor-not-allowed" : ""
            }`}
            onClick={handleCheckin}
            disabled={isCheckingIn}
          >
            {isCheckingIn ? "Checking In..." : "Check In"}
          </button>
        )}

        <button
          className={`bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 ${
            isDeleting ? "opacity-50 cursor-not-allowed" : ""
          }`}
          onClick={handleDelete}
          disabled={isDeleting}
        >
          {isDeleting ? "Deleting..." : "Delete Booking"}
        </button>
      </div>
    </section>
  );
}

// Define prop types for the component
BookingDataBox.propTypes = {
  booking: PropTypes.shape({
    id: PropTypes.number.isRequired, // Added id
    created_at: PropTypes.string.isRequired,
    startDate: PropTypes.string.isRequired,
    endDate: PropTypes.string.isRequired,
    numNights: PropTypes.number.isRequired,
    numGuests: PropTypes.number.isRequired,
    cabinPrice: PropTypes.number.isRequired,
    extrasPrice: PropTypes.number.isRequired,
    totalPrice: PropTypes.number.isRequired,
    hasBreakfast: PropTypes.bool.isRequired,
    observations: PropTypes.string,
    isPaid: PropTypes.bool.isRequired,
    guests: PropTypes.shape({
      fullName: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      country: PropTypes.string.isRequired,
      countryFlag: PropTypes.string,
      nationalID: PropTypes.string.isRequired,
    }).isRequired,
    cabins: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }).isRequired,
    status: PropTypes.string.isRequired, // Added status
  }).isRequired,
};

export default BookingDataBox;
