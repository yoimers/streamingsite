import { useColorModeValue } from "@chakra-ui/color-mode";
import React from "react";

const useScrollbar = () => {
  const scroll = useColorModeValue("brand.backgroundcolor2", "gray.600");

  const scrollstyle = {
    "&::-webkit-scrollbar": { width: "10px" },
    "&::-webkit-scrollbar-thumb": {
      background: "#A0AEC0",
      borderRadius: "5px",
    },
    "&::-webkit-scrollbar-track ": {},
    "&::-webkit-scrollbar-button ": {},
    "&::-webkit-scrollbar-corner ": {},
  };
  return scrollstyle;
};
// html::-webkit-scrollbar-button {
//   background: rgba(43, 45, 47, 1);
// }
// html::-webkit-scrollbar-corner {
//   background: rgba(43, 45, 47, 1);
// }
export default useScrollbar;
