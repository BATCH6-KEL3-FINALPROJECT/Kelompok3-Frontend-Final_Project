export const formatTime = (date) => {
  const toDate = new Date(date);
  const hours = toDate.getHours().toString().padStart(2, "0");
  const minutes = toDate.getMinutes().toString().padStart(2, "0");
  return `${hours}:${minutes}`;
};

export const formatDate = (date) => {
  const toDate = new Date(date);
  const options = { day: "numeric", month: "long", year: "numeric" };
  return toDate.toLocaleDateString("id-ID", options);
};
