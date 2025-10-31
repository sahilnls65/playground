const { ObjectId } = require("mongodb");

function sanitizePayloadWithFields(fields, payload, options = {}) {
  const {
    unknownFields = "strip",
    strict = false,
    validate = true,
    debugPaths = true, // 👈 Toggle path logging
  } = options;

  const errors = [];

  // ---- Helpers ----
  const logPath = (path, val) => {
    if (debugPaths) console.log("fullPath", path, val !== undefined ? `→ ${typeof val}` : "");
  };

  const coerceBoolean = (val) => {
    if (typeof val === "boolean") return val;
    if (["1", 1, "true", "yes", "on"].includes(val)) return true;
    if (["0", 0, "false", "no", "off"].includes(val)) return false;
    return val;
  };

  const coerceObjectId = (val) => {
    if (!val) return val;
    if (typeof val === "string" && /^[a-fA-F0-9]{24}$/.test(val)) return new ObjectId(val);
    return val;
  };

  const coerceDate = (val) => {
    if (!val) return val;
    if (val instanceof Date && !isNaN(val.getTime())) return val;
    const d = new Date(val);
    return isNaN(d.getTime()) ? null : d;
  };

  // ---- Validation ----
  const validateConstraints = (key, rule, value) => {
    if (value === undefined || value === null) {
      if (rule.required)
        errors.push({ path: key, code: "required", message: `${key} is required` });
      return;
    }

    if (rule.enum && !rule.enum.includes(value))
      errors.push({
        path: key,
        code: "enum",
        message: `${key} must be one of ${rule.enum.join(", ")}`,
      });

    if (typeof value === "number") {
      if (rule.min != null && value < rule.min)
        errors.push({ path: key, code: "min", message: `${key} < ${rule.min}` });
      if (rule.max != null && value > rule.max)
        errors.push({ path: key, code: "max", message: `${key} > ${rule.max}` });
    }

    if (rule.match && typeof value === "string" && !rule.match.test(value))
      errors.push({ path: key, code: "match", message: `${key} does not match pattern` });
  };

  // ---- Type coercion ----
  function coerceValue(rule, val, path) {
    if (val === undefined) return val;
    switch (rule.type) {
      case "String": {
        if (val == null) return val;
        let s = String(val);
        if (rule.trim) s = s.trim();
        if (rule.lowercase) s = s.toLowerCase();
        if (rule.uppercase) s = s.toUpperCase();
        return s;
      }
      case "Number": {
        if (val == null || val === "") return val;
        const n = Number(val);
        if (Number.isNaN(n)) {
          errors.push({ path, code: "type", message: `${path} must be a number` });
          return strict ? undefined : val;
        }
        return n;
      }
      case "Boolean":
        return coerceBoolean(val);
      case "Date":
        return coerceDate(val);
      case "ObjectId":
        return coerceObjectId(val);
      case "Mixed":
        return val;
      default:
        return val;
    }
  }

  // ---- Deep Recursive Processor ----
  function processAny(schema, value, path = "") {
    logPath(path);

    // Array schema
    if (Array.isArray(schema)) {
      const subSchema = schema[0];
      if (!Array.isArray(value)) return [];

      return value.map((item, i) => {
        const subPath = `${path}[${i}]`;
        logPath(subPath);
        // 👇 recursion for array of objects or nested arrays
        if (typeof subSchema === "object" && (!subSchema.type || Array.isArray(subSchema))) {
          return processAny(subSchema, item, subPath);
        }
        const coerced = coerceValue(subSchema, item, subPath);
        if (validate) validateConstraints(subPath, subSchema, coerced);
        return coerced;
      });
    }

    // Object schema (no .type)
    if (typeof schema === "object" && !schema.type) {
      const result = {};
      const src = value && typeof value === "object" ? value : {};
      logPath(path);

      for (const key in schema) {
        const rule = schema[key];
        const fullPath = path ? `${path}.${key}` : key;
        logPath(fullPath);
        let val = src[key];

        // Nested object or array
        if (Array.isArray(rule) || (typeof rule === "object" && !rule.type)) {
          result[key] = processAny(rule, val, fullPath);
          continue;
        }

        // Defaults
        if (val === undefined || val === null) {
          if (rule.default !== undefined)
            val = typeof rule.default === "function" ? rule.default() : rule.default;
        }

        const coerced = coerceValue(rule, val, fullPath);
        if (validate) validateConstraints(fullPath, rule, coerced);
        if (coerced !== undefined) result[key] = coerced;
      }

      // Unknown fields
      if (unknownFields !== "strip") {
        for (const k in src) {
          if (!schema[k]) {
            const unknownPath = path ? `${path}.${k}` : k;
            if (unknownFields === "keep") result[k] = src[k];
            else if (unknownFields === "error")
              errors.push({
                path: unknownPath,
                code: "unknown",
                message: `${unknownPath} is not allowed`,
              });
          }
        }
      }

      return result;
    }

    // Primitive schema
    const coerced = coerceValue(schema, value, path);
    if (validate) validateConstraints(path, schema, coerced);
    return coerced;
  }

  const sanitized = processAny(fields, payload);
  return { valid: errors.length === 0, data: sanitized, errors };
}

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
    age: { type: "Number", min: 0, max: 120 },
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
          type: { type: "String" },
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
    role: { type: "String" },
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

// Dummy data corresponding to the above fields
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
      action: "created",
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
          position: { x: 4, y: 4, w: 4, h: 3 },
          config: { chartType: "pie", legend: false },
        },
      ],
    },
  ],

  permission: {
    role: "manager",
    accessLevel: 9,
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

// const { sanitizePayloadWithFields } = require("./sanitizePayloadWithFields.util");

const result = sanitizePayloadWithFields(complexFields, dummyData, {
  unknownFields: "strip",
  validate: true,
});

// console.dir(result, { depth: null });
