import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors";
import dotenv from "dotenv";

// import wasmModule from "./initAsc";

/*========== IMPORT MIDDLEWARE ==========*/
import tokenValidatorMiddleware from "./middleware/tokenValidator";
/*=======================================*/

/*============ IMPORT ROUTES ============*/
import { getGameToken } from "./routes/token";
import Game from "./game/Game";
/*=======================================*/

/*============ IMPORT TYPES ============*/
import {
  CreateJoinSocketPayload,
  PlayerEmit,
  SocketResponse,
} from "@typeDef/index";
/*=======================================*/

dotenv.config();

/*=========== AssemblyScript ===========*/
// console.log((wasmModule as any).add(1, 2));
/*======================================*/

const URL = process.env.NODE_ENV === "production" ? "REPLACE_ME" : "localhost";

const app = express();
app.use(cors());

/*=============== ROUTES ===============*/

app.get("/token", tokenValidatorMiddleware, getGameToken);
// app.post("/game", createGame);

/*======================================*/

const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

type Games = {
  [gameToken: string]: Game;
};
let games: Games = {};

// socket = a client/person
io.on("connection", (socket) => {
  console.log("from index: ", socket.id);
  /********************** Create Game **********************/
  socket.on("create_game", () => {
    const newGame = new Game(socket, io);
    games[newGame.gameToken] = newGame;

    let response: Partial<SocketResponse<CreateJoinSocketPayload>> = {
      success: false,
    };

    if (newGame.gameToken.length > 0) {
      response = {
        success: true,
        message: "create_game/created",
        payload: {
          gameToken: newGame.gameToken,
          player: {
            playerID: newGame.creator.id,
            color: newGame.creator.color,
            nickname: newGame.creator.nickname,
            remainingTracks: newGame.creator.remainingTracks,
            haveChosenTickets: newGame.creator.haveChosenTickets,
          },
        },
      };

      socket.join(newGame.gameToken);
    } else {
      response.message = "create_game/not_created";
    }

    socket.emit("create_game", response);
  });

  /********************** Join Game **********************/
  socket.on("join_game", (gameToken: string) => {
    let response: Partial<SocketResponse<CreateJoinSocketPayload>> = {
      success: false,
    };

    try {
      if (games[gameToken]?.joinable) {
        const player = games[gameToken].addPlayer(socket);
        response = {
          success: true,
          message: "join_game/joined",
          payload: {
            gameToken: gameToken,
            player: player,
          },
        };

        // Join game room
        socket.join(gameToken);
        socket.emit("join_game", response);
      } else {
        response.message = "join_game/not_joined";
        socket.emit("join_game", response);
      }
    } catch (err) {
      response.message = err.message;
      socket.emit("join_game", response);
    }
  });
});

server.listen(process.env.API_PORT, () => {
  console.log(
    `⚡️[server]: Server is running at https://${URL}:${process.env.API_PORT}`,
  );
});
