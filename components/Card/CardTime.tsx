import React, { useEffect, useRef, useState } from "react";
import { Flex, Heading } from "@chakra-ui/react";
import AccessTimeIcon from "@material-ui/icons/AccessTime";

type Input = {
  createdAt: number;
};

const CardTime = ({ createdAt }: Input) => {
  const [time, setTime] = useState(Math.round(Date.now() / 1000) - createdAt);
  useEffect(() => {
    const Interval = setInterval(() => {
      setTime(Math.round(Date.now() / 1000) - createdAt);
    }, 1000);
    return () => clearInterval(Interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [Date.now(), createdAt]);
  const { hour, minute, second } = timetostring(time);
  return (
    <Flex flexDirection="row" justifyContent="flex-start">
      <AccessTimeIcon style={{ fontSize: "16px" }} />
      <Heading variant="menuitem" as="h4" size="xs" ml={1}>
        {hour}:{minute}:{second}
      </Heading>
    </Flex>
  );
};

export default CardTime;

//timeの単位は[s]
const timetostring = (time: number) => {
  const hour = Math.floor(time / 3600);
  const minute =
    Math.floor((time % 3600) / 60) / 10 < 1
      ? "0" + Math.floor((time % 3600) / 60)
      : Math.floor((time % 3600) / 60);
  const second =
    (time % 60) / 10 < 1
      ? "0" + (time % 60).toString()
      : (time % 60).toString();
  return { hour, minute, second };
};
