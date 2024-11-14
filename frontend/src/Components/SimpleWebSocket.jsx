// WebSocketComponent.js
import React, { useEffect, useState } from "react";

const WebSocketComponent = () => {
  const [message, setMessage] = useState("");
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    // Connect to the WebSocket server
    const ws = new WebSocket("ws://127.0.0.1:8000/ws");
    setSocket(ws);

    ws.onopen = () => {
      console.log("Connected to WebSocket server");
    };

    ws.onmessage = (event) => {
      console.log(event.data);
      setMessage(event.data);
    };

    ws.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    return () => {
      if (ws) {
        ws.close();
      }
    };
  }, []);

  const sendMessage = () => {
    if (socket) {
      socket.send("Hello from React!");
    }
  };

  return (
    <div>
      <button onClick={sendMessage}>Send Message</button>
      <p>Message from Server: {message}</p>
    </div>
  );
};

export default WebSocketComponent;
