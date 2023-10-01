import "react-datepicker/dist/react-datepicker.css";
import React, { useState } from "react";
import { differenceInCalendarDays } from "date-fns";
import nb from "date-fns/locale/nb";

import { Spacer } from "../../ui-kit/spacer/spacer";
import { CalendarIcon } from "../../ui-kit/calendar-icon/calendar-icon";
import { Text } from "../../ui-kit/text";
import { Flex } from "../../ui-kit/flex";
import { theme } from "../../ui-kit/theme";
import { DatePicker } from "../../ui-kit/date-picker/date-picker";

export const Calendar = ({ selectedDate, setSelectedDate }) => {
  const [isPopperOpen, setIsPopperOpen] = useState(false);
  const [locale, setLocale] = useState("en-US");

  const today = new Date();
  const inTenDays = new Date(today.setDate(today.getDate() + 9));

  function pastDates(date: Date) {
    return differenceInCalendarDays(date, new Date()) < 0;
  }

  function afterTwoWeeks(date: Date) {
    return differenceInCalendarDays(date, new Date()) >= 14;
  }

  const Submit = (e: Date | Date[]) => {
    setIsPopperOpen(false);
    e && setSelectedDate(e instanceof Array ? e[0] : e);
  };

  return (
    <section id="calendar w-full relative">
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
            onClick={() => setIsPopperOpen(!isPopperOpen)}
          >
            <CalendarIcon />
          </div>
        </Flex>
      </div>
      {isPopperOpen && (
        <Flex justifyContent={"center"}>
          <DatePicker
            selected={selectedDate}
            label="When do you want to travel?"
            onChange={(e: Date) => setSelectedDate(e)}
            isDateBlocked={pastDates}
          />
        </Flex>
      )}
    </section>
  );
};
