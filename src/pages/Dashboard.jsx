import DashboardFilter from "../features/dashboard/DashBoardFilter";
import DashBoardLayout from "../features/dashboard/DashBoardLayout";

function Dashboard() {
  return (
    <div className="p-4">
      <h3 className="text-2xl font-bold mb-4">Dashboard</h3>
      <div className="mb-6">
        <DashboardFilter />
      </div>
      <DashBoardLayout />
    </div>
  );
}

export default Dashboard;
