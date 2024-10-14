const schema = {
  _id: "schema_id",
  schemaName: "UserSchema",
  collectionName: "users",
  fields: [
    {
      fieldName: "username",
      type: "String",
      required: true,
    },
    {
      fieldName: "email",
      type: "String",
      required: true,
    },
    {
      fieldName: "age",
      type: "Number",
      required: false,
      default: 18,
    },
    {
      fieldName: "address",
      type: "Object",
      fields: [
        {
          fieldName: "street",
          type: "String",
          required: true,
        },
        {
          fieldName: "city",
          type: "String",
          required: true,
        },
      ],
    },
    {
      fieldName: "posts",
      type: "Array",
      fields: [{ type: "ObjectId", ref: "Post" }],
    },
  ],
  createdAt: "2024-05-31T12:00:00Z",
  updatedAt: "2024-05-31T12:00:00Z",
};

const mongoose = require("mongoose");

// Function to create Mongoose schema from JSON schema definition
const createMongooseSchema = (schemaDefinition) => {
  const mongooseSchemaDefinition = {};

  schemaDefinition.fields.forEach((field) => {
    let fieldConfig = {
      type: mongoose.Schema.Types[field.type],
    };

    if (field.required) fieldConfig.required = field.required;
    if (field.unique) fieldConfig.unique = field.unique;
    if (field.default) fieldConfig.default = field.default;

    if (field.type === "Object" && field.fields) {
      fieldConfig = createMongooseSchema(field.fields);
    }

    mongooseSchemaDefinition[field.fieldName] = fieldConfig;
  });

  return {
    schema: new mongoose.Schema(mongooseSchemaDefinition),
    fields: mongooseSchemaDefinition,
  };
};

// Create Mongoose model

mongoose
  .connect("mongodb://localhost:27017/test")
  .then(() => {
    console.log("MongoDB connected");

    // Example usage of the UserModel
    const UserSchema = createMongooseSchema(schema);
    const UserModel = mongoose.model("user", UserSchema.schema);
    UserModel.create({
      username: "testuser",
      email: "testuser@example.com",
      address: { street: "Nikol", city: "AMD", extra: "extra" },
      extra: "extra",
    })
      .then((user) => {
        console.log("User created:", user);
      })
      .catch((err) => {
        console.error("Error creating user:", err);
      });
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });

// console.log(UserSchema.schema);
