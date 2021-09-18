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
        color: mode("gray.700", "gray.200")(props),
        height: "40px",
        rounded: "10",
        borderRadius: "xl",
        background: mode("brand.backgroundcolor2", "gray.700")(props),
        boxShadow: mode(
          `0 0 0 1px ${props.theme.colors.brand.backgroundcolor1}`,
          `0 0 0 1px gray.400`
        )(props),
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
        color: mode("gray.700", "gray.200")(props),
        rounded: "10",
        borderRadius: "xl",
        background: mode("brand.backgroundcolor2", "gray.700")(props),
        boxShadow: mode(
          `0 0 0 1px ${props.theme.colors.brand.backgroundcolor1}`,
          `0 0 0 1px gray.400`
        )(props),
        _focus: {
          ...props.theme.components.Input.variants.outline(props).field._focus,
          boxShadow: `0 0 0 1px ${props.theme.colors.brand.maincolor}`,
        },
      },
    }),
    inputform: (props: any) => ({
      field: {
        ...props.theme.components.Input.variants.outline(props).field,
        color: mode("gray.700", "gray.200")(props),
        height: "40px",
        rounded: "10",
        borderRadius: "xl",
        background: mode(
          props.theme.colors.brand.backgroundcolor2,
          // "blue.50",
          "brand.backgroundcolor2"
        )(props),
        boxShadow: mode(
          `0 0 0 1px ${props.theme.colors.brand.backgroundcolor1}`,
          `0 0 0 1px gray.400`
        )(props),
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
