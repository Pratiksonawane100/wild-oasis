import {
  HiOutlineBanknotes,
  HiOutlineBriefcase,
  HiOutlineCalendarDays,
  HiOutlineChartBar,
} from "react-icons/hi2";
import PropTypes from "prop-types";
import Stat from "./Stat";
import { formatCurrency } from "../../utils/helpers";

function Stats({ bookings, confirmedStays }) {
  const numBookings = bookings.length;
  const sales = bookings.reduce((acc, cur) => acc + cur.totalPrice, 0);
  const checkins = confirmedStays.length;

  // Calculate occupancy as confirmed stays divided by total bookings
  const occupation = numBookings ? (checkins / numBookings) * 100 : 0; // Avoid division by zero

  return (
    <div className="flex flex-wrap justify-between gap-4 p-4 bg-gray-100 rounded-lg shadow-md">
      <Stat
        title="Bookings"
        color="blue"
        icon={<HiOutlineBriefcase className="w-8 h-8" />}
        value={numBookings}
      />
      <Stat
        title="Sales"
        color="green"
        icon={<HiOutlineBanknotes className="w-8 h-8" />}
        value={formatCurrency(sales)}
      />
      <Stat
        title="Check-ins"
        color="indigo"
        icon={<HiOutlineCalendarDays className="w-8 h-8" />}
        value={checkins}
      />
      <Stat
        title="Occupancy Rate"
        color="yellow"
        icon={<HiOutlineChartBar className="w-8 h-8" />}
        value={Math.round(occupation) + "%"}
      />
    </div>
  );
}

Stats.propTypes = {
  bookings: PropTypes.arrayOf(
    PropTypes.shape({
      totalPrice: PropTypes.number.isRequired,
    })
  ).isRequired,
  confirmedStays: PropTypes.arrayOf(
    PropTypes.shape({
      numNights: PropTypes.number.isRequired,
    })
  ).isRequired,
};

export default Stats;
