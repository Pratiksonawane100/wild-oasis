import { FaRegUserCircle } from "react-icons/fa";
import Logout from "../features/authentication/Logout";
import { useNavigate } from "react-router-dom";

function HeaderMenu() {
  const navigate = useNavigate();

  return (
    <div className="flex items-center space-x-6">
      {/* Account Button */}
      <li className="list-none">
        <button
          onClick={() => navigate("/account")}
          className="text-2xl hover:text-black-500 transition-colors duration-300"
        >
          <FaRegUserCircle />
        </button>
      </li>

      {/* Logout Button */}
      <li className="list-none">
        <Logout />
      </li>
    </div>
  );
}

export default HeaderMenu;
