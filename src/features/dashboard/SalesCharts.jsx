import PropTypes from "prop-types";
import Heading from "../../ui/Heading";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  eachDayOfInterval,
  format,
  subMonths,
  startOfMonth,
  endOfMonth,
  isSameDay,
} from "date-fns";

function SalesChart({ bookings }) {
  // Get the current date and the date one month prior
  const startDate = startOfMonth(subMonths(new Date(), 1));
  const endDate = endOfMonth(new Date());

  const allDates = eachDayOfInterval({
    start: startDate,
    end: endDate,
  });

  const data = allDates.map((date) => {
    return {
      label: format(date, "MMM dd"),
      totalSales: bookings
        .filter((booking) => {
          const bookingDate = new Date(booking.created_at);
          return (
            bookingDate >= startDate &&
            bookingDate <= endDate &&
            isSameDay(date, bookingDate)
          );
        })
        .reduce((acc, cur) => acc + cur.totalPrice, 0),
      extrasSales: bookings
        .filter((booking) => {
          const bookingDate = new Date(booking.created_at);
          return (
            bookingDate >= startDate &&
            bookingDate <= endDate &&
            isSameDay(date, bookingDate)
          );
        })
        .reduce((acc, cur) => acc + cur.extrasPrice, 0),
    };
  });

  // Fixed color scheme
  const colors = {
    totalSales: { stroke: "#4f46e5", fill: "#c7d2fe" },
    extrasSales: { stroke: "#16a34a", fill: "#dcfce7" },
    text: "#374151",
    background: "#fff",
  };

  return (
    <div className="w-full bg-white p-4 rounded-lg shadow-md">
      <Heading as="h3" className="text-xl font-semibold mb-4 text-gray-900">
        Sales from {format(startDate, "MMM dd yyyy")} &mdash;{" "}
        {format(endDate, "MMM dd yyyy")}
      </Heading>

      <ResponsiveContainer height={300} width="100%">
        <AreaChart data={data}>
          <XAxis
            dataKey="label"
            tick={{ fill: colors.text }}
            tickLine={{ stroke: colors.text }}
          />
          <YAxis
            unit="$"
            tick={{ fill: colors.text }}
            tickLine={{ stroke: colors.text }}
          />
          <CartesianGrid strokeDasharray="4" stroke={colors.text} />
          <Tooltip contentStyle={{ backgroundColor: colors.background }} />
          <Area
            dataKey="totalSales"
            type="monotone"
            stroke={colors.totalSales.stroke}
            fill={colors.totalSales.fill}
            strokeWidth={2}
            name="Total sales"
            unit="$"
          />
          <Area
            dataKey="extrasSales"
            type="monotone"
            stroke={colors.extrasSales.stroke}
            fill={colors.extrasSales.fill}
            strokeWidth={2}
            name="Extras sales"
            unit="$"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

SalesChart.propTypes = {
  bookings: PropTypes.arrayOf(
    PropTypes.shape({
      created_at: PropTypes.string.isRequired,
      totalPrice: PropTypes.number.isRequired,
      extrasPrice: PropTypes.number.isRequired,
    })
  ).isRequired,
};

export default SalesChart;
