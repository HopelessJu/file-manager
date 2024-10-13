import path from "path";
import { createInterface } from "readline";
import { parseCommand, validateCommand } from "./helpers/command-validation.js";
import * as cmd from "./commands/index.js";

export class App {
  constructor(homeDir) {
    this._currentDir = homeDir;
  }

  _resolvePath(pathTo) {
    return path.resolve(this._currentDir, pathTo);
  }

  up() {
    this._currentDir = cmd.goUp(this._currentDir);
  }

  cd(pathToDir) {}

  ls() {}

  cat(pathToFile) {}

  add(newFileName) {}

  rn(pathToFile, newFileName) {}

  cp(pathToFile, pathToNewDir) {}

  mv(pathToFile, pathToNewDir) {}

  rm(pathToFile) {}

  os(arg) {}

  hash(pathToFile) {}

  compress(pathToFile, pathToCompressedFileDest) {}

  decompress(pathToCompressedFile, pathToDest) {}

  async start() {
    const rl = createInterface({
      input: process.stdin,
      output: process.stdout,
      prompt: `You are currently in ${this._currentDir} \n>`,
    });

    rl.prompt();
    rl.on("line", async (input) => {
      const { command, args } = parseCommand(input);
      const { isValid, message: validationMsg } = validateCommand(
        command,
        args
      );

      if (command === ".exit") {
        rl.close();
        return;
      }

      if (isValid) {
        try {
          await this[command](...args);
        } catch (error) {
          console.error(error.message);
        }
      } else {
        console.log(validationMsg);
      }
      rl.setPrompt(`You are currently in ${this._currentDir} \n>`);
      rl.prompt();
    });

    rl.on("close", () => {
      process.exit(0);
    });
  }
}
