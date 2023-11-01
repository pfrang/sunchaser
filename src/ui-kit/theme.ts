export type Color = keyof typeof theme.colors | "inherit";
export type Shadow = keyof typeof theme.shadows;
export type Radius = keyof typeof theme.radii;

type SpaceOptions = keyof typeof theme.space | `${number}px`;
export type Space =
  | SpaceOptions
  | [SpaceOptions, SpaceOptions]
  | [SpaceOptions, SpaceOptions, SpaceOptions]
  | [SpaceOptions, SpaceOptions, SpaceOptions, SpaceOptions];

export namespace SupportedFont {
  export type Family = "SuisseWorks" | "ProximaNova" | "SpaceMono";
  export type Weight = 700 | 600 | 400;
}

export const mediaBaseSize = 256;

const white = "#fff" as const;
const reds = [
  0,
  "#FFF2F2",
  "#FFD8D2",
  "#FFB0A7",
  "#FC7B6C",
  "#FC604E",
  "#F04B37",
  "#D3301C",
  "#A5210F",
  "#78170A",
  "#4F0D04",
  "#400C05",
] as const;
const violets = [
  0,
  "#F8E5FF",
  "#EEBFFF",
  "#C476E0",
  "#A95AC4",
  "#8E3DAB",
  "#72228E",
  "#61177B",
  "#460A5B",
  "#380B48",
  "#24062F",
  "#110615",
] as const;
const granites = [
  0,
  "#F3F2F1",
  "#EDEAE9",
  "#DDD9D5",
  "#CCC4BD",
  "#A9A097",
  "#8E847B",
  "#605953",
  "#44403B",
  "#37332F",
  "#262421",
  "#201D1A",
] as const;
const yellows = [
  0,
  "#FFF9DB",
  "#FFF5C7",
  "#FFEF9E",
  "#FFE66C",
  "#FFE04B",
  "#FFD715",
  "#EDC400",
  "#B89B12",
  "#786401",
  "#483F11",
  "#312B0B",
] as const;
const greens = [
  0,
  "#F1FAEE",
  "#D3FBE0",
  "#B1F6C7",
  "#7CECA1",
  "#47E17A",
  "#2EC961",
  "#21B752",
  "#13903C",
  "#076124",
  "#076124",
  "#042F12",
] as const;
const greys = [
  0,
  "rgba(255,250,250, 0.42)",
  "rgba(136, 139, 154, 0.20)",
  "#6F7383",
  "#E6E7EA",
] as const;

const blues = [
  0,
  "#00446A",
  "#004871",
  "#3C4566",
  "#323A55",
  "#262C42",
  "#47537B",
  "#6B93AA",
] as const;

const space1 = 4;
const space2 = 8;
const space3 = 12;
const space4 = 16;
const space5 = 24;
const space6 = 32;
const space7 = 40;
const space8 = 52;
const space9 = 64;
const space10 = 80;
const space11 = 96;
const space12 = 128;

export const spaces = [
  0,
  space1,
  space2,
  space3,
  space4,
  space5,
  space6,
  space7,
  space8,
  space9,
  space10,
  space11,
  space12,
] as const;

export const breakpoints = ["480px", "800px", "1024px", "1280px"] as const;

export const radii = {
  none: "none",
  xs: "2px",
  sm: "4px",
  m: "5px",
  l: "8px",
  xl: "10px",
  full: "100%",
} as const;

export const colors = {
  white,
  red: reds,
  violet: violets,
  granite: granites,
  yellow: yellows,
  green: greens,
  grey: greys,
  blues: blues,
};

export const theme = {
  breakpoints,

  space: spaces,

  color: colors,

  colors: {
    white: colors.white,
    graniteLightest: colors.granite[1],
    graniteLight: colors.granite[3],
    graniteMedium: colors.granite[5],
    graniteMediumDark: colors.granite[7],
    graniteDark: colors.granite[10],
    black: colors.granite[11],
    pinkLight: colors.red[1],
    pink: colors.red[2],
    red: colors.red[6],
    redText: colors.red[7],
    redDark: colors.red[11],
    violetDark: colors.violet[10],
    violetMediumDark: colors.violet[8],
    violet: colors.violet[6],
    violetLight: colors.violet[1],
    whiteSmoke: colors.grey[1],
    yellowLight: colors.yellow[2],
    yellow: colors.yellow[6],
    green: colors.green[1],
    greenLight: colors.green[1],
    greenMediumLight: colors.green[1],
    greenDark: colors.green[11],
  },

  fontColors: {
    violetDark: colors.violet[10],
    violetLight: colors.violet[2],
    violetSuperLight: colors.violet[1],
    white: colors.white,
  },

  shadows: {
    none: "none",
    elevation01: "0 0 6px -2px rgba(0, 0, 0, 0.25)",
    elevation02: "0 0 10px -2px rgba(0, 0, 0, 0.25)",
  },

  radii: radii,

  maxContentWidth: 1600,
};

export type AppTheme = typeof theme;
