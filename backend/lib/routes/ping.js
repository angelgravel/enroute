"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pingPost = exports.pingGet = void 0;
var pingGet = function (req, res) {
    res.status(204).end();
};
exports.pingGet = pingGet;
var pingPost = function (req, res) {
    res.status(204).end();
};
exports.pingPost = pingPost;
