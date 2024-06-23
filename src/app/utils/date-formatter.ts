import { capitalize } from "lodash";

export const dateFormatter = (date: Date, locale: string = "nb-NO") => {
  const options: Intl.DateTimeFormatOptions = {
    weekday: "long",
    day: "numeric",
    month: "long",
  };
  return capitalize(new Intl.DateTimeFormat(locale, options).format(date));
};
