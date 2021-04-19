"use strict";
// The entry file of your WebAssembly module.
Object.defineProperty(exports, "__esModule", { value: true });
exports.add = void 0;
function add(a, b) {
    console.log("Hej från AssemblyScript");
    return a + b;
}
exports.add = add;
