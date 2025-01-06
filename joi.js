// const schema = {
//   user: {
//     type: "object",
//     keys: {
//       username: { type: "string", alphanum: true, min: 3, max: 30, required: true },
//       email: { type: "string", email: true },
//       password: {
//         type: "string",
//         min: 8,
//         pattern: RegExp(/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,}$/),
//       },
//       repeat_password: {
//         type: "string",
//         separatedValue: "valid",
//         valid: ["password", "Password@123"],
//       },
//       age: { type: "number", integer: true, min: 18, max: 99 },
//       gender: { type: "string", valid: ["male", "female", "other"], separatedValue: "valid" },
//       address: {
//         type: "object",
//         keys: {
//           street: { type: "string" },
//           city: { type: "string" },
//           zip: { type: "string", pattern: RegExp(/^[0-9]{5}(?:-[0-9]{4})?$/) },
//         },
//       },
//       hobbies: {
//         type: "array",
//         items: { type: "string" },
//       },
//       terms_accepted: { type: "boolean", truthy: true },
//       newsletter: { type: "boolean", falsy: true },
//       notifications: { type: "boolean", falsy: true },
//       payment_method: { type: "string" },
//       payment_details: {
//         type: "alternatives",
//         try: [
//           {
//             type: "object",
//             keys: {
//               credit_card: { type: "string" },
//             },
//           },
//           {
//             type: "object",
//             keys: {
//               paypal: { type: "string", email: true },
//             },
//           },
//         ],
//       },
//       contacts: {
//         type: "array",
//         items: {
//           type: "object",
//           keys: {
//             name: { type: "string", min: 1, required: true },
//             phone: { type: "string", pattern: RegExp(/^[0-9]{10}$/) },
//           },
//         },
//       },
//     },
//     operations: { type: "and", values: ["newsletter", "notifications"] },
//   },
// };

// const recreateJoiSchema = (definition) => {
//   const createJoiSchema = (schema) => {
//     let joiSchema = Joi;
//     for (const [rule, value] of Object.entries(schema)) {
//       if (rule === "type") {
//         joiSchema = Joi[value]();
//       } else if (rule === "items") {
//         joiSchema = joiSchema.items(createJoiSchema(value));
//       } else if (rule === "keys") {
//         const keys = {};
//         for (const [key, subSchema] of Object.entries(value)) {
//           keys[key] = createJoiSchema(subSchema);
//         }
//         joiSchema = joiSchema.keys(keys);
//       } else if (rule === "try") {
//         const alternatives = value.map(createJoiSchema);
//         joiSchema = joiSchema.try(...alternatives);
//       } else if (rule === "when") {
//         const { field, is, then, otherwise } = value;
//         joiSchema = joiSchema.when(field, {
//           is: createJoiSchema(is),
//           then: createJoiSchema(then),
//           otherwise: createJoiSchema(otherwise),
//         });
//       } else if (rule === "meta") {
//         joiSchema = joiSchema.meta(value);
//       } else if (rule === "separatedValue") {
//         joiSchema = joiSchema[value](...schema[value]);
//       } else if (rule === "operations") {
//         joiSchema = joiSchema[value.type](...value?.values);
//       } else if (value === true) {
//         joiSchema = joiSchema[rule]();
//       } else if (value === false) {
//         joiSchema = joiSchema.forbidden();
//       } else if (!schema["separatedValue"] && schema["separatedValue"] !== rule) {
//         joiSchema = joiSchema[rule](value);
//       }
//     }

//     return joiSchema;
//   };
//   const parsedDefinition = definition;
//   const keys = {};
//   for (const [key, value] of Object.entries(parsedDefinition)) {
//     keys[key] = createJoiSchema(value);
//   }

//   return Joi.object(keys);
// };

// const validateData = async (data) => {
//   const joiSchema = recreateJoiSchema(schema);
//   const { error, value } = joiSchema.validate(data);

//   if (error) {
//     console.error("Validation error:", error.details);
//     return false;
//   }
//   console.log("Validation successful:", value);
//   return true;
// };

// const apiData = {
//   user: {
//     username: "johndoe",
//     email: "john@example.com",
//     password: "Password@123",
//     repeat_password: "Password@123",
//     age: 25,
//     gender: "male",
//     address: {
//       street: "123 Main St",
//       city: "Anytown",
//       zip: "12345",
//     },
//     hobbies: ["reading", "hiking"],
//     terms_accepted: true,
//     payment_method: "credit_card",
//     payment_details: {
//       credit_card: "1234567890123456",
//     },
//     contacts: [
//       { name: "Jane Doe", phone: "1234567890" },
//       { name: "Sam Smith", phone: "0987654321" },
//     ],
//   },
// };

// validateData(apiData);

// const Joi = require("joi");

const fields = [
  {
    schema_definition: {
      type: "String",
    },
    field: "username",
    path: "username",
    type: "String",
    fieldType: "Single",
    meta: {
      required: false,
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
  {
    schema_definition: {
      type: "String",
    },
    field: "email",
    path: "email",
    type: "String",
    fieldType: "Single",
    meta: {
      required: true,
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
  {
    schema_definition: {
      type: "Object",
    },
    field: "address",
    path: "address",
    type: "Object",
    fieldType: "Object",
    meta: {
      required: true,
    },
  },
  {
    schema_definition: {
      type: "String",
    },
    field: "street",
    path: "address.street",
    type: "String",
    fieldType: "Object",
    meta: {
      required: true,
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
  {
    schema_definition: {
      type: "String",
    },
    field: "city",
    path: "address.city",
    type: "String",
    fieldType: "Object",
    meta: {
      required: true,
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
  {
    schema_definition: {
      type: "String",
    },
    field: "zip",
    path: "address.zip",
    type: "String",
    fieldType: "Object",
    meta: {
      required: true,
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
  {
    schema_definition: {
      type: "ObjectId",
    },
    field: "one_to_many",
    path: "address.one_to_many",
    type: "ObjectId",
    fieldType: "Object",
    meta: {
      required: true,
      validations: {
        rules: [],
      },
    },
  },

  {
    schema_definition: {
      type: "Array",
    },
    field: "comments",
    path: "comments",
    type: "Array",
    fieldType: "Object",
    meta: {
      required: true,
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
  {
    schema_definition: {
      type: "String",
    },
    field: "author",
    path: "comments.author",
    type: "String",
    fieldType: "Object",
    meta: {
      required: true,
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
  {
    schema_definition: {
      type: "String",
    },
    field: "text",
    path: "comments.text",
    type: "String",
    fieldType: "Object",
    meta: {
      required: true,
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
  {
    schema_definition: {
      type: "Date",
    },
    field: "date",
    path: "comments.date",
    type: "Date",
    fieldType: "Object",
    meta: {
      required: true,
      validations: {
        rules: [
          // {
          //   rule: "contains",
          //   contains: { value: "sahil", insensitive: false },
          // },
          // {
          //   rule: "contains",
          //   contains: { value: "test1", insensitive: false },
          // },
        ],
      },
    },
  },

  {
    schema_definition: {
      type: "Object",
    },
    field: "replies",
    path: "comments.replies",
    type: "Object",
    fieldType: "Object",
    meta: {
      required: true,
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
  {
    schema_definition: {
      type: "String",
    },
    field: "replyAuthor",
    path: "comments.replies.author",
    type: "String",
    fieldType: "Object",
    meta: {
      required: true,
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
  {
    schema_definition: {
      type: "String",
    },
    field: "replyText",
    path: "comments.replies.text",
    type: "String",
    fieldType: "Object",
    meta: {
      required: true,
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
  {
    schema_definition: {
      type: "Date",
    },
    field: "replyDate",
    path: "comments.replies.date",
    type: "Date",
    fieldType: "Object",
    meta: {
      required: true,
      validations: {
        rules: [
          // {
          //   rule: "contains",
          //   contains: { value: "sahil", insensitive: false },
          // },
          // {
          //   rule: "contains",
          //   contains: { value: "test1", insensitive: false },
          // },
        ],
      },
    },
  },
  {
    schema_definition: {
      type: "Array",
    },
    field: "newarray",
    path: "comments.replies.newarray",
    type: "Array",
    fieldType: "Object",
    meta: {
      required: true,
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
  {
    schema_definition: {
      type: "Date",
    },
    field: "sahil",
    path: "comments.replies.newarray.sahil",
    type: "Date",
    fieldType: "Object",
    meta: {
      required: true,
      validations: {
        rules: [
          // {
          //   rule: "contains",
          //   contains: { value: "sahil", insensitive: false },
          // },
          // {
          //   rule: "contains",
          //   contains: { value: "test1", insensitive: false },
          // },
        ],
      },
    },
  },
  {
    schema_definition: {
      type: "Date",
    },
    field: "sahil1",
    path: "comments.replies.newarray.sahil1",
    type: "Date",
    fieldType: "Object",
    meta: {
      required: true,
      validations: {
        rules: [
          // {
          //   rule: "contains",
          //   contains: { value: "sahil", insensitive: false },
          // },
          // {
          //   rule: "contains",
          //   contains: { value: "test1", insensitive: false },
          // },
        ],
      },
    },
  },
  {
    field: "arraytest",
    path: "comments.replies.newarray.arraytest",
    type: "Array",
    fieldType: "Object",
    meta: {
      required: false,
      validations: {
        rules: [
          // {
          //   rule: "contains",
          //   contains: { value: "sahil", insensitive: false },
          // },
          // {
          //   rule: "contains",
          //   contains: { value: "test1", insensitive: false },
          // },
        ],
      },
    },
    schema_definition: {
      type: "String",
    },
  },
  {
    schema_definition: {
      type: "Number",
    },
    field: "age",
    path: "age",
    type: "Number",
    fieldType: "Single",
    meta: {
      required: true,
      validations: {
        rules: [
          // {
          //   rule: "required",
          //   required: { value: true, insensitive: false },
          // },
        ],
      },
    },
  },
  {
    schema_definition: {
      type: "Number",
    },
    field: "numbers",
    path: "numbers",
    type: "Array",
    fieldType: "Object",
    meta: {
      required: true,
      validations: {
        rules: [
          // {
          //   rule: "contains",
          //   contains: { value: "sahil", insensitive: false },
          // },
          // {
          //   rule: "contains",
          //   contains: { value: "test1", insensitive: false },
          // },
        ],
      },
    },
  },

  {
    schema_definition: {
      type: "Alias",
    },
    field: "many_to_many",
    path: "many_to_many",
    type: "Alias",
    fieldType: "Array",
    meta: {
      required: false,
      validations: {
        rules: [],
      },
    },
  },
  {
    schema_definition: {
      type: "Alias",
    },
    field: "one_to_many",
    path: "one_to_many",
    type: "Alias",
    fieldType: "Array",
    meta: {
      required: true,
      validations: {
        rules: [],
      },
    },
  },
  {
    schema_definition: {
      type: "ObjectId",
    },
    field: "many_to_one",
    path: "many_to_one",
    type: "ObjectId",
    fieldType: "Single",
    meta: {
      required: true,
      nullable: true,
      validations: {
        rules: [
          {
            rule: "allow",
            allow: { value: ["123"] },
          },
        ],
      },
    },
  },
  {
    field: "testing",
    path: "testing",
    type: "Object",
    fieldType: "Object",
    meta: {
      required: false,
      nullable: true,
    },
    schema_definition: {
      type: "Object",
    },
  },
  {
    field: "array_field",
    path: "testing.array_field",
    type: "Array",
    fieldType: "Object",
    meta: {
      required: false,
      nullable: true,
      validations: {
        rules: [
          {
            rule: "allow",
            allow: { value: ["123"] },
          },
        ],
      },
    },
    schema_definition: {
      type: "String",
    },
  },
];

const objectId = (value, helpers) => {
  if (!value.match(/^[0-9a-fA-F]{24}$/) && value !== null && value !== "") {
    return helpers.message('"{{#label}}" must be a valid mongo id');
  }
  return value;
};

function convertFieldsToJoiFormat(fields) {
  const convertedData = {};

  function addToConvertedData(currentLevel, pathParts, field, validationRules) {
    pathParts.forEach((part, index) => {
      let existingField = currentLevel?.[part];

      if (!existingField) {
        let validationData = {};
        let type = field.schema_definition.type;
        let itsAliasType = {};

        if (type === "Alias") {
          type = "array";
          itsAliasType = {
            items: {
              type: "string",
              validations: {
                rules: [...validationRules],
              },
            },
          };
        } else if (type === "ObjectId") {
          type = "string";
        } else if (field.type === "Array" && field.fieldType === "Object" && type !== field.type) {
          type = "array";
          itsAliasType = {
            items: {
              type: field.schema_definition.type,
              validations: {
                rules: [...validationRules],
              },
            },
          };
        }

        if (type?.toLowerCase() !== "object" && type?.toLowerCase() !== "array") {
          validationData = {
            validations: {
              rules: [...validationRules],
            },
          };
        }

        const newField = {
          [part]: {
            type: index === pathParts.length - 1 ? type?.toLowerCase() : "object",
            ...validationData,
            ...itsAliasType,
          },
        };

        existingField = newField;
        currentLevel[part] = newField[part];
      }

      if (index < pathParts.length - 1) {
        if (existingField.type?.toLowerCase() === "object") {
          if (!existingField.keys) {
            existingField.keys = {};
          }
          currentLevel = existingField.keys;
        } else if (existingField.type?.toLowerCase() === "array") {
          if (!existingField.items) {
            existingField.items = {
              type: "object",
              keys: {},
            };
          }
          currentLevel = existingField.items.keys;
        }
      }
    });
  }

  fields.forEach((field) => {
    let validationRules = [
      {
        rule: "required",
        required: { value: !!field?.meta?.required },
      },
    ];

    if (field?.meta?.nullable) {
      validationRules.push({
        rule: "allow",
        allow: { value: ["", null] },
      });
    }
    if (field.type === "Alias" || field.type === "ObjectId") {
      type = "string";
      validationRules.push({
        rule: "objectid",
        objectid: {},
      });
    }

    validationRules.push(...(field?.meta?.validations?.rules || []));

    if (field.fieldType === "Single") {
      convertedData[field.field] = {
        type: field.schema_definition.type,
        validations: {
          rules: [...validationRules],
        },
      };
    } else if (field.fieldType === "Object") {
      addToConvertedData(convertedData, field.path.split("."), field, validationRules);
    } else if (field.fieldType === "Array") {
      convertedData[field.field] = {
        type: field.fieldType?.toLowerCase(),
        items: {
          type: field.schema_definition.type,
          validations: {
            rules: [...validationRules],
          },
        },
      };
    }
  });

  return convertedData;
}

console.log("convertFieldsToJoiFormat", convertFieldsToJoiFormat(fields));
// const Joi = require("joi");

// const createDynamicJoiSchema = (definition) => {
//   const createJoiSchema = (schema) => {
//     let joiSchema = Joi;
//     if (schema.type) {
//       joiSchema = Joi[schema.type]();
//     }

//     const applyRule = (rule, object) => {
//       switch (rule) {
//         case "when":
//           const { field, is, then, otherwise } = object;
//           joiSchema = joiSchema.when(field, {
//             is: createJoiSchema(is),
//             then: createJoiSchema(then),
//             otherwise: createJoiSchema(otherwise),
//           });
//           break;
//         case "separatedValue":
//           joiSchema = joiSchema[object?.value](...schema[object?.value]);
//           break;
//         case "contains":
//           joiSchema = joiSchema.custom((val, helpers) => {
//             const checkValue = object.insensitive ? val.toLowerCase() : val;
//             const targetValue = object.insensitive ? object.value.toLowerCase() : object.value;
//             if (!checkValue.includes(targetValue)) {
//               return helpers.error("any.invalid", {
//                 message: `Must contain '${object.value}'${
//                   object.insensitive ? " (insensitive)" : ""
//                 }`,
//               });
//             }
//             return val;
//           });
//           break;
//         case "doesNotContain":
//           joiSchema = joiSchema.custom((val, helpers) => {
//             const checkValue = object.insensitive ? val.toLowerCase() : val;
//             const targetValue = object.insensitive ? object.value.toLowerCase() : object.value;
//             if (checkValue.includes(targetValue)) {
//               return helpers.error("any.invalid", {
//                 message: `Must not contain '${object.value}'${
//                   object.insensitive ? " (insensitive)" : ""
//                 }`,
//               });
//             }
//             return val;
//           });
//           break;
//         case "startsWith":
//           joiSchema = joiSchema.custom((val, helpers) => {
//             const checkValue = object.insensitive ? val.toLowerCase() : val;
//             const targetValue = object.insensitive ? object.value.toLowerCase() : object.value;
//             if (!checkValue.startsWith(targetValue)) {
//               return helpers.error("any.invalid", {
//                 message: `Must start with '${object.value}'${
//                   object.insensitive ? " (insensitive)" : ""
//                 }`,
//               });
//             }
//             return val;
//           });
//           break;
//         case "doesNotStartWith":
//           joiSchema = joiSchema.custom((val, helpers) => {
//             const checkValue = object.insensitive ? val.toLowerCase() : val;
//             const targetValue = object.insensitive ? object.value.toLowerCase() : object.value;
//             if (checkValue.startsWith(targetValue)) {
//               return helpers.error("any.invalid", {
//                 message: `Must not start with '${object.value}'${
//                   object.insensitive ? " (insensitive)" : ""
//                 }`,
//               });
//             }
//             return val;
//           });
//           break;
//         case "endsWith":
//           joiSchema = joiSchema.custom((val, helpers) => {
//             const checkValue = object.insensitive ? val.toLowerCase() : val;
//             const targetValue = object.insensitive ? object.value.toLowerCase() : object.value;
//             if (!checkValue.endsWith(targetValue)) {
//               return helpers.error("any.invalid", {
//                 message: `Must end with '${object.value}'${
//                   object.insensitive ? " (insensitive)" : ""
//                 }`,
//               });
//             }
//             return val;
//           });
//           break;
//         case "doesNotEndWith":
//           joiSchema = joiSchema.custom((val, helpers) => {
//             const checkValue = object.insensitive ? val.toLowerCase() : val;
//             const targetValue = object.insensitive ? object.value.toLowerCase() : object.value;
//             if (checkValue.endsWith(targetValue)) {
//               return helpers.error("any.invalid", {
//                 message: `Must not end with '${object.value}'${
//                   object.insensitive ? " (insensitive)" : ""
//                 }`,
//               });
//             }
//             return val;
//           });
//           break;
//         case "equals":
//           joiSchema = joiSchema.custom((val, helpers) => {
//             if (val !== object?.value) {
//               return helpers.error("any.invalid", { message: `Must equal '${object?.value}'` });
//             }
//             return val;
//           });
//           break;
//         case "doesNotEqual":
//           joiSchema = joiSchema.custom((val, helpers) => {
//             if (val === object?.value) {
//               return helpers.error("any.invalid", { message: `Must not equal '${object?.value}'` });
//             }
//             return val;
//           });
//           break;
//         case "isEmpty":
//           joiSchema = joiSchema.custom((val, helpers) => {
//             if (object?.value && val !== "") {
//               return helpers.error("any.invalid", { message: `Must be empty` });
//             }
//             return val;
//           });
//           break;
//         case "isNotEmpty":
//           joiSchema = joiSchema.custom((val, helpers) => {
//             if (object?.value && val === "") {
//               return helpers.error("any.invalid", { message: `Must not be empty` });
//             }
//             return val;
//           });
//           break;
//         case "isNull":
//           joiSchema = joiSchema.custom((val, helpers) => {
//             if (object?.value && val !== null) {
//               return helpers.error("any.invalid", { message: `Must be null` });
//             }
//             return val;
//           });
//           break;
//         case "isNotNull":
//           joiSchema = joiSchema.custom((val, helpers) => {
//             if (object?.value && val === null) {
//               return helpers.error("any.invalid", { message: `Must not be null` });
//             }
//             return val;
//           });
//           break;
//         case "isOneOf":
//           joiSchema = joiSchema.custom((val, helpers) => {
//             if (!object?.value.includes(val)) {
//               return helpers.error("any.invalid", {
//                 message: `Must be one of ${object?.value.join(", ")}`,
//               });
//             }
//             return val;
//           });
//           break;
//         case "isNotOneOf":
//           joiSchema = joiSchema.custom((val, helpers) => {
//             if (object?.value.includes(val)) {
//               return helpers.error("any.invalid", {
//                 message: `Must not be one of ${object?.value.join(", ")}`,
//               });
//             }
//             return val;
//           });
//           break;
//         case "matchesRegExp":
//           joiSchema = joiSchema.custom((val, helpers) => {
//             if (!new RegExp(object?.value).test(val)) {
//               return helpers.error("any.invalid", {
//                 message: `Must match the regular expression ${object?.value}`,
//               });
//             }
//             return val;
//           });
//           break;
//         case "objectid":
//           joiSchema = joiSchema.custom(objectId);
//           break;
//         case "required":
//           if (object?.value === true) joiSchema = joiSchema.required();
//           break;
//         case "allow":
//           joiSchema = joiSchema.allow(...object?.value);
//           break;
//         default:
//           if (object?.value === true) {
//             joiSchema = joiSchema[rule]();
//           } else if (typeof object?.value !== "object" && object?.value !== null) {
//             joiSchema = joiSchema[rule](object?.value);
//           }
//           break;
//       }
//     };

//     if (schema.keys) {
//       const keys = {};
//       for (const [key, value] of Object.entries(schema.keys)) {
//         keys[key] = createJoiSchema(value);
//       }
//       joiSchema = joiSchema.keys(keys);
//     } else if (schema.items) {
//       joiSchema = joiSchema.items(createJoiSchema(schema.items));
//     } else {
//       for (const data of schema?.validations?.rules) {
//         applyRule(data.rule, data[data.rule]);
//       }
//     }

//     return joiSchema;
//   };

//   const keys = {};
//   for (const [key, value] of Object.entries(definition)) {
//     keys[key] = createJoiSchema(value);
//   }

//   return Joi.object(keys);
// };

// const JoiValidateData = async ({ data, fields, schema = null, isGeneratedSchema = false }) => {
//   let joiSchema = schema;
//   if (!isGeneratedSchema) {
//     joiSchema = createDynamicJoiSchema(convertFieldsToJoiFormat(fields));
//   }

//   const { error, value } = joiSchema
//     .prefs({
//       errors: { label: "key", wrap: { label: false } },
//       stripUnknown: false,
//       abortEarly: false,
//     })
//     .validate(data);

//   if (error) {
//     const { details } = error;
//     const errorData = {};

//     details.map((item) => {
//       errorData[item.path.join(".")] = item.message;
//     });

//     console.error("Validation error:", errorData);
//     return {
//       status: false,
//       error: errorData,
//     };
//   }

//   console.log("Validation successful:", value);
//   return {
//     status: true,
//     payload: value,
//   };
// };

// const apiData = {
//   username: "sahil_test1_user",
//   email: "sahil_test1@example.com",
//   address: {
//     street: "sahil_test1_street",
//     city: "sahil_test1_city",
//     zip: "sahil_test1_zip",
//     // one_to_many: ["64eacf5f5a9e4b1d895d9d8c", "64eacf5f5a9e4b1d895d9d8c"],
//     one_to_many: "64eacf5f5a9e4b1d895d9d8c",
//   },
//   comments: [
//     {
//       author: "sahil_test1_author",
//       text: "sahil_test1_comment_text",
//       date: "2023-09-05T12:00:00Z",
//       replies: {
//         author: "sahil_test1_reply_author",
//         text: "sahil_test1_reply_text",
//         date: "2023-09-06T12:00:00Z",
//         newarray: [
//           {
//             sahil: "2023-09-07T12:00:00Z",
//             sahil1: "2023-09-08T12:00:00Z",
//           },
//         ],
//       },
//     },
//   ],
//   age: 30,
//   numbers: [123, 456],
//   many_to_many: ["64eacf5f5a9e4b1d895d9d8c", "64eacf5f5a9e4b1d895d9d8c"],
//   one_to_many: ["64eacf5f5a9e4b1d895d9d8c", "64eacf5f5a9e4b1d895d9d8c"],
//   many_to_one: "64eacf5f5a9e4b1d895d9d8c",
// };

// // Validate the sample data
// JoiValidateData({ data: apiData, fields: fields });
