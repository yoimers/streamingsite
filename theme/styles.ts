import { mode } from "@chakra-ui/theme-tools";

const styles = {
  fonts: {
    heading: "Noto Sans",
    body: "Noto Sans",
  },
  global: (props: any) => ({
    "html, body": {
      color: mode("gray.800", "whiteAlpha.900")(props),
      bg: mode("gray.200", "gray.700")(props),
    },
    a: {
      _hover: {
        textDecoration: "none",
      },
    },
  }),
};

export default styles;
// html::-webkit-scrollbar {
//   width: 10px;
// }

// html::-webkit-scrollbar-thumb {
//   background: rgba(23, 25, 27, 0.8);

//   border-radius: 3px;
// }

// html::-webkit-scrollbar-track {
//   background: rgba(43, 45, 47, 1);
// }

// html::-webkit-scrollbar-button {
//   background: rgba(43, 45, 47, 1);
// }
// html::-webkit-scrollbar-corner {
//   background: rgba(43, 45, 47, 1);
// }
