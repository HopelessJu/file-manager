import { isFileExists } from "../helpers/checks.js";
import { MESSAGES as message } from "../helpers/messages.js";
import { rename } from "fs/promises";

export const renameFile = async (oldPathToFile, newPathToFile) => {
  try {
    await isFileExists(oldPathToFile);
    if (!isFileExists(oldPathToFile)) {
      throw new Error(`File ${oldPathToFile} not found}`);
    }
    await rename(oldPathToFile, newPathToFile);
    console.log(
      `File ${oldPathToFile} was successfully renamed to ${newPathToFile}`
    );
  } catch (error) {
    console.error(`${message.operationFailed} : ${error.message}`);
  }
};
