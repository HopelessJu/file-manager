import path from "path";
import { isDirExist } from "../helpers/checks.js";
import fs from "fs/promises";

export const goUp = (currentDir) => {
  const parentDir = path.dirname(currentDir);
  const rootDir = path.parse(currentDir).root;
  if (currentDir !== rootDir) {
    process.chdir(parentDir);
    return parentDir;
  } else {
    console.log("You are in the root directory. Only the sky is higher.");
    return currentDir;
  }
};

export const changeDir = async (newDir, currentDir) => {
  try {
    if (await isDirExist(newDir)) {
      return newDir;
    } else {
      return currentDir;
    }
  } catch (error) {
    console.error(error.message);
  }
};

export const ls = async (currentDir) => {
  const contentList = await fs.readdir(currentDir, { withFileTypes: true });

  const sortedContentList = contentList
    .sort((a, b) => a.isFile() - b.isFile())
    .filter((item) => !item.isSymbolicLink());

  const contentTable = sortedContentList.map((item) => ({
    Name: item.name,
    Type: item.isDirectory() ? "directory" : "file",
  }));
  console.table(contentTable);
};
