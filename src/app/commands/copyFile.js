import fs from "fs";
import { MESSAGES as message } from "../helpers/messages.js";
import { isFileExists } from "../helpers/checks.js";
import path from "path";

export const copyFile = async (filePath, newFileDir) => {
  try {
    const fileCheckResult = await isFileExists(filePath);
    if (!fileCheckResult) {
      throw new Error(
        `${message.operationFailed}: No such file exists ${filePath}`
      );
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

    readStream.pipe(writeStream);
    await streamEnd;
  } catch (error) {
    console.error(
      `${message.operationFailed}: ${error.message}. ${message.permissionDenied}`
    );
  }
};
