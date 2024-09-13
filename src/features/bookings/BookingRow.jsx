import { FaEllipsisV } from "react-icons/fa";
import { FaEye } from "react-icons/fa";

import PropTypes from "prop-types";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

// Function to format the date
function formatDate(dateString) {
  const options = { year: "numeric", month: "short", day: "numeric" };
  return new Intl.DateTimeFormat("en-US", options).format(new Date(dateString));
}

function BookingRow({
  booking: { id, startDate, endDate, status, totalPrice },
}) {
  // Determine the text color based on status
  const statusTextColor =
    status === "confirmed" ? "bg-green-200" : "bg-red-200";

  // State to control modal visibility
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Ref to detect outside clicks
  const modalRef = useRef(null);

  // Function to toggle modal
  const toggleModal = () => {
    setIsModalOpen((prev) => !prev);
  };

  // Close modal when clicking outside of it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setIsModalOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  const navigate = useNavigate();
  return (
    <div className="relative">
      <div className="grid grid-cols-5 gap-6 py-4 items-center border-b border-gray-200 last:border-b-0">
        <div className="col-span-1 text-gray-800">{id}</div>
        <div className="text-center text-gray-600">
          {formatDate(startDate)} - {formatDate(endDate)}
        </div>
        <div
          className={`text-center ${statusTextColor}`}
          style={{ borderRadius: "20px" }}
        >
          {status}
        </div>
        <div className="text-center text-gray-800 font-semibold">
          ${totalPrice}
        </div>
        <div className="text-center">
          <button onClick={toggleModal}>
            <FaEllipsisV
              size={20}
              className="text-gray-500 hover:text-gray-700 cursor-pointer"
            />
          </button>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div
          ref={modalRef} // Assign ref to the modal
          className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 shadow-lg rounded-lg z-10"
        >
          {/* <div className="p-4 text-gray-700"> */}
          <button
            onClick={() => navigate(`/bookings/${id}`)}
            className="flex items-center space-x-2 px-4 py-2 rounded "
          >
            <FaEye className="text-lg" />
            <span className="font-medium">See details</span>
          </button>
          {/* </div> */}
        </div>
      )}
    </div>
  );
}

BookingRow.propTypes = {
  booking: PropTypes.shape({
    id: PropTypes.number.isRequired,
    startDate: PropTypes.string.isRequired,
    endDate: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    totalPrice: PropTypes.number.isRequired,
  }).isRequired,
};

export default BookingRow;
