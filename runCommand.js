const { exec } = require("child_process");
const fs = require("fs");

function execGitLogReverse(
  cbGetJsonCommits,
  cbAppendFilesChange,
  cbStringifySave
) {
  exec(
    `git log --reverse  --skip 2 --pretty=format:"%H %ae %an"`,
    (error, stdout, stderr) => {
      // exec("git log master --reverse", (error, stdout, stderr) => {
      // exec('git log  --skip 2 --pretty=format:"%h"', (error, stdout, stderr) => {
      // exec("git status", (error, stdout, stderr) => {
      if (error) {
        console.log(`error: ${error.message}`);
        return;
      }
      if (stderr) {
        console.log(`stderr: ${stderr}`);
        return;
      }
      cbGetJsonCommits(stdout, cbAppendFilesChange, cbStringifySave);
    }
  );
}

function getJsonCommits(text, cbAppendFilesChange, cbStringifySave) {
  // function WriteDataToFile(text) {
  const json = JSON.stringify(text).slice(1, -1);
  const json2 = json.split("\\n");
  const commitsArray = [];
  let i = 0;
  const numCommits = json2.length / 6;
  for (; i < json2.length; ) {
    let commitInfo = json2[i].split(" ");
    console.log(commitInfo);
    const hash = commitInfo[0];
    const autherEmail = commitInfo[1];
    const authorName = commitInfo.slice(2, commitInfo.length).join(" ");
    commitsArray[i] = {
      hash,
      authorName,
      autherEmail
    };
    // commitsArray[i] = {
    //   commitHash: json2[i * 6],
    //   Author: json2[i * 6 + 1],
    //   Date: json2[i * 6 + 2],
    //   commitMessage: json2[i * 6 + 4]
    // };
    i++;
  }
  cbAppendFilesChange(commitsArray, cbStringifySave);
  // return commitsArray;
}

function stringifySave(data) {
  const jsonData = JSON.stringify(data, null, 2);
  // console.log(jsonData);
  fs.writeFileSync("git-output.txt", jsonData);
}

function appendFilesChange(data, cbStringifySave) {
  let scoped = data;
  data.forEach(element => {
    // const commitStripped = element.commitHash.substring(
    //   "commit ".length,
    //   element.commitHash.length
    // );
    // console.log(Object.keys(element));
    // const hash = element.substring(0, element.indexOf(" "));
    // console.log(hash);
    // console.log(element.commitHash);
    // console.log(commitStripped);
  });
  cbStringifySave(data);
}

function getFilesChangesInCommit(hash) {
  const command = `git diff-tree --no-commit-id --name-only -r ${hash}`;
  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.log(`error: ${error.message}`);
      return;
    }
    if (stderr) {
      console.log(`stderr: ${stderr}`);
      return;
    }
    cb(stdout, cb);
  });
}

function main() {
  // const gitLogStdout = execGitLogReverse(
  execGitLogReverse(getJsonCommits, appendFilesChange, stringifySave);
}
main();
