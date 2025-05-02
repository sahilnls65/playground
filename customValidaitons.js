const fields = [
  {
    display_label: "username",
    key: "username",
    value: "username",
    type: "String",
    path: "username",
    validations: [
      { case: "NOT_ALLOWED", value: ["TEST"] },
      { case: "MIN", value: [3] },
    ],
  },
  {
    display_label: "email",
    key: "email",
    value: "email",
    type: "String",
    path: "email",
    validations: [
      {
        case: "REGEX",
        value: ["[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}"],
        options: { type: "CONTAINS", case_sensitive: false },
      },
    ],
  },
  {
    display_label: "address",
    key: "address",
    value: "address",
    type: "Object",
    path: "address",
    children: [
      {
        display_label: "street",
        key: "address.street",
        value: "address.street",
        type: "String",
        path: "address.street",
        validations: [{ case: "MIN", value: [5] }],
      },
      {
        display_label: "city",
        key: "address.city",
        value: "address.city",
        type: "String",
        path: "address.city",
        validations: [{ case: "MAX", value: [20] }],
      },
      {
        display_label: "zip",
        key: "address.zip",
        value: "address.zip",
        type: "String",
        path: "address.zip",
        validations: [
          {
            case: "REGEX",
            value: ["^[0-9]{5}$"],
            options: { type: "EXACT" },
          },
        ],
      },
    ],
  },
  {
    display_label: "comments",
    key: "comments",
    value: "comments",
    type: "Array",
    path: "comments",
    children: [
      {
        display_label: "author",
        key: "comments.author",
        value: "comments.author",
        type: "String",
        path: "comments.author",
        validations: [{ case: "MIN", value: [3] }],
      },
      {
        display_label: "zip1",
        key: "comments.zip1",
        value: "comments.zip1",
        type: "String",
        path: "comments.zip1",
        validations: [{ case: "MAX", value: [10] }],
      },
      {
        display_label: "date",
        key: "comments.date",
        value: "comments.date",
        type: "Date",
        path: "comments.date",
        validations: [{ case: "GREATER_THAN", value: ["2023-01-01"] }],
      },
      {
        display_label: "replies",
        key: "comments.replies",
        value: "comments.replies",
        type: "Object",
        path: "comments.replies",
        children: [
          {
            display_label: "author",
            key: "comments.replies.author",
            value: "comments.replies.author",
            type: "String",
            path: "comments.replies.author",
            validations: [{ case: "NOT_ALLOWED", value: ["admin"] }],
          },
          {
            display_label: "text",
            key: "comments.replies.text",
            value: "comments.replies.text",
            type: "String",
            path: "comments.replies.text",
            validations: [{ case: "CONTAINS", value: ["reply"] }],
          },
          {
            display_label: "newarray",
            key: "comments.replies.newarray",
            value: "comments.replies.newarray",
            type: "Array",
            path: "comments.replies.newarray",
            children: [
              {
                display_label: "sahil",
                key: "comments.replies.newarray.sahil",
                value: "comments.replies.newarray.sahil",
                type: "Date",
                validations: [{ case: "GREATER_THAN", value: ["2023-01-01"] }],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    display_label: "age",
    key: "age",
    value: "age",
    type: "Number",
    path: "age",
    validations: [
      { case: "GREATER_THAN", value: [18] },
      { case: "LESS_THAN", value: [60] },
    ],
  },
  {
    display_label: "numbers",
    key: "numbers",
    value: "numbers",
    type: "Array",
    array_type: "Number",
    path: "numbers",
    validations: [{ case: "SIZE", value: [5] }],
  },
  {
    display_label: "many_to_many",
    key: "many_to_many",
    value: "many_to_many",
    type: "Alias",
    path: "many_to_many",
  },
  {
    display_label: "one_to_many",
    key: "one_to_many",
    value: "one_to_many",
    type: "Alias",
    path: "one_to_many",
  },
  {
    display_label: "many_to_one",
    key: "many_to_one",
    value: "many_to_one",
    type: "ObjectId",
    path: "many_to_one",
  },
  {
    display_label: "testing",
    key: "testing",
    value: "testing",
    type: "Object",
    path: "testing",
    children: [
      {
        display_label: "arraytest",
        key: "testing.arraytest",
        value: "testing.arraytest",
        type: "Array",
        array_type: "String",
        path: "testing.arraytest",
        validations: [{ case: "ALL", value: ["value1", "value2"] }],
      },
    ],
  },
];

const constants = {
  rulesTypes: {
    NOT_ALLOWED: "NOT_ALLOWED",
    MIN: "MIN",
    MAX: "MAX",
    REGEX: "REGEX",
    OPERATOR: "OPERATOR",
    RULES_COMPARE: "RULES_COMPARE",
  },
  regexTypes: {
    CONTAINS: "CONTAINS",
    START_WITH: "START_WITH",
    ENDS_WITH: "ENDS_WITH",
    EXACT: "EXACT",
  },
  operatorTypes: {
    AND: "AND",
    OR: "OR",
    EQUAL: "EQUAL",
    NOT_EQUAL: "NOT_EQUAL",
    LESS_THAN: "LESS_THAN",
    LESS_THAN_EQUAL: "LESS_THAN_EQUAL",
    GREATER_THAN: "GREATER_THAN",
    GREATER_THAN_EQUAL: "GREATER_THAN_EQUAL",
    IN: "IN",
    NOT_IN: "NOT_IN",
    EXISTS: "EXISTS",
    TYPE: "TYPE",
    MOD: "MOD",
    ALL: "ALL",
    SIZE: "SIZE",
  },
  types: {
    String: "String",
    Number: "Number",
    Date: "Date",
    ObjectId: "ObjectId",
    Alias: "Alias",
  },
};

// Sample Usage
const sampleData = {
  username: "john_doe", // Valid (String with min 3 characters)
  email: "john.doe@example.com", // Valid (Email regex match)
  address: {
    street: "Main Street", // Valid (Min 5 characters)
    city: "New York", // Valid (Max 20 characters)
    zip: "10001", // Valid (5-digit zip code)
  },
  comments: [
    {
      author: "Jane", // Valid (Min 3 characters)
      zip1: "12345", // Valid (Max 10 characters)
      date: "2024-03-01", // Valid (Greater than 2023-01-01)
      replies: {
        author: "user123", // Valid (Not 'admin')
        text: "This is a reply", // Valid (Contains 'reply')
        newarray: [
          {
            sahil: "2025-03-10", // Date format
            sahil1: "2025-04-15",
            arraytest: ["value1", "value2"], // Valid (Matches 'ALL' rule)
          },
        ],
      },
    },
  ],
  age: 30, // Valid (Between 18 and 60)
  numbers: [10, 20, 30, 40, 50], // Valid (Array size 5)
  many_to_many: ["id1", "id2"], // Example values for alias
  one_to_many: ["id3", "id4"], // Example values for alias
  many_to_one: "id5", // Example ObjectId
  testing: {
    arraytest: ["value1", "value2"], // Valid (Matches 'ALL' rule)
  },
};

const validators = {
  NOT_ALLOWED: (value, invalidValues) => !invalidValues.includes(value),

  MIN: (value, min) => value >= min,

  MAX: (value, max) => value <= max,

  REGEX: (value, pattern, options) => {
    const flags = `${options?.case_sensitive ? "" : "i"}${options?.multiline ? "m" : ""}${
      options?.global ? "g" : ""
    }`;
    const regex = new RegExp(pattern, flags);

    switch (options?.type) {
      case constants.regexTypes.CONTAINS:
        return regex.test(value);
      case constants.regexTypes.START_WITH:
        return value.startsWith(pattern);
      case constants.regexTypes.ENDS_WITH:
        return value.endsWith(pattern);
      case constants.regexTypes.EXACT:
        return value === pattern;
      default:
        return false;
    }
  },

  OPERATOR: (value, expectedValues, options) => {
    switch (options?.operator) {
      case constants.operatorTypes.AND:
        return expectedValues.every((val) => value.includes(val));
      case constants.operatorTypes.OR:
        return expectedValues.some((val) => value.includes(val));
      case constants.operatorTypes.EQUAL:
        return value === expectedValues[0];
      case constants.operatorTypes.NOT_EQUAL:
        return value !== expectedValues[0];
      case constants.operatorTypes.LESS_THAN:
        return value < expectedValues[0];
      case constants.operatorTypes.LESS_THAN_EQUAL:
        return value <= expectedValues[0];
      case constants.operatorTypes.GREATER_THAN:
        return value > expectedValues[0];
      case constants.operatorTypes.GREATER_THAN_EQUAL:
        return value >= expectedValues[0];
      case constants.operatorTypes.IN:
        return expectedValues.includes(value);
      case constants.operatorTypes.NOT_IN:
        return !expectedValues.includes(value);
      case constants.operatorTypes.EXISTS:
        return !!value;
      case constants.operatorTypes.TYPE:
        return typeof value === expectedValues[0].toLowerCase();
      case constants.operatorTypes.MOD:
        return value % expectedValues[0] === expectedValues[1];
      case constants.operatorTypes.SIZE:
        return value?.length === expectedValues[0];
      default:
        return false;
    }
  },
};

function validateField(field, value, fieldPath = "", errors = {}) {
  const currentPath = fieldPath ? `${fieldPath}.${field.key.split(".").pop()}` : field.key;

  // Handle Object Fields
  if (field.type === "Object" && field.children) {
    if (value && typeof value === "object") {
      field.children.forEach((child) =>
        validateField(child, value[child.key.split(".").pop()], currentPath, errors)
      );
    } else {
      errors[currentPath] = `Invalid object structure for ${currentPath}`;
    }
  }

  // Handle Array Fields
  else if (field.type === "Array") {
    if (!Array.isArray(value)) {
      errors[currentPath] = `${currentPath} should be an array`;
      return;
    }

    if (field.array_type) {
      const invalidValues = value.filter((item) => typeof item !== field.array_type.toLowerCase());
      if (invalidValues.length) {
        errors[currentPath] = `${currentPath} should contain only ${field.array_type}`;
      }
    } else if (field.children) {
      value.forEach((item, index) => {
        field.children.forEach((child) =>
          validateField(child, item[child.key.split(".").pop()], `${currentPath}[${index}]`, errors)
        );
      });
    }
  }

  // Handle Primitive Types (String, Number, etc.)
  else {
    if (!applyValidations(field, value)) {
      errors[currentPath] = `Invalid value for ${currentPath}`;
    }
  }

  return errors;
}

function applyValidations(field, value) {
  if (!field.validations) return true;

  for (const rule of field.validations) {
    const { case: ruleType, value: ruleValue, options } = rule;

    switch (ruleType) {
      case "NOT_ALLOWED":
        if (ruleValue.includes(value)) return false;
        break;

      case "MIN":
        if (typeof value === "string" && value.length < ruleValue[0]) return false;
        if (typeof value === "number" && value < ruleValue[0]) return false;
        break;

      case "MAX":
        if (typeof value === "string" && value.length > ruleValue[0]) return false;
        if (typeof value === "number" && value > ruleValue[0]) return false;
        break;

      case "REGEX":
        const regex = new RegExp(ruleValue[0], options?.case_sensitive ? "" : "i");
        if (!regex.test(value)) return false;
        break;

      case "GREATER_THAN":
        if (value <= ruleValue[0]) return false;
        break;

      case "LESS_THAN":
        if (value >= ruleValue[0]) return false;
        break;

      case "EXACT":
        if (value !== ruleValue[0]) return false;
        break;

      case "SIZE":
        if (Array.isArray(value) && value.length !== ruleValue[0]) return false;
        break;

      default:
        break;
    }
  }

  return true;
}

// Sample Usage
const errors = {};
fields.forEach((field) => validateField(field, sampleData[field.value], "", errors));

console.log("Errors:", errors);
