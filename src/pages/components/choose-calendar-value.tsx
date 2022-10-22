import { DayPicker, Row, RowProps } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { differenceInCalendarDays } from "date-fns";
import nb from "date-fns/locale/nb";

import { Spacer } from "../../ui-kit/spacer/spacer";

export const ChooseCalendarValue = ({
  unfilledCalendar,
  selectedDate,
  setSelectedDate,
}) => {
  const today = new Date();
  const inTwoWeeks = new Date(today.setDate(today.getDate() + 14));

  const disabledDays = {
    from: new Date(2022, 10, 18),
    to: new Date(2022, 10, 29),
  };

  const modifiers = {
    hideDays: {
      before: new Date(),
      after: inTwoWeeks,
    },
    root: {
      display: "flex",
    },
  };

  const modifiersStyles = {
    hideDays: {
      display: "none",
    },
  };

  function isPastDate(date: Date) {
    return differenceInCalendarDays(date, new Date()) < 0;
  }

  function isFutureDate(date: Date) {
    return differenceInCalendarDays(date, new Date()) >= 14;
  }

  function OnlyFutureRow(props: RowProps) {
    const isPastRow = props.dates.every(isPastDate);
    const isFutureRow = props.dates.every(isFutureDate);

    if (isPastRow) return <></>;
    if (isFutureRow) return <></>;
    return <Row {...props} />;
  }

  type WeekDayNumb = 0 | 1 | 2 | 3 | 4 | 5 | 6;

  return (
    <section id="calendar">
      <label>When do you want to travel?</label>
      {unfilledCalendar && (
        <p className="text-md text-red-500 font-bold">
          Please fill calendar value
        </p>
      )}
      <Spacer vertical={2} />
      <DayPicker
        weekStartsOn={new Date().getDay() as WeekDayNumb}
        // disabled={disabledDays}
        // fromDate={new Date()}
        // hidden={{ before: new Date(), to: inTwoWeeks }}
        components={{ Row: OnlyFutureRow }}
        locale={nb}
        disableNavigation
        mode="single"
        selected={selectedDate}
        onSelect={setSelectedDate}
        showOutsideDays
        style={{ margin: "0px" }}
        styles={{
          caption: { display: "none" },
        }}
      />
    </section>
  );
};
