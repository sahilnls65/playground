// const fields = [
//   {
//     _id: "67e297702ba3876b0c992396",
//     schema_id: "67e297702ba3876b0c99238f",
//     field: "_id",
//     field_type: "Single",
//     type: "ObjectId",
//     path: "_id",
//     ref: "",
//     meta: {
//       is_deletable: false,
//       field: "_id",
//       interface: "none",
//       is_internal: false,
//       is_editable: true,
//       translations: [],
//     },
//     schema_definition: { name: "_id", type: "ObjectId", is_primary: true, default: null },
//     nox_created_at: "2025-03-25T11:45:52.149Z",
//     nox_updated_at: "2025-03-25T11:45:52.149Z",
//     nox_created_by: "67937390feddb0450d9a1af1",
//     nox_updated_by: "67937390feddb0450d9a1af1",
//     __v: 0,
//     parent_id: null,
//   },
//   {
//     _id: "67e297942ba3876b0c9923ce",
//     schema_id: "67e297702ba3876b0c99238f",
//     field: "question_type",
//     field_type: "Single",
//     type: "String",
//     path: "question_type",
//     meta: {
//       field: "question_type",
//       interface: "input",
//       display_options: [Object],
//       hidden: false,
//       sort: null,
//       width: "full",
//       required: false,
//       nullable: true,
//       is_internal: false,
//       is_deletable: true,
//       is_editable: true,
//       translations: [],
//     },
//     schema_definition: { name: "question_type", type: "String", default: null },
//     nox_created_at: "2025-03-25T11:46:28.405Z",
//     nox_updated_at: "2025-03-25T11:46:28.405Z",
//     nox_created_by: "67937390feddb0450d9a1af1",
//     nox_updated_by: "67937390feddb0450d9a1af1",
//     __v: 0,
//     parent_id: null,
//   },
//   {
//     _id: "67e297a32ba3876b0c9923da",
//     schema_id: "67e297702ba3876b0c99238f",
//     field: "questions",
//     field_type: "Object",
//     type: "Array",
//     path: "questions",
//     meta: {
//       field: "questions",
//       interface: "items",
//       display_options: [Object],
//       hidden: false,
//       sort: null,
//       width: "full",
//       required: false,
//       nullable: true,
//       is_internal: false,
//       is_deletable: true,
//       is_editable: true,
//       translations: [],
//     },
//     schema_definition: { name: "questions", type: "Array", default: null },
//     nox_created_at: "2025-03-25T11:46:44.098Z",
//     nox_updated_at: "2025-03-25T11:46:44.098Z",
//     nox_created_by: "67937390feddb0450d9a1af1",
//     nox_updated_by: "67937390feddb0450d9a1af1",
//     __v: 0,
//     parent_id: null,
//   },
//   {
//     _id: "67e297ac2ba3876b0c9923e6",
//     schema_id: "67e297702ba3876b0c99238f",
//     field: "ask",
//     field_type: "Object",
//     type: "String",
//     path: "questions.ask",
//     meta: {
//       field: "ask",
//       interface: "input",
//       display_options: [Object],
//       hidden: false,
//       sort: null,
//       width: "full",
//       required: false,
//       nullable: true,
//       is_internal: false,
//       is_deletable: true,
//       is_editable: true,
//       translations: [],
//     },
//     schema_definition: { name: "ask", type: "String", default: null },
//     nox_created_at: "2025-03-25T11:46:52.861Z",
//     nox_updated_at: "2025-03-25T11:46:52.861Z",
//     nox_created_by: "67937390feddb0450d9a1af1",
//     nox_updated_by: "67937390feddb0450d9a1af1",
//     __v: 0,
//     parent_id: "67e297a32ba3876b0c9923da",
//   },
//   {
//     _id: "67e297be2ba3876b0c9923f3",
//     schema_id: "67e297702ba3876b0c99238f",
//     field: "answers",
//     field_type: "Object",
//     type: "Array",
//     path: "questions.answers",
//     meta: {
//       field: "answers",
//       interface: "items",
//       display_options: [Object],
//       hidden: false,
//       sort: null,
//       width: "full",
//       required: false,
//       nullable: true,
//       is_internal: false,
//       is_deletable: true,
//       is_editable: true,
//       translations: [],
//     },
//     schema_definition: { name: "answers", type: "Array", default: null },
//     nox_created_at: "2025-03-25T11:47:11.119Z",
//     nox_updated_at: "2025-03-25T11:47:11.119Z",
//     nox_created_by: "67937390feddb0450d9a1af1",
//     nox_updated_by: "67937390feddb0450d9a1af1",
//     __v: 0,
//     parent_id: "67e297a32ba3876b0c9923da",
//   },
//   {
//     _id: "67e297c92ba3876b0c992400",
//     schema_id: "67e297702ba3876b0c99238f",
//     field: "answer",
//     field_type: "Object",
//     type: "String",
//     path: "questions.answers.answer",
//     meta: {
//       field: "answer",
//       interface: "input",
//       display_options: [Object],
//       hidden: false,
//       sort: null,
//       width: "full",
//       required: false,
//       nullable: true,
//       is_internal: false,
//       is_deletable: true,
//       is_editable: true,
//       translations: [],
//     },
//     schema_definition: { name: "answer", type: "String", default: null },
//     nox_created_at: "2025-03-25T11:47:21.337Z",
//     nox_updated_at: "2025-03-25T11:47:21.337Z",
//     nox_created_by: "67937390feddb0450d9a1af1",
//     nox_updated_by: "67937390feddb0450d9a1af1",
//     __v: 0,
//     parent_id: "67e297be2ba3876b0c9923f3",
//   },
//   {
//     _id: "67e297d22ba3876b0c99240d",
//     schema_id: "67e297702ba3876b0c99238f",
//     field: "score",
//     field_type: "Object",
//     type: "Number",
//     path: "questions.answers.score",
//     meta: {
//       field: "score",
//       interface: "input",
//       display_options: [Object],
//       hidden: false,
//       sort: null,
//       width: "full",
//       required: false,
//       nullable: true,
//       is_internal: false,
//       is_deletable: true,
//       is_editable: true,
//       translations: [],
//     },
//     schema_definition: { name: "score", type: "Number", default: null },
//     nox_created_at: "2025-03-25T11:47:30.527Z",
//     nox_updated_at: "2025-03-25T11:47:30.527Z",
//     nox_created_by: "67937390feddb0450d9a1af1",
//     nox_updated_by: "67937390feddb0450d9a1af1",
//     __v: 0,
//     parent_id: "67e297be2ba3876b0c9923f3",
//   },
//   {
//     _id: "67e297e12ba3876b0c99241a",
//     schema_id: "67e297702ba3876b0c99238f",
//     field: "criticism",
//     field_type: "Object",
//     type: "Boolean",
//     path: "questions.answers.criticism",
//     meta: {
//       field: "criticism",
//       interface: "toggle",
//       display_options: [Object],
//       hidden: false,
//       sort: null,
//       width: "full",
//       required: false,
//       nullable: true,
//       is_internal: false,
//       is_deletable: true,
//       is_editable: true,
//       translations: [],
//     },
//     schema_definition: { name: "criticism", type: "Boolean", default: null },
//     nox_created_at: "2025-03-25T11:47:46.047Z",
//     nox_updated_at: "2025-03-25T11:47:46.047Z",
//     nox_created_by: "67937390feddb0450d9a1af1",
//     nox_updated_by: "67937390feddb0450d9a1af1",
//     __v: 0,
//     parent_id: "67e297be2ba3876b0c9923f3",
//   },
// ];

// const fields = [
//   {
//     _id: "67e165f53dd23d12a2bfd49a",
//     schema_id: "67e165f53dd23d12a2bfd493",
//     field: "_id",
//     field_type: "Single",
//     type: "ObjectId",
//     path: "_id",
//     ref: "",
//     meta: {
//       is_deletable: false,
//       field: "_id",
//       interface: "none",
//       is_editable: true,
//       translations: [],
//       sort: 1,
//     },
//     schema_definition: { name: "_id", type: "ObjectId", is_primary: true, default: null },
//     nox_created_at: "2025-03-24T14:02:29.240Z",
//     nox_updated_at: "2025-04-14T10:02:05.367Z",
//     nox_created_by: "67e13dd13dd23d12a2bfba9f",
//     nox_updated_by: "67fcdc6a4cee20ea38e422de",
//     __v: 0,
//     parent_id: null,
//   },
//   {
//     _id: "67e165f53dd23d12a2bfd49e",
//     schema_id: "67e165f53dd23d12a2bfd493",
//     field: "nox_created_at",
//     field_type: "Single",
//     type: "Date",
//     path: "nox_created_at",
//     ref: "",
//     meta: {
//       is_deletable: false,
//       field: "nox_created_at",
//       interface: "timestamp",
//       hidden: true,
//       sort: 8,
//       translations: [],
//       is_editable: true,
//     },
//     schema_definition: { name: "nox_created_at", type: "Date", default: null },
//     nox_created_at: "2025-03-24T14:02:29.240Z",
//     nox_updated_at: "2025-04-14T10:02:05.367Z",
//     nox_created_by: "67e13dd13dd23d12a2bfba9f",
//     nox_updated_by: "67fcdc6a4cee20ea38e422de",
//     __v: 0,
//     parent_id: null,
//   },
//   {
//     _id: "67e165f53dd23d12a2bfd4a3",
//     schema_id: "67e165f53dd23d12a2bfd493",
//     field: "nox_updated_at",
//     field_type: "Single",
//     type: "Date",
//     path: "nox_updated_at",
//     ref: "",
//     meta: {
//       is_deletable: false,
//       field: "nox_updated_at",
//       interface: "timestamp",
//       hidden: true,
//       sort: 9,
//       translations: [],
//       is_editable: true,
//     },
//     schema_definition: { name: "nox_updated_at", type: "Date", default: null },
//     nox_created_at: "2025-03-24T14:02:29.240Z",
//     nox_updated_at: "2025-04-14T10:02:05.367Z",
//     nox_created_by: "67e13dd13dd23d12a2bfba9f",
//     nox_updated_by: "67fcdc6a4cee20ea38e422de",
//     __v: 0,
//     parent_id: null,
//   },
//   {
//     _id: "67e165f53dd23d12a2bfd4a8",
//     schema_id: "67e165f53dd23d12a2bfd493",
//     field: "nox_created_by",
//     field_type: "Single",
//     type: "ObjectId",
//     path: "nox_created_by",
//     ref: "",
//     meta: {
//       is_deletable: false,
//       field: "nox_created_by",
//       interface: "list-m2o",
//       hidden: true,
//       sort: 10,
//       translations: [],
//       is_editable: true,
//     },
//     schema_definition: {
//       name: "nox_created_by",
//       type: "ObjectId",
//       default: null,
//       foreign_key_column: "_id",
//       foreign_key_table: "users",
//     },
//     nox_created_at: "2025-03-24T14:02:29.240Z",
//     nox_updated_at: "2025-04-14T10:02:05.367Z",
//     nox_created_by: "67e13dd13dd23d12a2bfba9f",
//     nox_updated_by: "67fcdc6a4cee20ea38e422de",
//     __v: 0,
//     parent_id: null,
//   },
//   {
//     _id: "67e165f53dd23d12a2bfd4ad",
//     schema_id: "67e165f53dd23d12a2bfd493",
//     field: "nox_updated_by",
//     field_type: "Single",
//     type: "ObjectId",
//     path: "nox_updated_by",
//     ref: "",
//     meta: {
//       is_deletable: false,
//       field: "nox_updated_by",
//       interface: "list-m2o",
//       hidden: true,
//       sort: 11,
//       translations: [],
//       is_editable: true,
//     },
//     schema_definition: {
//       name: "nox_updated_by",
//       type: "ObjectId",
//       default: null,
//       foreign_key_column: "_id",
//       foreign_key_table: "users",
//     },
//     nox_created_at: "2025-03-24T14:02:29.240Z",
//     nox_updated_at: "2025-04-14T10:02:05.367Z",
//     nox_created_by: "67e13dd13dd23d12a2bfba9f",
//     nox_updated_by: "67fcdc6a4cee20ea38e422de",
//     __v: 0,
//     parent_id: null,
//   },
//   {
//     _id: "67e1679b3dd23d12a2bfd4eb",
//     schema_id: "67e165f53dd23d12a2bfd493",
//     field: "title",
//     field_type: "Single",
//     type: "String",
//     path: "title",
//     meta: {
//       field: "title",
//       interface: "input",
//       display_options: { template: "" },
//       hidden: false,
//       sort: 2,
//       width: "full",
//       required: true,
//       nullable: true,
//       is_deletable: true,
//       is_editable: true,
//       translations: [],
//     },
//     schema_definition: { name: "title", type: "String", default: null },
//     nox_created_at: "2025-03-24T14:09:31.753Z",
//     nox_updated_at: "2025-04-14T10:02:05.367Z",
//     nox_created_by: "67e13dd13dd23d12a2bfba9f",
//     nox_updated_by: "67fcdc6a4cee20ea38e422de",
//     __v: 0,
//     parent_id: null,
//   },
//   {
//     _id: "67e167c43dd23d12a2bfd4f7",
//     schema_id: "67e165f53dd23d12a2bfd493",
//     field: "status",
//     field_type: "Single",
//     type: "String",
//     path: "status",
//     meta: {
//       field: "status",
//       interface: "dropdown",
//       options: {
//         choices: [
//           { label: "Concept", value: "Concept" },
//           { label: "Ready for Review", value: "Ready for Review" },
//           { label: "Published", value: "Published" },
//         ],
//       },
//       display_options: { template: "" },
//       hidden: false,
//       sort: 3,
//       width: "full",
//       required: true,
//       nullable: false,
//       is_deletable: true,
//       is_editable: true,
//       translations: [],
//       readonly: false,
//     },
//     schema_definition: { name: "status", type: "String", default: "Published" },
//     nox_created_at: "2025-03-24T14:10:12.870Z",
//     nox_updated_at: "2025-04-14T10:02:05.367Z",
//     nox_created_by: "67e13dd13dd23d12a2bfba9f",
//     nox_updated_by: "67fcdc6a4cee20ea38e422de",
//     __v: 0,
//     parent_id: null,
//   },
//   {
//     _id: "67e167f73dd23d12a2bfd50c",
//     schema_id: "67e165f53dd23d12a2bfd493",
//     field: "permalink",
//     field_type: "Single",
//     type: "String",
//     path: "permalink",
//     meta: {
//       field: "permalink",
//       interface: "input",
//       display_options: { template: "" },
//       hidden: false,
//       sort: 5,
//       width: "full",
//       required: true,
//       nullable: false,
//       is_deletable: true,
//       is_editable: true,
//       translations: [],
//       options: {},
//       readonly: false,
//     },
//     schema_definition: { name: "permalink", type: "String", default: null, unique: true },
//     nox_created_at: "2025-03-24T14:11:03.779Z",
//     nox_updated_at: "2025-04-14T10:02:05.367Z",
//     nox_created_by: "67e13dd13dd23d12a2bfba9f",
//     nox_updated_by: "67fcdc6a4cee20ea38e422de",
//     __v: 0,
//     parent_id: null,
//   },
//   {
//     _id: "67e16b613dd23d12a2bfd5fd",
//     schema_id: "67e165f53dd23d12a2bfd493",
//     field: "zoekmachine_optimalisatie",
//     field_type: "Object",
//     type: "Object",
//     path: "zoekmachine_optimalisatie",
//     meta: {
//       field: "zoekmachine_optimalisatie",
//       interface: "object",
//       display_options: { template: "" },
//       hidden: false,
//       sort: 6,
//       width: "full",
//       required: false,
//       nullable: true,
//       is_deletable: true,
//       is_editable: true,
//       translations: [],
//     },
//     schema_definition: {
//       name: "zoekmachine_optimalisatie",
//       type: "Object",
//       default: null,
//     },
//     nox_created_at: "2025-03-24T14:25:37.578Z",
//     nox_updated_at: "2025-04-14T10:02:05.367Z",
//     nox_created_by: "67e13dd13dd23d12a2bfba9f",
//     nox_updated_by: "67fcdc6a4cee20ea38e422de",
//     __v: 0,
//     parent_id: null,
//   },
//   {
//     _id: "67e16b823dd23d12a2bfd60b",
//     schema_id: "67e165f53dd23d12a2bfd493",
//     field: "seo",
//     field_type: "Object",
//     type: "ObjectId",
//     path: "zoekmachine_optimalisatie.seo",
//     ref: "seo",
//     meta: {
//       field: "seo",
//       interface: "list-m2o",
//       display_options: { template: "{{meta_title}}{{meta_description}}" },
//       hidden: false,
//       sort: 13,
//       width: "full",
//       required: false,
//       nullable: true,
//       is_deletable: true,
//       is_editable: true,
//       translations: [],
//       options: {},
//       readonly: false,
//     },
//     schema_definition: {
//       name: "seo",
//       type: "ObjectId",
//       default: null,
//       foreign_key_column: "_id",
//       foreign_key_table: "seo",
//     },
//     nox_created_at: "2025-03-24T14:26:10.831Z",
//     nox_updated_at: "2025-04-15T11:44:37.617Z",
//     nox_created_by: "67e13dd13dd23d12a2bfba9f",
//     nox_updated_by: "67ea567bc38fe07a40d86405",
//     __v: 0,
//     parent_id: "67e16b613dd23d12a2bfd5fd",
//   },
//   {
//     _id: "67e2afc07a4bd469e22efb58",
//     schema_id: "67e165f53dd23d12a2bfd493",
//     field: "content",
//     field_type: "Object",
//     type: "Alias",
//     path: "pagina_content.content",
//     meta: {
//       field: "content",
//       interface: "list-m2a",
//       display_options: { template: "" },
//       hidden: false,
//       sort: 12,
//       width: "full",
//       required: false,
//       nullable: true,
//       is_internal: false,
//       is_deletable: true,
//       is_editable: true,
//       translations: [],
//       options: {},
//       readonly: false,
//     },
//     schema_definition: { name: "content", type: "Alias", default: null },
//     nox_created_at: "2025-03-25T13:29:36.345Z",
//     nox_updated_at: "2025-04-14T10:02:05.367Z",
//     nox_created_by: "67e13dd13dd23d12a2bfba9f",
//     nox_updated_by: "67fcdc6a4cee20ea38e422de",
//     __v: 0,
//     parent_id: "67e2affa7a4bd469e22efbc2",
//   },
//   {
//     _id: "67e2affa7a4bd469e22efbc2",
//     schema_id: "67e165f53dd23d12a2bfd493",
//     field: "pagina_content",
//     field_type: "Object",
//     type: "Object",
//     path: "pagina_content",
//     meta: {
//       field: "pagina_content",
//       interface: "object",
//       display_options: { template: "" },
//       hidden: false,
//       sort: 7,
//       width: "full",
//       required: false,
//       nullable: true,
//       is_internal: false,
//       is_deletable: true,
//       is_editable: true,
//       translations: [],
//     },
//     schema_definition: { name: "pagina_content", type: "Object", default: null },
//     nox_created_at: "2025-03-25T13:30:34.700Z",
//     nox_updated_at: "2025-04-14T10:02:05.367Z",
//     nox_created_by: "67e13dd13dd23d12a2bfba9f",
//     nox_updated_by: "67fcdc6a4cee20ea38e422de",
//     __v: 0,
//     parent_id: null,
//   },
//   {
//     _id: "67fcdd094cee20ea38e4237e",
//     schema_id: "67e165f53dd23d12a2bfd493",
//     field: "slug",
//     field_type: "Single",
//     type: "String",
//     path: "slug",
//     parent_id: null,
//     meta: {
//       field: "slug",
//       interface: "input",
//       display_options: { template: "" },
//       hidden: false,
//       sort: 4,
//       width: "full",
//       required: true,
//       nullable: false,
//       is_internal: false,
//       is_deletable: true,
//       is_editable: true,
//       translations: [],
//       options: {},
//       readonly: false,
//     },
//     schema_definition: { name: "slug", type: "String", default: null },
//     nox_created_at: "2025-04-14T10:01:45.266Z",
//     nox_updated_at: "2025-04-14T10:02:05.367Z",
//     nox_created_by: "67fcdc6a4cee20ea38e422de",
//     nox_updated_by: "67fcdc6a4cee20ea38e422de",
//     __v: 0,
//   },
// ];

const fields = [
  {
    _id: {
      $oid: "67ee332a1d7a833343c8bc9c",
    },
    schema_id: {
      $oid: "67ee33091d7a833343c8b7c5",
    },
    field: "_id",
    field_type: "Single",
    type: "ObjectId",
    path: "_id",
    ref: "",
    meta: {
      is_deletable: false,
      field: "_id",
      interface: "none",
      is_internal: false,
      is_editable: true,
      translations: [],
    },
    schema_definition: {
      name: "_id",
      type: "ObjectId",
      is_primary: true,
      default: null,
    },
    created_by: {
      $oid: "67ee332a1d7a833343c8bc92",
    },
    updated_by: {
      $oid: "67ee332a1d7a833343c8bc93",
    },
    created_at: {
      $date: "2025-04-03T07:05:14.264Z",
    },
    updated_at: {
      $date: "2025-04-03T07:05:14.264Z",
    },
    __v: 0,
    parent_id: null,
  },
  {
    _id: {
      $oid: "67ee332a1d7a833343c8bca1",
    },
    schema_id: {
      $oid: "67ee33091d7a833343c8b7c5",
    },
    field: "name",
    field_type: "Single",
    type: "String",
    path: "name",
    ref: "",
    meta: {
      is_deletable: false,
      field: "name",
      interface: "input",
      is_internal: false,
      is_editable: true,
      translations: [],
    },
    schema_definition: {
      name: "name",
      type: "String",
      default: null,
    },
    created_by: {
      $oid: "67ee332a1d7a833343c8bc92",
    },
    updated_by: {
      $oid: "67ee332a1d7a833343c8bc93",
    },
    created_at: {
      $date: "2025-04-03T07:05:14.264Z",
    },
    updated_at: {
      $date: "2025-04-03T07:05:14.264Z",
    },
    __v: 0,
    parent_id: null,
  },
  {
    _id: {
      $oid: "67ee332a1d7a833343c8bca7",
    },
    schema_id: {
      $oid: "67ee33091d7a833343c8b7c5",
    },
    field: "code",
    field_type: "Single",
    type: "String",
    path: "code",
    ref: "",
    meta: {
      is_deletable: false,
      field: "code",
      interface: "input",
      is_internal: false,
      is_editable: true,
      translations: [],
    },
    schema_definition: {
      name: "code",
      type: "String",
      default: null,
    },
    created_by: {
      $oid: "67ee332a1d7a833343c8bc92",
    },
    updated_by: {
      $oid: "67ee332a1d7a833343c8bc93",
    },
    created_at: {
      $date: "2025-04-03T07:05:14.264Z",
    },
    updated_at: {
      $date: "2025-04-03T07:05:14.264Z",
    },
    __v: 0,
    parent_id: null,
  },
  {
    _id: {
      $oid: "67ee332a1d7a833343c8bcad",
    },
    schema_id: {
      $oid: "67ee33091d7a833343c8b7c5",
    },
    field: "description",
    field_type: "Single",
    type: "String",
    path: "description",
    ref: "",
    meta: {
      is_deletable: false,
      field: "description",
      interface: "input",
      is_internal: false,
      is_editable: true,
      translations: [],
    },
    schema_definition: {
      name: "description",
      type: "String",
      default: null,
    },
    created_by: {
      $oid: "67ee332a1d7a833343c8bc92",
    },
    updated_by: {
      $oid: "67ee332a1d7a833343c8bc93",
    },
    created_at: {
      $date: "2025-04-03T07:05:14.264Z",
    },
    updated_at: {
      $date: "2025-04-03T07:05:14.264Z",
    },
    __v: 0,
    parent_id: null,
  },
];

// function buildTree(fields) {
//   const fieldMap = new Map();
//   const tree = { fields: [] };

//   // First, create a map of all fields by _id for quick lookup
//   fields.forEach((field) => {
//     if (field.type === "Alias" || field.schema_definition?.type === "Alias") return;
//     const fieldType = {};
//     let type = field.schema_definition?.type || field.type;

//     if (field.type === "Array" && field.field_type === "Object" && type !== field.type) {
//       fieldType["arrayType"] = type;
//       type = "Array";
//     }

//     if (field.field_type === "Array") {
//       fieldType["arrayType"] = field.schema_definition?.type;
//       type = "Array";
//     }

//     fieldMap.set(field._id, {
//       fieldName: field.field,
//       type,
//       ...fieldType,
//       schemaDef: field.schema_definition,
//       fields: [],
//     });
//   });

//   // Then, iterate through the fields again to build the hierarchy
//   fields.forEach((field) => {
//     if (field.type === "Alias" || field.schema_definition?.type === "Alias") return;
//     const node = fieldMap.get(field._id);
//     if (field.ref) {
//       node.ref = field.ref;
//     }

//     if (field.parent_id) {
//       const parent = fieldMap.get(field.parent_id);
//       if (parent) {
//         parent.fields.push(node);
//       }
//     } else {
//       tree.fields.push(node);
//     }
//   });

//   return tree;
// }

// const treeData = buildTree(fields);
// console.log(treeData);

function transformFields(fields) {
  const idMap = new Map();
  const childrenMap = new Map();

  for (const field of fields) {
    idMap.set(field._id, field);
    if (field.parent_id) {
      (
        childrenMap.get(field.parent_id) ||
        childrenMap.set(field.parent_id, []).get(field.parent_id)
      ).push(field);
    }
  }

  const result = [];

  const buildFieldChain = (field) => {
    const chain = [];
    while (field) {
      chain.unshift({ path: field.path, field_id: field._id });
      field = field.parent_id ? idMap.get(field.parent_id) : null;
    }
    return chain;
  };

  const walk = (field) => {
    const children = childrenMap.get(field._id);
    if (!children || children.length === 0) {
      result.push({
        field_name: field.path,
        display_label: field.path.replace(/\./g, "-"),
        field_details: buildFieldChain(field),
      });
    } else {
      for (const child of children) {
        walk(child);
      }
    }
  };

  for (const field of fields) {
    if (!field.parent_id) {
      const hasChildren = childrenMap.has(field._id);
      if (!hasChildren) {
        result.push({
          field_name: field.path,
          display_label: field.path.replace(/\./g, "-"),
          field_details: buildFieldChain(field),
        });
      } else {
        walk(field);
      }
    }
  }

  return result;
}

const output = transformFields(fields);
console.log(JSON.stringify(output, null, 2));
