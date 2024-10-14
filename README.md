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
    - With npm start: npm start -- -- --username=John; //NB: When using npm start and passing arguments to your script, use two `--` like in the example above.

2.      The application supports file paths with spaces. Be sure to enclose paths with spaces in quotes when passing as arguments:

Example: npm start -- -- --username="John Doe"
