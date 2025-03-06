const mongoose = require("mongoose");
const ObjectId = require("mongoose").Types.ObjectId;
let db = null;
(async () => {
  db = mongoose.createConnection("mongodb://root:root@localhost:27017", { dbName: "test" });
  db = await db.asPromise();
})();

let source = "ts";
let dist = "timeAcquiringMicros.ts";
const updatePath = async () => {
  await db.collection("profiles").updateMany({}, [
    {
      $set: {
        [dist]: `$${source}`,
      },
    },
    {
      $unset: source,
    },
  ]);
};

setTimeout(() => {
//   updatePath();
}, 1000);
