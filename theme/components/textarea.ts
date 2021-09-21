import { mode } from "@chakra-ui/theme-tools";

const Textarea = {
  baseStyle: (props: any) => ({
    background: mode("brand.backgroundcolor1", "gray.600")(props),
    boxShadow: mode(
      `0 0 0 1px ${props.theme.colors.brand.subcolor}`,
      `0 0 0 1px gray.400`
    )(props),
    rounded: "10",
    borderRadius: "xl",
    color: mode("gray.700", "gray.200")(props),
  }),
  sizes: {
    lg: {
      field: {},
    },
  },
  variants: {
    inputform: (props: any) => ({
      height: "200px",
      _invalid: {
        ...props.theme.components.Textarea.variants.outline(props)._invalid,
        borderWidth: "1px",
        borderColor: "red.300",
      },
      _focus: {
        ...props.theme.components.Textarea.variants.outline(props)._focus,
        borderWidth: "1px",
        borderColor: "brand.maincolor",
      },
    }),
  },
  defaultProps: {
    size: "lg",
    variant: "outline",
  },
};
export default Textarea;
