import { createBrotliCompress } from "zlib";
import { MESSAGES as message } from "../helpers/messages.js";
import { isFileExists } from "../helpers/checks.js";
import fs from "fs";
import { pipeline } from "stream/promises";
import { allowedExtension } from "../helpers/extensions-check.js";

export const compress = async (filePath, destinationPath) => {
  try {
    const fileCheckResult = await isFileExists(filePath);
    if (!fileCheckResult) {
      throw new Error(`No such file exists ${filePath}`);
    }

    const destCheckResult = await isFileExists(destinationPath);
    if (destCheckResult) {
      throw new Error(
        `File with that name already exists: ${destinationPath}. Please provide another name for the file`
      );
    }

    if (!allowedExtension(destinationPath)) {
      throw new Error(
        `${destinationPath} has incorrect extension. Please use .br or .gz extension to compress the file`
      );
    }

    const sourceReadStream = fs.createReadStream(filePath);
    const destWriteStream = fs.createWriteStream(destinationPath);
    const brotliCompress = createBrotliCompress();

    await pipeline(sourceReadStream, brotliCompress, destWriteStream);
    console.log(`Compressed successfully into ${destinationPath} `);
  } catch (error) {
    console.error(`${message.operationFailed}: ${error.message}`);
  }
};
