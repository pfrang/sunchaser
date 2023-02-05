import { format } from "path";

const formatMonth = (date: Date) => {
  const month = date.getMonth();

  if (month < 9) {
    return `0${month + 1}`;
  }
  return month + 1;
};

export const formatDate = (date: Date) => {
  return `${new Date(date).getFullYear()}-${formatMonth(date)}-${new Date(
    date
  ).getDate()}`;
};
