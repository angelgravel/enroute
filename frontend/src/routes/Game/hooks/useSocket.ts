import { createContext, useContext } from "react";
import socketioClient from "socket.io-client";

const SOCKET_URL = process.env.NODE_ENV === "production" ? "https://api.enroute.vlq.se" : "http://localhost:3001";

export const socket = socketioClient(SOCKET_URL, {
  withCredentials: true,
});

export const socketContext = createContext(socket);

const useSocket = () => {
  return useContext(socketContext);
};

export default useSocket;
