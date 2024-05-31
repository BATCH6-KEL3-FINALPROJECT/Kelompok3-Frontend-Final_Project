import React, { useEffect, useState } from "react";
import Seats from "../components/Seats";
import CheckoutCards from "../components/CheckoutCards";
import CheckoutForm from "../components/CheckoutForm";
import CheckoutInput from "../components/CheckoutInput";
import { AnimatePresence, motion } from "framer-motion";
import FlightDetails from "../components/FlightDetails";
import { flightDetails } from "../utils/flightDummy";
import { getSeatsData } from "../utils/seatsDummy";
import Navbar from "../components/Navbar";
import CheckoutAlert from "../components/CheckoutAlert";
import Breadcrumbs from "../components/Breadcrumbs";

const Checkout = () => {
  const [datas, setDatas] = useState([]);
  const [isCustomerFamilyName, setIsCustomerFamilyName] = useState(false);
  const [isPassengerFamilyName, setIsPassengerFamilyName] = useState([]);
  const [flightDetail, setFlightDetail] = useState([]);
  const [isDataSaved, setIsDataSaved] = useState(false);
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    setDatas(getSeatsData());
    setFlightDetail(flightDetails());

    // Belum Dinamis, disesuaikan dengan inputan user ketika mau memesan tiker, misal : 2 adult, 1 children, etc
    setIsPassengerFamilyName(new Array(2).fill(false));
  }, []);

  function handleCustomerBtn() {
    if (isCustomerFamilyName) {
      setIsCustomerFamilyName(false);
    } else {
      setIsCustomerFamilyName(true);
    }
  }

  // Testing Handling Dynamic Form (Fungsi untuk menampilkan form nama keluarga di masing-masing form)
  function handlePassengerBtn(id) {
    setIsPassengerFamilyName((prev) =>
      prev.map((item, index) => (index === id ? !item : item))
    );
  }

  function handleSubmit(e) {
    e.preventDefault();

    console.log("Form Submitted!");
  }

  return (
    <>
      <Navbar isLogin={isLogin} />
      <Breadcrumbs isPayment={isDataSaved} isSuccess={false} />

      {!isDataSaved && (
        <CheckoutAlert type="Danger" message="Selesaikan dalam 00:15:00" />
      )}

      {isDataSaved && (
        <CheckoutAlert type="Success" message="Data anda berhasil disimpan!" />
      )}

      <div className="my-5 flex justify-center gap-10">
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-10">
            {/* Form Data Customer */}
            <CheckoutCards>
              <h3 className="text-xl font-bold mb-4"> Isi Data Pemesan </h3>
              <CheckoutForm title="Data Diri Pemesan" isSaved={isDataSaved}>
                <CheckoutInput label="Nama Lengkap" placeholder="Harry" />
                <div className="flex justify-between px-4">
                  <p> Punya nama keluarga? </p>
                  <div className="relative">
                    <input
                      type="checkbox"
                      onClick={handleCustomerBtn}
                      className="absolute left-1/2 -translate-x-1/2 w-full h-full peer appearance-none rounded-md"
                    />
                    <span className="w-10 h-6 flex items-center flex-shrink-0 ml-4 p-1 bg-slate-300  rounded-full duration-300 ease-in-out peer-checked:bg-[#4B1979] after:w-4 after:h-4 after:bg-white after:rounded-full after:shadow-md after:duration-300 peer-checked:after:translate-x-4 group-hover:after:translate-x-1"></span>
                  </div>
                </div>
                <AnimatePresence>
                  {isCustomerFamilyName && (
                    <motion.div
                      key="customerFamilyInput"
                      initial={{ translateY: -10 }}
                      animate={{ translateY: 0 }}
                      transition={{
                        duration: 0.3,
                      }}
                    >
                      <CheckoutInput
                        label="Nama Keluarga"
                        placeholder="Potter"
                        name="familyName"
                      />
                    </motion.div>
                  )}
                  <motion.div layout transition={{ duration: 0.3 }}>
                    <CheckoutInput
                      label="Nomor Telepon"
                      placeholder="08521111111"
                    />
                    <CheckoutInput label="Email" placeholder="johnd@mail.com" />
                  </motion.div>
                </AnimatePresence>
              </CheckoutForm>
            </CheckoutCards>
            {/* Batas Form Data Customer */}

            {/* Form Data Penumpang (di map berdasarkan jumlah tiket yang dipesan) */}
            <CheckoutCards>
              <h3 className="text-xl font-bold mb-4"> Isi Data Penumpang </h3>
              <div className="flex flex-col gap-7">
                {/* Akan di map / loop disini */}
                <CheckoutForm
                  title="Data Diri Penumpang 1 - Adult"
                  isSaved={isDataSaved}
                >
                  <CheckoutInput
                    label="Nama Lengkap"
                    placeholder="Harry"
                    name="fullName_0"
                  />
                  <div className="flex justify-between px-4 items-center">
                    <p> Punya nama keluarga? </p>
                    <div className="relative">
                      <input
                        type="checkbox"
                        onClick={() => handlePassengerBtn(0)}
                        className="absolute left-1/2 -translate-x-1/2 w-full h-full peer appearance-none rounded-md"
                      />
                      <span className="w-10 h-6 flex items-center flex-shrink-0 ml-4 p-1 bg-slate-300  rounded-full duration-300 ease-in-out peer-checked:bg-[#4B1979] after:w-4 after:h-4 after:bg-white after:rounded-full after:shadow-md after:duration-300 peer-checked:after:translate-x-4 group-hover:after:translate-x-1"></span>
                    </div>
                  </div>
                  <AnimatePresence>
                    {isPassengerFamilyName[0] && (
                      <motion.div
                        key="passengerFamilyInput_0"
                        initial={{ translateY: -10 }}
                        animate={{ translateY: 0 }}
                        transition={{
                          duration: 0.3,
                        }}
                      >
                        <CheckoutInput
                          label="Nama Keluarga"
                          placeholder="Potter"
                          name="familyName_0"
                        />
                      </motion.div>
                    )}
                    <motion.div layout transition={{ duration: 0.3 }}>
                      <CheckoutInput
                        label="Nomor Telepon"
                        placeholder="08521111111"
                        name="phoneNumber_0"
                      />
                      <CheckoutInput
                        label="Email"
                        placeholder="johnd@mail.com"
                        name="email_0"
                      />
                      <CheckoutInput
                        label="Tanggal Lahir"
                        placeholder="dd/mm/yy"
                        type="date"
                        name="birthDate_0"
                      />
                      <CheckoutInput
                        label="Kewarnegaraan"
                        placeholder="Indonesia"
                        type="text"
                        name="citizenship_0"
                      />
                      <CheckoutInput
                        label="Negara Penertbit"
                        placeholder="Indonesia"
                        type="text"
                        name="citizenship_0"
                      />
                    </motion.div>
                  </AnimatePresence>
                </CheckoutForm>

                <CheckoutForm
                  title="Data Diri Penumpang 2 - Adult"
                  isSaved={isDataSaved}
                >
                  <CheckoutInput
                    label="Nama Lengkap"
                    placeholder="Harry"
                    name="fullName_1"
                  />
                  <div className="flex justify-between px-4 items-center">
                    <p> Punya nama keluarga? </p>
                    <div className="relative">
                      <input
                        type="checkbox"
                        onClick={() => handlePassengerBtn(1)}
                        className="absolute left-1/2 -translate-x-1/2 w-full h-full peer appearance-none rounded-md"
                      />
                      <span className="w-10 h-6 flex items-center flex-shrink-0 ml-4 p-1 bg-slate-300  rounded-full duration-300 ease-in-out peer-checked:bg-[#4B1979] after:w-4 after:h-4 after:bg-white after:rounded-full after:shadow-md after:duration-300 peer-checked:after:translate-x-4 group-hover:after:translate-x-1"></span>
                    </div>
                  </div>

                  <AnimatePresence>
                    {isPassengerFamilyName[1] && (
                      <motion.div
                        key="passengerFamilyInput_1"
                        initial={{ translateY: -10 }}
                        animate={{ translateY: 0 }}
                        transition={{
                          duration: 0.3,
                        }}
                      >
                        <CheckoutInput
                          label="Nama Keluarga"
                          placeholder="Potter"
                          name="familyName_1"
                        />
                      </motion.div>
                    )}
                    <motion.div layout transition={{ duration: 0.3 }}>
                      <CheckoutInput
                        label="Nomor Telepon"
                        placeholder="08521111111"
                        name="phoneNumber_1"
                      />
                      <CheckoutInput
                        label="Email"
                        placeholder="johnd@mail.com"
                        name="email_1"
                      />
                      <CheckoutInput
                        label="Tanggal Lahir"
                        placeholder="dd/mm/yy"
                        type="date"
                        name="birthDate_1"
                      />
                      <CheckoutInput
                        label="Kewarnegaraan"
                        placeholder="Indonesia"
                        type="text"
                        name="citizenship_1"
                      />
                      <CheckoutInput
                        label="Negara Penertbit"
                        placeholder="Indonesia"
                        type="text"
                        name="citizenship_1"
                      />
                    </motion.div>
                  </AnimatePresence>
                </CheckoutForm>
              </div>
            </CheckoutCards>
            {/* Batas Form Data Passenger */}

            {/* Pilih Kursi dan Tombol Simpan */}
            <div className="flex flex-col gap-5">
              <CheckoutCards>
                <Seats datas={datas} />
              </CheckoutCards>
              {isDataSaved ? (
                <button
                  className="py-4 text-center w-full bg-[#D0D0D0] rounded-xl text-white shadow-xl text-xl font-semibold"
                  disabled
                >
                  Simpan
                </button>
              ) : (
                <button
                  type="submit"
                  className="py-4 text-center w-full bg-[#7126B5] rounded-xl text-white shadow-xl text-xl font-semibold"
                >
                  Simpan
                </button>
              )}
            </div>
            {/* Pilih Kursi dan Tombol Simpan */}
          </div>
        </form>
        {/* Detail Penerbangan */}
        <FlightDetails flightDetail={flightDetail} isSavedData={isDataSaved} />
      </div>
    </>
  );
};

export default Checkout;
