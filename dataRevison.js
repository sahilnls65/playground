import mongoose, { createConnection, Schema } from "mongoose";
import { ObjectId } from "mongodb";

async function dbConnection() {
  let db = createConnection("mongodb://localhost:27017/test");
  db = await db.asPromise();
  return db;
}

const db = await dbConnection();

// Insert Initial Document
// async function insertDoc(data) {
//   await db.collection("currentpolicies").insertOne({
//     ...data,
//   });
//   await db.collection("policyrevisions").insertOne({
//     ...data,
//   });
// }

// await insertDoc({
//   policyId: 1,
//   customerName: "Michelle",
//   revision: 1,
//   itemsInsured: ["golf clubs", "car"],
//   dateSet: new Date(),
// });

// async function updateDoc1() {
//   await db.collection("currentpolicies").updateOne(
//     { policyId: 1 },
//     {
//       $push: { itemsInsured: "watch" },
//       $inc: { revision: 1 },
//       $currentDate: { dateSet: true },
//     }
//   );

//   await db
//     .collection("currentpolicies")
//     .aggregate([
//       { $match: { policyId: 1 } },
//       { $set: { _id: new ObjectId() } },
//       {
//         $merge: {
//           into: "policyrevisions",
//           on: "_id",
//           whenNotMatched: "insert",
//         },
//       },
//     ])
//     .toArray();
// }

// await updateDoc1();

// async function updateDoc2() {
//   await db.collection("currentpolicies").updateOne(
//     { policyId: 1 },
//     {
//       $unset: { customerName: "golf clubs" },
//       $inc: { revision: 1 },
//       $currentDate: { dateSet: true },
//     }
//   );

//   await db
//     .collection("currentpolicies")
//     .aggregate([
//       { $match: { policyId: 1 } },
//       { $set: { _id: new ObjectId() } },
//       {
//         $merge: {
//           into: "policyrevisions",
//           on: "_id",
//           whenNotMatched: "insert",
//         },
//       },
//     ])
//     .toArray();
// }

// await updateDoc2();

// function compareObjects(o1, o2) {
//   if (Object.is(o1, o2)) {
//     return true;
//   }
//   if (typeof o1 !== typeof o2) {
//     return false;
//   }
//   const normalizedObj1 = Object.fromEntries(
//     Object.entries(o1).sort(([k1], [k2]) => k1.localeCompare(k2))
//   );
//   const normalizedObj2 = Object.fromEntries(
//     Object.entries(o2).sort(([k1], [k2]) => k1.localeCompare(k2))
//   );
//   return JSON.stringify(normalizedObj1) === JSON.stringify(normalizedObj2);
// }

// function diff(obj1, obj2) {
//   const result = Object.keys(obj2)
//     .filter((k) => !compareObjects(obj1[k], obj2[k]))
//     .reduce((t, k) => ({ ...t, [k]: obj2[k] }), {});
//   const _delete = Object.keys(obj1).filter((k) => !obj2.hasOwnProperty(k));
//   if (_delete.length > 0) {
//     result._delete = _delete;
//   }
//   return result;
// }

// const patch = (obj, diff) => {
//   Object.keys(diff).forEach((k) => {
//     if (k === "_delete") {
//       diff[k].forEach((d) => delete obj[d]);
//     } else {
//       obj[k] = diff[k];
//     }
//   });
//   return obj;
// };

// function OnUpdate(doc, meta) {
//   // reversion is an alias to the revision collection (ex: data_revision)
//   const reversion = reversions[meta.id];
//   if (typeof reversion === "undefined") {
//     reversions[meta.id] = [doc];
//   } else {
//     const accumulated = reversion.reduce((obj, i) => patch(obj, i));
//     reversions[meta.id] = reversion.concat(diff(accumulated, doc));
//   }
// }

// -------------------------------------------------------------------------------------------

// Step 1: Define a generic revision schema

const revisionSchema = new Schema({
  originalId: {
    type: Schema.Types.ObjectId,
    required: true,
    refPath: "modelName",
  },
  modelName: {
    type: String,
    required: true,
  },
  data: {
    type: Schema.Types.Mixed,
    required: true,
  },
  revision: {
    type: Number,
    required: true,
  },
  dateSet: {
    type: Date,
    default: Date.now,
  },
});

const Revision = db.model("Revision", revisionSchema);

function addRevisionHooks(schema, modelName) {
  schema.post("save", async function (doc) {
    await saveRevision(doc, modelName);
  });

  schema.post("findOneAndUpdate", async function (doc) {
    if (doc) {
      await saveRevision(doc, modelName);
    }
  });

  async function saveRevision(doc, modelName) {
    const revisionCount = await Revision.countDocuments({ originalId: doc._id, modelName });

    const revision = new Revision({
      originalId: doc._id,
      modelName: modelName,
      data: doc.toObject(),
      revision: revisionCount + 1,
    });

    await revision.save();
  }
}

function addRevisionToModel(schema, modelName) {
  addRevisionHooks(schema, modelName);
}

const userSchema = new Schema({
  name: String,
  email: String,
  age: Number,
});

addRevisionToModel(userSchema, "User");

const User = db.model("User", userSchema);

const productSchema = new Schema({
  name: String,
  price: Number,
  category: String,
});

addRevisionToModel(productSchema, "Product");

const Product = db.model("Product", productSchema);

async function createUser() {
  const user = new User({
    name: "John Doe",
    email: "john@example.com",
    age: 30,
  });

  await user.save();
}
// createUser();

async function createProduct() {
  const product = new Product({
    name: "Laptop",
    price: 1200,
    category: "Electronics",
  });

  await product.save();
}
// createProduct()

async function updateUser(id) {
  await User.findOneAndUpdate({ _id: id }, { $set: { age: 31 } }, { new: true });
}
// updateUser("6707bc4cd0a1645671e6da85");

async function updateProduct(id) {
  await Product.findOneAndUpdate({ _id: id }, { $set: { price: 1100 } }, { new: true });
}
// updateProduct("6707bc9e96e8b350d302c3b8")
