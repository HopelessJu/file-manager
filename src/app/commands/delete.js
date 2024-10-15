import { rm } from "fs/promises";
import { MESSAGES as message } from "../helpers/messages.js";
import path from "path";

export const deleteFile = async (fileToDelete) => {
  try {
    await rm(fileToDelete);
    console.log(`${path.basename(fileToDelete)} was removed`);
  } catch (error) {
    throw new Error(`${message.operationFailed}: ${error.message} `);
  }
};
