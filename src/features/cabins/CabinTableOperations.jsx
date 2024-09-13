import TableOperations from "../../ui/TableOperations";
import Filter from "../../ui/Filter";
import SortBy from "../../ui/SortBy";

function CabinTableOperations() {
  return (
    <div className="p-4 bg-white shadow-lg rounded-lg border border-gray-200">
      <TableOperations className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
        <div className="flex-1 min-w-[200px]">
          <Filter />
        </div>
        <div className="flex-1 min-w-[200px]">
          <SortBy
            options={[
              // { value: "name-asc", label: "Sort by name (A-Z)" },
              // { value: "name-desc", label: "Sort by name (Z-A)" },
              { value: "regularPrice-asc", label: "Sort by Price (low first)" },
              {
                value: "regularPrice-desc",
                label: "Sort by Price (high first)",
              },
              {
                value: "maxCapacity-asc",
                label: "Sort by capacity (low first)",
              },
              {
                value: "maxCapacity-desc",
                label: "Sort by capacity (high first)",
              },
            ]}
          />
        </div>
      </TableOperations>
    </div>
  );
}

export default CabinTableOperations;
