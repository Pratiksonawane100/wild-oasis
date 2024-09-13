import { FaEllipsisV } from "react-icons/fa";
import PropTypes from "prop-types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCabin, createEditCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";
import { useState, useEffect, useRef } from "react";
import CreateCabinForm from "./CreateCabinForm";
import Modal from "../../ui/Modal";
import DropdownMenu from "../../ui/Menu";
import { supabaseUrl } from "../../services/supabase";

function CabinRow({ cabin }) {
  const [showMenu, setShowMenu] = useState(false);
  const [showModal, setShowModal] = useState(false); // State for modal visibility
  const menuRef = useRef(null);
  // const modalRef = useRef(null);
  const { id, name, maxCapacity, regularPrice, discount, image } = cabin;

  const queryClient = useQueryClient();
  const { mutate: deleteCabinMutation } = useMutation({
    mutationFn: deleteCabin,
    onSuccess: () => {
      toast.success(`Cabin ${name} deleted successfully`);
      queryClient.invalidateQueries(["cabins"]);
      setShowMenu(false); // Close menu after successful deletion
    },
    onError: (error) => {
      toast.error(`Error deleting cabin: ${error.message}`);
    },
  });

  const handleDuplicate = async () => {
    const hasImagePath = image.startsWith(supabaseUrl);

    try {
      await createEditCabin({
        name: `Copy of ${name}`,
        maxCapacity,
        regularPrice,
        discount,
        image: hasImagePath ? image : `new image URL logic here`,
      });
      toast.success("Cabin copied successfully");
    } catch (error) {
      toast.error(`Error copying cabin: ${error.message}`);
    }
  };

  const handleEditClick = () => {
    setShowModal(true); // Open modal on edit click
    setShowMenu(false); // Close menu on edit click
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleMenuClick = (e) => {
    e.stopPropagation();
    setShowMenu((prev) => !prev);
  };

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuRef]);

  return (
    <>
      <div className="relative grid grid-cols-6 gap-4 py-2 text-gray-600 border-t border-gray-200 items-center">
        <div className="flex items-center space-x-2 col-span-2">
          <img
            src={image}
            alt={`Image of cabin: ${name}`}
            className="w-12 h-12 rounded-md"
          />
          <span className="font-semibold">{name}</span>
        </div>
        <div className="text-center">{maxCapacity}</div>
        <div className="text-center">${regularPrice}</div>
        <div className="text-center">
          {discount ? (
            <span className="text-red-500">{discount}% off</span>
          ) : (
            <span className="text-green-500">No discount</span>
          )}
        </div>
        <div
          className="relative flex items-center justify-center"
          ref={menuRef}
        >
          <button
            onClick={handleMenuClick}
            className="text-gray-600 hover:text-gray-900 p-2 rounded-md"
            aria-label="More actions"
          >
            <FaEllipsisV size={20} />
          </button>
          <DropdownMenu
            isOpen={showMenu}
            onClose={() => setShowMenu(false)}
            onEdit={handleEditClick}
            onDuplicate={handleDuplicate}
            onDelete={() => deleteCabinMutation(id)}
          />
        </div>
      </div>
      <Modal isOpen={showModal} onClose={handleCloseModal}>
        <CreateCabinForm
          onCancel={handleCloseModal}
          cabinToEdit={cabin}
          onSuccess={() => {
            setShowModal(false); // Close modal on successful edit
            queryClient.invalidateQueries(["cabins"]); // Refresh cabin list
          }}
        />
      </Modal>
    </>
  );
}

CabinRow.propTypes = {
  cabin: PropTypes.shape({
    name: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    maxCapacity: PropTypes.number.isRequired,
    regularPrice: PropTypes.number.isRequired,
    discount: PropTypes.number,
    image: PropTypes.string.isRequired,
  }).isRequired,
};

export default CabinRow;
