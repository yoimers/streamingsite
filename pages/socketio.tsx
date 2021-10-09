import React, { useEffect, useState } from "react";
import Pusher from "pusher-js";
import { Input } from "@chakra-ui/input";
import { FormControl } from "@chakra-ui/form-control";
import { Button } from "@chakra-ui/button";
import axios from "axios";

const Socketio = () => {
  const [name, setName] = useState("");
  useEffect(() => {
    let mounted = true;
    if (mounted) {
      // Pusher.logToConsole = true;
      const pusher = new Pusher("e3af43b0a52b711fa5e6", {
        cluster: "ap3",
        // authEndpoint: "api/pusher/auth",
        // auth: { params: { name } },
      });

      pusher.connection.bind("connected", () => {
        console.log(pusher.connection.socket_id);
      });

      const channel = pusher.subscribe("chat");
      channel.bind("message", (data: any) => {
        console.log(data);
      });
    }
    return () => {
      mounted = false;
    };
  }, [name]);
  const onClick = async (e: any) => {
    await axios.post("/api/pusher", { name });
  };
  return (
    <FormControl>
      <Input value={name} onChange={(e) => setName(e.target.value)} />
      <Button onClick={onClick} />
    </FormControl>
  );
};
export default Socketio;
