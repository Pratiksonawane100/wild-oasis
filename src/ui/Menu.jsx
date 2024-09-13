// import React from "react";
import PropTypes from "prop-types";

function DropdownMenu({ isOpen, onEdit, onDuplicate, onDelete }) {
  if (!isOpen) return null;

  return (
    <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-lg shadow-lg z-10">
      <ul className="py-1">
        <li>
          <button
            onClick={onEdit}
            className="w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100"
          >
            Edit
          </button>
        </li>
        <li>
          <button
            onClick={onDuplicate}
            className="w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100"
          >
            Copy
          </button>
        </li>
        <li>
          <button
            onClick={onDelete}
            className="w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100"
          >
            Delete
          </button>
        </li>
      </ul>
    </div>
  );
}

DropdownMenu.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,

  onEdit: PropTypes.func.isRequired,
  onDuplicate: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default DropdownMenu;
