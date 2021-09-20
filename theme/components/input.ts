import { mode } from "@chakra-ui/theme-tools";

const Input = {
  baseStyle: (props: any) => ({
    field: {
      background: mode("brand.backgroundcolor1", "gray.600")(props),
      boxShadow: mode(
        `0 0 0 1px ${props.theme.colors.brand.subcolor}`,
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
        background: mode("brand.backgroundcolor2", "brand.serchgray")(props),
        _focus: {
          ...props.theme.components.Input.variants.outline(props).field._focus,
          boxShadow: `0 0 0 1px ${props.theme.colors.brand.maincolor}`,
        },
      },
    }),
    commentinput: (props: any) => ({
      field: {
        h: 8,
        roundedRight: 0,
        border: "1px",
        pl: 2,
        fontSize: "xs",
        background: mode("brand.backgroundcolor2", "gray.700")(props),
        borderColor: mode("blue.100", "blue.700")(props),
        boxShadow: "0",
        _focus: {
          // ...props.theme.components.Input.variants.outline(props).field._focus,
          border: "1px",
          borderColor: mode("blue.500", "blue.200")(props),
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
