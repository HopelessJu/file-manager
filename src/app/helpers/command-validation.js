import { MESSAGES as message } from "./messages.js";

export const parseCommand = (input) => {
  const [command, ...args] = input.trim().split(" ");
  return { command, args };
};

export const validCommands = [
  "up",
  "cd",
  "ls",
  "cat",
  "add",
  "rn",
  "cp",
  "mv",
  "rm",
  "os",
  "hash",
  "compress",
  "decompress",
  ".exit",
];

export const validateCommand = (command, args) => {
  if (validCommands.includes(command)) {
    switch (command) {
      case "up":
      case "ls":
      case ".exit":
        return { isValid: true };

      case "cd":
      case "cat":
      case "rm":
      case "os":
      case "hash":
      case "add":
        if (args.length >= 1) {
          return { isValid: true };
        }
        return { isValid: false, message: message.oneArg };

      case "mv":
      case "cp":
      case "rn":
      case "compress":
      case "decompress":
        if (args.length >= 2) {
          return { isValid: true };
        }
        return { isValid: false, message: message.twoArgs };

      default:
        return { isValid: false };
    }
  }
  return { isValid: false, message: message.unknown };
};
