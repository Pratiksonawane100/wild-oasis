import PropTypes from "prop-types";
import Tag from "../../ui/Tag";
import { Flag } from "../../ui/Flag";

function TodayItem({ activity }) {
  const { status, guests, numNights } = activity;

  return (
    <li className="grid grid-cols-2 sm:grid-cols-4 items-center gap-4 py-4 border-b border-gray-300">
      <div
        className={`flex items-center justify-center col-span-2 sm:col-span-1 p-2 rounded-lg ${
          status === "unconfirmed"
            ? "bg-red-100 text-red-800"
            : "bg-green-100 text-green-800"
        }`}
      >
        {status === "unconfirmed" && <Tag type="green">Arriving</Tag>}
        {status === "confirmed" && <Tag type="blue">Departing</Tag>}
      </div>

      <div className="flex items-center justify-center col-span-2 sm:col-span-1">
        <Flag
          src={guests?.countryFlag}
          alt={`Flag of ${guests?.country}`}
          className="w-8 h-8 rounded-full"
        />
      </div>

      <div className="col-span-2 sm:col-span-1 font-medium text-gray-900 text-center">
        {guests?.fullName || "Unknown Guest"}
      </div>

      <div className="col-span-2 sm:col-span-1 text-gray-600 text-center">
        {numNights || "N/A"} nights
      </div>

      {/* Uncomment and adjust if needed */}
      {/* {status === "unconfirmed" && (
        <button
          className="col-span-2 sm:col-span-1 text-sm bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
          // as={Link}
          to={`/checkin/${id}`}
        >
          Check in
        </button>
      )} */}
      {/* {status === "confirmed" && (
        <button
          className="col-span-2 sm:col-span-1 text-sm bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
          onClick={() => {
            console.log(`Checking out booking ID: ${id}`);
          }}
        >
          Checkout
        </button>
      )} */}
    </li>
  );
}

TodayItem.propTypes = {
  activity: PropTypes.shape({
    id: PropTypes.string.isRequired,
    status: PropTypes.oneOf(["unconfirmed", "confirmed"]).isRequired,
    guests: PropTypes.shape({
      countryFlag: PropTypes.string,
      country: PropTypes.string,
      fullName: PropTypes.string,
    }).isRequired,
    numNights: PropTypes.number,
  }).isRequired,
};

export default TodayItem;
