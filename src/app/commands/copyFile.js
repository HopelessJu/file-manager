import fs from "fs";
import { MESSAGES as message } from "../helpers/messages.js";
import { isFileExists } from "../helpers/checks.js";
import path from "path";
import { pipeline } from "stream/promises";

export const copyFile = async (filePath, newFileDir) => {
  try {
    const fileCheckResult = await isFileExists(filePath);
    if (!fileCheckResult) {
      throw new Error(`No such file exists ${filePath}`);
    }
    const fileName = path.basename(filePath);
    const destinationPath = path.join(newFileDir, fileName);

    const readStream = fs.createReadStream(filePath);
    const writeStream = fs.createWriteStream(destinationPath);

    const streamEnd = new Promise((resolve, reject) => {
      writeStream.on("finish", () => {
        console.log(`File copied to ${destinationPath}`);
        resolve();
      });
      writeStream.on("error", (error) => {
        reject(error);
      });
      readStream.on("error", (error) => {
        reject(error);
      });
    });
    // await pipeline(readStream, writeStream);

    readStream.pipe(writeStream);
    await streamEnd;
  } catch (error) {
    console.error(
      `${message.operationFailed}: ${error.message}. ${message.permissionDenied}`
    );
  }
};
