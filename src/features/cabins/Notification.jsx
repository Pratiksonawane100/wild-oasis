import { useEffect } from "react";
import PropTypes from "prop-types";

function Notification({ message, type, onClose }) {
  useEffect(() => {
    if (message) {
      // Add a small delay before starting the timer
      const timer = setTimeout(onClose, 3500); // Adjusted to 3.5 seconds
      return () => clearTimeout(timer); // Cleanup the timer if component unmounts
    }
  }, [message, onClose]);

  return (
    <div
      className={`fixed top-4 right-4 p-4 rounded-lg shadow-lg ${
        type === "success" ? "bg-green-500" : "bg-red-500"
      } text-white transform transition-transform duration-500 ease-in-out ${
        message ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
      }`}
    >
      <span>{message}</span>
      <button
        className="ml-4 text-lg font-bold"
        onClick={onClose}
        aria-label="Close notification"
      >
        ✖
      </button>
    </div>
  );
}

Notification.propTypes = {
  message: PropTypes.string.isRequired,
  type: PropTypes.oneOf(["success", "error"]).isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Notification;
