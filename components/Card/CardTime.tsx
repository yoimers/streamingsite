import React, { useEffect, useState } from "react";
import { Heading } from "@chakra-ui/react";
import moment from "moment";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import { Timestamp } from "firebase/firestore";

type Input = {
  createdAt: number;
};

const CardTime = ({ createdAt }: Input) => {
  const [time, setTime] = useState(moment().diff(createdAt * 1000));
  useEffect(() => {
    const Interval = setInterval(() => {
      setTime((prev) => prev + 1000);
    }, 1000);
    return () => clearInterval(Interval);
  }, []);
  const { hour, minute, second } = timetostring(time);
  return (
    <>
      <AccessTimeIcon style={{ fontSize: "16px" }} />
      <Heading variant="menuitem" as="h4" size="xs">
        {hour}:{minute}:{second}
      </Heading>
    </>
  );
};

export default CardTime;

const timetostring = (time: number) => {
  const t = Math.floor(time / 1000);
  const hour = Math.floor(t / 3600);
  const minute =
    Math.floor((t % 3600) / 60) / 10 < 1
      ? "0" + Math.floor((t % 3600) / 60)
      : Math.floor((t % 3600) / 60);
  const second =
    (t % 60) / 10 < 1 ? "0" + (t % 60).toString() : (t % 60).toString();
  return { hour, minute, second };
};
