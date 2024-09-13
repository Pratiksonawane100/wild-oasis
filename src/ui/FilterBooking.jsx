import { useSearchParams } from "react-router-dom";

function FilterBookings() {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentFilter = searchParams.get("status") || "all"; // Get the current filter value

  const handleFilterChange = (event) => {
    setSearchParams({ status: event.target.value }); // Update the URL params when filter changes
  };

  return (
    <div
      className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4 rounded-md overflow-hidden border border-gray-300 p-2"
      style={{ marginBottom: "2%" }}
    >
      <label htmlFor="filter" className="text-gray-700 font-semibold">
        Filter by status:
      </label>
      <select
        id="filter"
        value={currentFilter}
        onChange={handleFilterChange}
        className="py-2 px-4 border border-gray-300 rounded-md text-gray-600 hover:border-blue-500"
      >
        <option value="all">All</option>
        <option value="confirmed">Confirmed</option>
        <option value="unconfirmed">Unconfirmed</option>
      </select>
    </div>
  );
}

export default FilterBookings;
