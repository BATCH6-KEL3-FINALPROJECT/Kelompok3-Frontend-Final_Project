const departure_time = new Date("2023-03-03T07:00:00");
const departure_airport = "Soekarno Hatta - Terminal 1A Domestik";
const arrive_time = new Date("2023-03-03T11:00:00");
const arrival_airport = "Melbourne International Airport";
const flightDescription = [
  "Baggage 20kg",
  "Cabin Baggage 7kg",
  "In Flight Entertainment",
];

export const flightDetails = () => {
  return {
    departure_airport,
    departure_time,
    arrive_time,
    arrival_airport,
    flightDescription,
  };
};
