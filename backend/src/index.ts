import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import wasmModule from "./initAsc";

/*============ ROUTES ============*/
import { pingGet, pingPost } from "./routes/ping";
/*================================*/

dotenv.config();

/*======== AssemblyScript ========*/
console.log((wasmModule as any).add(1, 2));
/*================================*/

const URL = process.env.NODE_ENV === "production" ? "REPLACE_ME" : "localhost";

const server = express();
server.use(cors());

/*=========== REQUESTS ===========*/

server.get("/ping", pingGet);
server.post("/ping", pingPost);

/*================================*/

server.listen(process.env.API_PORT, () => {
  console.log(
    `⚡️[server]: Server is running at https://${URL}:${process.env.API_PORT}`,
  );
});
