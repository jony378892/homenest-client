import { format } from "date-fns";

const formatDate = (date) => {
  const result = format(date, "yyyy-MM-dd");
  return result;
};

export { formatDate };
