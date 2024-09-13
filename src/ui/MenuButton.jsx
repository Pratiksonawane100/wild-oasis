import PropTypes from "prop-types";
import { useState } from "react";
import { HiMenu } from "react-icons/hi";

function MenuButton({ onToggle }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    const newIsOpen = !isOpen;
    setIsOpen(newIsOpen);
    onToggle(newIsOpen);
  };

  return (
    <>
      <button
        onClick={handleToggle}
        className="fixed top-4 left-4 p-2 bg-blue-500 text-white rounded-md shadow-md z-30 md:hidden"
        style={{ zIndex: "1000" }}
      >
        <HiMenu className="text-2xl" />
      </button>
      {isOpen && (
        <div
          className="fixed top-0 left-0 h-full w-full bg-black opacity-50 z-20"
          onClick={handleToggle}
          style={{ zIndex: "100" }}
        ></div>
      )}
    </>
  );
}

MenuButton.propTypes = {
  onToggle: PropTypes.func.isRequired,
};

export default MenuButton;
