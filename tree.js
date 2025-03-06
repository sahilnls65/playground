const data = [
  {
    _id: "6799df38cf89a8e39c145916",
    schema_id: "6799ded1cf89a8e39c14587e",
    field: "m2o",
    field_type: "Object",
    type: "ObjectId",
    path: "group.m2o",
    meta: {
      field: "m2o",
      interface: "list-m2o",
      hidden: true,
      sort: 6,
      width: "full",
      required: false,
      nullable: true,
      is_deletable: true,
      translations: [],
    },
    schema_definition: {
      name: "m2o",
      type: "ObjectId",
      default: null,
      foreign_key_column: "_id",
      foreign_key_table: "second_collection",
    },
    created_at: "2025-01-29T07:56:40.783Z",
    updated_at: "2025-01-29T07:58:43.501Z",
    __v: 0,
  },
  {
    _id: "6799df2ccf89a8e39c145901",
    schema_id: "6799ded1cf89a8e39c14587e",
    field: "o2m",
    field_type: "Object",
    type: "Alias",
    path: "group.o2m",
    meta: {
      field: "o2m",
      interface: "list-o2m",
      hidden: false,
      sort: 5,
      width: "full",
      required: false,
      nullable: true,
      is_deletable: true,
      translations: [],
    },
    schema_definition: {
      name: "o2m",
      type: "Alias",
      default: null,
    },
    created_at: "2025-01-29T07:56:28.717Z",
    updated_at: "2025-01-29T07:56:44.437Z",
    __v: 0,
  },
  {
    _id: "6799df1acf89a8e39c1458d2",
    schema_id: "6799ded1cf89a8e39c14587e",
    field: "m2m",
    field_type: "Object",
    type: "Alias",
    path: "group.m2m",
    meta: {
      field: "m2m",
      interface: "list-m2m",
      hidden: false,
      sort: 4,
      width: "full",
      required: false,
      nullable: true,
      is_deletable: true,
      translations: [],
    },
    schema_definition: {
      name: "m2m",
      type: "Alias",
      default: null,
    },
    created_at: "2025-01-29T07:56:14.179Z",
    updated_at: "2025-01-29T07:56:44.437Z",
    __v: 0,
  },
  {
    _id: "6799df0fcf89a8e39c1458c9",
    schema_id: "6799ded1cf89a8e39c14587e",
    field: "name",
    field_type: "Object",
    type: "String",
    path: "group.name",
    meta: {
      field: "name",
      interface: "input",
      hidden: false,
      sort: 3,
      width: "full",
      required: false,
      nullable: true,
      is_deletable: true,
      translations: [],
    },
    schema_definition: {
      name: "name",
      type: "String",
      default: null,
    },
    created_at: "2025-01-29T07:55:59.342Z",
    updated_at: "2025-01-29T07:56:44.437Z",
    __v: 0,
  },
  {
    _id: "6799df06cf89a8e39c1458c0",
    schema_id: "6799ded1cf89a8e39c14587e",
    field: "group",
    field_type: "Object",
    type: "Object",
    path: "group",
    meta: {
      field: "group",
      interface: "object",
      hidden: false,
      sort: 2,
      width: "full",
      required: false,
      nullable: true,
      is_deletable: true,
      translations: [],
    },
    schema_definition: {
      name: "group",
      type: "Object",
      default: null,
    },
    created_at: "2025-01-29T07:55:50.795Z",
    updated_at: "2025-01-29T07:56:44.437Z",
    __v: 0,
  },
  {
    _id: "6799ded1cf89a8e39c145880",
    schema_id: "6799ded1cf89a8e39c14587e",
    field: "_id",
    field_type: "Single",
    type: "ObjectId",
    path: "_id",
    meta: {
      is_deletable: false,
      field: "_id",
      interface: "none",
      hidden: true,
      sort: 1,
      translations: [],
    },
    schema_definition: {
      name: "_id",
      type: "ObjectId",
      is_primary: true,
      default: null,
    },
    created_at: "2025-01-29T07:54:57.305Z",
    updated_at: "2025-01-29T07:56:44.437Z",
    __v: 0,
  },
  {
    _id: "6799df5dcf89a8e39c145961",
    schema_id: "6799dee1cf89a8e39c14589a",
    field: "name",
    field_type: "Single",
    type: "String",
    path: "group.m2o.name",
    meta: {
      field: "name",
      interface: "input",
      hidden: false,
      sort: 3,
      width: "full",
      required: false,
      nullable: true,
      is_deletable: true,
      translations: [],
    },
    schema_definition: {
      name: "name",
      type: "String",
      default: null,
    },
    created_at: "2025-01-29T07:57:17.434Z",
    updated_at: "2025-01-29T07:57:17.434Z",
    __v: 0,
    level: 3,
  },
  {
    _id: "6799def7cf89a8e39c1458b6",
    schema_id: "6799dee1cf89a8e39c14589a",
    field: "fc",
    field_type: "Single",
    type: "ObjectId",
    path: "group.m2o.fc",
    meta: {
      field: "fc",
      interface: "input",
      hidden: false,
      sort: 2,
      width: "full",
      required: false,
      nullable: true,
      is_deletable: true,
      translations: [],
    },
    schema_definition: {
      name: "fc",
      type: "ObjectId",
      default: null,
    },
    created_at: "2025-01-29T07:55:35.742Z",
    updated_at: "2025-01-29T07:55:35.742Z",
    __v: 0,
    level: 3,
  },
  {
    _id: "6799df5dcf89a8e39c145961",
    schema_id: "6799dee1cf89a8e39c14589a",
    field: "name",
    field_type: "Single",
    type: "String",
    path: "group.o2m.name",
    meta: {
      field: "name",
      interface: "input",
      hidden: false,
      sort: 3,
      width: "full",
      required: false,
      nullable: true,
      is_deletable: true,
      translations: [],
    },
    schema_definition: {
      name: "name",
      type: "String",
      default: null,
    },
    created_at: "2025-01-29T07:57:17.434Z",
    updated_at: "2025-01-29T07:57:17.434Z",
    __v: 0,
    level: 3,
  },
  {
    _id: "6799def7cf89a8e39c1458b6",
    schema_id: "6799dee1cf89a8e39c14589a",
    field: "fc",
    field_type: "Single",
    type: "ObjectId",
    path: "group.o2m.fc",
    meta: {
      field: "fc",
      interface: "input",
      hidden: false,
      sort: 2,
      width: "full",
      required: false,
      nullable: true,
      is_deletable: true,
      translations: [],
    },
    schema_definition: {
      name: "fc",
      type: "ObjectId",
      default: null,
    },
    created_at: "2025-01-29T07:55:35.742Z",
    updated_at: "2025-01-29T07:55:35.742Z",
    __v: 0,
    level: 3,
  },
  {
    _id: "6799df1acf89a8e39c1458d5",
    schema_id: "6799df1bcf89a8e39c1458da",
    field: "second_collection_id",
    field_type: "Single",
    type: "ObjectId",
    path: "group.m2m.second_collection_id",
    meta: {
      is_deletable: false,
      field: "second_collection_id",
      interface: "list-m2o",
      hidden: false,
      translations: [],
    },
    schema_definition: {
      name: "second_collection_id",
      type: "ObjectId",
      default: null,
      foreign_key_column: "_id",
      foreign_key_table: "second_collection",
      foreign_key_table_id: "6799dee1cf89a8e39c14589a",
    },
    created_at: "2025-01-29T07:56:11.976Z",
    updated_at: "2025-01-29T07:56:11.976Z",
    __v: 0,
    level: 3,
  },
  {
    _id: "6799df1acf89a8e39c1458d4",
    schema_id: "6799df1bcf89a8e39c1458da",
    field: "first_collection_id",
    field_type: "Single",
    type: "ObjectId",
    path: "group.m2m.first_collection_id",
    meta: {
      is_deletable: false,
      field: "first_collection_id",
      interface: "list-m2o",
      hidden: false,
      translations: [],
    },
    schema_definition: {
      name: "first_collection_id",
      type: "ObjectId",
      default: null,
      foreign_key_column: "_id",
      foreign_key_table: "first_collection",
      foreign_key_table_id: "6799ded1cf89a8e39c14587e",
    },
    created_at: "2025-01-29T07:56:11.822Z",
    updated_at: "2025-01-29T07:56:11.822Z",
    __v: 0,
    level: 3,
  },
  {
    _id: "6799df5dcf89a8e39c145961",
    schema_id: "6799dee1cf89a8e39c14589a",
    field: "name",
    field_type: "Single",
    type: "String",
    path: "group.m2m.second_collection_id.name",
    meta: {
      field: "name",
      interface: "input",
      hidden: false,
      sort: 3,
      width: "full",
      required: false,
      nullable: true,
      is_deletable: true,
      translations: [],
    },
    schema_definition: {
      name: "name",
      type: "String",
      default: null,
    },
    created_at: "2025-01-29T07:57:17.434Z",
    updated_at: "2025-01-29T07:57:17.434Z",
    __v: 0,
    level: 2,
  },
  {
    _id: "6799def7cf89a8e39c1458b6",
    schema_id: "6799dee1cf89a8e39c14589a",
    field: "fc",
    field_type: "Single",
    type: "ObjectId",
    path: "group.m2m.second_collection_id.fc",
    meta: {
      field: "fc",
      interface: "input",
      hidden: false,
      sort: 2,
      width: "full",
      required: false,
      nullable: true,
      is_deletable: true,
      translations: [],
    },
    schema_definition: {
      name: "fc",
      type: "ObjectId",
      default: null,
    },
    created_at: "2025-01-29T07:55:35.742Z",
    updated_at: "2025-01-29T07:55:35.742Z",
    __v: 0,
    level: 2,
  },
  {
    _id: "6799df38cf89a8e39c145916",
    schema_id: "6799ded1cf89a8e39c14587e",
    field: "m2o",
    field_type: "Object",
    type: "ObjectId",
    path: "group.m2m.first_collection_id.group.m2o",
    meta: {
      field: "m2o",
      interface: "list-m2o",
      hidden: true,
      sort: 6,
      width: "full",
      required: false,
      nullable: true,
      is_deletable: true,
      translations: [],
    },
    schema_definition: {
      name: "m2o",
      type: "ObjectId",
      default: null,
      foreign_key_column: "_id",
      foreign_key_table: "second_collection",
    },
    created_at: "2025-01-29T07:56:40.783Z",
    updated_at: "2025-01-29T07:58:43.501Z",
    __v: 0,
    level: 2,
  },
  {
    _id: "6799df2ccf89a8e39c145901",
    schema_id: "6799ded1cf89a8e39c14587e",
    field: "o2m",
    field_type: "Object",
    type: "Alias",
    path: "group.m2m.first_collection_id.group.o2m",
    meta: {
      field: "o2m",
      interface: "list-o2m",
      hidden: false,
      sort: 5,
      width: "full",
      required: false,
      nullable: true,
      is_deletable: true,
      translations: [],
    },
    schema_definition: {
      name: "o2m",
      type: "Alias",
      default: null,
    },
    created_at: "2025-01-29T07:56:28.717Z",
    updated_at: "2025-01-29T07:56:44.437Z",
    __v: 0,
    level: 2,
  },
  {
    _id: "6799df1acf89a8e39c1458d2",
    schema_id: "6799ded1cf89a8e39c14587e",
    field: "m2m",
    field_type: "Object",
    type: "Alias",
    path: "group.m2m.first_collection_id.group.m2m",
    meta: {
      field: "m2m",
      interface: "list-m2m",
      hidden: false,
      sort: 4,
      width: "full",
      required: false,
      nullable: true,
      is_deletable: true,
      translations: [],
    },
    schema_definition: {
      name: "m2m",
      type: "Alias",
      default: null,
    },
    created_at: "2025-01-29T07:56:14.179Z",
    updated_at: "2025-01-29T07:56:44.437Z",
    __v: 0,
    level: 2,
  },
  {
    _id: "6799df0fcf89a8e39c1458c9",
    schema_id: "6799ded1cf89a8e39c14587e",
    field: "name",
    field_type: "Object",
    type: "String",
    path: "group.m2m.first_collection_id.group.name",
    meta: {
      field: "name",
      interface: "input",
      hidden: false,
      sort: 3,
      width: "full",
      required: false,
      nullable: true,
      is_deletable: true,
      translations: [],
    },
    schema_definition: {
      name: "name",
      type: "String",
      default: null,
    },
    created_at: "2025-01-29T07:55:59.342Z",
    updated_at: "2025-01-29T07:56:44.437Z",
    __v: 0,
    level: 2,
  },
  {
    _id: "6799df06cf89a8e39c1458c0",
    schema_id: "6799ded1cf89a8e39c14587e",
    field: "group",
    field_type: "Object",
    type: "Object",
    path: "group.m2m.first_collection_id.group",
    meta: {
      field: "group",
      interface: "object",
      hidden: false,
      sort: 2,
      width: "full",
      required: false,
      nullable: true,
      is_deletable: true,
      translations: [],
    },
    schema_definition: {
      name: "group",
      type: "Object",
      default: null,
    },
    created_at: "2025-01-29T07:55:50.795Z",
    updated_at: "2025-01-29T07:56:44.437Z",
    __v: 0,
    level: 2,
  },
  {
    _id: "6799df5dcf89a8e39c145961",
    schema_id: "6799dee1cf89a8e39c14589a",
    field: "name",
    field_type: "Single",
    type: "String",
    path: "group.m2m.first_collection_id.group.m2o.name",
    meta: {
      field: "name",
      interface: "input",
      hidden: false,
      sort: 3,
      width: "full",
      required: false,
      nullable: true,
      is_deletable: true,
      translations: [],
    },
    schema_definition: {
      name: "name",
      type: "String",
      default: null,
    },
    created_at: "2025-01-29T07:57:17.434Z",
    updated_at: "2025-01-29T07:57:17.434Z",
    __v: 0,
    level: 1,
  },
  {
    _id: "6799def7cf89a8e39c1458b6",
    schema_id: "6799dee1cf89a8e39c14589a",
    field: "fc",
    field_type: "Single",
    type: "ObjectId",
    path: "group.m2m.first_collection_id.group.m2o.fc",
    meta: {
      field: "fc",
      interface: "input",
      hidden: false,
      sort: 2,
      width: "full",
      required: false,
      nullable: true,
      is_deletable: true,
      translations: [],
    },
    schema_definition: {
      name: "fc",
      type: "ObjectId",
      default: null,
    },
    created_at: "2025-01-29T07:55:35.742Z",
    updated_at: "2025-01-29T07:55:35.742Z",
    __v: 0,
    level: 1,
  },
  {
    _id: "6799df5dcf89a8e39c145961",
    schema_id: "6799dee1cf89a8e39c14589a",
    field: "name",
    field_type: "Single",
    type: "String",
    path: "group.m2m.first_collection_id.group.o2m.name",
    meta: {
      field: "name",
      interface: "input",
      hidden: false,
      sort: 3,
      width: "full",
      required: false,
      nullable: true,
      is_deletable: true,
      translations: [],
    },
    schema_definition: {
      name: "name",
      type: "String",
      default: null,
    },
    created_at: "2025-01-29T07:57:17.434Z",
    updated_at: "2025-01-29T07:57:17.434Z",
    __v: 0,
    level: 1,
  },
  {
    _id: "6799def7cf89a8e39c1458b6",
    schema_id: "6799dee1cf89a8e39c14589a",
    field: "fc",
    field_type: "Single",
    type: "ObjectId",
    path: "group.m2m.first_collection_id.group.o2m.fc",
    meta: {
      field: "fc",
      interface: "input",
      hidden: false,
      sort: 2,
      width: "full",
      required: false,
      nullable: true,
      is_deletable: true,
      translations: [],
    },
    schema_definition: {
      name: "fc",
      type: "ObjectId",
      default: null,
    },
    created_at: "2025-01-29T07:55:35.742Z",
    updated_at: "2025-01-29T07:55:35.742Z",
    __v: 0,
    level: 1,
  },
  {
    _id: "6799df1acf89a8e39c1458d5",
    schema_id: "6799df1bcf89a8e39c1458da",
    field: "second_collection_id",
    field_type: "Single",
    type: "ObjectId",
    path: "group.m2m.first_collection_id.group.m2m.second_collection_id",
    meta: {
      is_deletable: false,
      field: "second_collection_id",
      interface: "list-m2o",
      hidden: false,
      translations: [],
    },
    schema_definition: {
      name: "second_collection_id",
      type: "ObjectId",
      default: null,
      foreign_key_column: "_id",
      foreign_key_table: "second_collection",
      foreign_key_table_id: "6799dee1cf89a8e39c14589a",
    },
    created_at: "2025-01-29T07:56:11.976Z",
    updated_at: "2025-01-29T07:56:11.976Z",
    __v: 0,
    level: 1,
  },
  {
    _id: "6799df1acf89a8e39c1458d4",
    schema_id: "6799df1bcf89a8e39c1458da",
    field: "first_collection_id",
    field_type: "Single",
    type: "ObjectId",
    path: "group.m2m.first_collection_id.group.m2m.first_collection_id",
    meta: {
      is_deletable: false,
      field: "first_collection_id",
      interface: "list-m2o",
      hidden: false,
      translations: [],
    },
    schema_definition: {
      name: "first_collection_id",
      type: "ObjectId",
      default: null,
      foreign_key_column: "_id",
      foreign_key_table: "first_collection",
      foreign_key_table_id: "6799ded1cf89a8e39c14587e",
    },
    created_at: "2025-01-29T07:56:11.822Z",
    updated_at: "2025-01-29T07:56:11.822Z",
    __v: 0,
    level: 1,
  },
];

const generateTreeData = (data, type) => {
  const tree = [];
  const nodeMap = {};

  data.forEach((item) => {
    const pathParts = item.path.split(".");
    let currentNode = tree;

    pathParts.forEach((part, index) => {
      const fullPath = pathParts.slice(0, index + 1).join(".");
      if (!nodeMap[fullPath]) {
        let newNode = {};

        switch (type) {
          case "tree-select":
            newNode = {
              label: part,
              value: fullPath,
              field_type: item?.field_type,
              type: item?.type,
              children: [],
            };
            break;
          case "tree-fields":
            newNode = {
              ...item,
              title: part,
              value: fullPath,
              children: [],
              key: fullPath,
            };
            break;
          case "tree-columns":
            newNode = {
              label: part,
              display_label: part,
              key: fullPath,
              field_name: fullPath,
              children: [],
              field_details: [{ path: fullPath, field_id: item?._id }],
              _id: item?._id,
            };
            break;

          default:
            newNode = {
              ...item,
              title: part,
              value: fullPath,
              children: [],
            };
            break;
        }

        nodeMap[fullPath] = newNode;
        currentNode.push(newNode);
      }
      currentNode = nodeMap[fullPath].children;
    });
  });

  const removeEmptyChildren = (nodes) => {
    return nodes.map(({ children, ...node }) =>
      children.length ? { ...node, children: removeEmptyChildren(children) } : node
    );
  };

  return removeEmptyChildren(tree);
};

const convertToTreeData = (fields, type) => {
  const root = [];
  const fieldMap = new Map();
  // const currentLng = store.getState().user?.userProfile?.language;

  fields?.forEach((field) => {
    const pathParts = field?.path?.split(".") || [field?.path];
    let parentPathKey = "";

    pathParts.forEach((part, ind) => {
      const pathKey = pathParts.slice(0, ind + 1).join(".");
      let existingNode = fieldMap.get(pathKey);

      if (!existingNode) {
        delete field?.ref;

        switch (type) {
          case "tree-select":
            existingNode = {
              label: part,
              value: pathKey, // Ensure uniqueness
              field_type: field?.field_type,
              type: field?.type,
              children: [],
            };
            break;
          case "tree-fields":
            existingNode = {
              ...field,
              title: part,
              value: pathKey, // Ensure uniqueness
              children: [],
              key: pathKey, // Ensure uniqueness
            };
            break;
          case "tree-columns":
            existingNode = {
              label:
                // field?.meta?.translations?.find((t) => t?.language === currentLng)?.translation ||
                part,
              display_label:
                // field?.meta?.translations?.find((t) => t?.language === currentLng)?.translation ||
                part,
              key: pathKey, // Ensure uniqueness
              field_name: pathKey, // Ensure uniqueness
              children: [],
              field_details: [{ path: pathKey, field_id: field?._id }],
              _id: field?._id,
            };
            break;
          default:
            existingNode = {
              ...field,
              title: part,
              value: pathKey, // Ensure uniqueness
              children: [],
            };
            break;
        }

        if (ind === 0) {
          root.push(existingNode);
        } else {
          const parentField = fieldMap.get(parentPathKey);
          if (parentField) {
            if (type === "tree-columns" && !parentField.children) {
              parentField.children = [];
            }
            type === "tree-columns" &&
              (existingNode?.field_details || []).unshift(...(parentField?.field_details || []));
            parentField.children.push(existingNode);
          }
        }
        fieldMap.set(pathKey, existingNode);
      }

      if (
        type === "tree-columns" &&
        (!existingNode.children || existingNode.children.length === 0)
      ) {
        delete existingNode.children;
      }
      parentPathKey = pathKey;
    });
  });

  return root;
};

// console.log("convertToTreeData", convertToTreeData(data, "tree-columns"));
// console.log("generateTreeData", generateTreeData(data, "tree-columns"));
// console.log("data", data);
function buildTree(data, type) {
  const root = [];

  data.forEach((item) => {
    const pathSegments = item.path.split(".");
    let currentLevel = root;

    pathSegments.forEach((segment, index) => {
      let existingNode = currentLevel.find((node) => node.field === segment);

      if (!existingNode) {
        let newNode = {};

        switch (type) {
          case "tree-select":
            newNode = {
              field: segment,
              label: segment,
              value: pathSegments.slice(0, index + 1).join("."),
              field_type: item?.field_type,
              type: item?.type,
              children: [],
            };
            break;

          case "tree-fields":
            newNode = {
              field: segment,
              ...item,
              title: segment,
              value: pathSegments.slice(0, index + 1).join("."),
              children: [],
              key: pathSegments.slice(0, index + 1).join("."),
            };
            break;

          case "tree-columns":
            newNode = {
              field: segment,
              label: segment,
              display_label: segment,
              key: pathSegments.slice(0, index + 1).join("."),
              field_name: pathSegments.slice(0, index + 1).join("."),
              children: [],
              field_details: [],
              _id: item?._id,
            };
            break;

          default:
            newNode = {
              field: segment,
              ...item,
              title: segment,
              value: pathSegments.slice(0, index + 1).join("."),
              children: [],
            };
            break;
        }

        existingNode = newNode;
        currentLevel.push(existingNode);
      }

      if (index === pathSegments.length - 1) {
        Object.assign(existingNode, item, {
          field_details: [
            {
              path: pathSegments.slice(0, index + 1).join("."),
              field_id: item?._id,
            },
          ],
        });
      }

      currentLevel = existingNode.children;
    });
  });

  const removeEmptyChildren = (nodes) => {
    return nodes.map(({ children, ...node }) => {
      return children.length ? { ...node, children: removeEmptyChildren(children) } : node;
    });
  };

  return removeEmptyChildren(root);
}

// const treeData = buildTree(data, "tree-columns");

// console.log(treeData);

function buildNestedStructure(data, type) {
  const root = {};
  const nodeMap = new Map();

  data.sort((a, b) => a?.path?.split(".")?.length - b?.path?.split(".")?.length);

  data.forEach((item) => {
    const pathParts = item.path.split(".");
    const key = pathParts.join(".");

    let node = {
      label: pathParts[pathParts.length - 1],
      display_label: pathParts[pathParts.length - 1],
      key: key,
    };

    switch (type) {
      case "tree-select":
        node = {
          label: pathParts[pathParts.length - 1],
          value: key,
          field_type: item?.field_type,
          type: item?.type,
          children: [],
          _id: item._id,
          field_details: [{ path: item.path, field_id: item._id }],
        };
        break;
      case "tree-fields":
        node = {
          ...item,
          title: pathParts[pathParts.length - 1],
          value: key,
          children: [],
          key: key,
          field_details: [{ path: item.path, field_id: item._id }],
        };
        break;
      case "tree-columns":
        node = {
          label: pathParts[pathParts.length - 1],
          display_label: pathParts[pathParts.length - 1],
          key: key,
          field_name: key,
          children: [],
          field_details: [{ path: item.path, field_id: item._id }],
          _id: item?._id,
        };
        break;

      default:
        node = {
          ...item,
          title: pathParts[pathParts.length - 1],
          value: key,
          children: [],
          field_details: [{ path: item.path, field_id: item._id }],
        };
        break;
    }

    nodeMap.set(key, node);

    if (pathParts.length === 1) {
      root[key] = node;
    } else {
      const parentPath = pathParts.slice(0, -1).join(".");
      if (nodeMap.has(parentPath)) {
        node.field_details.unshift(...nodeMap.get(parentPath).field_details);
        nodeMap.get(parentPath).children.push(node);
      }
    }
  });

  const removeEmptyChildren = (nodes) => {
    return nodes.map(({ children, ...node }) =>
      children.length ? { ...node, children: removeEmptyChildren(children) } : node
    );
  };

  return removeEmptyChildren(Object.values(root));
}

// Example usage
const nestedData = buildNestedStructure(data);
console.log(nestedData);
