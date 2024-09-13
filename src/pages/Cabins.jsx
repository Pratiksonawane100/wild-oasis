import CabinTable from "../features/cabins/CabinTable";
import AddCabin from "../features/cabins/AddCabin";
import CabinTableOperations from "../features/cabins/CabinTableOperations";

function Cabins() {
  return (
    <div className="p-4 md:p-6 bg-gray-100">
      <div className="flex items-center space-x-2 mb-4">
        {/* <Heading size={24} className="text-gray-700" /> */}
        <h2 className="text-xl md:text-2xl font-bold text-gray-700">
          All Cabins
        </h2>
      </div>
      <div className="flex flex-col md:flex-row md:space-x-4 mb-6">
        <div className="mb-4 md:mb-0">
          <CabinTableOperations />
        </div>
      </div>
      <div className="space-y-4">
        <CabinTable />
        <AddCabin />
      </div>
    </div>
  );
}

export default Cabins;
