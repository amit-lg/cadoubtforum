import { io } from "socket.io-client";
import { socketUrl } from "../config";

let socket;

export const connectToSocket = (token) => {
  socket = io(socketUrl, {
    auth: {
      token: token,
    },
  });

  console.log("connected");
};

export const getSocket = () => {
  return socket;
};
