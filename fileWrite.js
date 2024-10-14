const ObjectId = require("mongoose").Types.ObjectId;
const fs = require("fs");

function writeFile() {
  try {
    const writeStream = fs.createWriteStream("writefile.json");
    writeStream.write("[");
    let first = true;

    for (let i = 0; i < 1000; i++) {
      if (!first) {
        writeStream.write(",");
      }

      const streamData = JSON.stringify({
        _id: {
          $oid: new ObjectId(),
        },
        conf_1: "conf1",
        m2o_conf: {
          $oid: "67036ec8497de152cc7f4adb",
        },
        createdAt: {
          $date: "2024-10-07T05:18:02.538Z",
        },
        updatedAt: {
          $date: "2024-10-07T05:18:02.538Z",
        },
        __v: 0,
      });

      writeStream.write(streamData);
      first = false;
    }

    writeStream.write("]");
    writeStream.end();
    writeStream.on("finish", () => {
      console.log(`Successfully generated file`);
    });
  } catch (error) {
    console.error("Error while writing file", err);
  }
}

writeFile();
