const express = require("express");
const fs = require("fs/promises");
const path = require("path");
const config = require("./config.json");
const chokidar = require("chokidar");
const dotenv = require("dotenv");
dotenv.config("./.env");

const GLOBAL_CONFIG = { name: config.name };

chokidar.watch("./.env").on("change", async (event, filePath) => {
  console.log("new change");
  //   const newEnv = await fs.readFile(path.join(__dirname, "./.env"), {
  //     encoding: "utf-8",
  //   });

  //   const content = dotenv.parse(newEnv);
  //   console.log("content:", content);
  console.log("PRIOR:", process.env.NAME);
  dotenv.config({
    path: "./.env",
    override: true,
  });
  console.log("PSOT:", process.env.NAME);
  //   const content = await JSON.parse(
  //     await fs.readFile(path.join(__dirname, "config.json"))
  //   );

  //   for (const key in content) {
  //     GLOBAL_CONFIG[key] = content[key];
  //   }
});

const app = express();

app.use(async (req, res, next) => {
  console.log(process.env.NAME);
  next();
});

app.get("/", async (req, res) => {
  //   const content = await JSON.parse(
  //     await fs.readFile(path.join(__dirname, "config.json"))
  //   );
  //   console.log("content:", content);
  res.json(true);
});

app.listen(3000, () => {
  console.log("working");
});
