const dateFormat = (date) => {
  if (date) {
    const dataFormatObject = new Date(date);
    const day = dataFormatObject.getDate();
    const month = dataFormatObject.getMonth() + 1;
    const year = dataFormatObject.getFullYear();
    let hours = dataFormatObject.getHours();
    const minutes = dataFormatObject.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12; // หากเป็น 0 ให้กำหนดให้เป็น 12

    return `${day < 10 ? "0" : ""}${day}/${
      month < 10 ? "0" : ""
    }${month}/${year} ${hours}:${minutes < 10 ? "0" : ""}${minutes}${ampm}`;
  }
  return "-";
};

export default dateFormat;
