const commits = require("./promiseGitBranch.json");
const fs = require("fs");

function execShellCommand(cmd) {
  const exec = require("child_process").exec;
  return new Promise((resolve, reject) => {
    exec(cmd, { maxBuffer: 1024 * 500 }, (error, stdout, stderr) => {
      if (error) {
        console.warn(error);
      }
      resolve(stdout ? stdout : stderr);
    });
  });
}

function getFileVersionAtCommit(hash, filePath) {
  const gitCommand = `git show ${hash}:${filePath}`;
  return new Promise((resolve, reject) => {
    execShellCommand(gitCommand).then((data) => {
      resolve(data ? data : "fucked");
    });
  });
}

function escapeFileContents(fileContent) {
  //const tmp = JSON.stringify(fileContent).slice(1, -1);
  return fileContent.replace("`", "\\`");
}

commits.forEach((commit) => {
  if (!fs.existsSync("story")) {
    fs.mkdirSync("story");
  }
  const filesChanges = [
    ...commit.filesAdded,
    ...commit.filesModify,
    ...commit.filesRenamed,
  ];
  const hash = commit.hash;
  const dirPath = `./story/${hash}`;
  fs.mkdirSync(dirPath);
  if (hash == "9149f4be0f94c7337e784fd4f05ff04d7b7a01b8/") {
    console.log("created folder 9149");
  }
  filesChanges.forEach((filePath) => {
    const filePathGitCmd = `"${filePath}"`;
    let fileName = filePath.split("/");
    fileName = fileName.join("__");
    console.log(fileName);

    getFileVersionAtCommit(hash, filePathGitCmd).then((data, errors) => {
      if (errors) console.log(errors);
      console.log("about to save data");
      let [fName, fExtension] = fileName.split(".");
      let ouputFileName = `${fName}.${fExtension}`;
      const newContent = escapeFileContents(data);
      newContent &&
        // console.log(newContent).slice(0, 50) &&
        fs.writeFileSync(`${dirPath}/${ouputFileName}`, newContent);
      console.log("saved data");
    });
  });
});
