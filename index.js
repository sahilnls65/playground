let mongoose = {
  Schema: {
    Types: {
      ObjectId: "",
    },
  },
};
let global = {
  collections: {},
};
let enums = {
  ORGANISATIE: {},
};

// const schema = {
//   auth0Id: {
//     type: String,
//     required: true,
//   },
//   userId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: global.collections.USER,
//     required: true,
//   },
//   functie: {
//     type: String,
//   },
//   bedrijf: {
//     type: String,
//   },
//   locatie: {
//     type: String,
//   },
//   beschrijving: {
//     type: String,
//   },
//   status: {
//     type: Boolean,
//     default: false,
//   },
//   startdatum: {
//     type: Date,
//   },
//   einddatum: {
//     type: Date,
//   },
//   type: {
//     type: String,
//     enum: ["Loondienst", "Zelfstandig ondernemer", "Onbekend"],
//   },
//   is_current: {
//     type: Boolean,
//   },
//   professioncode: {
//     type: String,
//   },
//   professiondescription: {
//     type: String,
//   },
//   professiongroupcode: {
//     type: String,
//   },
//   professiongroupdescription: {
//     type: String,
//   },
//   professionclasscode: {
//     type: String,
//   },
//   professionclassdescription: {
//     type: String,
//   },
//   onet2010code: {
//     type: String,
//   },
//   onet2010description: {
//     type: String,
//   },
//   isco2008code: {
//     type: String,
//   },
//   isco2008description: {
//     type: String,
//   },
//   skills: [
//     {
//       name: {
//         type: String,
//       },
//       code_id: {
//         type: String,
//       },
//       category: {
//         type: String,
//       },
//       is_extra: {
//         type: Boolean,
//       },
//     },
//   ],
//   created_by: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: global.collections.USER,
//   },
//   updated_by: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: global.collections.USER,
//   },
// };

const stringConstructor = "test".constructor;
const arrayConstructor = [].constructor;
const objectConstructor = {}.constructor;

function whatIsIt(object) {
  if (object === null) {
    return "null";
  }
  if (object === undefined) {
    return "undefined";
  }
  if (object.constructor === stringConstructor) {
    return "String";
  }
  if (object.constructor === arrayConstructor) {
    return "Array";
  }
  if (object.constructor === objectConstructor) {
    return "Object";
  }

  return "don't know";
}

const createObject = (schema) => {
  const newObject = {};

  for (const [propertyName, propertySchema] of Object.entries(schema)) {
    const propertyType = propertySchema?.type;

    if (
      [String, Number, Date, Boolean].includes(propertyType) ||
      Object?.keys(propertySchema).includes("ref") ||
      Object?.keys(propertySchema).includes("enums")
    ) {
      newObject[propertyName] = false;
    } else if (whatIsIt(propertySchema) === "Object") {
      if (Object.keys(propertySchema).length == 0) {
        newObject[propertyName] = false;
      } else {
        newObject[propertyName] = createObject(propertySchema);
      }
    } else if (whatIsIt(propertySchema) === "Array") {
      if (propertySchema?.length > 0) {
        newObject[propertyName] = createObject(propertySchema?.[0]);
      } else {
        newObject[propertyName] = false;
      }
    }
  }
  return newObject;
};

// console.log(createObject(schema));

const schema = {
  notificatietype: true,
  titel: true,
  bericht: false,
  profiel: true,
  send_to_profiel: false,
  skills: {
    selected_skillcodes: { description: true, category: false, code_id: true, is_other: false },
  },
};

function separateTrueFalseFromObject(obj) {
  const trueObj = {};
  const falseObj = {};

  for (const key in obj) {
    if (typeof obj[key] === "boolean") {
      if (obj[key]) {
        trueObj[key] = true;
      } else {
        falseObj[key] = false;
      }
    } else if (typeof obj[key] === "object") {
      const nested = separateTrueFalseFromObject(obj[key]);
      trueObj[key] = nested.trueObj;
      falseObj[key] = nested.falseObj;
    }
  }

  return { trueObj, falseObj };
}

const { trueObj: separatedTrue, falseObj: separatedFalse } = separateTrueFalseFromObject(schema);
console.log(separatedTrue);
console.log(separatedFalse);
