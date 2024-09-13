import { NavLink } from "react-router-dom";
import { CiHome, CiCalendar, CiSettings, CiUser } from "react-icons/ci";
import { HiOutlineHomeModern } from "react-icons/hi2";
import Logo from "../logo/Logo.png";

function MainNav() {
  return (
    <nav className="text-gray-800" style={{ marginTop: "-40px" }}>
      <div
        className="flex flex-col items-center mb-6"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <img
          src={Logo}
          alt="CabinVista Logo"
          className="w-40 h-auto" // Increase width as needed
        />
        {/* <h1 className="text-2xl font-bold mt-2 text-gray-900">CabinVista</h1> */}
      </div>
      <ul className="space-y-4" style={{ marginTop: "-50px" }}>
        <li>
          <NavLink
            to="/"
            className={({ isActive }) =>
              `flex items-center text-lg font-medium ${
                isActive ? "text-blue-600" : "hover:text-blue-500"
              } transition-colors`
            }
          >
            <CiHome className="mr-2 text-xl" />
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/bookings"
            className={({ isActive }) =>
              `flex items-center text-lg font-medium ${
                isActive ? "text-blue-600" : "hover:text-blue-500"
              } transition-colors`
            }
          >
            <CiCalendar className="mr-2 text-xl" />
            Bookings
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/cabins"
            className={({ isActive }) =>
              `flex items-center text-lg font-medium ${
                isActive ? "text-blue-600" : "hover:text-blue-500"
              } transition-colors`
            }
          >
            <HiOutlineHomeModern className="mr-2 text-xl" />
            Cabins
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/users"
            className={({ isActive }) =>
              `flex items-center text-lg font-medium ${
                isActive ? "text-blue-600" : "hover:text-blue-500"
              } transition-colors`
            }
          >
            <CiUser className="mr-2 text-xl" />
            Users
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/settings"
            className={({ isActive }) =>
              `flex items-center text-lg font-medium ${
                isActive ? "text-blue-600" : "hover:text-blue-500"
              } transition-colors`
            }
          >
            <CiSettings className="mr-2 text-xl" />
            Settings
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default MainNav;
