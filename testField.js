const fields = [
  {
    field: "username",
    path: "username",
    type: "String",
    field_type: "Single",
    meta: {
      required: false,
    },
    schema_definition: {
      type: "String",
    },
  },
  {
    field: "email",
    path: "email",
    type: "String",
    field_type: "Single",
    meta: {
      required: true,
    },
    schema_definition: {
      type: "String",
    },
  },

  {
    field: "address",
    path: "address",
    type: "Object",
    field_type: "Object",
    meta: {
      required: true,
    },
    schema_definition: {
      type: "Object",
    },
  },
  {
    field: "street",
    path: "address.street",
    type: "String",
    field_type: "Object",
    meta: {
      required: true,
    },
    schema_definition: {
      type: "String",
    },
  },
  {
    field: "city",
    path: "address.city",
    type: "String",
    field_type: "Object",
    meta: {
      required: true,
    },
    schema_definition: {
      type: "String",
    },
  },
  {
    field: "zip",
    path: "address.zip",
    type: "String",
    field_type: "Object",
    meta: {
      required: true,
    },
    schema_definition: {
      type: "String",
    },
  },

  {
    field: "comments",
    path: "comments",
    type: "Array",
    field_type: "Object",
    meta: {
      required: true,
    },
    schema_definition: {
      type: "Array",
    },
  },
  {
    field: "author",
    path: "comments.author",
    type: "String",
    field_type: "Object",
    meta: {
      required: true,
    },
    schema_definition: {
      type: "String",
    },
  },
  {
    field: "zip1",
    path: "comments.zip1",
    type: "String",
    field_type: "Object",
    meta: {
      required: true,
    },
    schema_definition: {
      type: "String",
    },
  },
  {
    field: "text",
    path: "comments.text",
    type: "String",
    field_type: "Object",
    meta: {
      required: true,
    },
    schema_definition: {
      type: "String",
    },
  },
  {
    field: "date",
    path: "comments.date",
    type: "Date",
    field_type: "Object",
    meta: {
      required: true,
    },
    schema_definition: {
      type: "Date",
    },
  },
  {
    field: "replies",
    path: "comments.replies",
    type: "Object",
    field_type: "Object",
    meta: {
      required: true,
    },
    schema_definition: {
      type: "Object",
    },
  },
  {
    field: "replyAuthor",
    path: "comments.replies.author",
    type: "String",
    field_type: "Object",
    meta: {
      required: true,
    },
    schema_definition: {
      type: "String",
    },
  },
  {
    field: "replyText",
    path: "comments.replies.text",
    type: "String",
    field_type: "Object",
    meta: {
      required: true,
    },
    schema_definition: {
      type: "String",
    },
  },
  {
    field: "replyDate",
    path: "comments.replies.date",
    type: "Date",
    field_type: "Object",
    meta: {
      required: true,
    },
    schema_definition: {
      type: "Date",
    },
  },
  {
    field: "newarray",
    path: "comments.replies.newarray",
    type: "Array",
    field_type: "Object",
    meta: {
      required: true,
    },
    schema_definition: {
      type: "Array",
    },
  },
  {
    field: "sahil",
    path: "comments.replies.newarray.sahil",
    type: "Date",
    field_type: "Object",
    meta: {
      required: true,
    },
    schema_definition: {
      type: "Date",
    },
  },
  {
    field: "sahil1",
    path: "comments.replies.newarray.sahil1",
    type: "Date",
    field_type: "Object",
    meta: {
      required: true,
    },
    schema_definition: {
      type: "Date",
    },
  },
  {
    field: "arraytest",
    path: "comments.replies.newarray.arraytest",
    type: "Array",
    field_type: "Object",
    meta: {
      required: false,
    },
    schema_definition: {
      type: "String",
    },
  },

  {
    field: "age",
    path: "age",
    type: "Number",
    field_type: "Single",
    meta: {
      required: true,
    },
    schema_definition: {
      type: "Number",
    },
  },
  {
    field: "numbers",
    path: "numbers",
    type: "Array",
    field_type: "Object",
    meta: {
      required: true,
    },
    schema_definition: {
      type: "Number",
    },
  },
  {
    field: "many_to_many",
    path: "many_to_many",
    type: "Alias",
    field_type: "Array",
    meta: {
      required: false,
    },
    schema_definition: {
      type: "Alias",
    },
  },
  {
    field: "one_to_many",
    path: "one_to_many",
    type: "Alias",
    field_type: "Array",
    meta: {
      required: false,
    },
    schema_definition: {
      type: "Alias",
    },
  },
  {
    field: "many_to_one",
    path: "many_to_one",
    type: "ObjectId",
    field_type: "Single",
    meta: {
      required: false,
    },
    schema_definition: {
      type: "ObjectId",
    },
  },
  {
    field: "testing",
    path: "testing",
    type: "Object",
    field_type: "Object",
    meta: {
      required: false,
    },
    schema_definition: {
      type: "Object",
    },
  },
  {
    field: "arraytest",
    path: "testing.arraytest",
    type: "Array",
    field_type: "Object",
    meta: {
      required: false,
    },
    schema_definition: {
      type: "String",
    },
  },
];

// function convertFieldsToConvertedData(fields) {
//   const convertedData = {
//     fields: [],
//   };

//   function addToConvertedData(currentLevel, pathParts, field) {
//     pathParts.forEach((part, index) => {
//       let existingField = currentLevel.find((item) => item.fieldName === part);

//       if (!existingField) {
//         const newField = {
//           fieldName: part,
//           type: index === pathParts.length - 1 ? field.schema_definition.type : "Object",
//         };

//         if (index === pathParts.length - 1 && field.ref) {
//           newField.ref = field.ref;
//         }

//         if (field.schema_definition) {
//           newField.schemaDef = field.schema_definition;
//         }

//         currentLevel.push(newField);
//         existingField = newField;
//       }

//       if (index < pathParts.length - 1) {
//         if (!existingField.fields) {
//           existingField.fields = [];
//         }
//         currentLevel = existingField.fields;
//       }
//     });
//   }

//   (fields || [])?.forEach((field) => {
//     if (field.type !== "Alias")
//       if (field.field_type === "Single") {
//         convertedData.fields.push({
//           fieldName: field.field,
//           type: field.type,
//           schemaDef: field.schema_definition,
//         });
//       } else if (field.field_type === "Object") {
//         addToConvertedData(convertedData.fields, field.path.split("."), field);
//       } else if (field.field_type === "Array") {
//         convertedData.fields.push({
//           fieldName: field.field,
//           type: "Array",
//           arrayType: field.type,
//         });
//       }
//   });

//   return convertedData;
// }

function convertFieldsToConvertedData(fields) {
  const convertedData = {
    fields: [],
  };

  function addToConvertedData(currentLevel, pathParts, field) {
    pathParts.forEach((part, index) => {
      let existingField = currentLevel.find((item) => item.fieldName === part);

      if (!existingField) {
        const fieldType = {};
        let type = field.schema_definition.type;

        if (field.type === "Array" && field.field_type === "Object" && type !== field.type) {
          fieldType["arrayType"] = type;
          type = "Array";
        }

        const newField = {
          fieldName: part,
          type: index === pathParts.length - 1 ? type : "Object",
          ...fieldType,
        };

        if (index === pathParts.length - 1 && field.ref) {
          newField.ref = field.ref;
        }

        if (field.schema_definition) {
          newField.schemaDef = field.schema_definition;
        }

        currentLevel.push(newField);
        existingField = newField;
      }

      if (index < pathParts.length - 1) {
        if (!existingField.fields) {
          existingField.fields = [];
        }
        currentLevel = existingField.fields;
      }
    });
  }

  (fields || [])?.forEach((field) => {
    if (field.type !== "Alias") {
      if (field.field_type === "Single") {
        convertedData.fields.push({
          fieldName: field.field,
          type: field.type,
          schemaDef: field.schema_definition,
        });
      } else if (field.field_type === "Object") {
        addToConvertedData(convertedData.fields, field.path.split("."), field);
      }
       else if (field.field_type === "Array") {
        convertedData.fields.push({
          fieldName: field.field,
          type: "Array",
          arrayType: field.type,
        });
      }
    }
  });

  return convertedData;
}

console.log(convertFieldsToConvertedData(fields), "convertFieldsToConvertedData(fields)");

function convertToSchemaTypes(fields) {
  const schemaFields = {};

  fields?.fields?.forEach((field) => {
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
        } else if (field.arrayType) {
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
              type = [{ ...convertToSchemaTypes({ fields: field.fields }) }];
              break;
            default:
              type = [mongoose.Schema.Types.Mixed];
          }
        } else {
          type = [convertToSchemaTypes({ fields: field.fields })];
        }
        break;
      case "Object":
        schemaFields[field.fieldName] = convertToSchemaTypes({ fields: field.fields });
        // type = { ...convertToSchemaTypes({ fields: field.fields }) };
        break;
      default:
        type = mongoose.Schema.Types.Mixed;
    }

    if (field.type !== "Object") {
      schemaFields[field.fieldName] = { type: type, required: !!field?.required };
    }

    if (field.ref) {
      schemaFields[field.fieldName].ref = field.ref;
    }
  });

  return schemaFields;
}

// const mongoose = require("mongoose");

// mongoose
//   .connect("mongodb://root:root@localhost:27017", { dbName: "test" })
//   .then(() => {
//     console.log("MongoDB connected");
//     // Example usage of the UserModel
//     const schemaDef = convertToSchemaTypes(convertFieldsToConvertedData(fields));
//     const UserModel = mongoose.model("user", schemaDef);
//     UserModel.findOneAndReplace(
//       {},
//       {
//         username: "sahil_test1_user",
//         email: "sahil_test1@example.com",
//         date: ["2023-09-06T12:00:00Z"],
//         address: {
//           street: "sahil_test1_street",
//           city: "sahil_test1_city",
//           zip: "sahil_test1_zip",
//           extra: "123",
//         },
//         comments: [
//           {
//             zip1: false,
//             extra: "123",
//             author: "sahil_test1_author",
//             text: "sahil_test1_comment_text",
//             date: "2023-09-05T12:00:00Z",
//             replies: {
//               author: "sahil_test1_reply_author",
//               text: "sahil_test1_reply_text",
//               date: "2023-09-06T12:00:00Z",
//               extra: "123",
//               newarray: [
//                 {
//                   sahil: "2023-09-07T12:00:00Z",
//                   sahil1: "2023-09-08T12:00:00Z",
//                   extra: "123",
//                 },
//               ],
//             },
//           },
//         ],
//         age: 30,
//         numbers: [123, 456],
//         many_to_many: ["alias1", "alias2"],
//         one_to_many: ["alias1", "alias2"],
//         many_to_one: "64eacf5f5a9e4b1d895d9d8c",
//       }
//     )
//       .then((user) => {
//         // console.log("User created:", user);
//       })
//       .catch((err) => {
//         console.error("Error creating user:", err);
//       });
//   })
//   .catch((err) => {
//     console.error("Error connecting to MongoDB:", err);
//   });
