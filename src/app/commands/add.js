import { writeFile } from "fs/promises";
import { MESSAGES as message } from "../helpers/messages.js";

export const createFile = async (pathToFile) => {
  try {
    await writeFile(pathToFile, "", { flag: "wx" });
    console.log(`File created: ${pathToFile}`);
  } catch (error) {
    if (error.code === "EEXIST") {
      console.error(
        `${message.operationFailed}: File already exists: ${pathToFile}`
      );
    } else {
      console.error(`${message.operationFailed}:${error.message}`);
    }
  }
};
