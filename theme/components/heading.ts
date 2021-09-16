import { mode } from "@chakra-ui/theme-tools";

const Heading = {
  baseStyle: {},
  sizes: {
    md: {
      fontSize: "20px",
    },
  },
  variants: {
    menuitem: (props: any) => ({
      textColor: mode(props.theme.colors.brand.usercolor, "gray.200")(props),
      size: "md",
      fontWeight: "semibold",
      letterSpacing: 2,
      _hover: {},
    }),
    inputform: (props: any) => ({
      field: {
        ...props.theme.components.Heading.variants.outline(props).field,
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
          ...props.theme.components.Heading.variants.outline(props).field
            ._invalid,
          borderWidth: "1px",
          borderColor: "red.300",
        },
        _focus: {
          ...props.theme.components.Heading.variants.outline(props).field
            ._focus,
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
export default Heading;
