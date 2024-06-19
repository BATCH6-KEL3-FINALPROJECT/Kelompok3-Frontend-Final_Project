const passengerCategory = ["Adult", "Child", "Infant"];
const randomTotalPassenger = Math.floor(Math.random() * 5) + 1;

export function generatePassenger() {
  let passenger = [];
  for (let i = 1; i <= randomTotalPassenger; i++) {
    const randomNumber = randomRatio();
    passenger.push(passengerCategory[randomNumber]);
  }
  return passenger;
}

// export const passenger = generatePassenger();
export const passenger = ["Adult", "Adult", "Child"];

function randomRatio() {
  const randomNumber = Math.random();
  if (randomNumber < 0.7) {
    return 0;
  } else if (randomNumber < 0.8) {
    return 1;
  } else {
    return 2;
  }
}
