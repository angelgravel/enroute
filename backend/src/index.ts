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
import { createGame } from "./routes/game";
import Game from "./game/Game";
import { GameCreatedSocketResponse, PlayerJoinedSocketResponse } from "@typeDef/index";
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
  // console.log("a user connected");
  socket.emit("new user", "new user connected");

  // Create Game
  socket.on("create_game", () => {
    const newGame = new Game({ io, creatorSocket: socket });
    games[newGame.gameToken] = newGame;

    let response: GameCreatedSocketResponse = {
        created: false,
        message: {
          gameToken: "",
          playerID: "",
        },
      };

    if (newGame.gameToken.length > 0) {
      response = {
        created: true,
        message: {
          gameToken: newGame.gameToken,
          playerID: "",
        },
      };

      socket.join(newGame.gameToken);
      response.message.playerID = newGame.creator.id;

    } else {
      response.message.gameToken = "create_game/not_created";
    }
    
    socket.emit("game_created", response);
  });

  // Join Game
  socket.on("join_game", (gameToken: string) => {
    let response: PlayerJoinedSocketResponse = {
      joined: false,
      message: {
        gameToken: "",
        playerID: ""
      }
    };
    
    if (games[gameToken]?.joinable) {
      const playerID = games[gameToken].addPlayer(socket);
      response = {
        joined: true,
        message: {
          gameToken: gameToken,
          playerID: playerID
        }
      };
      
      socket.join(gameToken); // join game room
      games[gameToken].gameRoomSocket.emit("player_joined", response);
    } else {
      response.message.gameToken = "join_game/not_joined";
      socket.emit("player_joined", response); // Tell player they couldn't join
    }

  });
});

server.listen(process.env.API_PORT, () => {
  console.log(
    `⚡️[server]: Server is running at https://${URL}:${process.env.API_PORT}`,
  );
});


