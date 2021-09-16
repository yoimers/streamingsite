import { mode } from "@chakra-ui/theme-tools";

const Input = {
  baseStyle: {
    field: {},
  },
  sizes: {
    lg: {
      field: {},
    },
  },
  variants: {
    searchinput: (props: any) => ({
      field: {
        ...props.theme.components.Input.variants.outline(props).field,
        ml: 6,
        color: "gray.400",
        height: "40px",
        rounded: "10",
        borderRadius: "xl",
        background: mode(
          props.theme.colors.brand.backgroundcolor2,
          "gray.600"
        )(props),
        boxShadow: mode(
          `0 0 0 1px ${props.theme.colors.brand.backgroundcolor1}`,
          `0 0 0 1px gray.400`
        )(props),
        _focus: {
          a: console.log(
            props.theme.components.Input.variants.outline(props).field
          ),
          ...props.theme.components.Input.variants.outline(props).field._focus,
          boxShadow: `0 0 0 1px ${props.theme.colors.brand.maincolor}`,
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
