# dynamic-schema-sanitizer

A **fully dynamic, deeply recursive sanitization + validation engine** for Node.js.
Designed to **replace Mongoose validation**, work with **dynamic schemas**, and sanitize payloads safely before hitting the database.

💡 Ideal for **headless CMS**, **multi-tenant apps**, **form builders**, **no-SQL dynamic models**, or any system where schemas are stored in DB instead of code.

---

# ✨ Features

- ⚡ Deep, recursive sanitization for any nested structure
- 🔍 Dynamic runtime schemas (no Mongoose models needed)
- 🔄 Type coercion:
  **String, Number, Boolean, Date, ObjectId, Mixed**
- 🛡 Validation support: required, enum, match, min/max
- 🧹 Clean null/undefined/empty objects/arrays
- 🚫 Unknown field handling: `strip`, `keep`, or `error`
- 🌐 Multilingual, customizable error messages
- 🧨 Fail-fast mode (`stopOnFirstError`)
- 🧰 Full bulk array processing with `sanitizeBulk()`
- 🔥 Stable enterprise-grade error codes
- ✔ Only dependency: `mongoose` (for ObjectId validation)

---

# 📦 Installation

```bash
npm install dynamic-schema-sanitizer
```

```bash
yarn add dynamic-schema-sanitizer
```

---

# 🚀 Quick Example

```ts
import { sanitizePayloadWithFields } from "dynamic-schema-sanitizer";

const schema = {
  name: { type: "String", required: true, trim: true },
  age: { type: "Number", min: 0, max: 120 },
  isActive: { type: "Boolean", default: true },
  tags: { type: ["String"], default: [] },
};

const payload = {
  name: "  John Doe  ",
  age: "25",
  isActive: "false",
  tags: ["nodejs", 123, true],
};

const result = sanitizePayloadWithFields(payload, schema, {
  validate: true,
  unknownFields: "strip",
});

console.log(result);
```

### Output

```json
{
  "value": {
    "name": "John Doe",
    "age": 25,
    "isActive": false,
    "tags": ["nodejs", "123", "true"]
  },
  "errors": []
}
```

---

# 🧩 Bulk Sanitization (sanitizeBulk)

```ts
import { sanitizeBulk } from "dynamic-schema-sanitizer";

const result = sanitizeBulk(
  [
    { name: "A", age: "10" },
    { name: "B", age: "invalid" },
  ],
  schema
);

console.log(result);
```

### Bulk Output Format

```json
{
  "records": [
    { "value": { "name": "A", "age": 10 }, "errors": [] },
    { "value": { "name": "B", "age": null }, "errors": [ ... ] }
  ],
  "valid": [ { ... } ],
  "invalid": [ { ... } ]
}
```

---

# 🧠 Schema Format

### Primitive

```ts
name: {
  type: "String";
}
```

### Required

```ts
email: { type: "String", required: true }
```

### Enum

```ts
status: { type: "String", enum: ["active", "blocked"] }
```

### Min/Max

```ts
score: { type: "Number", min: 1, max: 100 }
```

### Regex

```ts
email: { type: "String", match: /.+@.+\..+/ }
```

### ObjectId

```ts
userId: {
  type: "ObjectId";
}
```

### Nested object

```ts
profile: {
  age: { type: "Number" },
  gender: { type: "String" }
}
```

### Array of primitives

```ts
tags: {
  type: ["String"];
}
```

### Array of objects

```ts
logs: [
  {
    message: { type: "String" },
    at: { type: "Date" },
  },
];
```

---

# ⚙️ Options

| Option               | Type                                     | Default | Description             |         |                             |
| -------------------- | ---------------------------------------- | ------- | ----------------------- | ------- | --------------------------- |
| `unknownFields`      | `"strip"                                 | "keep"  | "error"`                | `strip` | Control unrecognized fields |
| `validate`           | `boolean`                                | `true`  | Enable validation       |         |                             |
| `stopOnFirstError`   | `boolean`                                | `false` | Return partial result   |         |                             |
| `removeNull`         | `boolean`                                | `false` | Clean null              |         |                             |
| `removeUndefined`    | `boolean`                                | `false` | Clean undefined         |         |                             |
| `removeEmptyObjects` | `boolean`                                | `false` | Clean `{}`              |         |                             |
| `removeEmptyArrays`  | `boolean`                                | `false` | Clean `[]`              |         |                             |
| `language`           | `string`                                 | `"en"`  | Selected error language |         |                             |
| `messages`           | `Record<string, Record<string, string>>` | `{}`    | Custom translations     |         |                             |

---

# 🔥 Stable Error Codes

- `FIELD_REQUIRED`
- `INVALID_NUMBER`
- `INVALID_BOOLEAN`
- `INVALID_DATE`
- `INVALID_OBJECT_ID`
- `INVALID_TYPE`
- `ENUM_MISMATCH`
- `REGEX_MISMATCH`
- `MIN_VIOLATION`
- `MAX_VIOLATION`
- `EXPECTED_ARRAY`
- `EXPECTED_OBJECT`
- `UNKNOWN_FIELD`

---

# 🌍 Multilingual Errors

```ts
sanitizePayloadWithFields(payload, schema, {
  language: "gu",
  messages: {
    gu: {
      FIELD_REQUIRED: "આ ફીલ્ડ જરૂરી છે",
      INVALID_NUMBER: "અમાન્ય નંબર",
    },
  },
});
```

---

# 📚 sanitizeBulk()

Bulk sanitization with full reporting:

```ts
import { sanitizeBulk } from "dynamic-schema-sanitizer";

const result = sanitizeBulk(records, schema);
```

### Output

```ts
{
  records: SanitizeResult[],
  valid: SanitizeResult[],
  invalid: SanitizeResult[]
}
```

- `records` = ALL results
- `valid` = only valid rows
- `invalid` = only rows containing errors

Perfect for:
✔ CSV import
✔ XLSX bulk upload
✔ API bulk insert
✔ Queue processing
✔ prepare `insertMany()` safe payload

---

# 🧨 Using with MongoDB insertMany()

MongoDB behavior:

- `ordered: true` → stops on first error
- `ordered: false` → continues, skips invalid docs

You can do:

```ts
const { valid } = sanitizeBulk(records, schema);

await collection.insertMany(valid, { ordered: false });
```

---

# 🛠 Author

**Sahil Trambadiya**
Creator & maintainer of **dynamic-schema-sanitizer**

---

# ⭐ Support

If this library saves you time, consider ⭐ starring the repo!