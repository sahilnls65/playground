const { fieldsDocuments } = require("./field-json");

function convertFieldsToConvertedData(fields) {
  const convertedData = {
    fields: [],
  };

  function addToConvertedData(currentLevel, pathParts, field) {
    pathParts.forEach((part, index) => {
      let existingField = currentLevel.find((item) => item.fieldName === part);

      if (!existingField) {
        const newField = {
          fieldName: part,
          type: index === pathParts.length - 1 ? field.type : "Object",
        };

        if (index === pathParts.length - 1 && field.ref) {
          newField.ref = field.ref;
        }

        if (field.schema_definition) {
          newField.schemaDef = field.schema_definition;
        }

        currentLevel.push(newField);
        existingField = newField;
      }

      if (index < pathParts.length - 1) {
        if (!existingField.fields) {
          existingField.fields = [];
        }
        currentLevel = existingField.fields;
      }
    });
  }

  (fields || [])?.forEach((field) => {
    if (field.field_type === "Single") {
      convertedData.fields.push({
        fieldName: field.field,
        type: field.type,
        schemaDef: field.schema_definition,
      });
    } else if (field.field_type === "Object" || field.field_type === "Array of Objects") {
      addToConvertedData(convertedData.fields, field.path.split("."), field);
    } else if (field.field_type === "Array") {
      convertedData.fields.push({
        fieldName: field.field,
        type: "Array",
        arrayType: field.type,
      });
    }
  });

  return convertedData;
}

const convertToSchemaTypes = (fields) => {
  const schemaFields = {};

  fields.forEach((field) => {
    let type;

    switch (field.type) {
      case "String":
        type = String;
        break;
      case "Number":
        type = Number;
        break;
      case "Date":
        type = Date;
        break;
      case "Buffer":
        type = Buffer;
        break;
      case "Boolean":
        type = Boolean;
        break;
      case "Mixed":
        type = mongoose.Schema.Types.Mixed;
        break;
      case "ObjectId":
        type = mongoose.Schema.Types.ObjectId;
        break;
      case "Array":
        if (field.ref) {
          type = [
            {
              type: mongoose.Schema.Types.ObjectId,
              ref: field.ref,
            },
          ];
        } else {
          switch (field.arrayType) {
            case "String":
              type = [String];
              break;
            case "Number":
              type = [Number];
              break;
            case "Boolean":
              type = [Boolean];
              break;
            case "Date":
              type = [Date];
              break;
            case "Buffer":
              type = [Buffer];
              break;
            case "ObjectId":
              type = [mongoose.Schema.Types.ObjectId];
              break;
            case "Mixed":
              type = [mongoose.Schema.Types.Mixed];
              break;
            case "Object":
              type = [new mongoose.Schema(convertToSchemaTypes(field.fields))];
              break;
            default:
              type = [mongoose.Schema.Types.Mixed];
          }
        }
        break;
      case "Object":
        type = new mongoose.Schema(convertToSchemaTypes(field.fields));
        break;
      default:
        type = mongoose.Schema.Types.Mixed;
    }

    schemaFields[field.fieldName] = { type: type, required: !!field.required };

    if (field.default !== undefined) {
      schemaFields[field.fieldName].default = field.default;
    }

    if (field.ref) {
      schemaFields[field.fieldName].ref = field.ref;
    }

    if (field.unique) {
      schemaFields[field.fieldName].unique = field.unique;
    }

    if (field.match) {
      schemaFields[field.fieldName].match = field.match;
    }

    if (field.min !== undefined) {
      schemaFields[field.fieldName].min = field.min;
    }
    if (field.max !== undefined) {
      schemaFields[field.fieldName].max = field.max;
    }

    if (field.trim) {
      schemaFields[field.fieldName].trim = field.trim;
    }
    if (field.lowercase) {
      schemaFields[field.fieldName].lowercase = field.lowercase;
    }
  });

  return schemaFields;
};

const createDynamicSchema = (schemaJson) => {
  const schemaDef = convertToSchemaTypes(convertFieldsToConvertedData(schemaJson));
  const dynamicSchema = new mongoose.Schema(schemaDef, {
    timestamps: true,
    collection: schemaJson.collectionName,
  });
  return dynamicSchema;
};

console.log(convertFieldsToConvertedData(fieldsDocuments));
