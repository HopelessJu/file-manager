import { createBrotliDecompress } from "zlib";
import { MESSAGES as message } from "../helpers/messages.js";
import { isFileExists } from "../helpers/checks.js";
import fs from "fs";
import { pipeline } from "stream/promises";
import { allowedExtension } from "../helpers/extensions-check.js";

export const decompress = async (filePath, destinationPath) => {
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

    if (!allowedExtension(filePath)) {
      throw new Error(
        `${filePath} has incorrect extension. Please make sure your file(${filePath}) has .br or .gz extension before decompress`
      );
    }

    const sourceReadStream = fs.createReadStream(filePath);
    const destWriteStream = fs.createWriteStream(destinationPath);
    const brotliDecompress = createBrotliDecompress();

    await pipeline(sourceReadStream, brotliDecompress, destWriteStream);
    console.log(`Decompressed successfully into ${destinationPath} `);
  } catch (error) {
    console.error(`${message.operationFailed}: ${error.message}`);
  }
};
