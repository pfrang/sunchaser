import "react-day-picker/dist/style.css";
import { DayPicker, Matcher, Row, RowProps } from "react-day-picker";
import { differenceInCalendarDays } from "date-fns";
import nb from "date-fns/locale/nb";
import { useEffect, useRef, useState } from "react";

import { Spacer } from "../../ui-kit/spacer/spacer";
import { CalendarIcon } from "../../ui-kit/calendar-icon/calendar-icon";
import { Text } from "../../ui-kit/components/text";
import { Flex } from "../../ui-kit/components/flex";
import { theme } from "../../ui-kit/theme/theme";

export const Calendar = ({ selectedDate, setSelectedDate }) => {
  const popperRef = useRef<HTMLDivElement>(null);
  const [isPopperOpen, setIsPopperOpen] = useState(false);
  const [locale, setLocale] = useState("en-US");

  const today = new Date();
  const inTenDays = new Date(today.setDate(today.getDate() + 9));

  const disabledDays: Matcher | Matcher[] = {
    after: inTenDays,
  };

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
    <section id="calendar w-full">
      <div className="flex flex-col items-center gap-1">
        <Text variant="caption-large">When do you want to travel?</Text>
        <Spacer vertical={2} />
        <Flex
          border={2}
          backgroundColor={"white"}
          padding={1}
          paddingX={6}
          borderRadius={10}
          justifyContent={"center"}
          alignItems={"center"}
          position={"relative"}
          width={["200px"]}
        >
          <Text variant="body-large">
            {selectedDate.toLocaleDateString(locale)}
          </Text>
          <div
            tabIndex={0}
            className={`cursor-pointer absolute right-1
            ${isPopperOpen && "bg-gray-300"} hover:bg-gray-300 rounded-lg`}
            ref={popperRef}
            onClick={() => setIsPopperOpen(!isPopperOpen)}
          >
            <CalendarIcon />
          </div>
        </Flex>
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
          style={{
            margin: "10px",
            border: "1px dotted gray",
            borderRadius: "4px",
            backgroundColor: `${theme.colors.green}`,
            boxShadow: "0 2px 6px rgba(0, 0, 0, 0.3)",
            padding: "10px",
          }}
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
    </section>
  );
};