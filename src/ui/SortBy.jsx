import { Select } from "flowbite-react";
import PropTypes from "prop-types";
import { useSearchParams } from "react-router-dom";

function SortBy({ options, value, onChange }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const sortBy = searchParams.get("sortBy") || value || "";

  const handleChange = (e) => {
    const newValue = e.target.value;
    searchParams.set("sortBy", newValue);
    setSearchParams(searchParams);
    if (onChange) {
      onChange(newValue);
    }
  };

  return (
    <div className="w-full sm:w-auto">
      <Select
        value={sortBy}
        onChange={handleChange}
        className="bg-white border border-gray-300 rounded-md shadow-sm text-gray-700 focus:ring-blue-500 focus:border-blue-500"
      >
        {options.map((option) => (
          <option value={option.value} key={option.value}>
            {option.label}
          </option>
        ))}
      </Select>
    </div>
  );
}

SortBy.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
  value: PropTypes.string,
  onChange: PropTypes.func,
};

SortBy.defaultProps = {
  value: "",
  onChange: null,
};

export default SortBy;
