const data = [
  {
    id: 1,
    many_collection: "users_products",
    many_field: "products_id",
    one_collection: "products",
    one_field: null,
    one_collection_field: "collection",
    one_allowed_collections: "",
    junction_field: "users_id",
    sort_field: null,
    one_deselect_action: "nullify",
  },
  {
    id: 2,
    many_collection: "users_products",
    many_field: "users_id",
    one_collection: "users",
    one_field: "m2m",
    one_collection_field: null,
    one_allowed_collections: null,
    junction_field: "products_id",
    sort_field: null,
    one_deselect_action: "nullify",
  },
  {
    id: 3,
    many_collection: "products",
    many_field: "user",
    one_collection: "users",
    one_field: "o2m",
    one_collection_field: null,
    one_allowed_collections: null,
    junction_field: null,
    sort_field: null,
    one_deselect_action: "nullify",
  },
  {
    id: 4,
    many_collection: "users",
    many_field: "m2o",
    one_collection: "products",
    one_field: null,
    one_collection_field: null,
    one_allowed_collections: null,
    junction_field: null,
    sort_field: null,
    one_deselect_action: "nullify",
  },
  {
    id: 5,
    many_collection: "users",
    many_field: "single_file",
    one_collection: "directus_files",
    one_field: null,
    one_collection_field: null,
    one_allowed_collections: null,
    junction_field: null,
    sort_field: null,
    one_deselect_action: "nullify",
  },
  {
    id: 6,
    many_collection: "users",
    many_field: "image",
    one_collection: "directus_files",
    one_field: null,
    one_collection_field: null,
    one_allowed_collections: null,
    junction_field: null,
    sort_field: null,
    one_deselect_action: "nullify",
  },
  {
    id: 7,
    many_collection: "users_files",
    many_field: "directus_files_id",
    one_collection: "directus_files",
    one_field: null,
    one_collection_field: null,
    one_allowed_collections: null,
    junction_field: "users_id",
    sort_field: null,
    one_deselect_action: "nullify",
  },
  {
    id: 8,
    many_collection: "users_files",
    many_field: "users_id",
    one_collection: "users",
    one_field: "multi_files",
    one_collection_field: null,
    one_allowed_collections: null,
    junction_field: "directus_files_id",
    sort_field: null,
    one_deselect_action: "nullify",
  },
  {
    id: 9,
    many_collection: "users_translations",
    many_field: "languages_id",
    one_collection: "languages",
    one_field: null,
    one_collection_field: null,
    one_allowed_collections: null,
    junction_field: "users_id",
    sort_field: null,
    one_deselect_action: "nullify",
  },
  {
    id: 10,
    many_collection: "users_translations",
    many_field: "users_id",
    one_collection: "users",
    one_field: "translations",
    one_collection_field: null,
    one_allowed_collections: null,
    junction_field: "languages_id",
    sort_field: null,
    one_deselect_action: "nullify",
  },
  {
    id: 11,
    many_collection: "users_m2a",
    many_field: "item",
    one_collection: null,
    one_field: null,
    one_collection_field: "collection",
    one_allowed_collections: "products,languages",
    junction_field: "users_id",
    sort_field: null,
    one_deselect_action: "nullify",
  },
  {
    id: 12,
    many_collection: "users_m2a",
    many_field: "users_id",
    one_collection: "users",
    one_field: "m2a",
    one_collection_field: null,
    one_allowed_collections: null,
    junction_field: "item",
    sort_field: null,
    one_deselect_action: "nullify",
  },
  {
    id: 13,
    many_collection: "users_files_1",
    many_field: "directus_files_id",
    one_collection: "directus_files",
    one_field: null,
    one_collection_field: null,
    one_allowed_collections: null,
    junction_field: "users_id",
    sort_field: null,
    one_deselect_action: "nullify",
  },
  {
    id: 14,
    many_collection: "users_files_1",
    many_field: "users_id",
    one_collection: "users",
    one_field: "files2",
    one_collection_field: null,
    one_allowed_collections: null,
    junction_field: "directus_files_id",
    sort_field: null,
    one_deselect_action: "nullify",
  },
  {
    id: 15,
    many_collection: "users_m2a_1",
    many_field: "item",
    one_collection: null,
    one_field: null,
    one_collection_field: "collection",
    one_allowed_collections: "products,users,languages",
    junction_field: "users_id",
    sort_field: null,
    one_deselect_action: "nullify",
  },
  {
    id: 16,
    many_collection: "users_m2a_1",
    many_field: "users_id",
    one_collection: "users",
    one_field: "m2a_1",
    one_collection_field: null,
    one_allowed_collections: null,
    junction_field: "item",
    sort_field: null,
    one_deselect_action: "nullify",
  },
];

const getRelations = ({ collection, field, interface }) => {
  let returnData = {};
  if (
    interface === "list-o2m" ||
    interface === "list-m2m" ||
    interface === "files" ||
    interface === "list-m2a"
  ) {
    returnData = {
      main_table: data.find((d) => d.one_collection === collection && d.one_field === field),
    };
  } else if (interface === "list-m2o" || interface === "file" || interface === "file-image") {
    returnData = {
      main_table: data.find((d) => d.many_collection === collection && d.many_field === field),
    };
  }
  if (returnData?.main_table?.junction_field) {
    returnData = {
      ...returnData,
      relational: data.find(
        (d) =>
          d.many_collection === returnData?.main_table?.many_collection &&
          d.junction_field === returnData?.main_table?.many_field
      ),
    };
  }
  return returnData;
};

const getRelationsComparisonQuery = ({ collection, field, interface }) => {
  if (
    interface === "list-o2m" ||
    interface === "list-m2m" ||
    interface === "files" ||
    interface === "list-m2a"
  ) {
    return { one_collection: collection, one_field: field };
  } else if (interface === "list-m2o" || interface === "file" || interface === "file-image") {
    return { many_collection: collection, many_field: field };
  }
};

// console.log(getRelations({ collection: "users", field: "m2m", interface: "list-m2m" }));
