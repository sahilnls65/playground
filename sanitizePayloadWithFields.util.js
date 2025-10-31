"use strict";

// Reusable utility to sanitize and validate a payload based on a mongoose-like schema object
// Compatible types: String, Number, Boolean, Date, ObjectId, Mixed, Array, Object
// Options:
// - unknownFields: "strip" | "keep" | "error"
// - strict: boolean (drop invalid values when true)
// - validate: boolean (enforce required/min/max/enum/match)

function createSanitizer() {
  let ObjectId;
  try {
    ObjectId = require("mongodb").ObjectId;
  } catch {}

  function isValidObjectId(val) {
    if (!val) return false;
    if (ObjectId && typeof ObjectId.isValid === "function") {
      try {
        return ObjectId.isValid(val) && String(new ObjectId(val)) === String(val);
      } catch {
        return false;
      }
    }
    return typeof val === "string" && /^[0-9a-fA-F]{24}$/.test(val);
  }

  function coerceBoolean(val) {
    if (typeof val === "boolean") return val;
    if (val === "0" || val === 0 || val === "false" || val === "no" || val === "off") return false;
    if (val === "1" || val === 1 || val === "true" || val === "yes" || val === "on") return true;
    return Boolean(val);
  }

  function coerceDate(val) {
    if (val == null) return val;
    if (val instanceof Date && !isNaN(val.getTime())) return val;
    const d = new Date(val);
    return isNaN(d.getTime()) ? undefined : d;
  }

  function coerceObjectId(val) {
    if (!val) return val;
    if (ObjectId && val instanceof ObjectId) return val;
    if (typeof val === "string" && isValidObjectId(val)) {
      try {
        return new ObjectId(val);
      } catch {
        return val;
      }
    }
    return val;
  }

  function validateValue(fieldSchema, value, path, errors, strict) {
    if (!fieldSchema) return value;
    if (fieldSchema.required) {
      const isEmpty =
        value === undefined || value === null || (typeof value === "string" && value.trim() === "");
      if (isEmpty) {
        errors.push({ path, code: "required", message: `${path} is required` });
      }
    }
    if (value === undefined || value === null) return value;

    if (fieldSchema.min !== undefined) {
      if (value instanceof Date) {
        if (value < new Date(fieldSchema.min)) {
          errors.push({ path, code: "min", message: `${path} must be >= ${fieldSchema.min}` });
          if (strict) return undefined;
        }
      }
      if (typeof value === "number") {
        if (value < fieldSchema.min) {
          errors.push({ path, code: "min", message: `${path} must be >= ${fieldSchema.min}` });
          if (strict) return undefined;
        }
      }
    }
    if (fieldSchema.max !== undefined) {
      if (value instanceof Date) {
        if (value > new Date(fieldSchema.max)) {
          errors.push({ path, code: "max", message: `${path} must be <= ${fieldSchema.max}` });
          if (strict) return undefined;
        }
      }
      if (typeof value === "number") {
        if (value > fieldSchema.max) {
          errors.push({ path, code: "max", message: `${path} must be <= ${fieldSchema.max}` });
          if (strict) return undefined;
        }
      }
    }
    if (Array.isArray(fieldSchema.enum)) {
      if (!fieldSchema.enum.includes(value)) {
        errors.push({
          path,
          code: "enum",
          message: `${path} must be one of [${fieldSchema.enum.join(", ")}]`,
        });
        if (strict) return undefined;
      }
    }
    if (fieldSchema.match) {
      const regex =
        fieldSchema.match instanceof RegExp ? fieldSchema.match : new RegExp(fieldSchema.match);
      if (typeof value === "string" && !regex.test(value)) {
        errors.push({ path, code: "match", message: `${path} does not match pattern` });
        if (strict) return undefined;
      }
    }
    return value;
  }

  function coercePrimitiveByType(def, value, path, errors, strict) {
    let coerced = value;
    switch (String(def.type).toLowerCase()) {
      case "string":
        if (coerced != null) {
          coerced = String(coerced);
          if (def.trim) coerced = coerced.trim();
          if (def.lowercase) coerced = coerced.toLowerCase();
          if (def.uppercase) coerced = coerced.toUpperCase();
        }
        break;
      case "number":
        if (coerced !== "" && coerced != null) {
          const num = Number(coerced);
          if (Number.isNaN(num)) {
            errors.push({ path, code: "type", message: `${path} must be a number` });
            if (strict) return undefined;
          } else {
            coerced = num;
          }
        }
        break;
      case "boolean":
        coerced = coerceBoolean(coerced);
        break;
      case "date":
        coerced = coerceDate(coerced);
        if (coerced === undefined && value !== undefined) {
          errors.push({ path, code: "type", message: `${path} must be a valid date` });
          if (strict) return undefined;
        }
        break;
      case "objectid":
        const oidVal = coerceObjectId(coerced);
        if (!(oidVal instanceof (ObjectId || Object)) && coerced !== undefined) {
          errors.push({ path, code: "type", message: `${path} must be an ObjectId` });
          if (strict) return undefined;
        } else {
          coerced = oidVal;
        }
        break;
      case "mixed":
        break;
      default:
        break;
    }
    return coerced;
  }

  function processObject(schema, obj, basePath, options, errors) {
    const { unknownFields, strict, validate } = options;
    const result = {};
    const source = obj && typeof obj === "object" ? obj : {};

    for (const key in schema) {
      const fieldPath = basePath ? `${basePath}.${key}` : key;
      const fieldDef = schema[key];
      let value = source[key];

      if (
        value === undefined &&
        fieldDef &&
        typeof fieldDef === "object" &&
        !Array.isArray(fieldDef) &&
        fieldDef.default !== undefined
      ) {
        value = typeof fieldDef.default === "function" ? fieldDef.default() : fieldDef.default;
      }
      if (value === undefined && Array.isArray(fieldDef)) {
        value = [];
      }

      if (Array.isArray(fieldDef)) {
        const elemSchema = fieldDef[0] || {};
        const arr = Array.isArray(value) ? value : value !== undefined ? [value] : [];
        const outputArr = [];

        if (elemSchema && elemSchema.type) {
          for (let i = 0; i < arr.length; i++) {
            let itemVal = arr[i];
            const itemPath = `${fieldPath}[${i}]`;
            itemVal = coercePrimitiveByType(elemSchema, itemVal, itemPath, errors, strict);
            if (validate) itemVal = validateValue(elemSchema, itemVal, itemPath, errors, strict);
            if (itemVal !== undefined) outputArr.push(itemVal);
          }
        } else {
          for (let i = 0; i < arr.length; i++) {
            const processed = processObject(
              elemSchema,
              arr[i] || {},
              `${fieldPath}[${i}]`,
              options,
              errors
            );
            outputArr.push(processed);
          }
        }
        result[key] = outputArr;
        continue;
      }

      if (fieldDef && typeof fieldDef === "object" && fieldDef.type !== undefined) {
        if (Array.isArray(fieldDef.type)) {
          const elemType = fieldDef.type[0];
          const arr = Array.isArray(value) ? value : value !== undefined ? [value] : [];
          const outputArr = [];
          for (let i = 0; i < arr.length; i++) {
            let itemVal = arr[i];
            const itemPath = `${fieldPath}[${i}]`;
            itemVal = coercePrimitiveByType(
              { ...fieldDef, type: elemType },
              itemVal,
              itemPath,
              errors,
              strict
            );
            if (validate) itemVal = validateValue(fieldDef, itemVal, itemPath, errors, strict);
            if (itemVal !== undefined) outputArr.push(itemVal);
          }
          result[key] = outputArr;
        } else {
          let coercedVal = coercePrimitiveByType(fieldDef, value, fieldPath, errors, strict);
          if (validate) coercedVal = validateValue(fieldDef, coercedVal, fieldPath, errors, strict);
          if (coercedVal !== undefined) result[key] = coercedVal;
        }
      } else {
        const nested = processObject(fieldDef || {}, value || {}, fieldPath, options, errors);
        if (Object.keys(nested).length > 0) result[key] = nested;
      }
    }

    if (obj && typeof obj === "object") {
      for (const key in obj) {
        if (!Object.prototype.hasOwnProperty.call(schema, key)) {
          const fieldPath = basePath ? `${basePath}.${key}` : key;
          if (unknownFields === "error") {
            errors.push({
              path: fieldPath,
              code: "unknown",
              message: `${fieldPath} is not allowed`,
            });
          } else if (unknownFields === "keep") {
            result[key] = obj[key];
          }
        }
      }
    }

    return result;
  }

  function sanitizePayloadWithFields(schema, payload, options = {}) {
    const { unknownFields = "strip", strict = false, validate = false } = options;
    const errors = [];
    const data = processObject(
      schema || {},
      payload || {},
      "",
      { unknownFields, strict, validate },
      errors
    );
    return { valid: errors.length === 0, errors, data };
  }

  return sanitizePayloadWithFields;
}

const sanitizePayloadWithFields = createSanitizer();

module.exports = {
  sanitizePayloadWithFields,
};
