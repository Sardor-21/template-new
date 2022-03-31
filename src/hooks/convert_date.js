const convert_date = (iso) => {
  let date = new Date(iso);
  return (
    date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear()
  );
};

export default convert_date;
