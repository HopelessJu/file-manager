import os from "os";

export const osInfo = (param) => {
  switch (param) {
    case "--EOL":
      console.log("EOL", JSON.stringify(os.EOL));
      break;

    case "--cpus":
      const cpus = os.cpus();
      const cpuInfo = cpus.map((cpu) => ({
        Model: cpu.model.trim(),
        Rate: `${cpu.speed / 1000} GHz`,
      }));
      console.table(cpuInfo);
      break;

    case "--homedir":
      console.log(`Homedir: ${os.homedir()}`);
      break;

    case "--username":
      console.log(`Username: ${os.userInfo().username}`);
      break;

    case "--architecture":
      console.log(`Cpu architecture: ${process.arch}`);
      break;

    default:
      console.warn(
        `Please provide valid parameter from the list: --EOL/--cpus/--homedir/--username/--architecture`
      );
  }
};
