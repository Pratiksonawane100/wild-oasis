import { useLogout } from "./useLogout";
import { LuLogOut } from "react-icons/lu";

function Logout() {
  const { logout, isLoading } = useLogout();
  return (
    <div>
      <button
        disabled={isLoading}
        onClick={logout}
        className="text-2xl hover:text-black-500 transition-colors duration-300"
      >
        <LuLogOut />
      </button>
    </div>
  );
}
export default Logout;
