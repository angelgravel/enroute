"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = __importDefault(require("fs"));
var loader_1 = __importDefault(require("@assemblyscript/loader"));
var imports = {
/* imports go here */
};
var wasmModule = loader_1.default.instantiateSync(fs_1.default.readFileSync(__dirname + "/assembly/optimized.wasm"), imports);
exports.default = wasmModule;
