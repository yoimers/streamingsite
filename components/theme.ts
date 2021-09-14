import { extendTheme, ThemeConfig } from "@chakra-ui/react";
const colors = {
  fonts: {
    heading: "Noto Sans",
    body: "Noto Sans",
  },
  brand: {
    900: "#1a365d",
    800: "#153e75",
    700: "#2a69ac",
    mygray1: "#737373",
    mygray2: "#ECECEC",
    maincolor: "#6BA2F5",
    subcolor: "#D0E3FF",
    h2: "#3A3A3A",
    usercolor: "#575757",
    useridcolor: "rgba(87, 87, 87, 0.5)",
    backgroundcolor1: "#E6EDFF",
    backgroundcolor2: "rgba(230, 237, 255, 0.2)",
  },
  styles: {
    global: {
      body: {
        bg: "rgba(230, 237, 255, 0.2)",
      },
    },
  },
};
const config: ThemeConfig = {
  initialColorMode: "light",
  useSystemColorMode: false,
};
const theme = extendTheme({ colors, config });

export default theme;
