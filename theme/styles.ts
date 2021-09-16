import { extendTheme, ThemeConfig } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";

const styles = {
  fonts: {
    heading: "Noto Sans",
    body: "Noto Sans",
  },
  brand: {
    mygray1: "#737373",
    mygray2: "#ECECEC",
    maincolor: "#6BA2F5",
    subcolor: "#D0E3FF",
    h2: "#3A3A3A",
    h2dark: "rgba(255, 255, 255, 0.92)",
    usercolor: "#575757",
    useridcolor: "rgba(87, 87, 87, 0.5)",
    backgroundcolor1: "#E6EDFF",
    backgroundcolor2: "rgba(230, 237, 255, 0.2)",
  },
  styles: {
    global: (props: any) => ({
      "html, body": {
        color: mode("gray.100", "gray.800")(props),
        bg: "rgba(230, 237, 255, 0.2)",
      },
    }),
  },
};

export default styles;
