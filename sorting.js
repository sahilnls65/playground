const express = require("express");
const mongoose = require("mongoose");
const ObjectId = require("mongoose").Types.ObjectId;

const app = express();
app.use(express.json());

const db = mongoose.connect("mongodb://root:root@localhost:27017", { dbName: "test" });

const itemSchema = new mongoose.Schema({
  name: String,
  sortIndex: Number,
  parent: { type: mongoose.Schema.Types.ObjectId, ref: "Item", default: null },
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
  const sampleData = [
    {
      _id: new ObjectId("64b8f1a16700b9756c000001"),
      name: "Item 1",
      sortIndex: 0,
      parent: null,
      updatedAt: 1672531200000,
    },
    {
      _id: new ObjectId("64b8f1a16700b9756c000002"),
      name: "Item 2",
      sortIndex: 1,
      parent: null,
      updatedAt: 1672531201000,
    },
    {
      _id: new ObjectId("64b8f1a16700b9756c000003"),
      name: "Item 3",
      sortIndex: 2,
      parent: null,
      updatedAt: 1672531202000,
    },
    {
      _id: new ObjectId("64b8f1a16700b9756c000004"),
      name: "Item 4",
      sortIndex: 0,
      parent: new ObjectId("64b8f1a16700b9756c000003"),
      updatedAt: 1672531203000,
    },
    {
      _id: new ObjectId("64b8f1a16700b9756c000005"),
      name: "Item 5",
      sortIndex: 1,
      parent: new ObjectId("64b8f1a16700b9756c000003"),
      updatedAt: 1672531204000,
    },
    {
      _id: new ObjectId("64b8f1a16700b9756c000006"),
      name: "Item 6",
      sortIndex: 3,
      parent: null,
      updatedAt: 1672531205000,
    },
    {
      _id: new ObjectId("64b8f1a16700b9756c000007"),
      name: "Item 7",
      sortIndex: 4,
      parent: null,
      updatedAt: 1672531206000,
    },
    {
      _id: new ObjectId("64b8f1a16700b9756c000008"),
      name: "Item 8",
      sortIndex: 0,
      parent: new ObjectId("64b8f1a16700b9756c000007"),
      updatedAt: 1672531207000,
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

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
