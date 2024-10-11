import os from "os";
import { App } from "./app/app.js";

const welcome = (username) => {
  console.log(`Welcome to the File Manager, ${username}`);
};

const goodbye = (username) => {
  console.log(`Thank you for using File Manager, ${username}, goodbye!`);
};

const username =
  process.argv
    .find((arg) => arg.startsWith("--username="))
    ?.split("=")[1]
    ?.trim() || "Nomad, Wagabond, call me what you will...";

welcome(username);
process.on("exit", () => goodbye(username));
const app = new App(os.homedir());
await app.start();
