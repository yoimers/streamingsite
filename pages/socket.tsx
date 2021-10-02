import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import TextField from "@material-ui/core/TextField";
import AssignmentIcon from "@material-ui/icons/Assignment";
import PhoneIcon from "@material-ui/icons/Phone";
import React, { LegacyRef, useEffect, useRef, useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import Peer from "simple-peer";
import io from "socket.io-client";
import { Layout } from "../components/Layout";

const socket = io("http://localhost:5001");

function Socket() {
  const videoRef = useRef() as LegacyRef<HTMLVideoElement>;

  useEffect(() => {
    (async () => {
      const stream = await navigator.mediaDevices.getDisplayMedia({
        audio: true,
        video: true,
      }); 
    })();
  }, []);

  return (
    <Layout title="aaaaaaaaa">
      <video ref={videoRef} autoPlay playsInline></video>
    </Layout>
  );
}
export default Socket;
