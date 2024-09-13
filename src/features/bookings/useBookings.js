import { useQuery } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";

export function useBookings() {
  const [searchParams] = useSearchParams();
  const filterValue = searchParams.get("status");
  const currentPage = searchParams.get("page")
    ? Number(searchParams.get("page"))
    : 1;

  const filter =
    !filterValue || filterValue === "all"
      ? null
      : { field: "status", value: filterValue };

  const {
    isLoading,
    data: { data: bookings, count } = {}, // Renaming data to bookings
    error,
  } = useQuery({
    queryKey: ["bookings", filter, currentPage], // Add currentPage as a dependency
    queryFn: () => getBookings({ filter, page: currentPage }), // Pass current page to the query function
  });

  return { isLoading, error, bookings, count };
}
