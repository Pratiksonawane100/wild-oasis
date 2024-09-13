import { useSearchParams } from "react-router-dom";
import PropTypes from "prop-types";

function Filter() {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentFilter = searchParams.get("discount") || "all"; // Use searchParams to get the current filter value

  const handleFilterChange = (event) => {
    setSearchParams({ discount: event.target.value });
  };

  return (
    <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4 rounded-md overflow-hidden border border-gray-300 p-2">
      <label htmlFor="filter" className="text-gray-700 font-semibold">
        Filter by discount:
      </label>
      <select
        id="filter"
        value={currentFilter}
        onChange={handleFilterChange}
        className="py-2 px-4 border border-gray-300 rounded-md text-gray-600 hover:border-blue-500"
      >
        <option value="all">All</option>
        <option value="no-discount">No Discount</option>
        <option value="with-discount">With Discount</option>
      </select>
    </div>
  );
}

Filter.propTypes = {
  filterValue: PropTypes.string.isRequired,
};

export default Filter;
