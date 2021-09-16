import { extendTheme, ThemeConfig } from "@chakra-ui/react";
import Input from "./components/input";
import Button from "./components/button";
import Borders from "./foundations/borders";
import styles from "./styles";

const config: ThemeConfig = {
  initialColorMode: "light",
  useSystemColorMode: false,
};

const overrides = {
  styles,
  Borders,
  // Other foundational style overrides go here
  components: {
    Input,
    Button,
    // Other components go here
  },
  config,
};

const theme = extendTheme(overrides);
export default theme;
