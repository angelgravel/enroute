import { Socket } from "socket.io-client";

import { SocketEvent } from "@typeDef/index";

const socketEmit = (socket: Socket, event: SocketEvent, message?: any) => {
  socket.emit(event, message);
};

export default socketEmit;
