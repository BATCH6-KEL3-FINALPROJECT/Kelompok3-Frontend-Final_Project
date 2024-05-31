export const generateSeats = () => {
  const seatsNumber = ["A", "B", "C", "D", "E", "F"];
  let maxSeatsPerRows = 20;
  const flight_id = 1;
  const seatClass = ["First Class", "Business", "Economy"];

  let rows = [];
  for (let i = 0; i < seatsNumber.length; i++) {
    //A,B,C,D,E,F
    for (let j = 1; j <= maxSeatsPerRows; j++) {
      let result = {};
      // if (j > 2 && seatsNumber[i] === "A") {
      //   rows.push(result);
      //   continue;
      // }
      const randomNumber = Math.floor(Math.random() * 3);
      result.seat_id = `${i}-${j}`;
      result.flight_id = flight_id;
      result.class = seatClass[randomNumber];
      result.price = 150;
      result.seat_number = `${seatsNumber[i]}${j}`;
      //   result.isAvailable = Math.random() > 0.5;
      result.isAvailable = Math.random() > 0.5;
      rows.push(result);
    }
  }
  return rows;
};
