import { DayPicker, Matcher, Row, RowProps } from "react-day-picker";
import { differenceInCalendarDays, endOfDay, format } from "date-fns";
import nb from "date-fns/locale/nb";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useUpdateUrl } from "pages/hooks/use-update-url";
import { capitalize } from "lodash";

import { Flex } from "../../../../ui-kit/flex";
import { theme } from "../../../../ui-kit/theme";

export const Calendar = () => {
  const router = useRouter();
  const [isPopperOpen, setIsPopperOpen] = useState(false);
  const [locale, setLocale] = useState("en-US");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const updateUrl = useUpdateUrl();

  useEffect(() => {
    setSelectedDate(
      router.query?.date ? new Date(router.query?.date as string) : new Date(),
    );
  }, [router.query]);

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
    updateUrl({ date: endOfDay(e).toISOString().split("T")[0] });
  };

  type WeekDayNumb = 0 | 1 | 2 | 3 | 4 | 5 | 6;

  return (
    <>
      {/* <div className="flex flex-col items-center gap-1">
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
            id="calendar-icon"
            tabIndex={0}
            className={`cursor-pointer absolute right-1
            ${isPopperOpen && "bg-gray-300"} hover:bg-gray-300 rounded-lg`}
            onClick={() => setIsPopperOpen(!isPopperOpen)}
          >
            <CalendarIcon />
          </div>
        </Flex>
      </div>
      {isPopperOpen && ( */}
      <Flex justifyContent={"center"} width={"100%"}>
        <DayPicker
          classNames={{
            day_selected: "daypicker-selected-date",
            day_today: "daypicker-today-date",
            months: "daypicker-months",
          }}
          weekStartsOn={new Date().getDay() as WeekDayNumb}
          disabled={disabledDays}
          defaultMonth={new Date()}
          components={{ Row: OnlyFutureRow }}
          locale={nb}
          disableNavigation
          mode="single"
          selected={selectedDate}
          onSelect={Submit}
          showOutsideDays
          fixedWeeks
          style={
            {
              // backgroundColor: `${theme.colors.green}`,
              // padding: "10px",
              // position: "absolute",
              // zIndex: 99,
              // boxShadow: "0 0 0 1px #6B93AA",
              // borderCollapse: "collapse",
              // tableLayout: "fixed",
              // width: "100%",
              // borderStyle: "hidden" /* hide standard table (collapsed) border */,
            }
          }
          formatters={{
            formatCaption: (date, options) => {
              // Format the date as you wish
              const formattedDateMonth = capitalize(
                format(date, "MMMM", options),
              );
              const formattedDateYear = capitalize(
                format(date, "yyyy", options),
              );
              return (
                <Flex
                  backgroundColor={theme.color.blues[5]}
                  borderWidth={"2px"}
                  borderColor={theme.color.blues[7]}
                  borderRadius={"16px"}
                  justifyContent={"space-between"}
                  padding={"1rem"}
                  color={"white"}
                  width={"100%"}
                >
                  <p>{formattedDateMonth}</p>
                  <p>{formattedDateYear}</p>
                </Flex>
              );
            },
          }}
          styles={{
            caption_label: {
              width: "100%",
            },
            head: {
              fontSize: "1rem",
              fontWeight: "bold",
              color: "white",
            },
            table: {
              marginTop: "7rem",
              width: "100%",
              display: "table",
              borderCollapse: "separate",

              // borderWidth: "2px",
              // borderColor: `${theme.color.blues[7]}`,
              backgroundColor: `${theme.color.blues[5]}`,
              boxShadow: "0 0 0 1px #6B93AA",
              // borderWidth: "2px",
              // border: "2px solid black",
              // borderWidth: "4px",
              borderStyle: "solid",
              maxWidth: "calc(var(--rdp-cell-size) * 8)",

              // backgroundColor: `${theme.color.blues[6]}`,
              // boxShadow: "0 2px 6px rgba(0, 0, 0, 0.3)",
              borderRadius: "16px",
              padding: "15px",
              color: "white",
            },
            day: {
              width: "100%",
              fontSize: "1.2rem",
              color: "white",
              padding: "20px",
            },
          }}
        />
      </Flex>
      {/* )} */}
    </>
  );
};
