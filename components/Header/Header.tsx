import { useBreakpointValue } from "@chakra-ui/react";
import React from "react";
import useIsMobile from "../../hooks/useIsMobile";
import MobileHeader from "./MobileHeader";
import PcHeader from "./PcHeader";

const Header = () => {
  const isMobile = useIsMobile();
  return isMobile ? <MobileHeader /> : <PcHeader />;
};

export default Header;
