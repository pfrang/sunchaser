import { format } from "date-fns";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";

export const ChooseCalendarValue = ({
  selectedDate,
  setSelectedDate,
  invalidCalendarValue,
}) => {
  const today = new Date();
  const inTwoWeeks = new Date(today.setDate(today.getDate() + 14));

  const modifiers = {
    hideDays: {
      before: new Date(),
      after: inTwoWeeks,
    },
  };

  const modifiersStyles = {
    hideDays: {
      display: "none",
    },
  };

  return (
    <section id="calendar">
      <div>
        {invalidCalendarValue && (
          <p className="text-md text-red-500 text-center">
            Cannot pick a date earlier than today
          </p>
        )}
        {selectedDate && (
          <DayPicker
            modifiers={modifiers}
            modifiersStyles={modifiersStyles}
            mode="single"
            selected={selectedDate}
            onSelect={setSelectedDate}
          />
        )}
      </div>
    </section>
  );
};
