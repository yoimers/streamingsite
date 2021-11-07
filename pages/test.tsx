import React, { useEffect, useRef, useState } from "react";

const Test: React.FC = () => {
  useEffect(() => {
    navigator.mediaDevices.enumerateDevices().then((devices) => {
      devices.map((device) => {
        console.log(device);
        if (
          device.kind === "videoinput" &&
          device.label === "OBS Virtual Camera"
        ) {
        }
      });
    });
  }, []);
  return <></>;
};

export default Test;
