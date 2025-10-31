const fields = [
  {
    _id: "68cbcd315fa4a91336b6ba15",
    schema_id: "684fa141d37d48cf7048c106",
    field: "test_inp",
    field_type: "Single",
    type: "String",
    path: "test_inp",
    parent_id: null,
    meta: {
      field: "test_inp",
      interface: "input",
      options: {
        code_block_language: "plaintext",
      },
      display_options: {
        template: "",
      },
      hidden: false,
      sort: 8,
      width: "full",
      required: false,
      nullable: true,
      is_internal: false,
      is_deletable: true,
      is_editable: true,
      translations: [],
    },
    schema_definition: {
      name: "test_inp",
      type: "String",
      default: null,
    },
    nox_created_at: "2025-09-18T09:13:21.774Z",
    nox_updated_at: "2025-09-18T09:13:21.774Z",
    nox_created_by: "675aae64c81d071ec87bbb56",
    nox_updated_by: "675aae64c81d071ec87bbb56",
    __v: 0,
  },
  {
    _id: "68ac54d13db75461d2edf30c",
    schema_id: "684fa141d37d48cf7048c106",
    field: "group_json",
    field_type: "Single",
    type: "String",
    path: "group_json",
    parent_id: null,
    meta: {
      field: "group_json",
      interface: "json",
      display_options: {
        template: "",
      },
      hidden: false,
      sort: 7,
      width: "full",
      required: false,
      nullable: true,
      is_internal: false,
      is_deletable: true,
      is_editable: true,
      translations: [],
    },
    schema_definition: {
      name: "group_json",
      type: "String",
      default: "{}",
    },
    nox_created_at: "2025-08-25T12:19:29.660Z",
    nox_updated_at: "2025-08-25T12:19:29.660Z",
    nox_created_by: "675aae64c81d071ec87bbb56",
    nox_updated_by: "675aae64c81d071ec87bbb56",
    __v: 0,
  },
  {
    _id: "68501aecaaaa704fe2a0026a",
    schema_id: "684fa141d37d48cf7048c106",
    field: "i1",
    field_type: "Object",
    type: "String",
    path: "g1.i1",
    parent_id: "684fa7b97d09b888d65145c1",
    meta: {
      field: "i1",
      interface: "input",
      display_options: {
        template: "",
      },
      hidden: false,
      sort: 6,
      width: "full",
      required: false,
      nullable: true,
      is_internal: false,
      is_deletable: true,
      is_editable: true,
      translations: [],
    },
    schema_definition: {
      name: "i1",
      type: "String",
      default: null,
    },
    nox_created_at: "2025-06-16T13:23:56.261Z",
    nox_updated_at: "2025-06-16T13:23:56.261Z",
    nox_created_by: "675aae64c81d071ec87bbb56",
    nox_updated_by: "675aae64c81d071ec87bbb56",
    __v: 0,
  },
  {
    _id: "684fad5845a79d52133fb1cb",
    schema_id: "684fa141d37d48cf7048c106",
    field: "it1",
    field_type: "Object",
    type: "Array",
    path: "it1",
    parent_id: null,
    meta: {
      field: "it1",
      interface: "items",
      display_options: {
        template: "",
      },
      hidden: false,
      sort: 5,
      width: "full",
      required: false,
      nullable: true,
      is_internal: false,
      is_deletable: true,
      is_editable: true,
      translations: [],
    },
    schema_definition: {
      name: "it1",
      type: "Array",
      default: null,
    },
    nox_created_at: "2025-06-16T05:36:24.796Z",
    nox_updated_at: "2025-06-16T05:36:24.796Z",
    nox_created_by: "675aae64c81d071ec87bbb56",
    nox_updated_by: "675aae64c81d071ec87bbb56",
    __v: 0,
  },
  {
    _id: "684fac6c45a79d52133fb168",
    schema_id: "684fa141d37d48cf7048c106",
    field: "f1",
    field_type: "Object",
    type: "String",
    path: "g1.f1",
    parent_id: "684fa7b97d09b888d65145c1",
    meta: {
      field: "f1",
      interface: "input",
      display_options: {
        template: "",
      },
      hidden: false,
      sort: 3,
      width: "full",
      required: false,
      nullable: true,
      is_internal: false,
      is_deletable: true,
      is_editable: true,
      translations: [],
      options: {},
      readonly: false,
    },
    schema_definition: {
      name: "f1",
      type: "String",
      default: null,
    },
    nox_created_at: "2025-06-16T05:32:28.939Z",
    nox_updated_at: "2025-06-16T05:32:49.690Z",
    nox_created_by: "675aae64c81d071ec87bbb56",
    nox_updated_by: "675aae64c81d071ec87bbb56",
    __v: 0,
  },
  {
    _id: "684fa7b97d09b888d65145c1",
    schema_id: "684fa141d37d48cf7048c106",
    field: "g1",
    field_type: "Object",
    type: "Object",
    path: "g1",
    parent_id: null,
    meta: {
      field: "g1",
      interface: "object",
      display_options: {
        template: "",
      },
      hidden: false,
      sort: 1,
      width: "full",
      required: false,
      nullable: true,
      is_internal: false,
      is_deletable: true,
      is_editable: true,
      translations: [],
    },
    schema_definition: {
      name: "g1",
      type: "Object",
      default: null,
    },
    nox_created_at: "2025-06-16T05:12:25.974Z",
    nox_updated_at: "2025-06-16T05:12:25.974Z",
    nox_created_by: "675aae64c81d071ec87bbb56",
    nox_updated_by: "675aae64c81d071ec87bbb56",
    __v: 0,
  },
  {
    _id: "684fa142d37d48cf7048c110",
    schema_id: "684fa141d37d48cf7048c106",
    field: "_id",
    field_type: "Single",
    type: "ObjectId",
    path: "_id",
    ref: "",
    meta: {
      is_deletable: false,
      field: "_id",
      interface: "none",
      is_internal: false,
      is_editable: true,
      translations: [],
    },
    schema_definition: {
      name: "_id",
      type: "ObjectId",
      is_primary: true,
      default: null,
    },
    nox_created_at: "2025-06-16T04:44:49.565Z",
    nox_updated_at: "2025-06-16T04:44:49.565Z",
    nox_created_by: "675aae64c81d071ec87bbb56",
    nox_updated_by: "675aae64c81d071ec87bbb56",
    __v: 0,
  },
];
const payload = {
  status: "false",
  name: "Sahil",
  email: "sahil.trambadiya@nowonline.com",
  updated_by: "67937390feddb0450d9a1af1",
  product: "123",
};

const { ObjectId } = require("mongodb");

function convertFieldsToConvertedData(fields) {
  const fieldMap = new Map();
  const tree = { fields: [] };

  // First, create a map of all fields by _id for quick lookup
  fields.forEach((field) => {
    if (field.type === "Alias" || field.schema_definition?.type === "Alias") return;
    const fieldType = {};
    let type = field.schema_definition?.type || field.type;

    if (field.type === "Array" && field.field_type === "Object" && type !== field.type) {
      fieldType["arrayType"] = type;
      type = "Array";
    }

    if (field.field_type === "Array") {
      fieldType["arrayType"] = field.schema_definition?.type;
      type = "Array";
    }

    fieldMap.set(field._id, {
      fieldName: field.field,
      type,
      ...fieldType,
      schemaDef: field.schema_definition,
      fields: [],
    });
  });

  // Then, iterate through the fields again to build the hierarchy
  fields.forEach((field) => {
    if (field.type === "Alias" || field.schema_definition?.type === "Alias") return;
    const node = fieldMap.get(field._id);
    if (field.ref) {
      node.ref = field.ref;
    }

    if (field.parent_id) {
      const parent = fieldMap.get(field.parent_id);
      if (parent) {
        parent.fields.push(node);
      }
    } else {
      tree.fields.push(node);
    }
  });

  return tree;
}

function sanitizePayloadWithFields(fields, payload, options = {}) {
  const {
    unknownFields = "strip", // "strip" | "keep" | "error"
    strict = false, // strict mode: drop invalid values
    validate = false,
  } = options;

  // Ensure schema tree
  const tree = Array.isArray(fields) ? fields : { fields: Array.isArray(fields) ? fields : [] };

  if (Array.isArray(fields) && typeof convertFieldsToConvertedData === "function") {
    try {
      const built = convertFieldsToConvertedData(JSON.parse(JSON.stringify(fields)));
      tree.fields = built.fields || [];
    } catch {
      tree.fields = [];
    }
  }

  const errors = [];

  // ---- Type Coercion Helpers ----
  const coerceBoolean = (val) => {
    if (typeof val === "boolean") return val;
    if (["1", 1, "true", "yes", "on"].includes(val)) return true;
    if (["0", 0, "false", "no", "off"].includes(val)) return false;
    return val;
  };

  const coerceObjectId = (val) => {
    if (val instanceof ObjectId) return val;
    if (typeof val === "string" && ObjectId.isValid(val)) return new ObjectId(val);
    return val;
  };

  const coerceDate = (val, meta) => {
    if (!val) return val;
    if (val instanceof Date && !isNaN(val.getTime())) return val;
    const t = meta?.type;
    if (t === "datetime" || t === "timestamp") return normalizeDateAndTime(val);
    if (t === "date") return normalizeDateOnly(val);
    if (t === "time") return normalizeTimeOnly(val);
    const d = new Date(val);
    return isNaN(d.getTime()) ? null : d;
  };

  // ---- Precompute schema lookup map ----
  const schemaMap = {};
  function buildSchemaMap(fields, basePath = "") {
    for (const field of fields) {
      const path = basePath ? `${basePath}.${field.fieldName}` : field.fieldName;
      schemaMap[path] = field;

      // For nested objects & arrays of objects
      if (field.type === "Object" || (field.type === "Array" && !field.arrayType && !field.ref)) {
        buildSchemaMap(field.fields || [], path);
      }
    }
  }
  buildSchemaMap(tree.fields);
  console.dir(schemaMap, { depth: null });

  // ---- Validation ----
  function validateConstraints(field, value, path) {
    const { schemaDef = {} } = field;

    if (field.required) {
      const missing =
        value === undefined || value === null || (typeof value === "string" && value.trim() === "");
      if (missing) errors.push({ path, code: "required", message: `${path} is required` });
    }
    if (value === undefined || value === null) return;

    if (schemaDef.min !== undefined) {
      if (value instanceof Date && value < new Date(schemaDef.min))
        errors.push({ path, code: "min", message: `${path} must be >= ${schemaDef.min}` });
      else if (typeof value === "number" && value < schemaDef.min)
        errors.push({ path, code: "min", message: `${path} must be >= ${schemaDef.min}` });
    }

    if (schemaDef.max !== undefined) {
      if (value instanceof Date && value > new Date(schemaDef.max))
        errors.push({ path, code: "max", message: `${path} must be <= ${schemaDef.max}` });
      else if (typeof value === "number" && value > schemaDef.max)
        errors.push({ path, code: "max", message: `${path} must be <= ${schemaDef.max}` });
    }

    if (schemaDef.match) {
      const regex =
        schemaDef.match instanceof RegExp ? schemaDef.match : new RegExp(schemaDef.match);
      const values = Array.isArray(value) ? value : [value];
      values.forEach((v) => {
        if (typeof v === "string" && !regex.test(v)) {
          errors.push({ path, code: "match", message: `${path} does not match pattern` });
        }
      });
    }
  }

  // ---- Coercion by Type ----
  function coerceValue(field, val, path) {
    if (val === undefined) return val;
    switch (field.type) {
      case "String": {
        if (val == null) return val;
        let s = String(val);
        if (field?.schemaDef?.trim) s = s.trim();
        if (field?.schemaDef?.lowercase) s = s.toLowerCase();
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
        return coerceDate(val, field.meta);
      case "ObjectId": {
        const oid = coerceObjectId(val);
        if (!(oid instanceof ObjectId)) {
          errors.push({ path, code: "type", message: `${path} must be an ObjectId` });
          return strict ? undefined : val;
        }
        return oid;
      }
      case "Array": {
        const arr = Array.isArray(val) ? val : val === undefined ? undefined : [val];
        if (!arr) return arr;
        if (field.ref || field.arrayType === "ObjectId")
          return arr.map((v, i) => coerceValue({ type: "ObjectId" }, v, `${path}[${i}]`));
        if (field.arrayType)
          return arr.map((v, i) =>
            coerceValue(
              { type: field.arrayType, meta: field.meta, schemaDef: field.schemaDef },
              v,
              `${path}[${i}]`
            )
          );
        return arr.map((v, i) => processObject(v, `${path}[${i}]`));
      }
      case "Object":
        return processObject(val || {}, path);
      default:
        return val;
    }
  }

  // ---- Process payload using schemaMap ----
  function processObject(obj, basePath = "") {
    const out = {};
    const srcObj = obj && typeof obj === "object" ? obj : {};

    for (const [key, value] of Object.entries(srcObj)) {
      const path = basePath ? `${basePath}.${key}` : key;
      const field = schemaMap[path];

      if (!field) {
        if (unknownFields === "error") {
          errors.push({ path, code: "unknown", message: `${path} is not allowed` });
        } else if (unknownFields === "keep") {
          out[key] = value;
        }
        continue;
      }

      // Apply default
      let val = value;
      if (val === undefined && field?.schemaDef?.default !== undefined) {
        val =
          typeof field.schemaDef.default === "function"
            ? field.schemaDef.default()
            : field.schemaDef.default;
      }
      if (val === undefined && field.type === "Array") val = [];

      const coerced = coerceValue(field, val, path);
      validate && validateConstraints(field, coerced, path);
      if (coerced !== undefined) out[key] = coerced;
    }

    return out;
  }

  // ---- Process root payload ----
  const data = processObject(payload || {});
  return { valid: errors.length === 0, errors, data };
}

const { valid, errors, data } = sanitizePayloadWithFields(fields, payload, {
  unknownFields: "strip",
  strict: true,
  validate: false,
});

if (!valid) {
  console.log("Validation errors:", errors);
} else {
  console.log(data);
}
