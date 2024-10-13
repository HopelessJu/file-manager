import path from "path";

export const goUp = (currentDir) => {
  const parentDir = path.dirname(currentDir);
  const rootDir = path.parse(currentDir).root;
  if (currentDir !== rootDir) {
    process.chdir(parentDir);
    return parentDir;
  } else {
    console.log("You are in the root direactory. Only the sky is higher.");
    return currentDir;
  }
};
