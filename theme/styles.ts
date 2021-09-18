import { mode } from "@chakra-ui/theme-tools";

const styles = {
  fonts: {
    heading: "Noto Sans",
    body: "Noto Sans",
  },
  global: (props: any) => ({
    "html, body": {
      color: mode("gray.800", "whiteAlpha.900")(props),
      bg: mode("white", "gray.700")(props),
    },
    a: {
      _hover: {
        textDecoration: "none",
      },
    },
  }),
};

export default styles;
