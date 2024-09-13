import { useState } from "react";
import Modal from "../../ui/Modal";
import CreateCabinForm from "./CreateCabinForm";

function AddCabin() {
  const [isOpenModal, setIsOpenModal] = useState(false);

  const handleCloseModal = () => setIsOpenModal(false);

  return (
    <div>
      <button
        onClick={() => setIsOpenModal(true)}
        className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
        style={{ marginTop: "0%" }}
      >
        Add New Cabin
      </button>

      {/* Pass isOpen and onClose props to Modal */}
      <Modal isOpen={isOpenModal} onClose={handleCloseModal}>
        <CreateCabinForm onCancel={handleCloseModal} />
      </Modal>
    </div>
  );
}

export default AddCabin;
