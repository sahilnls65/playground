function addParentIds(data) {
  let idMap = {};

  data.forEach((item) => {
    idMap[item.path] = item._id;
  });

  let updatedData = data.map((item) => {
    let parentPath = item.path.includes(".") ? item.path.split(".").slice(0, -1).join(".") : null;
    let parentId = parentPath ? idMap[parentPath] || null : null;

    return {
      ...item,
      parentId: parentId,
    };
  });

  console.log(updatedData);
}

// async function updateFieldPath(schema_id, oldPath, newPath, fieldName) {
//   const collection = db.model(fieldName);

//   // Find all fields that need path updates
//   const fieldsToUpdate = await collection
//     .find({
//       schema_id: schema_id,
//       path: { $regex: `^${oldPath}(\.|$)` }, // Matches exact and nested fields
//     })
//     .toArray();

//   let idMap = {}; // Store new parent _id for quick lookup

//   for (let field of fieldsToUpdate) {
//     // Compute new path
//     let updatedPath = field.path.replace(new RegExp(`^${oldPath}`), newPath);

//     // Determine new parent path
//     let parentPath = updatedPath.includes(".")
//       ? updatedPath.split(".").slice(0, -1).join(".")
//       : null;

//     // Find the new parent _id
//     let parentId = null;
//     if (parentPath) {
//       // Check if parent path is already updated in this iteration
//       parentId = idMap[parentPath] || (await collection.findOne({ path: parentPath }))?._id || null;
//     }

//     // Store in idMap to reduce DB lookups
//     idMap[updatedPath] = field._id;

//     // Update the document
//     await collection.updateOne(
//       { _id: field._id },
//       { $set: { path: updatedPath, parentId: parentId } }
//     );
//   }

//   console.log("Path and Parent ID updated successfully.");
// }

function updateFieldPath(data, oldPath, newPath) {
  let idMap = {}; // Store _id mapping for quick lookup

  // Build initial idMap
  data.forEach((item) => {
    idMap[item.path] = item._id;
  });

  // Process each field
  let updatedData = data.map((item) => {
    if (item.path.startsWith(oldPath)) {
      // Compute new path
      let updatedPath = item.path.replace(new RegExp(`^${oldPath}`), newPath);

      // Determine new parent path
      let parentPath = updatedPath.includes(".")
        ? updatedPath.split(".").slice(0, -1).join(".")
        : null;

      // Find new parentId
      let parentId = parentPath ? idMap[parentPath] || null : null;

      return { ...item, path: updatedPath, parentId: parentId };
    }
    return item; // Return unchanged if path doesn't match
  });

  console.log(updatedData);
}

// Sample Data
let data = [
  {
    field: "username",
    path: "username",
    _id: "67dc0245d243d92b3adcc23a",
    parentId: null,
  },
  {
    field: "email",
    path: "email",
    _id: "67dc0245d243d92b3adcc23b",
    parentId: null,
  },
  {
    field: "address",
    path: "address",
    _id: "67dc0245d243d92b3adcc23c",
    parentId: null,
  },
  {
    field: "street",
    path: "address.street",
    _id: "67dc0245d243d92b3adcc23d",
    parentId: "67dc0245d243d92b3adcc23c",
  },
  {
    field: "city",
    path: "address.city",
    _id: "67dc0245d243d92b3adcc23e",
    parentId: "67dc0245d243d92b3adcc23c",
  },
  {
    field: "zip",
    path: "address.zip",
    _id: "67dc0245d243d92b3adcc23f",
    parentId: "67dc0245d243d92b3adcc23c",
  },
  {
    field: "comments",
    path: "comments",
    _id: "67dc0245d243d92b3adcc240",
    parentId: null,
  },
  {
    field: "author",
    path: "comments.author",
    _id: "67dc0245d243d92b3adcc241",
    parentId: "67dc0245d243d92b3adcc240",
  },
  {
    field: "zip1",
    path: "comments.zip1",
    _id: "67dc0245d243d92b3adcc242",
    parentId: "67dc0245d243d92b3adcc240",
  },
  {
    field: "text",
    path: "comments.text",
    _id: "67dc0245d243d92b3adcc243",
    parentId: "67dc0245d243d92b3adcc240",
  },
  {
    field: "date",
    path: "comments.date",
    _id: "67dc0245d243d92b3adcc244",
    parentId: "67dc0245d243d92b3adcc240",
  },
  {
    field: "replies",
    path: "comments.replies",
    _id: "67dc0245d243d92b3adcc245",
    parentId: "67dc0245d243d92b3adcc240",
  },
  {
    field: "replyAuthor",
    path: "comments.replies.author",
    _id: "67dc0245d243d92b3adcc246",
    parentId: "67dc0245d243d92b3adcc245",
  },
  {
    field: "replyText",
    path: "comments.replies.text",
    _id: "67dc0245d243d92b3adcc247",
    parentId: "67dc0245d243d92b3adcc245",
  },
  {
    field: "replyDate",
    path: "comments.replies.date",
    _id: "67dc0245d243d92b3adcc248",
    parentId: "67dc0245d243d92b3adcc245",
  },
  {
    field: "newarray",
    path: "comments.replies.newarray",
    _id: "67dc0245d243d92b3adcc249",
    parentId: "67dc0245d243d92b3adcc245",
  },
  {
    field: "sahil",
    path: "comments.replies.newarray.sahil",
    _id: "67dc0245d243d92b3adcc24a",
    parentId: "67dc0245d243d92b3adcc249",
  },
  {
    field: "sahil1",
    path: "comments.replies.newarray.sahil1",
    _id: "67dc0245d243d92b3adcc24b",
    parentId: "67dc0245d243d92b3adcc249",
  },
  {
    field: "arraytest",
    path: "comments.replies.newarray.arraytest",
    _id: "67dc0245d243d92b3adcc24c",
    parentId: "67dc0245d243d92b3adcc249",
  },
  {
    field: "age",
    path: "age",
    _id: "67dc0245d243d92b3adcc24d",
    parentId: null,
  },
  {
    field: "numbers",
    path: "numbers",
    _id: "67dc0245d243d92b3adcc24e",
    parentId: null,
  },
  {
    field: "many_to_many",
    path: "many_to_many",
    _id: "67dc0245d243d92b3adcc24f",
    parentId: null,
  },
  {
    field: "one_to_many",
    path: "one_to_many",
    _id: "67dc0245d243d92b3adcc250",
    parentId: null,
  },
  {
    field: "many_to_one",
    path: "many_to_one",
    _id: "67dc0245d243d92b3adcc251",
    parentId: null,
  },
  {
    field: "testing",
    path: "testing",
    _id: "67dc0245d243d92b3adcc252",
    parentId: null,
  },
  {
    field: "arraytest",
    path: "testing.arraytest",
    _id: "67dc0245d243d92b3adcc253",
    parentId: "67dc0245d243d92b3adcc252",
  },
];

// updateFieldPath(data, "comments.replies.newarray", "comments.replies");
// Run function
// addParentIds(data);
