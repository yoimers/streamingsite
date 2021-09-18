import { extendTheme, ThemeConfig } from "@chakra-ui/react";
import Input from "./components/input";
import Button from "./components/button";
import Heading from "./components/heading";
import Drawer from "./components/drawer";
import styles from "./styles";
import colors from "./colors";

const config: ThemeConfig = {
  initialColorMode: "light",
  useSystemColorMode: false,
};

const overrides = {
  styles,
  colors,
  components: {
    Button,
    Input,
    Heading,
    Drawer,
  },
  config,
};

const theme = extendTheme(overrides);
export default theme;
