import { extendTheme } from "@chakra-ui/react";

const appTheme = extendTheme({
  colors: {
    black: {
      100: "#161616",
      200: "#1d1c1c",
    },
    grey: {
      100: "#00000097",
      200: "#c3c2c213",
      300: "#f7f8fb",
      400: "#535b63",
      500: "#D5D5D5",
    },
    white: {
      100: "#fff",
      200: "#F2F2F2",
      300: "#f2f3f3",
    },
    green: {
      100: "#03ab92",
    },
    red: {
      100: "#f24f62",
    },
    blue: {
      200: "#23406b",
    },
  },
  fonts: {
    heading: "'Open Sans', sans-serif",
    body: "'Open Sans', sans-serif",
  },
  fontWeights: {
    hairline: 100,
    thin: 200,
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
    black: 900,
  },
  boxShadow: {
    thin: {
      100: "rgba(50, 50, 105, 0.15) 0px 2px 5px 0px, rgba(0, 0, 0, 0.05) 0px 1px 1px 0px",
    },
  },
});

export default appTheme;
