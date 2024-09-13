import { useCabins } from "../cabins/useCabins";
import TodayActivity from "../check-in-out/TodayActivity";
import DurationChart from "./DurationChart";
import SalesChart from "./SalesCharts";
import Stats from "./Stats";
import { useRecentBookings } from "./useRecentBookings";
import { useRecentStays } from "./useRecentStays";

function DashBoardLayout() {
  const {
    bookings,
    isLoading: isLoading1,
    confirmedBookings,
  } = useRecentBookings();
  const { isLoading: isLoading2, numDays } = useRecentStays();
  const { cabins, isLoading: isLoading3 } = useCabins();

  if (isLoading1 || isLoading2 || isLoading3)
    return <span className="text-gray-500">Loading...</span>;

  return (
    <div className="p-4 space-y-6">
      {/* <div className="w-full bg-gray-100 p-4 rounded-lg shadow-md"> */}
      <Stats
        bookings={bookings || []}
        confirmedStays={confirmedBookings || []} // Updated to use confirmedBookings
        numDays={numDays}
        cabinCount={cabins.length}
      />
      {/* </div> */}
      <div className="w-full bg-white p-4 rounded-lg shadow-md">
        <TodayActivity />
      </div>

      {/* <div className="w-full bg-gray-100 p-4 rounded-lg shadow-md"> */}
      {/* <h4 className="font-bold text-lg mb-2">Chart Stay Durations</h4>{" "} */}
      <DurationChart confirmedStays={bookings || []} />
      {/* </div> */}
      {/* <div className="w-full bg-gray-100 p-4 rounded-lg shadow-md"> */}
      {/* <h4 className="font-bold text-lg mb-2">Chart Sales</h4> */}
      <SalesChart bookings={bookings} numDays={numDays} />
      {/* </div> */}
    </div>
  );
}

export default DashBoardLayout;
