import concurrently from "concurrently";

concurrently([
  {
    name: "Server",
    cwd: "packages/server",
    command: "npm run dev",
    prefixColor: "cyan",
  },
  {
    name: "Client",
    cwd: "packages/client",
    command: "npm run dev",
    prefixColor: "yellow",
  },
]);
