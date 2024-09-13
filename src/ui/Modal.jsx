import PropTypes from "prop-types";

function Modal({ children, isOpen, onClose }) {
  if (!isOpen) return null; // Don't render the modal if it's not open

  return (
    <div className="modal-overlay fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="modal-content bg-white p-8 rounded-lg shadow-xl relative max-w-xl w-full mx-4 my-4">
        {/* Close Button */}
        <button
          className="absolute top-2 right-2 bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-red-500 transition duration-200"
          onClick={onClose}
        >
          &times;
        </button>

        {/* Modal Content */}
        <div className="modal-body text-center">{children}</div>
      </div>
    </div>
  );
}

// PropTypes validation
Modal.propTypes = {
  children: PropTypes.node.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Modal;
