const conver_hour = (iso) => {
  console.log(iso);
  let hour = new Date(iso);
  return parseInt(hour.getHours()) + 5 + "-" + hour.getMinutes();
};

export default conver_hour;
