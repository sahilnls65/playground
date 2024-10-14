const Joi = require("joi");

const createDynamicJoiSchema = (definition) => {
  const createJoiSchema = (schema) => {
    let joiSchema = Joi;

    if (schema.type) {
      joiSchema = Joi[schema.type]();
    }

    const applyRule = (rule, object) => {
      switch (rule) {
        case "when":
          const { field, is, then, otherwise } = object;
          joiSchema = joiSchema.when(field, {
            is: createJoiSchema(is),
            then: createJoiSchema(then),
            otherwise: createJoiSchema(otherwise),
          });
          break;
        case "separatedValue":
          joiSchema = joiSchema[object?.value](...schema[object?.value]);
          break;
        case "contains":
          joiSchema = joiSchema.custom((val, helpers) => {
            const checkValue = object.insensitive ? val.toLowerCase() : val;
            const targetValue = object.insensitive ? object.value.toLowerCase() : object.value;
            if (!checkValue.includes(targetValue)) {
              return helpers.error("any.invalid", {
                message: `Must contain '${object.value}'${
                  object.insensitive ? " (insensitive)" : ""
                }`,
              });
            }
            return val;
          });
          break;
        case "doesNotContain":
          joiSchema = joiSchema.custom((val, helpers) => {
            const checkValue = object.insensitive ? val.toLowerCase() : val;
            const targetValue = object.insensitive ? object.value.toLowerCase() : object.value;
            if (checkValue.includes(targetValue)) {
              return helpers.error("any.invalid", {
                message: `Must not contain '${object.value}'${
                  object.insensitive ? " (insensitive)" : ""
                }`,
              });
            }
            return val;
          });
          break;
        case "startsWith":
          joiSchema = joiSchema.custom((val, helpers) => {
            const checkValue = object.insensitive ? val.toLowerCase() : val;
            const targetValue = object.insensitive ? object.value.toLowerCase() : object.value;
            if (!checkValue.startsWith(targetValue)) {
              return helpers.error("any.invalid", {
                message: `Must start with '${object.value}'${
                  object.insensitive ? " (insensitive)" : ""
                }`,
              });
            }
            return val;
          });
          break;
        case "doesNotStartWith":
          joiSchema = joiSchema.custom((val, helpers) => {
            const checkValue = object.insensitive ? val.toLowerCase() : val;
            const targetValue = object.insensitive ? object.value.toLowerCase() : object.value;
            if (checkValue.startsWith(targetValue)) {
              return helpers.error("any.invalid", {
                message: `Must not start with '${object.value}'${
                  object.insensitive ? " (insensitive)" : ""
                }`,
              });
            }
            return val;
          });
          break;
        case "endsWith":
          joiSchema = joiSchema.custom((val, helpers) => {
            const checkValue = object.insensitive ? val.toLowerCase() : val;
            const targetValue = object.insensitive ? object.value.toLowerCase() : object.value;
            if (!checkValue.endsWith(targetValue)) {
              return helpers.error("any.invalid", {
                message: `Must end with '${object.value}'${
                  object.insensitive ? " (insensitive)" : ""
                }`,
              });
            }
            return val;
          });
          break;
        case "doesNotEndWith":
          joiSchema = joiSchema.custom((val, helpers) => {
            const checkValue = object.insensitive ? val.toLowerCase() : val;
            const targetValue = object.insensitive ? object.value.toLowerCase() : object.value;
            if (checkValue.endsWith(targetValue)) {
              return helpers.error("any.invalid", {
                message: `Must not end with '${object.value}'${
                  object.insensitive ? " (insensitive)" : ""
                }`,
              });
            }
            return val;
          });
          break;
        case "equals":
          joiSchema = joiSchema.custom((val, helpers) => {
            if (val !== object?.value) {
              return helpers.error("any.invalid", { message: `Must equal '${object?.value}'` });
            }
            return val;
          });
          break;
        case "doesNotEqual":
          joiSchema = joiSchema.custom((val, helpers) => {
            if (val === object?.value) {
              return helpers.error("any.invalid", { message: `Must not equal '${object?.value}'` });
            }
            return val;
          });
          break;
        case "isEmpty":
          joiSchema = joiSchema.custom((val, helpers) => {
            if (object?.value && val !== "") {
              return helpers.error("any.invalid", { message: `Must be empty` });
            }
            return val;
          });
          break;
        case "isNotEmpty":
          joiSchema = joiSchema.custom((val, helpers) => {
            if (object?.value && val === "") {
              return helpers.error("any.invalid", { message: `Must not be empty` });
            }
            return val;
          });
          break;
        case "isNull":
          joiSchema = joiSchema.custom((val, helpers) => {
            if (object?.value && val !== null) {
              return helpers.error("any.invalid", { message: `Must be null` });
            }
            return val;
          });
          break;
        case "isNotNull":
          joiSchema = joiSchema.custom((val, helpers) => {
            if (object?.value && val === null) {
              return helpers.error("any.invalid", { message: `Must not be null` });
            }
            return val;
          });
          break;
        case "isOneOf":
          joiSchema = joiSchema.custom((val, helpers) => {
            if (!object?.value.includes(val)) {
              return helpers.error("any.invalid", {
                message: `Must be one of ${object?.value.join(", ")}`,
              });
            }
            return val;
          });
          break;
        case "isNotOneOf":
          joiSchema = joiSchema.custom((val, helpers) => {
            if (object?.value.includes(val)) {
              return helpers.error("any.invalid", {
                message: `Must not be one of ${object?.value.join(", ")}`,
              });
            }
            return val;
          });
          break;
        case "matchesRegExp":
          joiSchema = joiSchema.custom((val, helpers) => {
            if (!new RegExp(object?.value).test(val)) {
              return helpers.error("any.invalid", {
                message: `Must match the regular expression ${object?.value}`,
              });
            }
            return val;
          });
          break;
        default:
          if (object?.value === true) {
            joiSchema = joiSchema[rule]();
          } else if (object?.value === false) {
            joiSchema = joiSchema.forbidden();
          } else if (typeof object?.value !== "object" && object?.value !== null) {
            joiSchema = joiSchema[rule](object?.value);
          }
          break;
      }
    };

    if (schema.keys) {
      const keys = {};
      for (const [key, value] of Object.entries(schema.keys)) {
        keys[key] = createJoiSchema(value);
      }
      joiSchema = joiSchema.keys(keys);
    } else if (schema.items) {
      joiSchema = joiSchema.items(createJoiSchema(schema.items));
    } else {
      for (const data of schema?.validations?.rules) {
        applyRule(data.rule, data[data.rule]);
      }
    }

    return joiSchema;
  };

  const keys = {};
  for (const [key, value] of Object.entries(definition)) {
    keys[key] = createJoiSchema(value);
  }

  return Joi.object(keys);
};

const JoiValidateData = async ({ data, fields, schema = null, isGeneratedSchema = false }) => {
  let joiSchema = schema;
  if (!isGeneratedSchema) {
    joiSchema = createDynamicJoiSchema(fields);
  }

  const { error, value } = joiSchema
    .prefs({
      errors: { label: "key", wrap: { label: false } },
      stripUnknown: false,
      abortEarly: false,
    })
    .validate(data);

  if (error) {
    const { details } = error;
    const errorData = {};

    details.map((item) => {
      errorData[item.path.join(".")] = item.message;
    });

    console.error("Validation error:", errorData);
    return {
      status: false,
      error: errorData,
    };
  }

  console.log("Validation successful:", value);
  return {
    status: true,
    payload: value,
  };
};

// Sample data to validate
const apiData = {
  // testField: "sahil test1 value!",
  address: {
    street: "123 Main St sahil test1",
    // city: "Anytown",
    // zip: "12345",
  },
  hobbies: [234,234,234],
  contacts: [
    {
      name: "sahil test1",
    },
  ],
};

const schema = {
  testField: {
    type: "string",
    validations: {
      rules: [
        {
          rule: "contains",
          contains: { value: "sahil", insensitive: false },
        },
        {
          rule: "contains",
          contains: { value: "test1", insensitive: false },
        },
        {
          rule: "required",
          required: { value: false },
        },
      ],
    },
  },
  address: {
    type: "object",
    keys: {
      street: {
        type: "string",
        validations: {
          rules: [
            {
              rule: "contains",
              contains: { value: "sahil", insensitive: false },
            },
            {
              rule: "contains",
              contains: { value: "test1", insensitive: false },
            },
          ],
        },
      },
    },
  },
  hobbies: {
    type: "array",
    items: {
      type: "string",
      validations: {
        rules: [
          {
            rule: "contains",
            contains: { value: "sahil", insensitive: false },
          },
          {
            rule: "required",
            required: { value: true, insensitive: false },
          },
        ],
      },
    },
  },
  contacts: {
    type: "array",
    items: {
      type: "object",
      keys: {
        name: {
          type: "string",
          validations: {
            rules: [
              {
                rule: "contains",
                contains: { value: "sahil", insensitive: false },
              },
              {
                rule: "contains",
                contains: { value: "test1", insensitive: false },
              },
            ],
          },
        },
      },
    },
  },
};

// Validate the sample data
JoiValidateData({ data: apiData, fields: schema });
