import { useQuery } from "@tanstack/react-query";
import { getCabins } from "../../services/apiCabins";
import CabinRow from "./CabinRow";
import { useSearchParams } from "react-router-dom";

function CabinTable() {
  const {
    isLoading,
    error,
    data: cabins,
  } = useQuery({
    queryKey: ["cabins"],
    queryFn: getCabins,
  });

  const [searchParams] = useSearchParams();
  const filterValue = searchParams.get("discount") || "all";

  // Filter the cabins based on the searchParams
  let filteredCabins = [];
  if (cabins) {
    if (filterValue === "all") filteredCabins = cabins;
    if (filterValue === "no-discount")
      filteredCabins = cabins.filter((cabin) => cabin.discount === 0);
    if (filterValue === "with-discount")
      filteredCabins = cabins.filter((cabin) => cabin.discount > 0);
  }

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading cabins: {error.message}</p>;

  const sortBy = searchParams.get("sortBy") || "startDate-asc";
  const [field, direction] = sortBy.split("-");
  const modifier = direction === "asc" ? 1 : -1;
  const sortedCabins = filteredCabins.sort((a, b) => {
    // Assuming `field` is a valid property name in `cabin`
    const aValue = a[field];
    const bValue = b[field];

    // Compare values and apply the modifier
    return (aValue - bValue) * modifier;
  });
  return (
    <div className="p-4 bg-white rounded-lg shadow">
      <header className="grid grid-cols-6 gap-4 font-semibold text-gray-700 mb-2">
        <div className="col-span-2">Cabin</div>
        <div className="text-center">Capacity</div>
        <div className="text-center">Price</div>
        <div className="text-center">Discount</div>
        <div className="text-center">Actions</div>
      </header>
      <div>
        {sortedCabins.map((cabin) => (
          <CabinRow cabin={cabin} key={cabin.id} />
        ))}
      </div>
    </div>
  );
}

export default CabinTable;
