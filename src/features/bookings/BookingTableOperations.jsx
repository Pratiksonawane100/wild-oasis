// import SortBy from "../../ui/SortBy";
import FilterBookings from "../../ui/FilterBooking"; // Import FilterBookings
import TableOperations from "../../ui/TableOperations";

function BookingTableOperations() {
  return (
    <TableOperations>
      <FilterBookings /> {/* Add the new FilterBookings component */}
      {/* <SortBy
        options={[
          { value: "startDate-desc", label: "Sort by date (recent first)" },
          { value: "startDate-asc", label: "Sort by date (earlier first)" },
          {
            value: "totalPrice-desc",
            label: "Sort by amount (high first)",
          },
          { value: "totalPrice-asc", label: "Sort by amount (low first)" },
        ]}
      /> */}
    </TableOperations>
  );
}

export default BookingTableOperations;
