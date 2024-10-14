// const dataFormat = [
//   {
//     value: "name",
//     fields: [{ path: "name", _id: 1 }],
//   },
//   {
//     value: "email",
//     fields: [{ path: "email", _id: 2 }],
//   },
//   {
//     value: "orders.total",
//     fields: [
//       { path: "orders", _id: 3, ref: "rel_orders", column: "user" },
//       { path: "orders.total", _id: 4 },
//     ],
//   },
//   {
//     value: "reviews.comment",
//     fields: [
//       { path: "reviews", _id: 5, ref: "rel_reviews", column: "user" },
//       { path: "reviews.comment", _id: 6 },
//     ],
//   },
//   {
//     value: "reviews.rating",
//     fields: [
//       { path: "reviews", _id: 7, ref: "rel_reviews", column: "user" },
//       { path: "reviews.rating", _id: 8 },
//     ],
//   },
//   {
//     value: "reviews.product.name",
//     fields: [
//       { path: "reviews", _id: 9, ref: "rel_reviews", column: "user" },
//       { path: "reviews.product", _id: 10, ref: "rel_products", column: "_id" },
//       { path: "reviews.product.name", _id: 11 },
//     ],
//   },
//   {
//     value: "reviews.product.category.name",
//     fields: [
//       { path: "reviews", _id: 12, ref: "rel_reviews", column: "user" },
//       { path: "reviews.product", _id: 13, ref: "rel_products", column: "_id" },
//       { path: "reviews.product.category", _id: 14, ref: "rel_categories", column: "_id" },
//       { path: "reviews.product.category.name", _id: 15 },
//     ],
//   },
//   // {
//   //   value: "orders.product.name",
//   //   fields: [
//   //     { path: "orders", _id: 16, ref: "rel_orders", column: "user" },
//   //     { path: "orders.product", _id: 17, ref: "rel_products", column: "user" },
//   //     { path: "orders.product.name", _id: 18 },
//   //   ],
//   // },
//   // {
//   //   value: "orders.product.category.name",
//   //   fields: [
//   //     { path: "orders", _id: 19, ref: "rel_orders" },
//   //     { path: "orders.product", _id: 20, ref: "rel_products" },
//   //     { path: "orders.product.category", _id: 21, ref: "rel_categories" },
//   //     { path: "orders.product.category.name", _id: 22 },
//   //   ],
//   // },
// ];

const dataFormat = [
  {
    _id: 101,
    value: "name",
    fields: [{ path: "name", _id: 1 }],
  },
  {
    _id: 102,
    value: "one_to_many.sahil",
    fields: [
      { path: "one_to_many", _id: 2 },
      { path: "one_to_many.sahil", _id: 3 },
    ],
  },
  {
    _id: 103,
    value: "many_to_one.toggle",
    fields: [
      { path: "many_to_one", _id: 4 },
      { path: "many_to_one.toggle", _id: 5 },
    ],
  },
  {
    _id: 104,
    value: "one_to_many.connector.name",
    fields: [
      { path: "one_to_many", _id: 2 },
      { path: "one_to_many.connector", _id: 6 },
      { path: "one_to_many.connector.name", _id: 7 },
    ],
  },
  {
    _id: 105,
    value: "one_to_many.checkbox",
    fields: [
      { path: "one_to_many", _id: 2 },
      { path: "one_to_many.checkbox", _id: 8 },
    ],
  },
  {
    _id: 106,
    value: "many_to_many.nox_field_rs_id.icon",
    fields: [
      { path: "many_to_many", _id: 9 },
      { path: "many_to_many.nox_field_rs_id", _id: 10 },
      { path: "many_to_many.nox_field_rs_id.icon", _id: 11 },
    ],
  },
];

const fieldsData = {
  isLookup: 2,
  fields: [
    {
      _id: 1,
      field: "name",
      meta: {
        interface: "input",
      },
    },
    {
      _id: 2,
      field: "one_to_many",
      meta: {
        interface: "list-o2m",
      },
      schema_definition: {
        foreign_key_table: "NOX_FIELDS",
        foreign_key_column: "connector",
      },
    },
    {
      _id: 3,
      field: "sahil",
      meta: {
        interface: "input",
      },
      schema_definition: {},
    },
    {
      _id: 4,
      field: "many_to_one",
      meta: {
        interface: "list-m2o",
      },
      schema_definition: {
        foreign_key_table: "NOX_FIELDS",
        foreign_key_column: "_id",
      },
    },
    {
      _id: 5,
      field: "Toggle",
      meta: {
        interface: "input",
      },
      schema_definition: {},
    },
    {
      _id: 6,
      field: "connector",
      type: "ObjectId",
      meta: {
        interface: "input",
      },
      schema_definition: {
        foreign_key_table: "Relation",
        foreign_key_column: "_id",
      },
    },
    {
      _id: 7,
      field: "name",
      meta: {
        interface: "input",
      },
      schema_definition: {},
    },
    {
      _id: 8,
      field: "checkbox",
      meta: {
        interface: "input",
      },
      schema_definition: {},
    },
    {
      _id: 9,
      field: "many_to_many",
      meta: {
        interface: "list-m2m",
        junction_collection: "Relation_NOX_FIELDS",
      },
      schema_definition: {},
    },
    {
      _id: 10,
      field: "NOX_FIELDS_id",
      type: "ObjectId",
      meta: {
        interface: "none",
      },
      schema_definition: {
        foreign_key_table: "NOX_FIELDS",
        foreign_key_column: "_id",
      },
    },
    {
      _id: 11,
      field: "icon",
      meta: {
        interface: "input",
      },
      schema_definition: {},
    },
  ],
};

const tableName = "NOX_FIELDS";

function createDynamicLookup(dataFormat) {
  const lookups = [];
  const lookupKeys = new Map();
  const lookupK = new Set();
  let groupStage = [];
  let projectStage = [];
  let mainTableField = [];

  const isLookupEnabled = fieldsData?.isLookup > 0;

  if (isLookupEnabled) {
    groupStage = [{ $group: { _id: "$_id" } }];
  } else {
    projectStage = [{ $project: {} }];
  }

  dataFormat.forEach((mainTable) => {
    let lastUnwindKey = "";
    let aggregationOperator = "$first";

    mainTable.fields.forEach(({ _id, path }) => {
      const matchField = fieldsData.fields.find((fd) => _id === fd._id);
      if (!matchField) return; // Skip if no matching field

      const { interface: interfaceType } = matchField.meta;
      const foreignTable =
        interfaceType === "list-m2m"
          ? matchField?.meta?.junction_collection
          : matchField?.schema_definition?.foreign_key_table;
      const foreignColumn = matchField?.schema_definition?.foreign_key_column;

      if (
        ["list-o2m", "list-m2o", "list-m2m"].includes(interfaceType) ||
        matchField?.type === "ObjectId"
      ) {
        let localField = "";
        let foreignField = "";
        const unwindKey = foreignTable + _id;

        // Ensure the lookup key is unique
        const lookupKey = `${foreignTable}-${foreignColumn}-${interfaceType}`;
        if (!lookupK.has(lookupKey)) {
          const keyPath = path.split(".").slice(0, -1).join(".");
          lookupKeys.set(path, unwindKey);
          lookupK.add(lookupKey);

          const getPopulatedPath = lookupKeys.get(keyPath);

          // Define local and foreign fields based on interface type
          switch (interfaceType) {
            case "list-o2m":
              localField = getPopulatedPath ? `${getPopulatedPath}._id` : "_id";
              foreignField = foreignColumn;
              break;
            case "list-m2o":
              localField = getPopulatedPath
                ? `${getPopulatedPath}.${matchField.field}`
                : matchField.field;
              foreignField = foreignColumn;
              break;
            case "list-m2m":
              localField = "_id";
              foreignField = `${tableName}_id`;
              break;
            default:
              if (matchField.type === "ObjectId") {
                localField = getPopulatedPath
                  ? `${getPopulatedPath}.${matchField.field}`
                  : matchField.field;
                foreignField = foreignColumn;
              }
              break;
          }

          // Push lookup and unwind stages
          lookups.push({
            $lookup: {
              from: foreignTable,
              localField,
              foreignField,
              as: unwindKey,
            },
          });
          lookups.push({
            $unwind: {
              path: `$${unwindKey}`,
              preserveNullAndEmptyArrays: true,
            },
          });
        }

        lastUnwindKey = `${unwindKey}-${path}`;
        aggregationOperator = "$push";
      }
    });

    // Build the grouping or projection stages
    if (isLookupEnabled) {
      const [unwindTable, unwindField] = lastUnwindKey.split("-");
      const adjustedValue = mainTable?.value?.replace(unwindField, unwindTable);
      groupStage[0]["$group"][mainTable._id] = { [aggregationOperator]: `$${adjustedValue}` };
    } else {
      projectStage[0]["$project"][mainTable?.value] = 1;
    }

    if (!lastUnwindKey) {
      mainTableField.push(mainTable.value);
    }
  });

  return { query: [...lookups, ...groupStage, ...projectStage], mainTableField: mainTableField };
}

const aggregationPipeline = createDynamicLookup(dataFormat);
console.log(JSON.stringify(aggregationPipeline, null, 2));

// function createDynamicLookup(dataFormat) {
//   const lookups = [];
//   const lookupKeys = new Map();
//   const lookupSet = new Set();
//   let groupStage = [];
//   let projectStage = [];

//   if (fieldsData.isLookup > 0) {
//     groupStage = [{ $group: { _id: "$_id" } }];
//   } else {
//     projectStage = [{ $project: {} }];
//   }

//   dataFormat.forEach((mainTable) => {
//     let lastUnwindKey = "";
//     let isLookup = "$first";

//     mainTable.fields.forEach(({ _id, path }) => {
//       const matchField = fieldsData.fields.find((fd) => _id === fd._id);
//       const interface = matchField?.meta?.interface;
//       const foreignTable =
//         interface === "list-m2m"
//           ? matchField?.meta?.junction_collection
//           : matchField?.schema_definition?.foreign_key_table;
//       const foreignColumn = matchField?.schema_definition?.foreign_key_column;

//       if (
//         ["list-o2m", "list-m2o", "list-m2m"].includes(interface) ||
//         matchField?.type === "ObjectId"
//       ) {
//         const unwindKey = foreignTable + _id;

//         if (!lookupSet.has(foreignTable + "-" + foreignColumn + "-" + interface)) {
//           const splitPaths = path.split(".");
//           splitPaths.pop();
//           const keyPath = splitPaths.join(".");

//           lookupKeys.set(path, unwindKey);
//           lookupSet.add(foreignTable + "-" + foreignColumn + "-" + interface);

//           const getPopulatedPath = lookupKeys.get(keyPath);
//           let localField = "";
//           let foreignField = "";

//           if (interface === "list-o2m") {
//             localField = getPopulatedPath ? `${getPopulatedPath}._id` : "_id";
//             foreignField = foreignColumn;
//           } else if (interface === "list-m2o") {
//             localField = getPopulatedPath
//               ? `${getPopulatedPath}.${matchField.field}`
//               : matchField.field;
//             foreignField = foreignColumn;
//           } else if (interface === "list-m2m") {
//             localField = "_id";
//             foreignField = `${tableName}_id`;
//           } else if (matchField?.type === "ObjectId") {
//             localField = getPopulatedPath
//               ? `${getPopulatedPath}.${matchField.field}`
//               : matchField.field;
//             foreignField = foreignColumn;
//           }

//           lookups.push({
//             $lookup: {
//               from: foreignTable,
//               localField: localField,
//               foreignField: foreignField,
//               as: unwindKey,
//             },
//           });

//           lookups.push({
//             $unwind: {
//               path: `$${unwindKey}`,
//               preserveNullAndEmptyArrays: true,
//             },
//           });
//         }

//         lastUnwindKey = `${unwindKey}-${path}`;
//         isLookup = "$push";
//       }
//     });

//     if (fieldsData.isLookup > 0) {
//       const splitValue = lastUnwindKey.split("-");
//       const newValue = mainTable.value.replace(splitValue[1], splitValue[0]);
//       groupStage[0].$group[mainTable._id] = { [isLookup]: `$${newValue}` };
//     } else {
//       projectStage[0].$project[mainTable.value] = 1;
//     }
//   });

//   return [...lookups, ...groupStage, ...projectStage];
// }

// const aggregationPipeline = createDynamicLookup(dataFormat);
// console.log(JSON.stringify(aggregationPipeline, null, 2));

// function createDynamicLookup(dataFormat) {
//   const lookups = [];
//   const lookupKeys = new Map();
//   const lookupK = new Set();
//   let groupStage = [];
//   let projectStage = [];

//   if (fieldsData?.isLookup > 0) {
//     groupStage = [
//       {
//         $group: { _id: "$_id" },
//       },
//     ];
//   } else {
//     projectStage = [
//       {
//         $project: {},
//       },
//     ];
//   }

//   dataFormat.forEach((mainTable) => {
//     let lastUnwindKey = "";
//     let isLookup = "$first";

//     mainTable.fields.forEach(({ _id, path }) => {
//       const matchField = fieldsData.fields.find((fd) => _id == fd._id);
//       const interface = matchField?.meta?.interface;
//       let foreignTable =
//         interface === "list-m2m"
//           ? matchField?.meta?.junction_collection
//           : matchField?.schema_definition?.foreign_key_table;
//       const foreignColumn = matchField?.schema_definition?.foreign_key_column;

//       if (
//         ["list-o2m", "list-m2o", "list-m2m"].includes(interface) ||
//         matchField?.type === "ObjectId"
//       ) {
//         let localField = "";
//         let foreignField = "";
//         const unwindKey = foreignTable + _id;

//         if (!lookupK.has(foreignTable + "-" + foreignColumn + "-" + interface)) {
//           const splitPaths = path.split(".");
//           splitPaths.pop(".");
//           const keyPath = splitPaths.join(".");

//           lookupKeys.set(path, unwindKey);
//           lookupK.add(foreignTable + "-" + foreignColumn + "-" + interface);

//           const getPopulatedPath = lookupKeys.get(keyPath);
//           if (interface === "list-o2m") {
//             localField = getPopulatedPath ? `${getPopulatedPath}._id` : "_id";
//             foreignField = foreignColumn;
//           } else if (interface === "list-m2o") {
//             localField = getPopulatedPath
//               ? `${getPopulatedPath}.${matchField.field}`
//               : matchField.field;
//             foreignField = foreignColumn;
//           } else if (interface === "list-m2m") {
//             localField = "_id";
//             foreignField = `${tableName}_id`;
//           } else if (matchField?.type === "ObjectId") {
//             localField = getPopulatedPath
//               ? `${getPopulatedPath}.${matchField.field}`
//               : matchField.field;
//             foreignField = foreignColumn;
//           }

//           const lookup = {
//             $lookup: {
//               from: foreignTable,
//               localField: localField,
//               foreignField: foreignField,
//               as: unwindKey,
//             },
//           };
//           lookups.push(lookup);

//           const unwind = {
//             $unwind: {
//               path: `$${unwindKey}`,
//               preserveNullAndEmptyArrays: true,
//             },
//           };
//           lookups.push(unwind);
//         }
//         lastUnwindKey = `${unwindKey}-${path}`;
//         isLookup = "$push";
//       } else {
//       }
//     });

//     if (fieldsData.isLookup > 0) {
//       const splitValue = lastUnwindKey?.split("-");
//       const newValue = mainTable?.value?.replace(splitValue[1], splitValue[0]);
//       groupStage[0]["$group"][mainTable._id] = {
//         [isLookup]: `$${newValue}`,
//       };
//     } else {
//       projectStage[0]["$project"][mainTable?.value] = 1;
//     }
//   });

//   return [...lookups, ...groupStage, ...projectStage];
// }

// const getContent = async ({ params, db, user, query, body }) => {
//   const { collection } = params;
//   const { filter, limit, page, descending, sortBy } = query;
//   const collectionName =
//     databaseConfig.MONGODB[global.env.DOMAIN].DATABASE.TENANT.COLLECTION.NOX_SCHEMA;

//   const options = {
//     limit: limit && parseInt(limit, 10) > 0 ? parseInt(limit, 10) : 10,
//     page: page && parseInt(page, 10) > 0 ? parseInt(page, 10) : 1,
//     get skip() {
//       return (this.page - 1) * this.limit;
//     },
//     sortBy: sortBy && sortBy !== "" ? sortBy : "createdAt",
//     sortOrder: descending && descending === "true" ? -1 : 1,
//   };

//   const checkSchema = await db
//     .collection(collectionName)
//     .findOne({ _id: new ObjectId(collection), tenant: new ObjectId(user.tenant) });

//   if (!checkSchema) {
//     throw new ApiError(httpStatus.BAD_REQUEST, "Collection not found");
//   }

//   const fieldName = databaseConfig.MONGODB[global.env.DOMAIN].DATABASE.TENANT.COLLECTION.NOX_FIELDS;
//   const presetFieldName =
//     databaseConfig.MONGODB[global.env.DOMAIN].DATABASE.TENANT.COLLECTION.NOX_PRESETS;

//   const fieldsData = await db
//     .collection(fieldName)
//     .find({ schema_id: new ObjectId(checkSchema?._id) })
//     ?.toArray();

//   const presetDoc = await db
//     .collection(presetFieldName)
//     .findOne(
//       { collection_id: new ObjectId(checkSchema?._id) },
//       { projection: { "layout_query.tabular.fields": 1, _id: 0 } }
//     );

//   const selectedColumns = presetDoc ? presetDoc?.layout_query?.tabular?.fields : [];

//   const filterRelationalValues = ["list-o2m", "list-m2m", "list-m2o"];
//   const relationalFields = filterRelationalFields(fieldsData, filterRelationalValues);

//   const lookups = [];

//   relationalFields.map((rf) => {
//     const interface = rf.meta.interface;
//     if (interface === "list-o2m") {
//       let projectionKeys = {};
//       selectedColumns?.forEach((c) => {
//         if (c?.value?.includes(rf.path + ".")) {
//           projectionKeys[c?.value?.split(".")[1]] = 1;
//         }
//       });
//       lookups.push(
//         ...generateLookup({
//           collection: rf.ref,
//           localField: "_id",
//           foreignField: rf.schema_definition.foreign_key_column,
//           pipeline: [
//             {
//               $project: {
//                 _id: 1,
//                 ...projectionKeys,
//               },
//             },
//           ],
//           as: rf.path,
//         })
//       );
//     } else if (interface === "list-m2m") {
//       function buildProjectionKeys(projectionKeys, pathParts) {
//         if (pathParts.length === 1) {
//           projectionKeys[pathParts[0]] = 1;
//         } else {
//           const key = pathParts.shift();
//           if (!projectionKeys[key]) {
//             projectionKeys[key] = {};
//           }
//           buildProjectionKeys(projectionKeys[key], pathParts);
//         }
//       }

//       const projectionKeys = {};
//       body.columns.forEach((c) => {
//         if (c.includes(rf.path + ".")) {
//           const pathParts = c.split("."); // Remove the rf.path part
//           buildProjectionKeys(projectionKeys, pathParts);
//         }
//       });

//       lookups.push(
//         ...generateLookup({
//           collection: rf.meta.junction_collection,
//           localField: "_id",
//           foreignField: `${checkSchema.collection_id}_id`,
//           pipeline: [
//             ...generateLookup({
//               collection: rf.schema_definition.foreign_key_table,
//               localField: `${rf.meta.junction_field}`,
//               foreignField: "_id",
//               as: rf.meta.junction_field,
//               pipeline: [
//                 {
//                   $project: {
//                     _id: 1,
//                     ...(projectionKeys?.[rf.path]?.[rf.meta.junction_field] || {}),
//                   },
//                 },
//               ],
//             }),
//             {
//               $unwind: {
//                 path: `$${rf.meta.junction_field}`,
//                 preserveNullAndEmptyArrays: true,
//               },
//             },
//             {
//               $project: {
//                 _id: 1,
//                 [rf.meta.junction_field]: 1,
//               },
//             },
//           ],
//           as: rf.path,
//         })
//       );
//     } else if (interface === "list-m2o") {
//       let projectionKeys = {};
//       selectedColumns?.forEach((c) => {
//         if (c?.value?.includes(rf.path + ".")) {
//           projectionKeys[c?.value?.split(".")[1]] = 1;
//         }
//       });
//       lookups.push(
//         ...generateLookup({
//           collection: rf.ref,
//           localField: rf.path,
//           foreignField: rf.schema_definition.foreign_key_column,
//           pipeline: [
//             {
//               $project: {
//                 _id: 1,
//                 ...projectionKeys,
//               },
//             },
//           ],
//           as: rf.path,
//         }),
//         {
//           $unwind: {
//             path: `$${rf.path}`,
//             preserveNullAndEmptyArrays: true,
//           },
//         }
//       );
//     }
//   });

//   const matchStage = {};

//   if (filter) {
//     const orConditions = selectedColumns?.map((c) => ({
//       [c]: { $regex: utils.escapeRegexCharacters(filter), $options: "i" },
//     }));
//     matchStage.$or = orConditions;
//   }

//   try {
//     const list = await db
//       .collection(checkSchema.collection_id)
//       .aggregate([
//         {
//           $match: matchStage,
//         },
//         {
//           $facet: {
//             meta: [{ $count: "total_found" }],
//             data: [
//               {
//                 $sort: {
//                   [options.sortBy]: options.sortOrder,
//                 },
//               },
//               {
//                 $skip: options.skip,
//               },
//               {
//                 $limit: options.limit,
//               },
//               ...lookups,
//             ],
//           },
//         },
//       ])
//       ?.toArray();

//     return {
//       data: list[0]?.data,
//       meta: {
//         total_found: list?.[0]?.meta?.[0]?.total_found || 0,
//         total_in_response: list[0]?.data?.length,
//         current_page: options.page,
//         total_pages: Math.ceil((list?.[0]?.meta?.[0]?.total_found || 0) / options.limit),
//       },
//     };
//   } catch (error) {
//     throw new ApiError(httpStatus.BAD_REQUEST, "an_unexpected_error_occurred");
//   }
// };
// [
//   {
//     $match: {},
//   },
//   {
//     $facet: {
//       fields: [],
//       isLookup: [
//         {
//           $match: {
//             $or: [
//               { "meta.interface": "list-m2o" },
//               { "meta.interface": "list-o2m" },
//               { "meta.interface": "list-m2m" },
//               {
//                 $and: [
//                   { type: "ObjectId" },
//                   { ref: { $exists: true } },
//                   { field: { $ne: "_id" } },
//                   {
//                     "meta.interface": {
//                       $nin: ["list-m2o", "list-o2m", "list-m2m", "none"],
//                     },
//                   },
//                 ],
//               },
//             ],
//           },
//         },
//       ],
//     },
//   },
//   {
//     $project: {
//       fields: 1,
//       isLookup: { $size: "$isLookup" },
//     },
//   },
// ];
