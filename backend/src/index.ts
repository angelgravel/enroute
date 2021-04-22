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
import { GameCreatedSocketResponse } from "@typeDef/index";
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

io.on("connection", (socket) => {
  console.log("a user connected");
  socket.emit("test", "hej");

  // Create Game
  socket.on("create_game", () => {
    const newGame = new Game({ socket });
    games[newGame.gameToken] = newGame;

    let response: GameCreatedSocketResponse = {
        created: false,
        response: ""
      };

    if (newGame.gameToken.length > 0) {
      response = {
        created: true,
        response: newGame.gameToken
      };
    }
    
    socket.emit("game_created", response);
  });

  // Join Game
  socket.on("join_game", (gameToken: string) => {
    if (games[gameToken]?.joinable) {
      const playerID = games[gameToken].addPlayer();
      // Skicka playerID till klienten joina
    } else {
      // Spelet är fult, din sopa
    }
  });
});

server.listen(process.env.API_PORT, () => {
  console.log(
    `⚡️[server]: Server is running at https://${URL}:${process.env.API_PORT}`,
  );
});


