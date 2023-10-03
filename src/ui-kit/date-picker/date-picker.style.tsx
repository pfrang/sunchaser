import styled from "styled-components";
import { SpaceProps, layout } from "styled-system";
import sscss from "@styled-system/css";

import { theme } from "../theme";
export const datePickerDesktopWidth = "350px";

const Wrapper = styled.div<SpaceProps>`
  .react-datepicker-wrapper,
  .react-datepicker__input-container,
  .react-datepicker__input-container input {
    width: 100%;
    ${layout};
  }

  .react-datepicker-popper {
    ${sscss({
      width: ["100%", datePickerDesktopWidth],
      paddingX: [4, 0],
      zIndex: 999,
    })}
  }

  ${layout};
`;

const Calendar = styled.div`
  ${sscss({
    borderRadius: theme.radii.xl,
    boxShadow: ` 0 0 6px ${theme.colors.violet}`,
    width: "100%",
    overflow: "hidden",
  })}

  .react-datepicker__month-container {
    ${sscss({
      width: "100%",
    })}
  }

  .react-datepicker__header {
    ${sscss({
      width: "100%",
      padding: 0,
      backgroundColor: theme.colors.violetLight,
    })}
  }

  .react-datepicker__day-names {
    ${sscss({
      marginY: 3,
      textTransform: "capitalize",
      paddingX: [5],
      width: "100%",
      display: "flex",
      justifyContent: "space-between",
    })}
  }

  .react-datepicker__day-name {
    ${sscss({
      fontFamily: "ProximaNova",
      fontWeight: "400",
      fontSize: "16px",
      lineHeight: "24px",
      color: theme.colors.violetDark,
    })}
  }

  .react-datepicker__month {
    ${sscss({ paddingY: [3], paddingX: [4], margin: 0 })}
    background-color: white;
  }

  .react-datepicker__week {
    ${sscss({
      width: "100%",
      display: "flex",
      justifyContent: "space-between",
    })}
  }

  .react-datepicker__day {
    ${sscss({
      color: theme.colors.violetDark,
      backgroundColor: theme.colors.white,
      borderRadius: "50%",
      width: "32px",
      height: "32px",
    })}
  }
`;

const Header = styled.div`
  ${sscss({
    width: "100%",
    paddingTop: 4,
    paddingX: 5,
  })}
`;

const MonthSwitcher = styled.div`
  ${sscss({
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    textTransform: "capitalize",
  })}

  .chevron {
    cursor: pointer;
  }
`;

const DayWrapper = styled.div`
  ${sscss({
    borderRadius: "50%",
    backgroundColor: theme.colors.white,
  })}
`;

const SelectedDayWrapper = styled.div`
  ${sscss({
    borderRadius: "50%",
    backgroundColor: theme.colors.violetDark,
    color: theme.colors.white,
    fontWeight: "600",
  })}

  p {
    ${sscss({
      fontWeight: "600",
    })}
  }
`;

export const DatePickerStyle = {
  Wrapper,
  Calendar,
  Header,
  MonthSwitcher,
  DayWrapper,
  SelectedDayWrapper,
};
