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

import { Spacer } from "../../ui-kit/spacer/spacer";

export const ChooseCalendarValue = ({
  unfilledCalendar,
  selectedDate,
  setSelectedDate,
}) => {
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
        disabled={disabledDays}
        // fromDate={new Date()}
        // hidden={{ before: new Date(), to: inTwoWeeks }}
        components={{ Row: OnlyFutureRow }}
        locale={nb}
        disableNavigation
        mode="single"
        selected={selectedDate}
        onSelect={setSelectedDate}
        showOutsideDays
        fixedWeeks
        style={{ margin: "0px" }}
        styles={{
          caption: { display: "none" },
        }}
      />
    </section>
  );
};
