import { Types } from "mongoose";

/** Error shape returned by sanitizer */
export interface SanitizerError {
  path: string;
  code: string;
  message: string;
  meta: Record<string, any>;
}

/** Schema field definition */
export interface FieldSchema {
  type?: any;
  required?: boolean;
  default?: any;
  enum?: any[];
  match?: RegExp;
  min?: number;
  max?: number;
  trim?: boolean;
  lowercase?: boolean;
  uppercase?: boolean;
  [key: string]: any;
}

/** Options for sanitizer */
export interface SanitizeOptions {
  unknownFields?: "strip" | "keep" | "error";
  validate?: boolean;
  stopOnFirstError?: boolean;
  removeNull?: boolean;
  removeUndefined?: boolean;
  removeEmptyObjects?: boolean;
  removeEmptyArrays?: boolean;
  language?: string;
  messages?: Record<string, Record<string, any>>;
}

/** Result object returned by the sanitizer */
export interface SanitizeResult {
  value: any;
  errors: SanitizerError[];
}

/** Main function */
export function sanitizePayloadWithFields(
  payload: any,
  schema: Record<string, any>,
  options: SanitizeOptions = {}
): SanitizeResult {
  type AnyObject = Record<string, any>;

  const opts: Required<SanitizeOptions> = {
    unknownFields: "strip",
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

  const DEFAULT_MESSAGES = {
    FIELD_REQUIRED: "Field is required",
    INVALID_NUMBER: "Invalid number",
    INVALID_BOOLEAN: "Invalid boolean",
    INVALID_DATE: "Invalid date",
    INVALID_OBJECT_ID: "Invalid ObjectId",
    INVALID_TYPE: "Invalid type",
    ENUM_MISMATCH: "Value is not allowed",
    REGEX_MISMATCH: "Format is invalid",
    MIN_VIOLATION: (min: any) => `Minimum allowed is ${min}`,
    MAX_VIOLATION: (max: any) => `Maximum allowed is ${max}`,
    EXPECTED_ARRAY: "Expected an array",
    EXPECTED_OBJECT: "Expected an object",
    UNKNOWN_FIELD: "Unknown field",
  };

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

  const messages: Record<string, Record<string, any>> = {
    en: DEFAULT_MESSAGES,
    ...opts.messages,
  };

  const lang = messages[opts.language] ? opts.language : "en";

  function fmt(code: string, meta?: any) {
    const m = messages[lang][code];
    if (typeof m === "function") return m(meta && (meta.min || meta.max));
    if (typeof m === "string") return m;
    return DEFAULT_MESSAGES[code as keyof typeof DEFAULT_MESSAGES] || code;
  }

  const partialStack: any[] = [];

  function pushPartial(partial: any) {
    partialStack.push(partial);
  }
  function popPartial() {
    partialStack.pop();
  }
  function currentPartial() {
    return partialStack[partialStack.length - 1];
  }

  class StopProcessing extends Error {
    partial: any;
    constructor(partial: any) {
      super("STOP");
      this.partial = partial;
    }
  }

  const errors: SanitizerError[] = [];

  function pushError(path: string, code: string, meta: any = {}) {
    const message = fmt(code, meta);
    errors.push({ path, code, message, meta });

    if (opts.stopOnFirstError) throw new StopProcessing(currentPartial());
  }

  function isPrimitiveSchema(s: any): boolean {
    if (!s || typeof s !== "object") return false;
    const t = s.type;
    return (
      typeof t === "string" ||
      typeof t === "function" ||
      (Array.isArray(t) && (typeof t[0] === "string" || typeof t[0] === "function"))
    );
  }

  function isObjectSchema(s: any): boolean {
    if (!s || typeof s !== "object" || Array.isArray(s)) return false;
    return !isPrimitiveSchema(s);
  }

  function isArraySchema(s: any): boolean {
    return Array.isArray(s);
  }

  function isObject(val: any): val is object {
    return (
      val &&
      typeof val === "object" &&
      !Array.isArray(val) &&
      !(val instanceof Date) &&
      !(val instanceof Types.ObjectId)
    );
  }

  function processValue(value: any, schema: any, path: string): any {
    if (isArraySchema(schema)) return processArray(value, schema[0], path);
    if (isPrimitiveSchema(schema)) return processPrimitive(value, schema, path);
    if (isObjectSchema(schema)) return processObject(value, schema, path);
    return value;
  }

  function processObject(input: any, schema: any, path: string): any {
    if (!isObject(input)) {
      if (opts.validate) pushError(path, ERROR_CODES.EXPECTED_OBJECT, { received: input });
      return null;
    }

    const out: AnyObject = {};
    pushPartial(out);

    const s = schema as AnyObject;
    const i = input as AnyObject;

    try {
      for (const key of Object.keys(s)) {
        const fieldSchema = s[key];
        const fieldPath = path ? `${path}.${key}` : key;
        const exists = Object.prototype.hasOwnProperty.call(i, key);

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
          out[key] = processValue(i[key], fieldSchema, fieldPath);
        } catch (e: any) {
          if (e instanceof StopProcessing) {
            out[key] = e.partial;
            throw new StopProcessing(out);
          }
          throw e;
        }
      }

      for (const key of Object.keys(i)) {
        if (!s[key]) {
          const fieldPath = path ? `${path}.${key}` : key;
          if (opts.unknownFields === "strip") continue;
          if (opts.unknownFields === "error" && opts.validate) {
            pushError(fieldPath, ERROR_CODES.UNKNOWN_FIELD, { received: i[key] });
          }
          if (opts.unknownFields === "keep") out[key] = i[key];
        }
      }

      return out;
    } finally {
      popPartial();
    }
  }

  function processArray(input: any, itemSchema: any, path: string): any[] {
    if (!Array.isArray(input)) {
      if (opts.validate) pushError(path, ERROR_CODES.EXPECTED_ARRAY, { received: input });
      return [];
    }

    const out: any[] = [];
    pushPartial(out);

    try {
      for (let i = 0; i < input.length; i++) {
        const idxPath = `${path}[${i}]`;

        try {
          out[i] = processValue(input[i], itemSchema, idxPath);
        } catch (e: any) {
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

  function processPrimitive(value: any, schema: FieldSchema, path: string) {
    const type = schema.type;

    if (Array.isArray(type)) {
      if (!Array.isArray(value)) {
        if (opts.validate) pushError(path, ERROR_CODES.EXPECTED_ARRAY, { received: value });
        return [];
      }

      const out: any[] = [];
      pushPartial(out);

      try {
        for (let i = 0; i < value.length; i++) {
          const idxPath = `${path}[${i}]`;

          try {
            out[i] = coerceAndValidateSingle(value[i], type[0], schema, idxPath);
          } catch (e: any) {
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

    if (value === undefined || value === null) {
      if (opts.validate && schema.required) pushError(path, ERROR_CODES.FIELD_REQUIRED);
      if (schema.default !== undefined)
        return typeof schema.default === "function" ? schema.default() : schema.default;
      return null;
    }

    return coerceAndValidateSingle(value, type, schema, path);
  }

  function coerceAndValidateSingle(raw: any, type: any, schema: FieldSchema, path: string) {
    const coerced = coerce(raw, type, schema, path);

    if (opts.validate && schema.enum && !schema.enum.includes(coerced)) {
      pushError(path, ERROR_CODES.ENUM_MISMATCH, {
        expected: schema.enum,
        received: coerced,
      });
    }

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

  function coerce(raw: any, type: any, schema: FieldSchema, path: string) {
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
    } catch {
      if (opts.validate)
        pushError(path, ERROR_CODES.INVALID_TYPE, {
          received: raw,
          expected: t,
        });

      return null;
    }
  }

  function cleanValue(
    val: any,
    cleanOpts: {
      removeNull: boolean;
      removeUndefined: boolean;
      removeEmptyObjects: boolean;
      removeEmptyArrays: boolean;
    }
  ): any {
    const { removeNull, removeUndefined, removeEmptyObjects, removeEmptyArrays } = cleanOpts;

    if (Array.isArray(val)) {
      const cleaned = val.map((v) => cleanValue(v, cleanOpts)).filter((v) => !shouldRemove(v));

      if (cleaned.length === 0 && removeEmptyArrays) return undefined;
      return cleaned;
    }

    if (isObject(val)) {
      const v = val as AnyObject;
      const res: AnyObject = {};

      for (const key of Object.keys(v)) {
        const cleaned = cleanValue(v[key], cleanOpts);
        if (!shouldRemove(cleaned)) res[key] = cleaned;
      }

      if (Object.keys(res).length === 0 && removeEmptyObjects) return undefined;
      return res;
    }

    if (shouldRemove(val)) return undefined;
    return val;

    function shouldRemove(v: any) {
      if (v === null && removeNull) return true;
      if (v === undefined && removeUndefined) return true;
      return false;
    }
  }

  pushPartial({});
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
  } catch (e: any) {
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
//  BULK SANITIZER
// ======================================================
export function sanitizeBulk(
  payloads: any[],
  schema: Record<string, any>,
  options: SanitizeOptions = {}
): {
  valid: any[];
  invalid: {
    index: number;
    errors: SanitizerError[];
    partial: any;
  }[];
} {
  if (!Array.isArray(payloads)) {
    throw new Error("sanitizeBulk: payload must be an array");
  }

  const valid: any[] = [];
  const invalid: any[] = [];

  payloads.forEach((item, index) => {
    const result = sanitizePayloadWithFields(item, schema, options);

    if (result.errors.length > 0) {
      invalid.push({
        index,
        errors: result.errors,
        partial: result.value,
      });
    } else {
      valid.push(result.value);
    }
  });

  return { valid, invalid };
}

export default sanitizePayloadWithFields;
