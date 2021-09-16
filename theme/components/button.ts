import { mode } from "@chakra-ui/theme-tools";
import styles from "../styles";

const Buttons = {
  baseStyle: {
    color: "white",
    size: "lg",
    background: "brand.maincolor",
    rounded: "full",
    fontSize: "2xl",
    fontWeight: "semibold",
    letterSpacing: "0.16px",
  },
  sizes: {},
  variants: {
    mainbutton: (props: any) => ({
      bg: mode(styles.brand.maincolor, styles.brand.maincolor)(props),
      _hover: { bg: "blue.500" },
      _focus: {},
      _active: {},
    }),
  },
  defaultProps: {
    variant: "solid",
  },
};
export default Buttons;
