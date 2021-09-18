import { mode } from "@chakra-ui/theme-tools";

const Input = {
  baseStyle: (props: any) => ({
    field: {
      background: mode("brand.backgroundcolor2", "gray.600")(props),
      boxShadow: mode(
        `0 0 0 1px ${props.theme.colors.brand.backgroundcolor1}`,
        `0 0 0 1px gray.400`
      )(props),
      rounded: "10",
      borderRadius: "xl",
      color: mode("gray.700", "gray.200")(props),
    },
  }),
  sizes: {
    lg: {
      field: {},
    },
  },
  variants: {
    searchinput: (props: any) => ({
      field: {
        ml: 6,
        height: "40px",
        _focus: {
          ...props.theme.components.Input.variants.outline(props).field._focus,
          boxShadow: `0 0 0 1px ${props.theme.colors.brand.maincolor}`,
        },
      },
    }),
    mobilesearchinput: (props: any) => ({
      field: {
        ...props.theme.components.Input.variants.outline(props).field,
        ml: 6,
        _focus: {
          ...props.theme.components.Input.variants.outline(props).field._focus,
          boxShadow: `0 0 0 1px ${props.theme.colors.brand.maincolor}`,
        },
      },
    }),
    inputform: (props: any) => ({
      field: {
        height: "40px",
        _invalid: {
          ...props.theme.components.Input.variants.outline(props).field
            ._invalid,
          borderWidth: "1px",
          borderColor: "red.300",
        },
        _focus: {
          ...props.theme.components.Input.variants.outline(props).field._focus,
          borderWidth: "1px",
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
