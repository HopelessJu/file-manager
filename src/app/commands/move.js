import { MESSAGES as message } from "../helpers/messages.js";
import { isFileExists } from "../helpers/checks.js";
import { rm } from "fs/promises";
import path from "path";
import fs from "fs";

export const moveFile = async (oldFilePath, newFilePath) => {
  try {
    const fileCheckResult = await isFileExists(oldFilePath);
    if (!fileCheckResult) {
      throw new Error(` No such file exists ${oldFilePath}`);
    }
    const fileName = path.basename(oldFilePath);
    const destinationPath = path.join(newFilePath, fileName);

    const readStream = fs.createReadStream(oldFilePath);
    const writeStream = fs.createWriteStream(destinationPath);

    const streamEnd = new Promise((resolve, reject) => {
      writeStream.on("finish", () => {
        resolve();
      });
      writeStream.on("error", (error) => {
        reject(error);
      });
      readStream.on("error", (error) => {
        reject(error);
      });
    });

    readStream.pipe(writeStream);
    await streamEnd;
    await rm(oldFilePath);
    console.log(`File moved to ${destinationPath}`);
  } catch (error) {
    console.error(`${message.operationFailed}: ${error.message}`);
  }
};
