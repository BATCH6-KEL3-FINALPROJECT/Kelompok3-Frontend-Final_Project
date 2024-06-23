import React, { useEffect, useState } from "react";
import Seats from "../components/Seats";
import CheckoutCards from "../components/CheckoutCards";
import CheckoutForm from "../components/CheckoutForm";
import CheckoutInput from "../components/CheckoutInput";
import CheckoutDropdown from "../components/CheckoutDropdown";
import { AnimatePresence, motion } from "framer-motion";
import FlightDetails from "../components/FlightDetails";
import CheckoutAlert from "../components/CheckoutAlert";
import Breadcrumbs from "../components/Breadcrumbs";
import CheckoutPricing from "../components/CheckoutPricing";
import { FormProvider, useForm } from "react-hook-form";
import Topnav from "../components/Topnav";
import { useNavigate, useLocation, useSearchParams } from "react-router-dom";
import Cookies from "universal-cookie";

const Checkout = () => {
  const [isCustomerFamilyName, setIsCustomerFamilyName] = useState(false);
  const [isPassengerFamilyName, setIsPassengerFamilyName] = useState([]);
  const [isDataSaved, setIsDataSaved] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [passengerInfo, setPassengerInfo] = useState([]);
  const [totalHargaBerangkat, setTotalHargaBerangkat] = useState(0);
  const [totalHargaPulang, setTotalHargaPulang] = useState(0);
  const [customerData, setCustomerData] = useState([]);
  const [passengerData, setPassengerData] = useState([]);
  const methods = useForm();
  const [countdown, setCountdown] = useState(900);
  const navigate = useNavigate();
  const cookies = new Cookies();
  const location = useLocation();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const penumpang = searchParams.get("penumpang") || "0.0.0";
    const [adults, children, infants] = penumpang.split(".").map(Number);

    const passengers = [
      ...Array(adults).fill("Dewasa"),
      ...Array(children).fill("Anak-Anak"),
      ...Array(infants).fill("Bayi"),
    ];

    setPassengerInfo(passengers);
    setIsPassengerFamilyName(new Array(passengers.length).fill(false));
  }, [location.search]);

  useEffect(() => {
    const checkToken = cookies.get("token");
    if (checkToken) {
      if (checkToken === "undefined") {
        setIsLogin(false);
      } else {
        setIsLogin(true);
      }
    } else {
      setIsLogin(false);
    }
  }, [navigate]);

  useEffect(() => {
    if (countdown > 0) {
      const timerId = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);

      return () => {
        clearInterval(timerId);
      };
    }
  }, [countdown]);

  function determinePassengerType(index) {
    if (index < passengerInfo.length) {
      const passengerType = passengerInfo[index];
      if (passengerType === "Dewasa") {
        return "adult";
      } else if (passengerType === "Anak-Anak") {
        return "child";
      } else if (passengerType === "Bayi") {
        return "infant";
      }
    }
  }

  const onSubmit = methods.handleSubmit((data) => {
    const passengersData = [];
    let customerData = {};

    for (const key in data) {
      if (key.startsWith("customer")) {
        const newKey = key.replace("customer", "").toLowerCase();
        customerData[newKey] = data[key];
        continue;
      }
      const index = key.split("-")[1];

      if (!passengersData[index]) {
        passengersData[index] = {};
      }

      passengersData[index][key.split("-")[0]] = data[key];
      passengersData[index].passenger_type = determinePassengerType(index);
    }

    setCustomerData(customerData);
    setPassengerData(passengersData);

    const objectData = {
      customerData,
      passengersData: passengersData,
    };
    setIsDataSaved(true);
    console.log(objectData);
  });

  function handleCustomerBtn() {
    setIsCustomerFamilyName(!isCustomerFamilyName);
  }

  function handlePassengerBtn(id) {
    setIsPassengerFamilyName((prev) =>
      prev.map((item, index) => (index === id ? !item : item))
    );
  }

  function handleBayar() {
    const data = {
      totalAmount: searchParams.get("return_id")
        ? totalHargaBerangkat + totalHargaPulang
        : totalHargaBerangkat,
      departureFlightId: searchParams.get("departure_id"),
      returnFlightId: searchParams.get("return_id")
        ? searchParams.get("return_id")
        : "",
      buyerData: customerData,
      passengersData: passengerData,
    };
    console.log(data);
  }

  const formatTime = (seconds) => {
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return `${min.toString().padStart(2, "0")}:${sec
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <div>
      <Topnav isLogin={isLogin} isSearch={false} />
      <div className="shadow-md py-4 mt-24 w-11/12 mx-auto md:w-full">
        <Breadcrumbs isPayment={isDataSaved} isSuccess={false} />

        {isDataSaved ? (
          <CheckoutAlert
            type="Success"
            message="Data anda berhasil disimpan!"
          />
        ) : countdown > 0 ? (
          <CheckoutAlert
            type="Danger"
            message={`Selesaikan dalam ${formatTime(countdown)}`}
          />
        ) : (
          <CheckoutAlert
            type="Danger"
            message="Maaf, Waktu pemesanan habis. Silahkan ulangi lagi!"
            timeOver={true}
          />
        )}
      </div>

      <div className="my-5 flex flex-col lg:flex-row md:justify-center md:items-center lg:items-start lg:justify-center gap-10 w-11/12 mx-auto md:w-full">
        <FormProvider {...methods}>
          <form onSubmit={(e) => e.preventDefault()} noValidate>
            <div className="flex flex-col gap-10">
              <div className="flex flex-col gap-10 px-2">
                <CheckoutCards>
                  <h3 className="text-xl font-bold mb-4"> Isi Data Pemesan </h3>
                  <CheckoutForm title="Data Diri Pemesan" isSaved={isDataSaved}>
                    <CheckoutInput
                      label="Nama Lengkap"
                      placeholder="Harry"
                      name="customerfullName"
                      type="text"
                      validation={{
                        required: {
                          value: true,
                          message: "Harap isi input ini!",
                        },
                      }}
                      isSaved={isDataSaved}
                    />
                    <div className="flex justify-between px-4">
                      <p> Punya nama keluarga? </p>
                      <div className="relative">
                        <input
                          type="checkbox"
                          onClick={handleCustomerBtn}
                          disabled={isDataSaved}
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
                            name="customerfamilyName"
                            type="text"
                            isSaved={isDataSaved}
                          />
                        </motion.div>
                      )}
                      <motion.div
                        layout
                        transition={{ duration: 0.3 }}
                        animate={{}}
                      >
                        <CheckoutInput
                          label="Nomor Telepon"
                          placeholder="08521111111"
                          name="customerphone"
                          type="number"
                          validation={{
                            required: {
                              value: true,
                              message: "Harap isi input ini!",
                            },
                          }}
                          isSaved={isDataSaved}
                        />
                        <CheckoutInput
                          label="Email"
                          placeholder="johnd@mail.com"
                          name="customeremail"
                          type="email"
                          validation={{
                            required: {
                              value: true,
                              message: "Harap isi input ini!",
                            },
                          }}
                          isSaved={isDataSaved}
                        />
                      </motion.div>
                    </AnimatePresence>
                  </CheckoutForm>
                </CheckoutCards>

                {passengerInfo.length > 0 && (
                  <CheckoutCards>
                    <h3 className="text-xl font-bold mb-4">
                      Isi Data Penumpang
                    </h3>
                    <div className="flex flex-col gap-7">
                      {passengerInfo.map((item, index) => (
                        <CheckoutForm
                          key={`checkoutForm-${index}`}
                          title={`Data Diri Penumpang ${index + 1} - ${item}`}
                          isSaved={isDataSaved}
                        >
                          <CheckoutDropdown
                            label="Title"
                            name={`title-${index}`}
                            placeholder="Pilih Title"
                            options={[
                              { value: "Mr", label: "Mr" },
                              { value: "Mrs", label: "Mrs" },
                            ]}
                            validation={{
                              required: {
                                value: true,
                                message: "Harap pilih title!",
                              },
                            }}
                            isSaved={isDataSaved}
                          />
                          <CheckoutInput
                            label="Nama Lengkap"
                            placeholder="Harry"
                            name={`fullname-${index}`}
                            type="text"
                            validation={{
                              required: {
                                value: true,
                                message: "Harap isi input ini!",
                              },
                            }}
                            isSaved={isDataSaved}
                          />
                          <div className="flex justify-between px-4 items-center">
                            <p> Punya nama keluarga? </p>
                            <div className="relative">
                              <input
                                type="checkbox"
                                onClick={() => handlePassengerBtn(index)}
                                className="absolute left-1/2 -translate-x-1/2 w-full h-full peer appearance-none rounded-md"
                                disabled={isDataSaved}
                              />
                              <span className="w-10 h-6 flex items-center flex-shrink-0 ml-4 p-1 bg-slate-300  rounded-full duration-300 ease-in-out peer-checked:bg-[#4B1979] after:w-4 after:h-4 after:bg-white after:rounded-full after:shadow-md after:duration-300 peer-checked:after:translate-x-4 group-hover:after:translate-x-1"></span>
                            </div>
                          </div>
                          <AnimatePresence>
                            {isPassengerFamilyName[index] && (
                              <motion.div
                                key={`passengerFamilyInput-${index}`}
                                initial={{ translateY: -10 }}
                                animate={{ translateY: 0 }}
                                transition={{
                                  duration: 0.3,
                                }}
                              >
                                <CheckoutInput
                                  label="Nama Keluarga"
                                  placeholder="Potter"
                                  type="text"
                                  name={`familyName-${index}`}
                                  isSaved={isDataSaved}
                                />
                              </motion.div>
                            )}
                            <motion.div layout transition={{ duration: 0.3 }}>
                              <CheckoutInput
                                label="Nomor Telepon"
                                placeholder="08521111111"
                                type="number"
                                name={`phone_number-${index}`}
                                validation={{
                                  required: {
                                    value: true,
                                    message: "Harap isi input ini!",
                                  },
                                }}
                                isSaved={isDataSaved}
                              />
                              <CheckoutInput
                                label="Email"
                                placeholder="johnd@mail.com"
                                type="email"
                                name={`email-${index}`}
                                validation={{
                                  required: {
                                    value: true,
                                    message: "Harap isi input ini!",
                                  },
                                }}
                                isSaved={isDataSaved}
                              />
                              <CheckoutInput
                                label="Tanggal Lahir"
                                placeholder="dd/mm/yy"
                                type="date"
                                name={`date_of_birth-${index}`}
                                validation={{
                                  required: {
                                    value: true,
                                    message: "Harap isi input ini!",
                                  },
                                }}
                                isSaved={isDataSaved}
                              />
                              <CheckoutInput
                                label="Kewarnegaraan"
                                placeholder="Indonesia"
                                type="text"
                                name={`nationality-${index}`}
                                validation={{
                                  required: {
                                    value: true,
                                    message: "Harap isi input ini!",
                                  },
                                }}
                                isSaved={isDataSaved}
                              />
                              <CheckoutInput
                                label="KTP/Paspor"
                                placeholder="XXXXXXXXXXXXXXXX"
                                type="text"
                                name={`passport_no-${index}`}
                                validation={{
                                  required: {
                                    value: true,
                                    message: "Harap isi input ini!",
                                  },
                                }}
                                isSaved={isDataSaved}
                              />
                              <CheckoutInput
                                label="Negara Penertbit"
                                placeholder="Indonesia"
                                type="text"
                                name={`issuing_country-${index}`}
                                validation={{
                                  required: {
                                    value: true,
                                    message: "Harap isi input ini!",
                                  },
                                }}
                                isSaved={isDataSaved}
                              />
                              <CheckoutInput
                                label="Berlaku Sampai"
                                placeholder="dd/mm/yy"
                                type="date"
                                name={`valid_until-${index}`}
                                validation={{
                                  required: {
                                    value: true,
                                    message: "Harap isi input ini!",
                                  },
                                }}
                                isSaved={isDataSaved}
                              />
                            </motion.div>
                          </AnimatePresence>
                        </CheckoutForm>
                      ))}
                    </div>
                  </CheckoutCards>
                )}
              </div>
              <div className="flex flex-col gap-5 px-2">
                <CheckoutCards>
                  <Seats
                    flightID={searchParams.get("departure_id")}
                    maxSeatsSelected={passengerInfo.length}
                    Text={"Berangkat"}
                  />
                  {searchParams.get("return_id") && (
                    <Seats
                      flightID={searchParams.get("return_id")}
                      maxSeatsSelected={passengerInfo.length}
                      Text={"Pulang"}
                    />
                  )}
                </CheckoutCards>
                <button
                  className={`py-4 text-center w-full ${
                    isDataSaved ? "bg-[#D0D0D0]" : "bg-[#7126B5]"
                  }  rounded-xl text-white shadow-xl text-xl font-semibold transition-all`}
                  disabled={isDataSaved}
                  onClick={onSubmit}
                >
                  Simpan
                </button>
              </div>
            </div>
          </form>
        </FormProvider>
        <div className="w-full md:w-auto px-5 flex flex-col gap-4 lg:px-0">
          <div>
            <FlightDetails
              flightID={searchParams.get("departure_id")}
              typeTicket={"Berangkat"}
            />
            <CheckoutPricing
              passengerInfo={passengerInfo}
              flightID={searchParams.get("departure_id")}
              onTotalPriceChange={setTotalHargaBerangkat}
            />
          </div>
          {searchParams.get("return_id") && (
            <div>
              <FlightDetails
                flightID={searchParams.get("return_id")}
                typeTicket={"Pulang"}
              />
              <CheckoutPricing
                passengerInfo={passengerInfo}
                flightID={searchParams.get("return_id")}
                onTotalPriceChange={setTotalHargaPulang}
              />
            </div>
          )}
          <div className="flex justify-between mx-2">
            <h3 className="font-bold"> Total </h3>
            <h3 className="font-bold text-lg text-[#7126B5]">
              IDR{" "}
              {(totalHargaPulang + totalHargaBerangkat).toLocaleString("id-ID")}
            </h3>
          </div>

          {isDataSaved && (
            <button
              className="bg-[#FF0000] font-medium py-4 w-full text-white rounded-xl mt-4"
              onClick={handleBayar}
            >
              Lanjut Bayar
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Checkout;
