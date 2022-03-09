import Fastify from "fastify";
import FastifySocketIO from "fastify-socket.io";
import cors from "fastify-cors";
import dotenv from "dotenv";

/*============ IMPORT ROUTES ============*/
import Game from "./game/Game";
/*=======================================*/

/*============ IMPORT TYPES ============*/
import { AddSocketEmit, AddSocketPayload, SocketResponse } from "@typeDef/types";
import { createGame, joinGame } from "./routes/game";
/*=======================================*/

dotenv.config();

/*=========== AssemblyScript ===========*/
// console.log((wasmModule as any).add(1, 2));
/*======================================*/

const isDev = process.env.NODE_ENV !== "production";

const URL = isDev ? "localhost" : "api.enroute.vlq.se";

const app = Fastify({
  logger: false,
  // logger: process.env.NODE_ENV !== "production",
});
app.register(cors, {
  origin: "*",
  methods: ["GET", "PATCH", "POST"],
});

export class Store {
  public static games: Record<string, Game> = {};
}
/*=========================== ROUTES =========================*/

// app.get("/token", tokenValidatorMiddleware, getGameToken);
// app.get("/count_games", (req: Request, res: Response) => {
//   res.send(Object.keys(games).length);
// });
/********************** Create Game **********************/
app.post("/api/game", createGame);
app.patch("/api/game", joinGame);
/*********************************************************/

/* ======================== Socket IO ======================== */
app.register(FastifySocketIO, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

app.ready((err) => {
  if (err) throw err;

  const { io } = app;

  // socket = a client/person
  io.on("connection", (socket) => {
    console.log("from index: ", socket.id);
    /********************** Add Socket ***********************/
    socket.on("add_socket", (data: AddSocketEmit) => {
      const game = Store.games[data.gameToken];

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
    socket.on("disconnect", () => {
      console.log("Socket ", socket.id, "was disconnected!!!");
    });
  });
});

app.listen(process.env.API_PORT ?? "3001", () => {
  console.log(`⚡️[server]: Server is running at http${isDev ? "" : "s"}://${URL}:${process.env.API_PORT ?? "3001"}`);
});
/* ============================================================*/
