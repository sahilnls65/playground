const { sanitizePayloadWithFields, sanitizeBulk } = require("dynamic-schema-sanitizer");
const mongoose = require("mongoose");

const complexFields = {
  // 🔹 Basic primitives
  name: { type: "String", required: true, trim: true, lowercase: true },
  description: { type: "String", default: "" },
  isActive: { type: "Boolean", default: true },
  rating: { type: "Number", min: 0, max: 5, default: 0 },

  // 🔹 ObjectId references
  createdBy: { type: "ObjectId", ref: "USER", required: true },
  tenantId: { type: "ObjectId", ref: "TENANT" },
  relatedItems: [{ type: "ObjectId", ref: "ITEM" }],

  // 🔹 Dates
  createdAt: { type: "Date", default: () => new Date() },
  updatedAt: { type: "Date" },
  launchDate: { type: "Date" }, // custom meta not expressed in schema
  eventTime: { type: "Date" }, // custom meta not expressed in schema

  // 🔹 Enumerations
  status: {
    type: "String",
    enum: ["draft", "active", "archived"],
    default: "draft",
  },

  // 🔹 Mixed type (anything allowed)
  settings: { type: "Mixed" },
  metadata: { type: "Mixed" },

  // 🔹 Nested Object with its own fields
  profile: {
    age: { type: "Number", min: 0, max: 120, required: true },
    gender: { type: "String", enum: ["male", "female", "other"] },
    bio: { type: "String" },
    contacts: {
      email: { type: "String", match: /.+@.+\..+/ },
      phone: { type: "String" },
    },
  },

  // 🔹 Array of primitives
  tags: { type: ["String"], default: [] },

  // 🔹 Array of objects
  auditLogs: [
    {
      action: { type: "String" },
      by: { type: "ObjectId", ref: "USER" },
      timestamp: { type: "Date", default: () => new Date() },
      changes: [
        {
          field: { type: "String" },
          oldValue: { type: "Mixed" },
          newValue: { type: "Mixed" },
        },
      ],
    },
  ],

  // 🔹 Deeply nested structure (array inside object inside array)
  dashboards: [
    {
      name: { type: "String" },
      layout: { type: "String" },
      widgets: [
        {
          type: { type: "String", required: true },
          position: {
            x: { type: "Number" },
            y: { type: "Number" },
            w: { type: "Number" },
            h: { type: "Number" },
          },
          config: { type: "Mixed" },
        },
      ],
    },
  ],

  // 🔹 Object with references and constraints
  permission: {
    role: { type: "String", trim: true },
    accessLevel: { type: "Number", min: 1, max: 10 },
    grantedBy: { type: "ObjectId", ref: "USER" },
    grantedAt: { type: "Date" },
  },

  // 🔹 Nested custom schema (simulate sub-model)
  preferences: {
    notifications: {
      email: { type: "Boolean", default: true },
      sms: { type: "Boolean", default: false },
      push: { type: "Boolean", default: true },
    },
    theme: {
      mode: { type: "String", enum: ["light", "dark"], default: "light" },
      primaryColor: { type: "String" },
    },
  },
};

const dummyData = {
  name: "sample name",
  description: "A dummy description",
  isActive: false,
  rating: 3.7,

  createdBy: "64ebaa851f3baf10f1a7aa4d", // Example ObjectId string
  tenantId: "64ebaa851f3baf10f1a7aa4e",
  relatedItems: ["64ebaa851f3baf10f1a7aa50", "64ebaa851f3baf10f1a7aa51"],

  createdAt: new Date("2024-06-26T08:00:00Z"),
  updatedAt: new Date("2024-06-27T18:05:00Z"),
  launchDate: new Date("2025-02-01T12:00:00Z"),
  eventTime: new Date("2025-03-10T16:43:00Z"),

  status: "archived",

  settings: { notifications: false, theme: "custom" },
  metadata: { version: 3, notes: "auto-imported entry" },

  profile: {
    age: 31,
    gender: "female",
    bio: "Cool person with a passion for programming.",
    contacts: {
      email: "someone@example.com",
      phone: "+9988776655",
    },
  },

  tags: ["mongodb", "nodejs", "backend"],

  auditLogs: [
    {
      action: 3,
      by: "64ebaa851f3baf10f1a7aa4d",
      timestamp: new Date("2024-06-26T08:00:00Z"),
      changes: [
        {
          field: "status",
          oldValue: null,
          newValue: "draft",
        },
      ],
    },
    {
      action: "updated",
      by: "64ebaa851f3baf10f1a7aa4e",
      timestamp: new Date("2024-06-27T18:05:00Z"),
      changes: [
        {
          field: "description",
          oldValue: "A dummy description",
          newValue: "Changed description for audit testing",
        },
      ],
    },
  ],

  dashboards: [
    {
      name: "Main Dashboard",
      layout: "grid",
      widgets: [
        {
          type: "table",
          position: { x: "1", y: 2, w: 4, h: 2 },
          config: { showTotals: "true" },
        },
        {
          type: "chart",
          position: { x: "4", y: 4, w: 4, h: 3 },
          config: { chartType: "pie", legend: false },
        },
      ],
    },
  ],

  permission: {
    role: "     Manager      ",
    accessLevel: "9",
    grantedBy: "64ebaa851f3baf10f1a7aa4e",
    grantedAt: new Date("2024-06-20T08:00:00Z"),
  },

  preferences: {
    notifications: {
      email: false,
      sms: true,
      push: false,
    },
    theme: {
      mode: "light",
      primaryColor: "#ffffff",
    },
  },
};

const result = sanitizePayloadWithFields(dummyData, complexFields, {
  validate: true,
  strictNested: true,
});

console.dir(result, { depth: null });

// async function run() {
//   // --- Dynamic Sanitizer ---
//   console.time("dynamic-schema-sanitizer");
//   let t1 = performance.now();
//   for (let i = 0; i < 1000; i++) {
//     sanitizePayloadWithFields(dummyData, complexFields);
//   }
//   let t2 = performance.now();
//   console.timeEnd("dynamic-schema-sanitizer");
//   const sanitizerDuration = t2 - t1;

//   // --- Mongoose ---
//   const MongooseSchema = new mongoose.Schema({
//     // 🔹 Basic primitives
//     name: { type: String, required: true, trim: true, lowercase: true },
//     description: { type: String, default: "" },
//     isActive: { type: Boolean, default: true },
//     rating: { type: Number, min: 0, max: 5, default: 0 },

//     // 🔹 ObjectId references
//     createdBy: { type: mongoose.Types.ObjectId, ref: "USER", required: true },
//     tenantId: { type: mongoose.Types.ObjectId, ref: "TENANT" },
//     relatedItems: [{ type: mongoose.Types.ObjectId, ref: "ITEM" }],

//     // 🔹 Dates
//     createdAt: { type: Date, default: () => new Date() },
//     updatedAt: { type: Date },
//     launchDate: { type: Date },
//     eventTime: { type: Date },

//     // 🔹 Enumerations
//     status: {
//       type: String,
//       enum: ["draft", "active", "archived"],
//       default: "draft",
//     },

//     // 🔹 Mixed type (anything allowed)
//     settings: { type: mongoose.Schema.Types.Mixed },
//     metadata: { type: mongoose.Schema.Types.Mixed },

//     // 🔹 Nested Object with its own fields
//     profile: {
//       age: { type: Number, min: 0, max: 120, required: true },
//       gender: { type: String, enum: ["male", "female", "other"] },
//       bio: { type: String },
//       contacts: {
//         email: { type: String, match: /.+@.+\..+/ },
//         phone: { type: String },
//       },
//     },

//     // 🔹 Array of primitives
//     tags: { type: [String], default: [] },

//     // 🔹 Array of objects
//     auditLogs: [
//       {
//         action: { type: String },
//         by: { type: mongoose.Types.ObjectId, ref: "USER" },
//         timestamp: { type: Date, default: () => new Date() },
//         changes: [
//           {
//             field: { type: String },
//             oldValue: { type: mongoose.Schema.Types.Mixed },
//             newValue: { type: mongoose.Schema.Types.Mixed },
//           },
//         ],
//       },
//     ],

//     // 🔹 Deeply nested structure (array inside object inside array)
//     dashboards: [
//       {
//         name: { type: String },
//         layout: { type: String },
//         widgets: [
//           {
//             type: { type: String, required: true },
//             position: {
//               x: { type: Number },
//               y: { type: Number },
//               w: { type: Number },
//               h: { type: Number },
//             },
//             config: { type: mongoose.Schema.Types.Mixed },
//           },
//         ],
//       },
//     ],

//     // 🔹 Object with references and constraints
//     permission: {
//       role: { type: String, trim: true },
//       accessLevel: { type: Number, min: 1, max: 10 },
//       grantedBy: { type: mongoose.Types.ObjectId, ref: "USER" },
//       grantedAt: { type: Date },
//     },

//     // 🔹 Nested custom schema (simulate sub-model)
//     preferences: {
//       notifications: {
//         email: { type: Boolean, default: true },
//         sms: { type: Boolean, default: false },
//         push: { type: Boolean, default: true },
//       },
//       theme: {
//         mode: { type: String, enum: ["light", "dark"], default: "light" },
//         primaryColor: { type: String },
//       },
//     },
//   });
//   const Model = mongoose.model("TestModel", MongooseSchema);

//   console.time("mongoose-validate");
//   let t3 = performance.now();
//   for (let i = 0; i < 1000; i++) {
//     const doc = new Model(dummyData);
//     await doc.validate();
//   }
//   let t4 = performance.now();
//   console.timeEnd("mongoose-validate");
//   const mongooseDuration = t4 - t3;

//   // --- Percentage Value Metric ---
//   let percentFaster = 0;
//   if (sanitizerDuration < mongooseDuration) {
//     percentFaster = ((mongooseDuration - sanitizerDuration) / mongooseDuration) * 100;
//     console.log(`Dynamic-sanitizer is ${percentFaster.toFixed(2)}% faster than Mongoose validate`);
//   } else if (mongooseDuration < sanitizerDuration) {
//     percentFaster = ((sanitizerDuration - mongooseDuration) / sanitizerDuration) * 100;
//     console.log(`Mongoose validate is ${percentFaster.toFixed(2)}% faster than dynamic-sanitizer`);
//   } else {
//     console.log("Both dynamic-sanitizer and Mongoose validate took the same time.");
//   }

//   process.exit(0);
// }

// run();
