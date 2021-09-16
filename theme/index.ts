import { extendTheme, ThemeConfig } from "@chakra-ui/react";
import styles from "./styles";

import Borders from "./foundations/borders";

import Button from "./components/button";
import Input from "./components/input";

const config: ThemeConfig = {
  initialColorMode: "light",
  useSystemColorMode: false,
};

const overrides = {
  styles,
  Borders,
  // Other foundational style overrides go here
  components: {
    Button,
    Input,
    // Other components go here
  },
  config,
};

const theme = extendTheme(overrides);
export default theme;
