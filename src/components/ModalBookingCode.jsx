import React from "react";
import { IoMdSearch } from "react-icons/io";
import { AiOutlineClose } from "react-icons/ai";

const BookingModal = ({
  isOpen,
  onClose,
  bookingCodes,
  onSelectBookingCode,
}) => {
  const [filter, setFilter] = React.useState("");

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  if (!isOpen) return null;

  // Filter booking codes based on the filter input
  const filteredBookingCodes = bookingCodes.filter((code) =>
    code.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-lg w-[300px] md:w-[400px] ">
        <div className="flex items-center mb-4">
          <IoMdSearch className="text-gray-400 text-2xl mr-2" />
          <input
            type="text"
            placeholder="Masukkan Kode Booking"
            value={filter}
            onChange={handleFilterChange}
            className="w-full p-2 border-b border-gray-300 focus:outline-none"
          />
          <button onClick={onClose} className="text-gray-500 ml-2">
            <AiOutlineClose className="text-2xl" />
          </button>
        </div>

        <div className="mt-4 max-h-[200px] overflow-y-auto">
          {filteredBookingCodes.length > 0 ? (
            <ul>
              {filteredBookingCodes.map((code) => (
                <li
                  key={code}
                  className="my-2 cursor-pointer hover:bg-[#4B1979] hover:text-white "
                  onClick={() => onSelectBookingCode(code)}
                >
                  {code}
                  <hr className="border-t-1 border-gray-300 "></hr>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">Booking Code tidak ditemukan</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingModal;
