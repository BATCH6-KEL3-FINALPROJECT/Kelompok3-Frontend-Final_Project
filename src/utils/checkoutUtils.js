export const formatTime = (date) => {
  return date.substring(0, 5);
};

export const formatDate = (date) => {
  const toDate = new Date(date);
  const options = { day: "numeric", month: "long", year: "numeric" };
  return toDate.toLocaleDateString("id-ID", options);
};

export const formatFlightCode = (code) => {
  // Menemukan posisi pertama dari angka dalam string
  const index = code.search(/\d/);
  // Memisahkan string pada posisi tersebut dan menambahkan tanda pisah
  return `${code.substring(0, index)} - ${code.substring(index)}`;
};

export function formatPrice(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}
