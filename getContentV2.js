const data = require("./fieldRelData.json");

const findRelations = ({ collection, field, interface, data, findJunction = false }) => {
  let returnData = {};
  if (interface === "relational") {
    returnData = {
      main_table: data.find(
        (d) =>
          d?.many_collection_id?.toString() === collection?.toString() &&
          d?.junction_field === field
      ),
    };
  } else if (
    interface === "list-o2m" ||
    interface === "list-m2m" ||
    interface === "files" ||
    interface === "list-m2a" ||
    interface === "translations"
  ) {
    const relationsData = data.find(
      (d) =>
        d?.one_collection_id?.toString() === collection?.toString() &&
        d?.one_field_id?.toString() === field?.toString()
    );
    returnData = {
      main_table: relationsData,
      foreign_collection_id: relationsData?.many_collection_id,
      foreign_collection: relationsData?.many_collection,
    };
  } else if (interface === "list-m2o" || interface === "file" || interface === "file-image") {
    const relationsData = data.find(
      (d) =>
        d?.many_collection_id?.toString() === collection?.toString() &&
        d?.many_field_id?.toString() === field?.toString()
    );
    returnData = {
      main_table: relationsData,
      foreign_collection_id: relationsData?.one_collection_id,
      foreign_collection: relationsData?.one_collection,
    };
  }

  if (returnData?.main_table?.junction_field && findJunction) {
    const junctionTable = data.find(
      (d) =>
        d?.many_collection_id?.toString() ===
          returnData?.main_table?.many_collection_id?.toString() &&
        d?.junction_field === returnData?.main_table?.many_field
    );
    returnData = {
      ...returnData,
      relational: junctionTable,
    };
  }

  return returnData;
};

const RELATIONAL_INTERFACES = [
  "list-o2m",
  "list-m2o",
  "file",
  "file-image",
  "files",
  "list-m2m",
  "list-m2a",
  "translations",
];

const operatorMap = {
  _and: "$and",
  _or: "$or",
  _eq: "$eq",
  _neq: "$ne",
  _lt: "$lt",
  _lte: "$lte",
  _gt: "$gt",
  _gte: "$gte",
  _in: "$in",
  _nin: "$nin",
  _contains: "regex",
  _icontains: "regex",
  _starts_with: "regex",
  _istarts_with: "regex",
  _ends_with: "regex",
  _iends_with: "regex",
  _objectid: "ObjectId",
};

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

const getPopulatedRelationalFields = (
  relationalFields,
  uniqueFields,
  fields,
  level,
  currentLevel = 1,
  result = {}
) => {
  if (level === 0 || relationalFields.length === 0) return result;

  if (!result[currentLevel]) {
    result[currentLevel] = [];
  }

  relationalFields.forEach((rf) => {
    const isM2a = rf.meta.interface === "list-m2a";
    const schemaId = isM2a
      ? rf.relation?.relational?.one_allowed_collections_id
      : [rf?.relation?.foreign_collection_id];

    const schemaFields = fields.filter((f) => schemaId.includes(f?.schema_id));
    uniqueFields.push(...schemaFields);
    const relatedFields = schemaFields.map((item) => {
      const myRelations = findRelations({
        collection: item?.schema_id,
        field: item?._id,
        interface: item.meta.interface,
        data: data.relations,
        findJunction: item?.meta?.interface === "list-m2a",
      });

      let relativePath = rf.relativePath;
      if (isM2a) {
        const findIndex = rf?.relation?.relational?.one_allowed_collections_id?.findIndex(
          (id) => id === item?.schema_id
        );

        // TODO
        relativePath = `${rf.relativePath}.${rf?.relation?.relational?.one_allowed_collections[findIndex]}`;
      }
      const returnData = {
        ...item,
        relativePath: `${relativePath}.${item.path}`,
        relation: myRelations,
      };
      result[currentLevel].push(returnData);
      return returnData;
    });

    const nestedRelationalFields = relatedFields.filter((f) =>
      RELATIONAL_INTERFACES.includes(f.meta?.interface)
    );

    getPopulatedRelationalFields(
      nestedRelationalFields,
      uniqueFields,
      fields,
      level - 1,
      currentLevel + 1,
      result
    );
  });

  return result;
};

function getFieldsBySchemaId({ fields, schemaId, populated, level = 3 }) {
  try {
    let fieldDoc = {};
    let relationalFields = [];
    let uniqueFields = [];

    const mainTableFields = fields
      .filter((field) => field.schema_id === schemaId)
      .map((field) => {
        if (RELATIONAL_INTERFACES.includes(field.meta?.interface)) {
          const myRelations = findRelations({
            collection: field?.schema_id,
            field: field?._id,
            interface: field?.meta?.interface,
            data: data.relations,
            findJunction: field?.meta?.interface === "list-m2a",
          });
          const returnData = {
            ...field,
            relativePath: field.path,
            relation: myRelations,
          };
          relationalFields.push(returnData);
          return returnData;
        } else {
          return { ...field, relativePath: field.path };
        }
      });

    uniqueFields.push(...mainTableFields);
    if (populated) {
      fieldDoc = getPopulatedRelationalFields(relationalFields, uniqueFields, fields, level);
    }

    return { path: { ...fieldDoc, 0: mainTableFields }, uniqueFields };
  } catch (error) {
    return [];
  }
}

const getFieldsForPaths = (allLevelFields, filterPaths = []) => {
  const allFields = Object.values(allLevelFields).flat();
  const result = {};

  for (const path of filterPaths) {
    const parts = path.replace("item:", "").replace("language:", "").split(".");
    let currentPath = "";
    const pathFields = [];

    for (const part of parts) {
      currentPath = currentPath ? `${currentPath}.${part}` : part;
      const match = allFields.find((f) => f.relativePath === currentPath);
      if (match) pathFields.push(match);
    }

    result[path] = pathFields;
  }

  return result;
};

const paths = getFieldsBySchemaId({
  fields: data.fields,
  schemaId: "68149f63bcaf1dc4eb76a5fd",
  populated: true,
});

const filterPaths = [
  "name",
  // "m2m",
  // "m2m.card_id.name",
  // "m2m.card_id.name2",
  // "o2m.name",
  // "o2m.name2",
  // "m2o",
  // "m2a",
  // "m2a.item:card.name",
  // "m2a.item:products.creator.m2m.hello_collection_id.name",
  // "m2a.item:products.o2m.name",
  // "m2a.item:products.translations",
  // "m2a.item:products.translations.language:6813658c2898c90713cf19d0",
];

const filterQuery = [];

const pathWiseFields = getFieldsForPaths(paths, filterPaths);

const constructFilterQuery = (filter) => {
  if (!filter || typeof filter !== "object") return filter;

  const query = {};

  for (const [key, value] of Object.entries(filter)) {
    const mongoOperator = operatorMap[key];

    if (["$and", "$or", "$nin", "$in"].includes(mongoOperator)) {
      if (
        ["$nin", "$in"].includes(mongoOperator) &&
        whatIsIt(value) === "Object" &&
        value?.values &&
        whatIsIt(value?.values) === "Array"
      ) {
        query[mongoOperator] = value?._objectid
          ? value.values.map((val) => (ObjectId.isValid(val) ? { ObjectId: val } : val))
          : value.values.map(constructFilterQuery);
      } else {
        query[mongoOperator] = value.map(constructFilterQuery);
      }
    } else if (mongoOperator === "regex") {
      let regexValue = value;
      let options = "";
      if (key.startsWith("_i")) {
        options = "i";
        regexValue = regexValue.replace(/^\/(.*)\/$/, "$1");
      }
      if (key === "_starts_with" || key === "_istarts_with") {
        regexValue = `^${regexValue}`;
      } else if (key === "_ends_with" || key === "_iends_with") {
        regexValue = `${regexValue}$`;
      }
      return {
        $regex: regexValue,
        $options: options,
      };
    } else if (mongoOperator === "ObjectId") {
      if (!ObjectId.isValid(value)) {
        throw new ApiError(httpStatus.BAD_REQUEST, "invalid_object_id");
      }
      query[mongoOperator] = value;
    } else if (mongoOperator) {
      query[mongoOperator] = typeof value === "object" ? constructFilterQuery(value) : value;
    } else if (typeof value === "object" && value !== null) {
      const nestedQuery = constructFilterQuery(value);
      for (const [nestedKey, nestedValue] of Object.entries(nestedQuery)) {
        if (Object.values(operatorMap).includes(nestedKey) || nestedKey.startsWith("$")) {
          query[key] = { ...(query?.[key] || {}), [nestedKey]: nestedValue };
        } else {
          query[`${key}.${nestedKey}`] = nestedValue;
        }
      }
    } else {
      query[key] = value;
    }
  }
  return query;
};

function processFilterQuery(filterQuery, matchField, store) {
  if (!filterQuery) return;

  Object.keys(filterQuery).forEach((key) => {
    if (key === "$and" || key === "$or") {
      if (!store[key]) store[key] = {};
      filterQuery[key].forEach((subQuery, index) => {
        if (!store[key][index] || Array.isArray(store[key][index])) store[key][index] = {};
        processFilterQuery(subQuery, matchField, store[key][index]);
      });
    } else if (!matchField?.isRelational && matchField?.path === key) {
      store[key] = {
        value: filterQuery[key],
        isRelational: matchField?.isRelational,
      };
    } else if (matchField?.field === key?.split(".").shift()) {
      store[key] = {
        value: filterQuery[key],
        isRelational: matchField?.isRelational,
      };
    }
  });
}

function resolvePath(replacers, field, path) {
  const parts = path.split(".");

  if (parts[parts.length - 1] === field) {
    return `${replacers}.${field}`;
  }

  return path;
}

function transformDataV2(data, unwindFields) {
  function processObject(obj) {
    if (typeof obj !== "object" || obj === null) {
      return obj;
    }

    if (Array.isArray(obj)) {
      const result = [];
      for (const item of obj) {
        result.push(processObject(item));
      }
      return result;
    }

    if (Object.keys(obj).every((key) => /^\d+$/.test(key))) {
      return Object.values(obj).map(processObject);
    }

    const transformed = {};
    for (const [key, value] of Object.entries(obj)) {
      let storeKey = key;

      const matchField = unwindFields.find((field) => field?.fullPath === key);
      if (matchField) {
        storeKey = resolvePath(
          matchField?.unwindTable,
          matchField?.fieldPath,
          matchField?.fullPath
        );
      }
      transformed[storeKey] = processObject(value);
    }

    return transformed;
  }

  return processObject(data);
}

function cleanFlattenAndConvertToObjectId(condition) {
  if (Array.isArray(condition)) {
    return condition.map(cleanFlattenAndConvertToObjectId);
  }

  if (typeof condition === "object" && condition !== null) {
    const cleanedCondition = { ...condition };
    for (const [key, value] of Object.entries(condition)) {
      if (key === "$and" || key === "$or") {
        cleanedCondition[key] = value.map(cleanFlattenAndConvertToObjectId);
      } else if (key === "$in" || key === "$nin") {
        cleanedCondition[key] = value.map((i) =>
          i?.ObjectId && ObjectId.isValid(i.ObjectId) ? new ObjectId(i.ObjectId) : i
        );
      } else {
        if (value && value.isRelational !== undefined) {
          delete cleanedCondition[key].isRelational;
        }

        if (value && value.value !== undefined) {
          if (value.value?.ObjectId && ObjectId.isValid(value.value.ObjectId)) {
            cleanedCondition[key] = new ObjectId(value.value.ObjectId);
          } else {
            cleanedCondition[key] = cleanFlattenAndConvertToObjectId(value.value);
            delete cleanedCondition[key].value;
          }
        } else if (typeof value === "object" && value !== null) {
          cleanedCondition[key] = cleanFlattenAndConvertToObjectId(value);
        }
      }
    }
    return cleanedCondition;
  }

  return condition;
}

function moveLookupsAndFilters(matchingKey, lookups, upperLookups) {
  const matchingLookup = lookups.findIndex((lookup) =>
    matchingKey?.includes(lookup?.["$lookup"]?.as)
  );
  if (matchingLookup >= 0) {
    const matchingLookupData = lookups[matchingLookup];
    upperLookups.unshift(matchingLookupData);
    lookups.splice(matchingLookup, 1);
    moveLookupsAndFilters(matchingLookupData?.["$lookup"]?.localField, lookups, upperLookups);
  }
}

function separateConditions(data, lookups, upperLookups) {
  const upperConditions = {};
  const lowerConditions = {};

  for (const [key, value] of Object.entries(data)) {
    if (key === "$or") {
      const relationalFound = value.find((condition) =>
        Object.values(condition).some((val) => val?.isRelational === true)
      );
      if (relationalFound) {
        moveLookupsAndFilters(Object.keys(relationalFound)?.[0], lookups, upperLookups);
        lowerConditions[key] = value;
      } else {
        upperConditions[key] = value;
      }
    } else if (key === "$and") {
      const upper = [];
      const lower = [];

      for (const condition of value) {
        if (condition.$or) {
          const relationalFoundInOr = condition.$or.find((c) =>
            Object.values(c).some((val) => val?.isRelational === true)
          );
          if (relationalFoundInOr) {
            moveLookupsAndFilters(Object.keys(relationalFoundInOr)?.[0], lookups, upperLookups);
            lower.push({ ...condition, $or: condition.$or });
          } else {
            upper.push({ ...condition, $or: condition.$or });
          }
        } else if (condition.$and) {
          const { upperConditions: nestedUpper, lowerConditions: nestedLower } = separateConditions(
            {
              $and: condition.$and,
            },
            lookups,
            upperLookups
          );
          if (nestedUpper.$and) {
            upper.push(...nestedUpper.$and);
          }
          if (nestedLower.$and) {
            lower.push(...nestedLower.$and);
          }
        } else {
          const relationalFound = Object.keys(condition).find(
            (val) => condition?.[val]?.isRelational === true
          );
          if (relationalFound) {
            moveLookupsAndFilters(relationalFound, lookups, upperLookups);
            lower.push(condition);
          } else {
            upper.push(condition);
          }
        }
      }

      if (upper.length > 0) {
        upperConditions[key] = upper;
      }
      if (lower.length > 0) {
        lowerConditions[key] = lower;
      }
    }
  }

  return { upperConditions, lowerConditions };
}

const filterQueries = constructFilterQuery({ _and: filterQuery });

function buildAggregationPipeline(schemaMap, filterQuery) {
  const aggregationStages = [];
  const deduplicatedLookups = new Map();
  const projection = { _id: 1 };
  const projectionOperators = new Map();
  let rawFilterMap = {};
  const earlyLookups = [];
  let unwindMetadata = [];
  const primaryTableFields = [];

  try {
    for (const [fieldPath, fieldDefs] of Object.entries(schemaMap)) {
      let stepIndex = 0;
      let currentUnwindPath = "";
      let shouldApplyFirst = true;
      let isFirstField = true;
      let involvesRelation = false;

      for (const field of fieldDefs) {
        stepIndex++;
        const interfaceType = field.meta?.interface;

        const isRelational =
          RELATIONAL_INTERFACES.includes(interfaceType) ||
          (field?.type === "ObjectId" && field.path !== "_id");

        currentUnwindPath = currentUnwindPath ? `${currentUnwindPath}-${field.path}` : field.path;

        if (isRelational) {
          involvesRelation = true;
          let localField = "_id";
          let foreignField = "";
          const foreignCollection = field?.relation?.foreign_collection;
          let relationAlias = foreignCollection + field._id;
          let unwindSuffix = "";
          let nestedLookupPipeline = { pipeline: [] };
          const baseLocalField = `${currentUnwindPath.replace(`${field.path}`, "")}_id`;

          switch (interfaceType) {
            case "list-o2m":
            case "list-m2m":
            case "files":
              localField = baseLocalField;
              foreignField = field?.relation?.main_table?.many_field;
              break;

            case "list-m2o":
            case "file":
            case "file-image":
              localField = currentUnwindPath;
              foreignField = "_id";
              projectionOperators.set(relationAlias, "$first");
              break;

            case "list-m2a":
              if (fieldPath.includes("item:")) {
                const collectionName = fieldPath.split("item:")[1].split(".")[0];
                unwindSuffix = `.${collectionName}`;
              }
              localField = baseLocalField;
              foreignField = field?.relation?.main_table?.many_field;

              field?.relation?.relational?.one_allowed_collections?.forEach((collection) => {
                nestedLookupPipeline.pipeline.push({
                  $lookup: {
                    from: collection,
                    localField: field?.relation?.relational?.many_field,
                    foreignField: "_id",
                    as: collection,
                  },
                });
                nestedLookupPipeline.pipeline.push({
                  $unwind: {
                    path: `$${collection}`,
                    preserveNullAndEmptyArrays: true,
                  },
                });
              });
              break;

            case "translations":
              localField = baseLocalField;
              foreignField = field?.relation?.main_table?.many_field;
              projectionOperators.set(relationAlias, "$first");

              if (fieldPath.includes("language:")) {
                const languageId = fieldPath.split("language:")[1]?.split(".")[0];
                // if (isValidObjectId(languageId)) {
                nestedLookupPipeline.pipeline.push({
                  $match: {
                    [field?.relation?.main_table?.junction_field]: languageId,
                  },
                });
                // }
              }
              break;

            default:
              if (field.type === "ObjectId") {
                foreignField = "_id";
              }
              break;
          }

          const lookupSignature = `${foreignCollection}_${localField}_${foreignField}`;
          const lookupPathRoot = currentUnwindPath?.split("-")[0];

          if (deduplicatedLookups.has(lookupSignature)) {
            shouldApplyFirst = false;
            const inheritedOp = projectionOperators.get(lookupPathRoot);
            if (inheritedOp) {
              projectionOperators.set(relationAlias, inheritedOp);
            }
          }

          if (!deduplicatedLookups.has(lookupSignature)) {
            deduplicatedLookups.set(lookupSignature, field.path);

            aggregationStages.push({
              $lookup: {
                from: foreignCollection,
                localField,
                foreignField,
                ...nestedLookupPipeline,
                as: relationAlias,
              },
            });

            if (isFirstField) {
              processFilterQuery(filterQuery, { ...field, isRelational: true }, rawFilterMap);
            }

            if (
              shouldApplyFirst &&
              ["list-m2o", "file", "file-image", "translations"].includes(interfaceType)
            ) {
              projectionOperators.set(relationAlias, "$first");
            }

            shouldApplyFirst = false;
          }

          currentUnwindPath = relationAlias + unwindSuffix;
        } else if (isFirstField) {
          processFilterQuery(filterQuery, { ...field, isRelational: false }, rawFilterMap);
        }

        if (stepIndex === fieldDefs.length) {
          const [rootUnwindKey] = currentUnwindPath.split("-");
          if (rootUnwindKey && involvesRelation) {
            unwindMetadata.push({
              unwindTable: rootUnwindKey,
              fieldPath: field.path,
              fullPath: fieldPath,
            });
          }

          if (!involvesRelation) {
            primaryTableFields.push(field.path);
          }

          const projKey = fieldPath.replaceAll(".", "_");
          projection[projKey] = projectionOperators.get(currentUnwindPath)
            ? { [projectionOperators.get(currentUnwindPath)]: `$${currentUnwindPath}` }
            : `$${currentUnwindPath}`;
        }

        isFirstField = false;
      }
    }

    rawFilterMap = transformDataV2(rawFilterMap, unwindMetadata);
    const { upperConditions, lowerConditions } = cleanFlattenAndConvertToObjectId(
      separateConditions(rawFilterMap, aggregationStages, earlyLookups)
    );

    return {
      upperFilters: upperConditions,
      lowerFilters: lowerConditions,
      upperLookups: earlyLookups,
      primaryTableFields: primaryTableFields,
      query: [...aggregationStages, { $project: projection }],
    };
  } catch (error) {
    console.log("buildAggregationPipeline Error:", error);
  }
}

const pipeline = buildAggregationPipeline(pathWiseFields, filterQueries);
// console.log(pipeline);
console.log(JSON.stringify(pipeline.query, null, 2));
// console.log("paths", paths);
// console.log(pathWiseFields);

// const getPopulatedRelationalFieldsV2 = (relationalFields, fields, level, visited = new Set()) => {
//   try {
//     if (level === 0) return [];

//     const result = [];

//     relationalFields.forEach((rf) => {
//       const isM2a = rf.meta.interface === "list-m2a";
//       const schemaIds = isM2a
//         ? rf.relation?.relational?.one_allowed_collections_id
//         : [rf?.relation?.foreign_collection_id];

//       const children = [];
//       const m2aAliasNodes = [];

//       fields
//         .filter((f) => schemaIds.includes(f?.schema_id))
//         .forEach((item) => {
//           const myRelations = findRelations({
//             collection: item?.schema_id,
//             field: item?._id,
//             interface: item.meta.interface,
//             data: data.relations,
//             findJunction: item?.meta?.interface === "list-m2a",
//           });

//           let basePath = rf.relativePath;
//           let currentAliasNode = null;

//           if (isM2a) {
//             const findIndex = rf?.relation?.relational?.one_allowed_collections_id?.findIndex(
//               (id) => id === item?.schema_id
//             );
//             const collectionAlias = rf?.relation?.relational?.one_allowed_collections?.[findIndex];
//             if (collectionAlias) {
//               basePath = `${basePath}:${collectionAlias}`;
//               currentAliasNode = m2aAliasNodes.find((node) => node.key === basePath);
//               if (!currentAliasNode) {
//                 currentAliasNode = {
//                   key: basePath,
//                   label: collectionAlias,
//                   children: [],
//                 };
//                 m2aAliasNodes.push(currentAliasNode);
//               }
//             }
//           }

//           const fullPath = `${basePath}.${item.path}`;
//           const isRelational = RELATIONAL_INTERFACES.includes(item.meta?.interface);

//           const fieldNode = {
//             key: fullPath,
//             label: item.field,
//           };

//           if (isRelational) {
//             const nestedNode = {
//               ...item,
//               relativePath: fullPath,
//               relation: myRelations,
//             };

//             const nestedChildren = getPopulatedRelationalFieldsV2(
//               [nestedNode],
//               fields,
//               level - 1,
//               visited
//             );

//             if (nestedChildren?.length) {
//               fieldNode.children = nestedChildren;
//               visited.add(fullPath);
//             }
//           }

//           if (!visited.has(fullPath)) {
//             visited.add(fullPath);
//             if (currentAliasNode) {
//               currentAliasNode.children.push(fieldNode);
//             } else {
//               children.push(fieldNode);
//             }
//           } else if (!isM2a) {
//             children.push(...(fieldNode?.children || []));
//           }
//         });

//       if (isM2a && m2aAliasNodes.length > 0) {
//         children.push(...m2aAliasNodes);
//       }

//       if (children.length > 0) {
//         result.push({
//           key: rf.relativePath,
//           label: rf.field,
//           children,
//         });
//       } else {
//         result.push({
//           key: rf.relativePath,
//           label: rf.field,
//         });
//       }
//     });

//     return result;
//   } catch (error) {
//     console.log("error", error);
//     return [];
//   }
// };

// function getFieldsBySchemaIdV2({ fields, schemaId, populated, level = 3 }) {
//   try {
//     let relationalFields = [];
//     const mainTableFields = fields
//       .filter((field) => field.schema_id === schemaId)
//       .map((field) => {
//         const relativePath = field.path;
//         if (RELATIONAL_INTERFACES.includes(field.meta?.interface)) {
//           const myRelations = findRelations({
//             collection: field?.schema_id,
//             field: field?._id,
//             interface: field?.meta?.interface,
//             data: data.relations,
//             findJunction: field?.meta?.interface === "list-m2a",
//           });
//           const relationalField = {
//             ...field,
//             relativePath,
//             relation: myRelations,
//           };
//           relationalFields.push(relationalField);
//           return null; // skip for now
//         } else {
//           return { key: relativePath, label: field.field };
//         }
//       })
//       .filter(Boolean); // remove nulls

//     if (populated) {
//       const relationalTree = getPopulatedRelationalFieldsV2(relationalFields, fields, level);
//       return [...mainTableFields, ...relationalTree];
//     }

//     return mainTableFields;
//   } catch (error) {
//     console.log("error", error);
//     return [];
//   }
// }
