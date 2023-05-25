import {
  DayModifiers,
  DayPicker,
  Matcher,
  ModifiersStyles,
  Row,
  RowProps,
} from "react-day-picker";
import "react-day-picker/dist/style.css";
import { differenceInCalendarDays } from "date-fns";
import nb from "date-fns/locale/nb";
import { useEffect, useRef, useState } from "react";

import { Spacer } from "../../ui-kit/spacer/spacer";
import { CalendarIcon } from "../../ui-kit/calendar-icon/calendar-icon";
import { Text } from "../../ui-kit/components/text";

export const ChooseCalendarValue = ({
  unfilledCalendar,
  selectedDate,
  setSelectedDate,
}) => {
  const popperRef = useRef<HTMLDivElement>(null);
  const [isPopperOpen, setIsPopperOpen] = useState(false);
  const [locale, setLocale] = useState("en-US");

  const today = new Date();
  const inTenDays = new Date(today.setDate(today.getDate() + 9));

  const disabledDays: Matcher | Matcher[] = {
    after: inTenDays,
  };

  // const modifiers: DayModifiers = {
  //   highlightDays: {
  //     from: inTenDays,
  //     to: inTenDays,
  //   },
  // };

  // const modifiersStyles: ModifiersStyles = {
  //   highlightDays: {
  //     backgroundColor: "gray",
  //   },
  // };

  useEffect(() => {
    setLocale(navigator.language);
  }, []);

  function pastDates(date: Date) {
    return differenceInCalendarDays(date, new Date()) < 0;
  }

  function afterTwoWeeks(date: Date) {
    return differenceInCalendarDays(date, new Date()) >= 14;
  }

  function OnlyFutureRow(props: RowProps) {
    const isPastRow = props.dates.every(pastDates);
    const isAfterTwoWeeks = props.dates.every(afterTwoWeeks);

    if (isPastRow) return <></>;
    if (isAfterTwoWeeks) return <></>;
    return <Row {...props} />;
  }

  const Submit = (e: Date) => {
    setIsPopperOpen(false);
    e && setSelectedDate(e);
  };

  type WeekDayNumb = 0 | 1 | 2 | 3 | 4 | 5 | 6;

  return (
    <section id="calendar">
      <div className="flex flex-col items-center">
        <Text variant="subtitle-large" color="black">
          When do you want to travel?
        </Text>
        {unfilledCalendar && (
          <p className="text-md text-red-500 font-bold">
            Please fill calendar value
          </p>
        )}
        <Spacer vertical={2} />
        <div className="flex items-center justify-center align-center">
          <input
            readOnly
            className="border-2 justify-center text-center align-center rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
            type={"text"}
            value={selectedDate.toLocaleDateString(locale)}
          />
          <div
            className="cursor-pointer hover:bg-gray-300 rounded-lg"
            ref={popperRef}
            onClick={() => setIsPopperOpen(!isPopperOpen)}
          >
            <CalendarIcon />
          </div>
        </div>
        {isPopperOpen && (
          <DayPicker
            weekStartsOn={new Date().getDay() as WeekDayNumb}
            disabled={disabledDays}
            // fromDate={new Date()}
            // hidden={{ before: new Date(), to: inTwoWeeks }}
            components={{ Row: OnlyFutureRow }}
            locale={nb}
            disableNavigation
            mode="single"
            selected={selectedDate}
            onSelect={Submit}
            showOutsideDays
            fixedWeeks
            style={{ margin: "0px" }}
            styles={{
              caption: { display: "none" },
              head: {
                fontSize: "1rem",
                fontWeight: "bold",
                padding: "0.5rem 0.5rem",
                color: "black",
              },
              day: {
                width: "2rem",
                height: "2rem",
                fontSize: "1rem",
                margin: "0px",
                padding: "0px",
                borderRadius: "0px",
                color: "black",
              },
            }}
          />
        )}
      </div>
    </section>
  );
};
