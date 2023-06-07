const MostUsed = require("./helpers/tracker");
const express = require("express");

const app = express();
app.enable("trust proxy");
const mostUsed = new MostUsed();

app.get("/", (req: express.Request, res: express.Response) => {
  mostUsed.requestHandled(req.ip);
  res.json({ message: "Succeess!" });
});

app.get("/100", (_req: express.Request, res: express.Response) => {
  res.json(mostUsed.get100());
});

app.get("/clear", (_req: express.Request, res: express.Response) => {
  mostUsed.clear();
  res.json({ message: "Cleared!" });
});

module.exports = app;
