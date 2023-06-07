"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const MostUsed = require("./helpers/tracker");
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const mostUsed = new MostUsed();
app.get("/", (req, res) => {
    mostUsed.requestHandled(req.ip);
    res.json({ message: "Succeess!" });
});
app.get("/100", (_req, res) => {
    res.json(mostUsed.get100());
});
app.get("/clear", (_req, res) => {
    mostUsed.clear();
    res.json({ message: "Cleared!" });
});
exports.default = app;
