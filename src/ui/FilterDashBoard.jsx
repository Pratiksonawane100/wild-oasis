import PropTypes from "prop-types";
import { useSearchParams } from "react-router-dom";

function Filter({ filterField, options }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentFilter = searchParams.get(filterField) || "all";

  const handleFilterChange = (event) => {
    setSearchParams({ [filterField]: event.target.value });
  };

  return (
    <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4 rounded-md overflow-hidden border border-gray-300 p-2">
      <label htmlFor="filter" className="text-gray-700 font-semibold">
        Filter by:
      </label>
      <select
        id="filter"
        value={currentFilter}
        onChange={handleFilterChange}
        className="py-2 px-4 border border-gray-300 rounded-md text-gray-600 hover:border-blue-500"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

Filter.propTypes = {
  filterField: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default Filter;
