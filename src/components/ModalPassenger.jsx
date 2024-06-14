import React from "react";

const ModalPassenger = ({
  isOpen,
  closeModal,
  adults,
  setAdults,
  childrens,
  setChildrens,
  infants,
  setInfants,
}) => {
  const increment = (setter, count) => setter(count + 1);
  const decrement = (setter, count, min = 0) => {
    if (count > min) {
      setter(count - 1);
    }
  };

  const handleInputChange = (setter, e) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value) && value >= 0) {
      setter(value);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="absolute bg-white p-6 rounded-lg shadow-lg flex flex-col z-10 ms-1 md:ms-0  w-[380px] md:w-[400px] md:h-[306px]"
      style={{
        borderRadius: "20px",
        padding: "24px 0",
        top: "100%", // Adjusts the position to be below the button
        left: "-50px",
      }}
    >
      <div className="px-6">
        <div className="flex justify-end mb-2">
          <button onClick={closeModal}>
            <svg
              className="w-6 h-6 text-gray-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>
      <hr
        className="border-gray-400 w-full absolute left-0"
        style={{ top: "55px" }}
      />
      <div className="px-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <img src="adult.svg" alt="icon" className="mr-2" />
            <div>
              <label className="block" style={{ marginBottom: "4px" }}>
                <strong>Dewasa</strong>
              </label>
              <span style={{ fontSize: "12px", marginTop: "0px" }}>
                (12 tahun ke atas)
              </span>
            </div>
          </div>
          <div className="flex items-center">
            <button
              className="px-2 py-1 rounded"
              style={{
                border: "1px solid #4B1979",
                height: "40px",
                width: "40px",
              }}
              onClick={(e) => {
                e.preventDefault();
                decrement(setAdults, adults, 1);
              }}
            >
              -
            </button>
            <input
              type="number"
              value={adults}
              onChange={(e) => handleInputChange(setAdults, e)}
              className="mx-4 flex items-center justify-center bg-gray-100 border rounded"
              style={{
                width: "60px",
                height: "40px",
                borderRadius: "4px",
                border: "1px solid #4B1979",
                textAlign: "center",
              }}
              min="0"
            />
            <button
              className="px-2 py-1 rounded"
              style={{
                border: "1px solid #4B1979",
                height: "40px",
                width: "40px",
              }}
              onClick={(e) => {
                e.preventDefault();
                increment(setAdults, adults);
              }}
            >
              +
            </button>
          </div>
        </div>
        <hr className="my-1 border-gray-200" />
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <img src="childern.svg" alt="icon" className="mr-2" />
            <div>
              <label className="block" style={{ marginBottom: "4px" }}>
                <strong>Anak</strong>
              </label>
              <span style={{ fontSize: "12px", marginTop: "0px" }}>
                (2 - 11 tahun)
              </span>
            </div>
          </div>
          <div className="flex items-center">
            <button
              className="px-2 py-1 rounded"
              style={{
                border: "1px solid #4B1979",
                height: "40px",
                width: "40px",
              }}
              onClick={(e) => {
                e.preventDefault();
                decrement(setChildrens, childrens);
              }}
            >
              -
            </button>
            <input
              type="number"
              value={childrens}
              onChange={(e) => handleInputChange(setChildrens, e)}
              className="mx-4 flex items-center justify-center bg-gray-100 border rounded"
              style={{
                width: "60px",
                height: "40px",
                borderRadius: "4px",
                border: "1px solid #4B1979",
                textAlign: "center",
              }}
              min="0"
            />
            <button
              className="px-2 py-1 rounded"
              style={{
                border: "1px solid #4B1979",
                height: "40px",
                width: "40px",
              }}
              onClick={(e) => {
                e.preventDefault();
                increment(setChildrens, childrens);
              }}
            >
              +
            </button>
          </div>
        </div>
        <hr className="my-2 border-gray-300" />
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <img src="baby.svg" alt="icon" className="mr-2" />
            <div>
              <label className="block" style={{ marginBottom: "4px" }}>
                <strong>Bayi</strong>
              </label>
              <span style={{ fontSize: "12px", marginTop: "0px" }}>
                (Dibawah 2 tahun)
              </span>
            </div>
          </div>
          <div className="flex items-center">
            <button
              className="px-2 py-1 rounded"
              style={{
                border: "1px solid #4B1979",
                height: "40px",
                width: "40px",
              }}
              onClick={(e) => {
                e.preventDefault();
                decrement(setInfants, infants);
              }}
            >
              -
            </button>
            <input
              type="number"
              value={infants}
              onChange={(e) => handleInputChange(setInfants, e)}
              className="mx-4 flex items-center justify-center bg-gray-100 border rounded"
              style={{
                width: "60px",
                height: "40px",
                borderRadius: "4px",
                border: "1px solid #4B1979",
                textAlign: "center",
              }}
              min="0"
            />
            <button
              className="px-2 py-1 rounded"
              style={{
                border: "1px solid #4B1979",
                height: "40px",
                width: "40px",
              }}
              onClick={(e) => {
                e.preventDefault();
                increment(setInfants, infants);
              }}
            >
              +
            </button>
          </div>
        </div>
        <hr className="my-2 border-gray-300" />
        <div className="flex justify-end items-center mt-auto">
          <button
            className="text-white rounded px-4 py-2"
            style={{ backgroundColor: "#4B1979", borderRadius: "12px" }}
            onClick={closeModal}
          >
            Simpan
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalPassenger;
