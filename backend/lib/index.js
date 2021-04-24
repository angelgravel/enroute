"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var http_1 = require("http");
var socket_io_1 = require("socket.io");
var cors_1 = __importDefault(require("cors"));
var dotenv_1 = __importDefault(require("dotenv"));
// import wasmModule from "./initAsc";
/*========== IMPORT MIDDLEWARE ==========*/
var tokenValidator_1 = __importDefault(require("./middleware/tokenValidator"));
/*=======================================*/
/*============ IMPORT ROUTES ============*/
var token_1 = require("./routes/token");
var Game_1 = __importDefault(require("./game/Game"));
/*=======================================*/
dotenv_1.default.config();
/*=========== AssemblyScript ===========*/
// console.log((wasmModule as any).add(1, 2));
/*======================================*/
var URL = process.env.NODE_ENV === "production" ? "REPLACE_ME" : "localhost";
var app = express_1.default();
app.use(cors_1.default());
/*=============== ROUTES ===============*/
app.get("/token", tokenValidator_1.default, token_1.getGameToken);
// app.post("/game", createGame);
/*======================================*/
var server = http_1.createServer(app);
var io = new socket_io_1.Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
    },
});
var games = {};
// socket = a client/person
io.on("connection", function (socket) {
    // console.log("a user connected");
    socket.emit("new user", "new user connected");
    // Create Game
    socket.on("create_game", function () {
        var newGame = new Game_1.default({ io: io, creatorSocket: socket });
        games[newGame.gameToken] = newGame;
        var response = {
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
        }
        else {
            response.message.gameToken = "create_game/not_created";
        }
        socket.emit("game_created", response);
    });
    // Join Game
    socket.on("join_game", function (gameToken) {
        var _a;
        var response = {
            joined: false,
            message: {
                gameToken: "",
                playerID: ""
            }
        };
        if ((_a = games[gameToken]) === null || _a === void 0 ? void 0 : _a.joinable) {
            var playerID = games[gameToken].addPlayer(socket);
            response = {
                joined: true,
                message: {
                    gameToken: gameToken,
                    playerID: playerID
                }
            };
            socket.join(gameToken); // join game room
            games[gameToken].gameRoomSocket.emit("player_joined", response);
        }
        else {
            response.message.gameToken = "join_game/not_joined";
            socket.emit("player_joined", response); // Tell player they couldn't join
        }
    });
});
server.listen(process.env.API_PORT, function () {
    console.log("\u26A1\uFE0F[server]: Server is running at https://" + URL + ":" + process.env.API_PORT);
});
