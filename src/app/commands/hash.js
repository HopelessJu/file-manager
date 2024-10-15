import { createHash } from "crypto";
import { createReadStream } from "fs";
import { isFileExists } from "../helpers/checks.js";
import { MESSAGES as message } from "../helpers/messages.js";
import path from "path";

export const calcHash = async (fileToHash) => {
  try {
    const fileCheckResult = await isFileExists(fileToHash);
    if (!fileCheckResult) {
      throw new Error(` No such file exists ${fileToHash}`);
    }
    const hash = createHash("sha256");

    const stream = createReadStream(fileToHash);

    stream.pipe(hash).setEncoding("hex");

    let hashedData = "";

    hash.on("data", (chunk) => {
      hashedData += chunk;
    });

    const streamEnd = new Promise((resolve, reject) => {
      stream.on("error", (error) => {
        reject(error);
      });

      hash.on("error", (error) => {
        reject(error);
      });

      hash.on("end", () => {
        console.log(
          `Hash was calculated for ${path.basename(fileToHash)}: ${hashedData}`
        );
        resolve();
      });
    });

    await streamEnd;
  } catch (error) {
    console.error(`${message.operationFailed}: ${error.message}`);
  }
};
