export const keyframes = {
  spin: {
    "0%": {
      transform: "rotate(0)",
    },
    "100%": {
      transform: "rotate(360deg)",
    },
  },
  popUp: {
    "0%": {
      transform: "translate3d(0, 10px, 0)",
      opacity: 0,
    },
    "100%": {
      transform: "translate3d(0, 0, 0)",
      opacity: 1,
    },
  },

  bounce: {
    "0%": {
      transform: "translateX(0)",
    },
    "50%": {
      transform: "translateX(10px)",
    },
    "100%": {
      transform: "translateX(0)",
    },
  },

  animationLine: {
    "0%": { width: "0%" },
    "25%": { width: "25%" },
    "50%": {
      width: "50%",
      marginLeft: "25%",
      boxShadow: "0px 100px 30px 100px rgba(0, 0, 0, 0.2)",
    },
    "75%": { width: "50%", marginLeft: "50%" },
    "100%": { width: "1%", marginLeft: "99%" },
  },
  anmiationSun: {
    "0%": { width: "0%" },
    "50%": { width: "50%", marginLeft: "25%", top: "2%" },
    "100%": { width: "1%", marginLeft: "99%", top: "30%" },
  },
  animationLetters: {
    "0%": { left: "0%" },
    "50%": { left: "50%" },
    "100%": { left: "100%", whiteSpace: "nowrap", overflow: "hidden" },
  },
};
