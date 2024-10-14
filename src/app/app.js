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

  async cd(pathFromInput) {
    const newDir = this._resolvePath(pathFromInput);
    this._currentDir = await cmd.changeDir(newDir, this._currentDir);
  }

  async ls() {
    await cmd.ls(this._currentDir);
  }

  async cat(pathFromInput) {
    const pathToFile = this._resolvePath(pathFromInput);

    await cmd.readFile(pathToFile);
  }

  async add(newFileName) {
    const pathToFile = this._resolvePath(newFileName);
    await cmd.createFile(pathToFile);
  }

  async rn(pathToFile, newFileName) {
    const oldPathToFile = this._resolvePath(pathToFile);
    const newPathToFile = this._resolvePath(newFileName);
    await cmd.renameFile(oldPathToFile, newPathToFile);
  }

  async cp(pathToFile, pathToNewDir) {
    const filePath = this._resolvePath(pathToFile);
    const newFileDir = this._resolvePath(pathToNewDir);
    await cmd.copyFile(filePath, newFileDir);
  }

  async mv(pathToFile, pathToNewDir) {
    const filePath = this._resolvePath(pathToFile);
    const newFileDir = this._resolvePath(pathToNewDir);
    await cmd.moveFile(filePath, newFileDir);
  }

  async rm(pathToFile) {
    const fileToDelete = this._resolvePath(pathToFile);
    await cmd.deleteFile(fileToDelete);
  }

  os(arg) {
    cmd.osInfo(arg);
  }

  async hash(pathToFile) {
    const fileToHash = this._resolvePath(pathToFile);
    await cmd.calcHash(fileToHash);
  }

  async compress(pathToFile, pathToCompressedFileDest) {
    const filePath = this._resolvePath(pathToFile);
    const destinationPath = this._resolvePath(pathToCompressedFileDest);
    await cmd.compress(filePath, destinationPath);
  }

  async decompress(pathToCompressedFile, pathToDest) {
    const filePath = this._resolvePath(pathToCompressedFile);
    const destinationPath = this._resolvePath(pathToDest);
    await cmd.decompress(filePath, destinationPath);
  }

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
