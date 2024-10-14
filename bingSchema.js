const schema = {
  _id: "schema_id",
  collectionName: "users",
  fields: [
    {
      fieldName: "username",
      type: "String",
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      meta: {
        readonly: true,
        hidden: true,
        sort: 1,
        width: "full",
        note: "Note",
        interface: "input",
      },
    },
    {
      fieldName: "email",
      type: "String",
      required: true,
      unique: true,
      lowercase: true,
    },
    {
      fieldName: "age",
      type: "Number",
      required: false,
      default: 18,
      min: 0,
      max: 120,
    },
    {
      fieldName: "address",
      type: "Object",
      fields: [
        {
          fieldName: "street",
          type: "String",
          required: true,
          trim: true,
        },
        {
          fieldName: "city",
          type: "String",
          required: true,
          trim: true,
        },
      ],
    },
    {
      fieldName: "role",
      type: "ObjectId",
      ref: "Role",
    },
    {
      fieldName: "posts",
      type: "Array",
      arrayType: "ObjectId",
      ref: "Post",
    },
    {
      fieldName: "datePosts",
      type: "Array",
      arrayType: "Date",
    },
    {
      fieldName: "comments",
      type: "Array",
      arrayType: "Object",
      fields: [
        {
          fieldName: "author",
          type: "String",
          required: true,
        },
        {
          fieldName: "text",
          type: "String",
          required: true,
        },
        {
          fieldName: "date",
          type: "Date",
          required: true,
        },
      ],
    },
    {
      fieldName: "userRef",
      type: "ObjectId",
      ref: "User",
    },
  ],
};

const convertToSchemaTypes = (fields) => {
  const schemaFields = {};

  fields.forEach((field) => {
    let type;

    switch (field.type) {
      case "String":
        type = String;
        break;
      case "Number":
        type = Number;
        break;
      case "Date":
        type = Date;
        break;
      case "Buffer":
        type = Buffer;
        break;
      case "Boolean":
        type = Boolean;
        break;
      case "Mixed":
        type = mongoose.Schema.Types.Mixed;
        break;
      case "ObjectId":
        type = mongoose.Schema.Types.ObjectId;
        break;
      case "Array":
        if (field.ref) {
          type = [
            {
              type: mongoose.Schema.Types.ObjectId,
              ref: field.ref,
            },
          ];
        } else {
          switch (field.arrayType) {
            case "String":
              type = [String];
              break;
            case "Number":
              type = [Number];
              break;
            case "Boolean":
              type = [Boolean];
              break;
            case "Date":
              type = [Date];
              break;
            case "Buffer":
              type = [Buffer];
              break;
            case "ObjectId":
              type = [mongoose.Schema.Types.ObjectId];
              break;
            case "Mixed":
              type = [mongoose.Schema.Types.Mixed];
              break;
            case "Object":
              type = [new mongoose.Schema(convertToSchemaTypes(field.fields))];
              break;
            default:
              type = [mongoose.Schema.Types.Mixed];
          }
        }
        break;
      case "Object":
        type = new mongoose.Schema(convertToSchemaTypes(field.fields));
        break;
      default:
        type = mongoose.Schema.Types.Mixed;
    }

    schemaFields[field.fieldName] = { type: type, required: !!field.required };

    if (field.default !== undefined) {
      schemaFields[field.fieldName].default = field.default;
    }

    if (field.ref) {
      schemaFields[field.fieldName].ref = field.ref;
    }

    if (field.unique) {
      schemaFields[field.fieldName].unique = field.unique;
    }

    if (field.match) {
      schemaFields[field.fieldName].match = field.match;
    }

    if (field.min !== undefined) {
      schemaFields[field.fieldName].min = field.min;
    }
    if (field.max !== undefined) {
      schemaFields[field.fieldName].max = field.max;
    }

    if (field.trim) {
      schemaFields[field.fieldName].trim = field.trim;
    }
    if (field.lowercase) {
      schemaFields[field.fieldName].lowercase = field.lowercase;
    }
  });

  return schemaFields;
};

const createDynamicSchema = (schemaJson) => {
  const schemaDef = convertToSchemaTypes(schemaJson.fields);
  const dynamicSchema = new mongoose.Schema(schemaDef, {
    timestamps: true,
    collection: schemaJson.collectionName,
  });
  return dynamicSchema;
};

const moment = require("moment");
const mongoose = require("mongoose");
const { ObjectId } = require("mongodb");

// try {
//   let db = mongoose.createConnection("mongodb://root:root@localhost:27017");
//   // db = await db.asPromise();
// } catch (error) {
//   console.log(error, "");
// }
// .then(async () => {
//   console.log("MongoDB connected");

//   // Example usage of the UserModel
//   const UserSchema = createDynamicSchema(schema);
//   const UserModel = mongoose.model("user", UserSchema);
//   UserModel.create({
//     username: "testuser",
//     email: "testuser@example.com",
//     age: 25,
//     address: {
//       street: "Nikol",
//       city: "AMD",
//       extra: "extra",
//     },
//     extra: "extra",
//     role: "666841644402963a71bdc2cf",
//     posts: ["666841644402963a71bdc2cf"],
//     datePosts: ["2023-05-20T00:00:00.000Z", "2023-06-12T00:00:00.000Z"],
//     comments: [
//       {
//         author: "Jane Doe",
//         text: "This is a comment",
//         date: "2023-06-10T00:00:00.000Z",
//       },
//       {
//         author: "John Smith",
//         text: "Another comment",
//         date: "2023-06-11T00:00:00.000Z",
//       },
//     ],
//     userRef: "666841644402963a71bdc2cf",
//   })
//     .then((user) => {
//       console.log("User created:", user);
//     })
//     .catch((err) => {
//       console.error("Error creating user:", err);
//     });
// })
// .catch((err) => {
//   console.error("Error connecting to MongoDB:", err);
// });
// const tenantId = new ObjectId();
// const data = {
//   email: "sahil@gmail.com",
//   environments: [
//     { database_name: "", connection_string: "", type: "Development" },
//     { database_name: "", connection_string: "", type: "Acceptance" },
//     { database_name: "", connection_string: "", type: "Production" },
//   ],
// };
// const environments = [];
// for (const iterator of data?.environments) {
//   const userName = `${body?.email}-${iterator.type}`;
//   const password = "password";
//   const databaseName = `${tenantId}-${iterator.type}`;

//   let dbInfo = {};

//   await db
//     .useDb(databaseName)
//     .db.admin()
//     .command({
//       createUser: userName,
//       pwd: password,
//       roles: [{ role: "readWrite", db: databaseName }],
//     })
//     .then(() => {
//       dbInfo = {
//         database_name: databaseName,
//         connection_string: `mongodb://${userName}:${password}@${MONGODB.HOST}/${databaseName}`,
//       };
//     })
//     .catch(() => {
//       dbInfo = {
//         database_name: "",
//         connection_string: "",
//       };
//     });

//   environments.push({ ...iterator, ...dbInfo });
// }

// setTimeout(async () => {
// await db
//   .useDb("new")
//   .db.admin()
//   .command({
//     createUser: "newuser3",
//     pwd: "newuser",
//     roles: [{ role: "readWrite", db: "new" }],
//   })
//   .then((res) => {
//     if (res.ok === 1) {
//       console.log(res, "res");
//     }else{
//       console.log('fa');
//     }
//   })
//   .catch((err) => {
//     console.log(err, "err");
//   });
// }, 2000);

// const dbData = db.createUser({
//   user: "root",
//   pwd: "zUCkdzIvvf6RG3Dc1UugBq3CM7ZTcVeP",
//   roles: [
//     "userAdminAnyDatabase",
//     "dbAdminAnyDatabase",
//     "readWriteAnyDatabase",
//     "restore",
//     "backup",
//   ],
// });
