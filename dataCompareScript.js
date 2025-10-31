const fs = require("fs");
const { diff } = require("deep-diff");

// ✅ STEP 1: Load your big JSON file
const rawData = fs.readFileSync("67b8109e658ff19b19a2c413_Production.users.json", "utf8");
const allData = JSON.parse(rawData);

// ✅ STEP 2: Prepare an array to hold all differences
const allDifferences = [];

// ✅ STEP 3: Function to remove ignored keys from an object
function removeIgnoredKeys(obj) {
  if (!obj || typeof obj !== "object") return obj;

  // Remove deeply nested keys by path, not by direct key
  const ignoredPaths = [
    ["nox_created_at", "$date"],
    ["nox_updated_at", "$date"],
    ["nox_created_by", "$oid"],
    ["nox_updated_by", "$oid"],
    ["_id", "$oid"],
    ["__v"],
    ["auth0Id"],
  ];

  function removeByPath(obj, path) {
    if (!obj || typeof obj !== "object") return;
    if (path.length === 1) {
      delete obj[path[0]];
      return;
    }
    const [first, ...rest] = path;
    if (obj[first]) {
      removeByPath(obj[first], rest);
      if (typeof obj[first] === "object" && Object.keys(obj[first]).length === 0) {
        delete obj[first];
      }
    }
  }

  const cleanedObj = JSON.parse(JSON.stringify(obj)); // deep clone

  ignoredPaths.forEach((path) => {
    removeByPath(cleanedObj, path);
  });

  return cleanedObj;
}

// ✅ STEP 4: Loop through each record in the JSON file
allData.forEach((record, index) => {
  if (!record.data || record.data.length < 2) {
    console.log(`⚠️ Skipping ${record._id} — not enough documents to compare`);
    return;
  }

  const differences = diff(removeIgnoredKeys(record.data[0]), removeIgnoredKeys(record.data[1]));

  if (differences) {
    const readableDiffs = differences.map((d, idx) => {
      return {
        [`${idx + 1}. Type`]:
          d.kind === "E"
            ? "Edit"
            : d.kind === "N"
            ? "New"
            : d.kind === "D"
            ? "Delete"
            : d.kind === "A"
            ? "Array"
            : d.kind,
        path: d.path ? d.path.join(".") : "",
        from: d.lhs,
        to: d.rhs,
      };
    });

    allDifferences.push({
      Email: record._id,
      "Document 1 ID":
        record.data[0]._id && record.data[0]._id.$oid
          ? `${record.data[0]._id.$oid} - ${record.data[0].auth0Id}`
          : `${record.data[0]._id} - ${record.data[0].auth0Id}`,
      "Document 2 ID":
        record.data[1]._id && record.data[1]._id.$oid
          ? `${record.data[1]._id.$oid} - ${record.data[1].auth0Id}`
          : `${record.data[1]._id} - ${record.data[1].auth0Id}`,
      Differences: readableDiffs,
      "Total Update Count": readableDiffs.length,
    });
  }
});

// ✅ STEP 5: Save all differences in one JSON file
fs.writeFileSync("differences.json", JSON.stringify(allDifferences, null, 2));

console.log(`✅ Done! Found ${allDifferences.length} differences. Saved to differences.json`);
console.log(`📝 Ignored keys: nox_created_at, nox_updated_at, nox_created_by, nox_updated_by`);
