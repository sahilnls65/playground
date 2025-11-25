const { Types } = require("mongoose");

// ======================================================
//  Main Function (all logic inside one closure)
// ======================================================
/**
 * Deep sanitize + validate payloads using a dynamic schema.
 *
 * @param {any} payload
 *    The incoming data to sanitize/validate. Can be any nested structure:
 *    objects, arrays, primitives.
 *
 * @param {Object} schema
 *    Dynamic schema describing the expected structure.
 *    Supported field properties:
 *      - type: "String" | "Number" | "Boolean" | "Date" | "ObjectId" | "Mixed"
 *      - required: boolean
 *      - default: any | () => any
 *      - enum: any[]
 *      - match: RegExp
 *      - min: number
 *      - max: number
 *      - trim: boolean      (String only)
 *      - lowercase: boolean (String only)
 *      - uppercase: boolean (String only)
 *
 *    Schema can be:
 *      - Primitive field: { type: "String" }
 *      - Array of primitives: { type: ["String"] }
 *      - Array of objects: [ { ...schema } ]
 *      - Nested object: { nestedKey: { type: "Number" } }
 *
 * @param {Object} [options]
 *    Behavior modifiers:
 *
 *    @param {"strip"|"keep"|"error"} [options.unknownFields="strip"]
 *       - strip: remove unknown fields
 *       - keep: leave unknown fields untouched
 *       - error: push UNKNOWN_FIELD error for each one
 *
 *    @param {boolean} [options.validate=true]
 *       If false → disable all validation, only coercion + defaults apply.
 *
 *    @param {boolean} [options.stopOnFirstError=false]
 *       If true → stops sanitization at first validation failure
 *       and returns a *partial sanitized* object.
 *
 *    @param {boolean} [options.removeNull=false]
 *       Remove keys where value === null
 *
 *    @param {boolean} [options.removeUndefined=false]
 *       Remove keys where value === undefined
 *
 *    @param {boolean} [options.removeEmptyObjects=false]
 *       Remove `{}` after cleanup
 *
 *    @param {boolean} [options.removeEmptyArrays=false]
 *       Remove `[]` after cleanup
 *
 *    @param {string} [options.language="en"]
 *       Which error language to use (must exist in options.messages)
 *
 *    @param {Object} [options.messages={}]
 *       Override default error messages or add multilingual support.
 *       Example:
 *       {
 *         gu: { FIELD_REQUIRED: "આ ફીલ્ડ જરૂરી છે" }
 *       }
 *
 * @returns {{ value: any, errors: Array<{path: string, code: string, message: string, meta: Object}> }}
 *    - value: Fully sanitized output
 *    - errors: Full or partial error list (depending on stopOnFirstError)
 */
function sanitizePayloadWithFields(payload, schema, options = {}) {
  // -------------------- Options --------------------
  const opts = {
    unknownFields: "strip", // "strip" | "keep" | "error"
    validate: true,
    stopOnFirstError: false,
    removeNull: false,
    removeUndefined: false,
    removeEmptyObjects: false,
    removeEmptyArrays: false,
    language: "en",
    messages: {},
    ...options,
  };

  // -------------------- Default English Messages --------------------
  const DEFAULT_MESSAGES = {
    FIELD_REQUIRED: "Field is required",
    INVALID_NUMBER: "Invalid number",
    INVALID_BOOLEAN: "Invalid boolean",
    INVALID_DATE: "Invalid date",
    INVALID_OBJECT_ID: "Invalid ObjectId",
    INVALID_TYPE: "Invalid type",
    ENUM_MISMATCH: "Value is not allowed",
    REGEX_MISMATCH: "Format is invalid",
    MIN_VIOLATION: (min) => `Minimum allowed is ${min}`,
    MAX_VIOLATION: (max) => `Maximum allowed is ${max}`,
    EXPECTED_ARRAY: "Expected an array",
    EXPECTED_OBJECT: "Expected an object",
    UNKNOWN_FIELD: "Unknown field",
  };

  // -------------------- Stable Error Codes --------------------
  const ERROR_CODES = {
    FIELD_REQUIRED: "FIELD_REQUIRED",
    INVALID_NUMBER: "INVALID_NUMBER",
    INVALID_BOOLEAN: "INVALID_BOOLEAN",
    INVALID_DATE: "INVALID_DATE",
    INVALID_OBJECT_ID: "INVALID_OBJECT_ID",
    INVALID_TYPE: "INVALID_TYPE",
    ENUM_MISMATCH: "ENUM_MISMATCH",
    REGEX_MISMATCH: "REGEX_MISMATCH",
    MIN_VIOLATION: "MIN_VIOLATION",
    MAX_VIOLATION: "MAX_VIOLATION",
    EXPECTED_ARRAY: "EXPECTED_ARRAY",
    EXPECTED_OBJECT: "EXPECTED_OBJECT",
    UNKNOWN_FIELD: "UNKNOWN_FIELD",
  };

  // -------------------- Merge Messages --------------------
  const messages = {
    en: DEFAULT_MESSAGES,
    ...opts.messages,
  };

  const lang = messages[opts.language] ? opts.language : "en";

  function fmt(code, meta) {
    const m = messages[lang][code];
    if (typeof m === "function") return m(meta && (meta.min || meta.max));
    if (typeof m === "string") return m;
    return DEFAULT_MESSAGES[code] || code;
  }

  // ======================================================
  //  PARTIAL VALUE STACK
  // ======================================================
  const partialStack = [];

  function pushPartial(partial) {
    partialStack.push(partial);
  }

  function popPartial() {
    partialStack.pop();
  }

  function currentPartial() {
    return partialStack[partialStack.length - 1];
  }

  // ======================================================
  //  STOP SIGNAL
  // ======================================================
  class StopProcessing extends Error {
    constructor(partial) {
      super("STOP");
      this.partial = partial;
    }
  }

  // ======================================================
  //  ERROR PUSHER
  // ======================================================
  const errors = [];

  function pushError(path, code, meta = {}) {
    const message = fmt(code, meta);

    errors.push({
      path,
      code,
      message,
      meta,
    });

    if (opts.stopOnFirstError) {
      throw new StopProcessing(currentPartial());
    }
  }

  // ======================================================
  //  Schema Type Helpers
  // ======================================================
  function isPrimitiveSchema(s) {
    if (!s || typeof s !== "object") return false;
    const t = s.type;
    return (
      typeof t === "string" ||
      typeof t === "function" ||
      (Array.isArray(t) && (typeof t[0] === "string" || typeof t[0] === "function"))
    );
  }

  function isObjectSchema(s) {
    if (!s || typeof s !== "object" || Array.isArray(s)) return false;
    return !isPrimitiveSchema(s);
  }

  function isArraySchema(s) {
    return Array.isArray(s);
  }

  function isObject(val) {
    return (
      val &&
      typeof val === "object" &&
      !Array.isArray(val) &&
      !(val instanceof Date) &&
      !(val instanceof Types.ObjectId)
    );
  }

  // ======================================================
  //  ROUTER
  // ======================================================
  function processValue(value, schema, path) {
    if (isArraySchema(schema)) return processArray(value, schema[0], path);
    if (isPrimitiveSchema(schema)) return processPrimitive(value, schema, path);
    if (isObjectSchema(schema)) return processObject(value, schema, path);
    return value;
  }

  // ======================================================
  //  OBJECT HANDLER
  // ======================================================
  function processObject(input, schema, path) {
    if (!isObject(input)) {
      if (opts.validate) {
        pushError(path, ERROR_CODES.EXPECTED_OBJECT, { received: input });
      }
      return null;
    }

    const out = {};
    pushPartial(out);

    try {
      // process declared fields
      for (const key of Object.keys(schema)) {
        const fieldSchema = schema[key];
        const fieldPath = path ? `${path}.${key}` : key;
        const exists = Object.prototype.hasOwnProperty.call(input, key);

        if (!exists) {
          if (fieldSchema.default !== undefined) {
            out[key] =
              typeof fieldSchema.default === "function"
                ? fieldSchema.default()
                : fieldSchema.default;
          } else if (opts.validate && fieldSchema.required) {
            pushError(fieldPath, ERROR_CODES.FIELD_REQUIRED);
          }
          continue;
        }

        try {
          out[key] = processValue(input[key], fieldSchema, fieldPath);
        } catch (e) {
          if (e instanceof StopProcessing) {
            out[key] = e.partial;
            throw new StopProcessing(out);
          }
          throw e;
        }
      }

      // unknown fields
      for (const key of Object.keys(input)) {
        if (!schema[key]) {
          const fieldPath = path ? `${path}.${key}` : key;
          if (opts.unknownFields === "strip") continue;
          if (opts.unknownFields === "error" && opts.validate) {
            pushError(fieldPath, ERROR_CODES.UNKNOWN_FIELD, { received: input[key] });
          }
          if (opts.unknownFields === "keep") {
            out[key] = input[key];
          }
        }
      }

      return out;
    } finally {
      popPartial();
    }
  }

  // ======================================================
  //  ARRAY HANDLER
  // ======================================================
  function processArray(input, itemSchema, path) {
    if (!Array.isArray(input)) {
      if (opts.validate) {
        pushError(path, ERROR_CODES.EXPECTED_ARRAY, { received: input });
      }
      return [];
    }

    const out = [];
    pushPartial(out);

    try {
      for (let i = 0; i < input.length; i++) {
        const idxPath = `${path}[${i}]`;

        try {
          out[i] = processValue(input[i], itemSchema, idxPath);
        } catch (e) {
          if (e instanceof StopProcessing) {
            out[i] = e.partial;
            throw new StopProcessing(out);
          }
          throw e;
        }
      }
      return out;
    } finally {
      popPartial();
    }
  }

  // ======================================================
  //  PRIMITIVE HANDLER
  // ======================================================
  function processPrimitive(value, schema, path) {
    const type = schema.type;

    // array-of-primitives: type: ["String"]
    if (Array.isArray(type)) {
      if (!Array.isArray(value)) {
        if (opts.validate) {
          pushError(path, ERROR_CODES.EXPECTED_ARRAY, { received: value });
        }
        return [];
      }

      const out = [];
      pushPartial(out);

      try {
        for (let i = 0; i < value.length; i++) {
          const idxPath = `${path}[${i}]`;
          try {
            out[i] = coerceAndValidateSingle(value[i], type[0], schema, idxPath);
          } catch (e) {
            if (e instanceof StopProcessing) {
              out[i] = e.partial;
              throw new StopProcessing(out);
            }
            throw e;
          }
        }
        return out;
      } finally {
        popPartial();
      }
    }

    // missing
    if (value === undefined || value === null) {
      if (opts.validate && schema.required) {
        pushError(path, ERROR_CODES.FIELD_REQUIRED);
      }

      if (schema.default !== undefined) {
        return typeof schema.default === "function" ? schema.default() : schema.default;
      }
      return null;
    }

    return coerceAndValidateSingle(value, type, schema, path);
  }

  // ======================================================
  //  COERCION
  // ======================================================
  function coerceAndValidateSingle(raw, type, schema, path) {
    const coerced = coerce(raw, type, schema, path);

    // ENUM
    if (opts.validate && schema.enum && !schema.enum.includes(coerced)) {
      pushError(path, ERROR_CODES.ENUM_MISMATCH, {
        expected: schema.enum,
        received: coerced,
      });
    }

    // REGEX
    if (
      opts.validate &&
      schema.match &&
      typeof coerced === "string" &&
      !schema.match.test(coerced)
    ) {
      pushError(path, ERROR_CODES.REGEX_MISMATCH, {
        expected: schema.match.toString(),
        received: coerced,
      });
    }

    // MIN/MAX
    if (opts.validate && typeof coerced === "number") {
      if (schema.min !== undefined && coerced < schema.min) {
        pushError(path, ERROR_CODES.MIN_VIOLATION, {
          min: schema.min,
          received: coerced,
        });
      }
      if (schema.max !== undefined && coerced > schema.max) {
        pushError(path, ERROR_CODES.MAX_VIOLATION, {
          max: schema.max,
          received: coerced,
        });
      }
    }

    return coerced;
  }

  function coerce(raw, type, schema, path) {
    const t = typeof type === "function" ? type.name : type;

    try {
      switch (t) {
        case "String": {
          let s = String(raw);

          if (schema.trim) s = s.trim();
          if (schema.lowercase) s = s.toLowerCase();
          if (schema.uppercase) s = s.toUpperCase();

          return s;
        }

        case "Number": {
          const n = Number(raw);
          if (Number.isNaN(n)) {
            if (opts.validate) pushError(path, ERROR_CODES.INVALID_NUMBER, { received: raw });
            return null;
          }
          return n;
        }

        case "Boolean": {
          if (typeof raw === "boolean") return raw;
          if (raw === "true" || raw === "1" || raw === 1) return true;
          if (raw === "false" || raw === "0" || raw === 0) return false;
          if (opts.validate) pushError(path, ERROR_CODES.INVALID_BOOLEAN, { received: raw });
          return null;
        }

        case "Date": {
          const d = new Date(raw);
          if (Number.isNaN(d.getTime())) {
            if (opts.validate) pushError(path, ERROR_CODES.INVALID_DATE, { received: raw });
            return null;
          }
          return d;
        }

        case "ObjectId": {
          if (Types.ObjectId.isValid(raw)) return new Types.ObjectId(raw);
          if (opts.validate) pushError(path, ERROR_CODES.INVALID_OBJECT_ID, { received: raw });
          return null;
        }

        case "Mixed":
          return raw;

        default:
          return raw;
      }
    } catch (_) {
      if (opts.validate) pushError(path, ERROR_CODES.INVALID_TYPE, { received: raw, expected: t });
      return null;
    }
  }

  // ======================================================
  //  CLEANUP
  // ======================================================
  function cleanValue(val, cleanOpts) {
    const { removeNull, removeUndefined, removeEmptyObjects, removeEmptyArrays } = cleanOpts;

    if (Array.isArray(val)) {
      const cleaned = val.map((v) => cleanValue(v, cleanOpts)).filter((v) => !shouldRemove(v));

      if (cleaned.length === 0 && removeEmptyArrays) return undefined;
      return cleaned;
    }

    if (isObject(val)) {
      const result = {};
      for (const key of Object.keys(val)) {
        const cleaned = cleanValue(val[key], cleanOpts);
        if (!shouldRemove(cleaned)) result[key] = cleaned;
      }

      if (Object.keys(result).length === 0 && removeEmptyObjects) return undefined;
      return result;
    }

    if (shouldRemove(val)) return undefined;
    return val;

    function shouldRemove(v) {
      if (v === null && removeNull) return true;
      if (v === undefined && removeUndefined) return true;
      return false;
    }
  }

  // ======================================================
  //  RUN
  // ======================================================
  pushPartial({}); // top-level
  try {
    let result = processValue(payload, schema, "");

    if (
      opts.removeNull ||
      opts.removeUndefined ||
      opts.removeEmptyObjects ||
      opts.removeEmptyArrays
    ) {
      result = cleanValue(result, {
        removeNull: opts.removeNull,
        removeUndefined: opts.removeUndefined,
        removeEmptyObjects: opts.removeEmptyObjects,
        removeEmptyArrays: opts.removeEmptyArrays,
      });
    }

    return { value: result, errors: opts.validate ? errors : [] };
  } catch (e) {
    if (e instanceof StopProcessing) {
      let partial = e.partial;

      if (
        opts.removeNull ||
        opts.removeUndefined ||
        opts.removeEmptyObjects ||
        opts.removeEmptyArrays
      ) {
        partial = cleanValue(partial, {
          removeNull: opts.removeNull,
          removeUndefined: opts.removeUndefined,
          removeEmptyObjects: opts.removeEmptyObjects,
          removeEmptyArrays: opts.removeEmptyArrays,
        });
      }

      return { value: partial, errors };
    }

    throw e;
  } finally {
    popPartial();
  }
}

// ======================================================
// EXPORT
// ======================================================
module.exports = sanitizePayloadWithFields;

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

  m2m: {
    create: [
      {
        theme: {
          mode: { type: "String", enum: ["light", "dark"], default: "light" },
          primaryColor: { type: "String" },
        },
      },
    ],
    update: [
      {
        theme: {
          mode: { type: "String", enum: ["light", "dark"], default: "light" },
          primaryColor: { type: "String" },
        },
      },
    ],
    delete: [{ type: "ObjectId" }],
    existing: [{ type: "ObjectId" }],
  },
};

// Dummy data corresponding to the above fields

const dummyData = {
  name: "sample name",
  description: "A dummy description",
  isActive: "false",
  rating: "3.7",

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
          position: { x: "4", y: 4, w: 4, h: 3 },
          config: { chartType: "pie", legend: false },
        },
      ],
    },
  ],

  permission: {
    role: "     Manager      ",
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

const result = sanitizePayloadWithFields(dummyData, complexFields, {
  unknownFields: "strip",
  validate: true,
  //   removeNull: true,
  //   removeUndefined: true,
  stopOnFirstError: false, // FULL VALIDATION
});

console.dir(result, { depth: null });
