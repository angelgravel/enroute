import express, { Request, Response } from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors";
import dotenv from "dotenv";

/*============ IMPORT ROUTES ============*/
import Game from "./game/Game";
/*=======================================*/

/*============ IMPORT TYPES ============*/
import {
  AddSocketEmit,
  AddSocketPayload,
  CreateJoinSocketPayload,
  PlayerClient,
  SocketResponse,
} from "@typeDef/index";
import { createGame, joinGame } from "./routes/game";
/*=======================================*/

dotenv.config();

/*=========== AssemblyScript ===========*/
// console.log((wasmModule as any).add(1, 2));
/*======================================*/

const URL = process.env.NODE_ENV === "production" ? "REPLACE_ME" : "localhost";

const app = express();
app.use(
  cors({
    origin: "*",
    methods: "*",
  }),
);
app.use(express.json());

export type Games = {
  [gameToken: string]: Game;
};
let games: Games = {};

/*=========================== ROUTES =========================*/

// app.get("/token", tokenValidatorMiddleware, getGameToken);
// app.get("/count_games", (req: Request, res: Response) => {
//   res.send(Object.keys(games).length);
// });
/********************** Create Game **********************/
app.post("/game", (req: Request, res: Response) => createGame(req, res, games));
app.patch("/game", (req: Request, res: Response) => joinGame(req, res, games));
/*********************************************************/

/*============================================================*/

const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

// socket = a client/person
io.on("connection", (socket) => {
  console.log("from index: ", socket.id);
  /********************** Add Socket ***********************/
  socket.on("add_socket", (data: AddSocketEmit) => {
    const game = games[data.gameToken];

    if (!game) {
      const response: SocketResponse<AddSocketPayload> = {
        success: false,
        message: "add_socket/not_added",
        payload: "Could not add socket",
      };
      socket.emit("add_socket", response);
      return;
    }

    game.addSocket(socket, io, data.playerId);
  });
  /*********************************************************/

  /******************* Pick Init Tickets ********************/
  // socket.on("pick_initial_tickets", (data: AddSocketEmit) => {
  //   const game = games[data.gameToken];

  //   if (!game) {
  //     const response: SocketResponse<AddSocketPayload> = {
  //       success: false,
  //       message: "add_socket/not_added",
  //       payload: "Could not add socket",
  //     };
  //     socket.emit("add_socket", response);
  //     return;
  //   }

  //   game.addSocket(socket, io, data.playerId);
  // });
  /*********************************************************/
});

server.listen(process.env.API_PORT, () => {
  console.log(
    `⚡️[server]: Server is running at https://${URL}:${process.env.API_PORT}`,
  );
});
