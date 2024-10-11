import path from "path";
import { stdin } from "process";
import { createInterface } from "readline";

export class App {
  constructor(homeDir) {
    this._pathStart = homeDir;
  }

  _resolvePath(path) {
    return path.resolve(this._pathStart, path);
  }

  up() {}

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

  start() {
    const rl = createInterface({
      input: process.stdin,
      output: process.stdout,
    });
  }
}
