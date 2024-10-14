# File Manager CLI

## Project Overview

This is a command-line file manager built using Node.js. The application allows users to navigate directories, manage files (copy, move, delete, compress, etc.), and retrieve information about the system. The tool supports various file and directory operations, providing a user-friendly interface directly in the terminal.

## Features

- Navigate directories: `cd`, `up`, `ls`
- File operations: `add`, `rn`, `rm`, `mv`, `cp`, `cat`
- File compression and decompression: `compress`, `decompress`
- File hashing: `hash`
- OS Information retrieval: `os` command

## Getting Started

### Prerequisites

To run the project, ensure that you have Node.js installed (v22.9 is recommended).

1.  To start the application:

        - With Node.js directly: `node src/index.js -- --username=John`;
        - With npm start: `npm start -- -- --username=John`(if PowerShell );

    NB: When using npm start and passing arguments to your script, use two `--` like in the example above.

2.  The application supports file paths with spaces. Be sure to enclose paths with spaces in quotes when passing as arguments:

Example: `npm start -- -- --username="John Doe"` or `cd "directory/some folder"`

### Commands

Here is a list of supported commands:

| Command                                                              | Description                                                                        |
| -------------------------------------------------------------------- | ---------------------------------------------------------------------------------- |
| `up`                                                                 | Navigate to the parent directory                                                   |
| `cd <path>`                                                          | Change directory to `<path>`                                                       |
| `ls`                                                                 | List contents of the current directory                                             |
| `cat <path_to_file>`                                                 | Read and display the contents of a file                                            |
| `add <new_file_name>`                                                | Create an empty file                                                               |
| `rn <file>`                                                          | Rename a file                                                                      |
| `cp <path_to_file> <path_to_new_directory>`                          | Copy a file from `<src>` to `<dest>`                                               |
| `mv <path_to_file> <path_to_new_directory>`                          | Move (rename) a file from `<src>` to `<dest>`                                      |
| `rm <path_to_file>`                                                  | Delete a file                                                                      |
| `hash <file>`                                                        | Calculate and display the SHA-256 hash of a file                                   |
| `compress <path_to_file> <path_to_destination(folder + filename)>`   | Compress a file to the specified destination                                       |
| `decompress <path_to_file> <path_to_destination(folder + filename)>` | Decompress a file to the specified destination                                     |
| `os <arg>`                                                           | Display system information (`--cpus`, `--homedir`, `--username`, `--architecture`) |
