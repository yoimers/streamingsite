import { useBreakpointValue } from "@chakra-ui/react";
import React from "react";
import MobileHeader from "./MobileHeader";
import PcHeader from "./PcHeader";

const Header = () => {
  const isMobile = useBreakpointValue({ base: true, md: false });
  return isMobile ? <MobileHeader /> : <PcHeader />;
};

export default Header;
