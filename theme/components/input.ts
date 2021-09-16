import { mode } from "@chakra-ui/theme-tools";

const Input = {
  baseStyle: {
    field: {},
  },
  sizes: {
    lg: {
      color: "tomato",
      rounded: "full",
    },
  },
  variants: {
    searchinput: (props: any) => ({
      field: {
        ml: 6,
        color: "gray.400",
        rounded: "10",
        borderRadius: "xl",
        background: "brand.subcolor",
        _focus: {
          borderWidth: "2px",
          borderColor: "brand.maincolor",
        },
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
