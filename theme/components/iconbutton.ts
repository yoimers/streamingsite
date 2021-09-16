import { mode } from "@chakra-ui/theme-tools";
import styles from "../styles";

const iconbutton = {
  baseStyle: {},
  sizes: {
    xl: {
      size: "2xl",
      fontSize: "2xl",
      fontWeight: "semibold",
      height: "50px",
      width: "140px",
      letterSpacing: "0.5px",
    },
  },
  variants: {
    mainbutton: (props: any) => ({
      color: "white",
      rounded: "full",
      bg: mode(styles.brand.maincolor, "blue.500")(props),
      _hover: { bg: mode("blue.600", "blue.600")(props) },
      _focus: { boxShadow: 0 },
      _active: { bg: mode("blue.800", "blue.700")(props) },
    }),
    subbutton: (props: any) => ({
      color: mode(props.theme.styles.brand.usercolor, "gray.200")(props),
      rounded: "full",
      bg: mode(props.theme.styles.brand.mygray2, "gray.600")(props),
      _hover: { bg: mode("gray.300", "gray.700")(props) },
      _focus: { boxShadow: 0 },
      _active: { bg: mode("gray.400", "gray.700")(props) },
    }),
  },

  defaultProps: {
    variant: "solid",
  },
};
export default iconbutton;
