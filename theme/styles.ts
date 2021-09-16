import { mode } from "@chakra-ui/theme-tools";

const styles = {
  fonts: {
    heading: "Noto Sans",
    body: "Noto Sans",
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
