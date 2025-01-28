import moment from "moment";

const formatDate = (date?: string | null, format?: string | null) => {
  if (!date) return "-";

  const datetime = moment(parseInt(date));
  return datetime.isValid()
    ? datetime.format(format ?? "YYYY-MM-DD HH:mm:ss")
    : "-";
};

export default formatDate;
