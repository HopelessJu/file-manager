import fs from "fs/promises";

export const isDirExist = async (dirPath) => {
  try {
    await fs.access(dirPath);
    return true;
  } catch (error) {
    console.error(error.message);
    return false;
  }
};

export const isFileExists = async (filePath) => {
  try {
    const stats = await fs.stat(filePath);

    if (!stats.isFile()) {
      return false;
    }
  } catch {
    return false;
  }
  return true;
};
