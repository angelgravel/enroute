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
import { SocketResponse } from "@typeDef/index";
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
  // Create Game
  socket.on("create_game", () => {
    const newGame = new Game({ io, creatorSocket: socket });
    games[newGame.gameToken] = newGame;

    let response: SocketResponse = {
      success: false,
      message: "",
      payload: {
        gameToken: "",
        playerID: "",
      },
    };

    if (newGame.gameToken.length > 0) {
      response = {
        success: true,
        message: "create_game/created",
        payload: {
          gameToken: newGame.gameToken,
          playerID: "",
        },
      };

      socket.join(newGame.gameToken);
      response.payload.playerID = newGame.creator.id;
    } else {
      response.message = "create_game/not_created";
    }

    socket.emit("game_created", response);
  });

  // Join Game
  socket.on("join_game", (gameToken: string) => {
    let response: SocketResponse = {
      success: false,
      message: "",
      payload: {
        gameToken: "",
        playerID: "",
      },
    };

    if (games[gameToken]?.joinable) {
      const playerID = games[gameToken].addPlayer(socket);
      response = {
        success: true,
        message: "join_game/joined",
        payload: {
          gameToken: gameToken,
          playerID: playerID,
        },
      };

      // Join game room
      socket.join(gameToken);
      games[gameToken].gameRoomSocket.emit("player_joined", response);
    } else {
      response.message = "join_game/not_joined";
      socket.emit("player_joined", response);
    }
  });
});

server.listen(process.env.API_PORT, () => {
  console.log(
    `⚡️[server]: Server is running at https://${URL}:${process.env.API_PORT}`,
  );
});
