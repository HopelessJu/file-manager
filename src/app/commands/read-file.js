import fs from "fs";
import { isFileExists } from "../helpers/checks.js";
import { MESSAGES as message } from "../helpers/messages.js";

export const readFile = async (pathToFile) => {
  try {
    const fileCheckResult = await isFileExists(pathToFile);
    if (!fileCheckResult) {
      throw new Error(
        `${message.operationFailed}: No such file exists ${pathToFile}`
      );
    }

    const readStream = fs.createReadStream(pathToFile, {
      encoding: "utf-8",
    });

    readStream.on("data", (chunk) => {
      process.stdout.write(chunk);
    });

    const endPromise = new Promise((resolve, reject) => {
      readStream.on("end", () => {
        console.log("\n");
        resolve();
      });
      readStream.on("error", () => reject(error));
    });

    await endPromise;
  } catch (error) {
    console.error(error.message);
  }
};
