#!/usr/bin/env node

const { execSync } = require("child_process");

const runCommand = (command) => {
  try {
    execSync(`${command}`, { stdio: "inherit" });
  } catch (error) {
    console.log(`Failed to execute ${command}`, error);
    return false;
  }
  return true;
};

const repoName = process.argv[2];
const gitCheckoutCommand = `git clone --depth 1 https://github.com/aryankarim/nuxt-threejs-tailwind ${repoName}`;
const installDepsCommand = `cd ${repoName} && yarn install`;
const setUpGitCommand = `cd ${repoName} && rm -rf ./.git && git init && git add . && git commit -m "first commit"`;
const setUpProjectCommand = `rm -rf ./bin`;

console.log(`Cloning the repository '${repoName}'`);
const checkedOut = runCommand(gitCheckoutCommand);
if (!checkedOut) process.exit(-1);

console.log(`Cloning the repository '${repoName}'`);
const installDeps = runCommand(installDepsCommand);
if (!installDeps) process.exit(-1);

console.log(`Setting up git`);
const setUpGit = runCommand(setUpGitCommand);
if (!setUpGit) process.exit(-1);

console.log(`Setting up the Project`);
const setUpProject = runCommand(setUpProjectCommand);
if (!setUpProject) process.exit(-1);

console.log("Nice Work! Now impress me!");
