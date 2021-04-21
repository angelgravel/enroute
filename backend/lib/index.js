"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var dotenv_1 = __importDefault(require("dotenv"));
var initAsc_1 = __importDefault(require("./initAsc"));
/*============ ROUTES ============*/
var ping_1 = require("./routes/ping");
/*================================*/
dotenv_1.default.config();
/*======== AssemblyScript ========*/
console.log(initAsc_1.default.add(1, 2));
/*================================*/
var URL = process.env.NODE_ENV === "production" ? "REPLACE_ME" : "localhost";
var server = express_1.default();
server.use(cors_1.default());
/*=========== REQUESTS ===========*/
server.get("/ping", ping_1.pingGet);
server.post("/ping", ping_1.pingPost);
/*================================*/
server.listen(process.env.API_PORT, function () {
    console.log("\u26A1\uFE0F[server]: Server is running at https://" + URL + ":" + process.env.API_PORT);
});
