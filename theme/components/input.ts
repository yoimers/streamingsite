import { mode } from "@chakra-ui/theme-tools";

const Input = {
  baseStyle: {
    color: "tomato",
    background: "tomato",
  },
  sizes: {
    lg: {
      color: "tomato",
      rounded: "full",
    },
  },
  variants: {
    maininput: (props: any) => ({
      m: "10px",
      color: "gray.400",
      rounded: "full",
      background: "tomato",
      bg: "tomato",
      _hover: { bg: mode("blue.600", "blue.600")(props), rounded: "full" },
      _focus: { boxShadow: 0 },
      _active: { bg: mode("blue.800", "blue.700")(props) },
    }),
    outline: (props: any) => ({
      background: "tomato",
      _invalid: {
        borderWidth: "2px",
        borderColor: "red.300",
      },
      _focus: {
        borderWidth: "2px",
        borderColor: "brand.maincolor",
      },
    }),
  },
  defaultProps: {
    size: "lg",
    variant: "outline",
  },
};
export default Input;

// borderRadius: "xl",
// ml: 6,
// background: "tomato",
// _focus: {
//   borderWidth: "2px",
//   borderColor: "brand.maincolor",
// },
