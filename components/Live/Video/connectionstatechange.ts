export const connectionstatechange =
  (peer: RTCPeerConnection) => (e: Event) => {
    switch (peer.connectionState) {
      case "disconnected":
      case "closed":
        console.log("disconnected");
        break;
      case "failed":
        console.log("failed");
        break;
    }
  };
