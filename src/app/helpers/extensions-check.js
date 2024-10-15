import path from "path";
import { allowedBrotliExtensions } from "../helpers/checks.js";

export const allowedExtension = (filePath) => {
  const fileExtension = path.extname(filePath);
  return allowedBrotliExtensions.includes(fileExtension);
};
