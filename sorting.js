const express = require("express");
const mongoose = require("mongoose");
const ObjectId = require("mongoose").Types.ObjectId;

const app = express();
app.use(express.json());

const db = mongoose.connect("mongodb://root:root@localhost:27017", { dbName: "test" });

const itemSchema = new mongoose.Schema({
  name: String,
  sortIndex: Number,
  path: String,
  field: String,
  parent_id: { type: mongoose.Schema.Types.ObjectId, ref: "Item", default: null },
  updatedAt: Number,
});

const Item = mongoose.model("Item", itemSchema);

const isCircularReference = async (draggedItemId, newParentId) => {
  if (!newParentId) return false;

  let currentParent = await Item.findById(newParentId);
  while (currentParent) {
    if (currentParent._id.equals(draggedItemId)) return true;
    currentParent = currentParent.parent ? await Item.findById(currentParent.parent) : null;
  }
  return false;
};

// Helper function to build tree
const buildTree = async (parentId = null) => {
  const items = await Item.find({ parent: parentId }).sort({ sortIndex: 1 });

  const tree = [];
  for (const item of items) {
    const children = await buildTree(item._id); // Recursively fetch children
    tree.push({
      _id: item._id,
      name: item.name,
      sortIndex: item.sortIndex,
      parent: item.parent,
      updatedAt: item.updatedAt,
      children, // Include children in the structure
    });
  }
  return tree;
};

// GET API to fetch tree data
app.get("/get-tree", async (req, res) => {
  try {
    const tree = await buildTree(); // Fetch the root-level items and build tree
    res.json(tree);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Sample Test Data
app.post("/seed", async (req, res) => {
  await Item.deleteMany({});
  const sampleData = [
    {
      _id: "67dd4327642ae3755f1198ab",
      field: "field_3",
      path: "group_1.field_3",
      parent_id: "67dd431b642ae3755f11989f",
    },
    {
      _id: "67dd4334642ae3755f1198b8",
      field: "field_4",
      path: "group_1.field_4",
      parent_id: "67dd431b642ae3755f11989f",
    },
    {
      _id: "67dd4342642ae3755f1198c5",
      field: "group_2",
      path: "group_1.group_2",
      parent_id: "67dd431b642ae3755f11989f",
    },
    {
      _id: "67dd4350642ae3755f1198d2",
      field: "field_5",
      path: "group_1.group_2.field_5",
      parent_id: "67dd4342642ae3755f1198c5",
    },
    {
      _id: "67dd435a642ae3755f1198df",
      field: "field_6",
      path: "group_1.group_2.field_6",
      parent_id: "67dd4342642ae3755f1198c5",
    },
    {
      _id: "67dd4365642ae3755f1198ec",
      field: "group_3",
      path: "group_3",
      parent_id: null,
    },
    {
      _id: "67dd436f642ae3755f1198f8",
      field: "field_7",
      path: "group_3.field_7",
      parent_id: "67dd4365642ae3755f1198ec",
    },
    {
      _id: "67dd4377642ae3755f119905",
      field: "field_8",
      path: "group_3.field_8",
      parent_id: "67dd4365642ae3755f1198ec",
    },
  ];
  try {
    await Item.deleteMany({});
    for (const item of sampleData) {
      await Item.create(item);
    }
    res.json({ message: "Sample data seeded successfully!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/update-sort", async (req, res) => {
  const { draggedItemId, newParentId, position, targetItemId } = req.body;

  try {
    const draggedItem = await Item.findById(draggedItemId);
    const targetItem = await Item.findById(targetItemId);

    if (!draggedItem || !targetItem) {
      return res.status(404).json({ message: "Item not found" });
    }

    if (await isCircularReference(draggedItemId, newParentId)) {
      return res.status(400).json({ message: "Invalid operation: Circular reference detected." });
    }

    let newSortIndex;
    if (position === "before") {
      const aboveItem = await Item.findOne({
        parent: newParentId,
        sortIndex: { $lt: targetItem.sortIndex },
      }).sort({ sortIndex: -1 });

      newSortIndex = aboveItem
        ? (aboveItem.sortIndex + targetItem.sortIndex) / 2
        : targetItem.sortIndex - 1;
    } else if (position === "after") {
      const belowItem = await Item.findOne({
        parent: newParentId,
        sortIndex: { $gt: targetItem.sortIndex },
      }).sort({ sortIndex: 1 });

      newSortIndex = belowItem
        ? (targetItem.sortIndex + belowItem.sortIndex) / 2
        : targetItem.sortIndex + 1;
    }

    draggedItem.parent = newParentId;
    draggedItem.sortIndex = newSortIndex;
    draggedItem.updatedAt = Date.now();
    await draggedItem.save();

    res.json({ message: "Sort order updated successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

function convertToRegexPattern(str) {
  return `^${str.replace(/\./g, "\\.")}`;
}

app.post("/update-path", async (req, res) => {
  let newPath = req.body.newPath;
  let oldPath = req.body.oldPath;

  const newParentPath = newPath.includes(".") ? newPath.split(".").slice(0, -1).join(".") : newPath;

  let newParent = newParentPath ? await Item.findOne({ path: newParentPath }, { _id: 1 }) : null;
  let newParentId = newParent ? newParent._id : null;

  const oldParentId = await Item.findOne({ path: oldPath }, { _id: 1 });

  console.log(newParentId, "newParentId", oldParentId);
  // return;
  await Item.updateMany({}, [
    {
      $set: {
        path: {
          $cond: {
            if: {
              $regexMatch: {
                input: "$path",
                regex: convertToRegexPattern(`${oldPath}.`),
              },
            },
            then: {
              $replaceOne: {
                input: "$path",
                find: `${oldPath}.`,
                replacement: newPath ? `${newPath}.` : "",
              },
            },
            else: "$path",
          },
        },
        parent_id: {
          $cond: {
            if: { $eq: ["$parent_id", oldParentId?._id] },
            then: newParentId,
            else: "$parent_id",
          },
        },
      },
    },
  ]);

  // const fieldsToUpdate = await Item.find({
  //   path: { $regex: `^${oldPath}(\.|$)` },
  // });

  // let idMap = {};

  // for (let field of fieldsToUpdate) {
  //   let updatedPath = field.path.replace(new RegExp(`^${oldPath}`), newPath);

  //   let parentPath = updatedPath.includes(".")
  //     ? updatedPath.split(".").slice(0, -1).join(".")
  //     : null;

  //   let parentId = null;
  //   if (parentPath) {
  //     parentId = idMap[parentPath] || (await Item.findOne({ path: parentPath }))?._id || null;
  //   }

  //   idMap[updatedPath] = field._id;

  //   await Item.updateOne({ _id: field._id }, { $set: { path: updatedPath, parentId: parentId } });
  // }

  res.send("OK");
  console.log("Path and Parent ID updated successfully.");
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
