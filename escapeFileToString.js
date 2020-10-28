var fs = require("fs");

var data = "";

let [inputFileName, ouputFileName] = process.argv.slice(2);
[fName, fExtension] = inputFileName.split(".");

ouputFileName = ouputFileName
  ? ouputFileName
  : `${fName}_escaped.${fExtension}`;

var readStream = fs.createReadStream(inputFileName, "utf8");

readStream
  .on("data", function (chunk) {
    data += chunk;
  })
  .on("end", function () {
    data = JSON.stringify(data).slice(1, -1);
    fs.writeFileSync(ouputFileName, data, "utf8");
    console.log(`saved escape file: ${ouputFileName}`);
  });
