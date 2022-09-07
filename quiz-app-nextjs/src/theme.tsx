import { extendTheme } from "@chakra-ui/react";

const fonts = { mono: `'Menlo', monospace` };

const breakpoints = {
  sm: "40em",
  md: "52em",
  lg: "64em",
  xl: "80em",
};

const theme = extendTheme({
  semanticTokens: {
    radii: {
      button: "12px",
    },
  },
  colors: {
    black: "#16161D",
  },
  breakpoints: breakpoints,
  fonts,
});

export default theme;
