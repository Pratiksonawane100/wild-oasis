import PropTypes from "prop-types";
import MainNav from "./MainNav";

function Sidebar({ isOpen }) {
  return (
    <aside
      className={`fixed top-0 left-0 h-full w-64 bg-white text-gray-900 p-4 shadow-lg font-sans transform ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } transition-transform duration-300 ease-in-out z-20 md:relative md:translate-x-0 md:w-64 md:block ${
        isOpen ? "overflow-hidden" : "overflow-auto"
      }`}
      style={{ zIndex: "1000", height: "100vh" }}
    >
      <MainNav />
    </aside>
  );
}

Sidebar.propTypes = {
  isOpen: PropTypes.bool.isRequired,
};

export default Sidebar;
