import { mode } from "@chakra-ui/theme-tools";

const Input = {
  // style object for base or default style
  baseStyle: {
    color: "tomato",
  },
  // styles for different sizes ("sm", "md", "lg")
  sizes: {
    lg: {
      color: "tomato",
      rounded: "full",
    },
  },
  // styles for different visual variants ("outline", "solid")
  variants: {
    maininput: (props: any) => ({
      color: "gray.400",
      rounded: "full",
      background: "brand.backgroundcolor2",
      bg: "tomato",
      _hover: { bg: mode("blue.600", "blue.600")(props), rounded: "full" },
      _focus: { boxShadow: 0 },
      _active: { bg: mode("blue.800", "blue.700")(props) },
    }),
    outline: (props: any) => ({
      background: "brand.backgroundcolor2",
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
  // default values for `size` and `variant`
  defaultProps: {
    size: "lg",
    variant: "maininput",
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
