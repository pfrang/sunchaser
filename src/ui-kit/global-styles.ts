export const globalCss = {
  "& html, body": {
    boxSizing: "border-box",
    padding: "0px",
    margin: "0px",
    minHeight: "100vh",
    fontFamily:
      "-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif",
    backgroundColor: "#CFD1DE",
  },

  "& img[width], img[height]": {
    maxWidth: "none",
  },

  "& h3": {
    fontFamily: "'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif",
  },

  "& a": {
    color: "inherit",
    textDecoration: "none",
  },

  "*, *:before, *:after": {
    boxSizing: "inherit",
  },

  "& .rdp-button_reset.rdp-button.rdp-day.daypicker-selected-date": {
    backgroundColor: "rgba(44, 92, 50) !important",
    color: "white !important",
    fontWeight: "bold !important",
  },

  "& .rdp-button_reset:hover:not([disabled])": {
    backgroundColor: "rgba(44, 92, 50, 0.25) !important",
  },

  "& dialog": {
    pointerEvents: "none",
    opacity: 0,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },

  "& dialog[open]": {
    opacity: 1,
    pointerEvents: "inherit",
    transform: "translateY(-50%, 0)",
  },

  "& .range-thumb": {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "30px",
    height: "30px",
    fill: "#555",
    pointerEvents: "none",
    zIndex: "2",
  },

  "& .range-slider": {
    WebkitAppearance: "none",
    width: "100%",
    height: "10px",
    background: "#ddd",
    outline: "none",
    opacity: 0,
    /* Hide the default thumb */
    position: "relative",
    zIndex: 1,
  },

  "& #bouncingArrow": {
    marginTop: "100px",
    right: "20px",
    animation: "2s infinite bounce",
  },
};
