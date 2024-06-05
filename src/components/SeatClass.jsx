import React, { useState, useRef } from "react";
import ModalSeatClass from "./ModalSeatClass";

function SeatClass({ seatClass, handleSeatClassChange }) {
  const [showModal, setShowModal] = useState(false);
  const buttonRef = useRef(null);

  const handleModalOpen = () => {
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  const handleSeatClassSelect = (selectedClass) => {
    handleSeatClassChange({ target: { value: selectedClass } });
    setShowModal(false);
  };

  return (
    <div className="flex items-center gap-3 mb-3 relative">
      <div className="flex flex-col gap-3 ml-3">
        <label
          htmlFor="seatClass"
          className="block text-xs font-semibold text-gray-600"
        >
          Seat Class
        </label>
        <button
          ref={buttonRef}
          type="button"
          className="appearance-none w-[200px] font-semibold text-gray-700 border-b-4 border-gray-300 rounded-t py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-black mb-2"
          onClick={handleModalOpen}
        >
          {seatClass || "Select Seat Class"}
        </button>
      </div>

      {showModal && (
        <ModalSeatClass
          isOpen={showModal}
          closeModal={handleModalClose}
          seatClass={seatClass}
          setSeatClass={handleSeatClassSelect}
          buttonRef={buttonRef}
        />
      )}
    </div>
  );
}

export default SeatClass;
