const fields = [
  {
    _id: "68d3c5175aa50577e979b1fc",
    schema_id: "67ce7a70a2694ea70ad91130",
    field: "group_1",
    field_type: "Object",
    type: "Object",
    path: "group_1",
    parent_id: null,
    meta: {
      field: "group_1",
      interface: "object",
      options: {
        code_block_language: "plaintext",
      },
      display_options: {
        template: "",
      },
      hidden: false,
      sort: 6,
      width: "full",
      required: false,
      nullable: true,
      is_internal: false,
      is_deletable: true,
      is_editable: true,
      translations: [],
    },
    schema_definition: {
      name: "group_1",
      type: "Object",
      default: null,
    },
    nox_created_at: "2025-09-24T10:16:55.550Z",
    nox_updated_at: "2025-09-24T10:16:55.550Z",
    nox_created_by: "675aae64c81d071ec87bbb56",
    nox_updated_by: "675aae64c81d071ec87bbb56",
    __v: 0,
  },
  {
    _id: "68d25f79a785dc22b07a229f",
    schema_id: "67ce7a70a2694ea70ad91130",
    field: "i1",
    field_type: "Object",
    type: "String",
    path: "my_items.i1",
    parent_id: "68ac651721b12453dae835d7",
    meta: {
      field: "i1",
      interface: "input",
      options: {
        code_block_language: "plaintext",
      },
      display_options: {
        template: "",
      },
      hidden: false,
      sort: 5,
      width: "full",
      required: true,
      nullable: false,
      is_internal: false,
      is_deletable: true,
      is_editable: true,
      translations: [],
    },
    schema_definition: {
      name: "i1",
      type: "String",
      default: null,
    },
    nox_created_at: "2025-09-23T08:51:05.464Z",
    nox_updated_at: "2025-09-23T08:51:05.464Z",
    nox_created_by: "675aae64c81d071ec87bbb56",
    nox_updated_by: "675aae64c81d071ec87bbb56",
    __v: 0,
  },
  {
    _id: "68c2740cf8083720fcc1471c",
    schema_id: "67ce7a70a2694ea70ad91130",
    field: "test",
    field_type: "Single",
    type: "String",
    path: "test",
    parent_id: null,
    meta: {
      field: "test",
      interface: "wysiwyg",
      options: {
        format: "html",
        color_presets: [],
        font_family_options: [
          "Arial",
          "Courier New",
          "Georgia",
          "Times New Roman",
          "Verdana",
          "Montserrat",
          "Open Sans",
          "Roboto",
          "Ubuntu",
        ],
        has_json: false,
        code_block_language: "plaintext",
        placeholder: "",
      },
      display_options: {
        template: "",
      },
      hidden: false,
      sort: -0.125,
      width: "full",
      required: false,
      nullable: true,
      is_internal: false,
      is_deletable: true,
      is_editable: true,
      translations: [],
    },
    schema_definition: {
      name: "test",
      type: "String",
      default: null,
    },
    nox_created_at: "2025-09-11T07:02:36.992Z",
    nox_updated_at: "2025-09-23T09:09:55.226Z",
    nox_created_by: "675aae64c81d071ec87bbb56",
    nox_updated_by: "675aae64c81d071ec87bbb56",
    __v: 0,
    parent: null,
  },
  {
    _id: "68afe2945415e20398a8555a",
    schema_id: "67ce7a70a2694ea70ad91130",
    field: "my_timestamp",
    field_type: "Single",
    type: "timestamp",
    path: "my_timestamp",
    parent_id: null,
    meta: {
      field: "my_timestamp",
      interface: "datetime",
      options: {
        format: "DD/MM/YYYY HH:mm:ss",
      },
      display_options: {
        template: "",
      },
      hidden: false,
      sort: 3,
      width: "full",
      required: false,
      nullable: true,
      is_internal: false,
      is_deletable: true,
      is_editable: true,
      translations: [],
    },
    schema_definition: {
      name: "my_timestamp",
      type: "Date",
      default: null,
    },
    nox_created_at: "2025-08-28T05:01:09.069Z",
    nox_updated_at: "2025-08-28T05:01:09.069Z",
    nox_created_by: "675aae64c81d071ec87bbb56",
    nox_updated_by: "675aae64c81d071ec87bbb56",
    __v: 0,
  },
  {
    _id: "68ac651721b12453dae835d7",
    schema_id: "67ce7a70a2694ea70ad91130",
    field: "my_items",
    field_type: "Object",
    type: "Array",
    path: "my_items",
    parent_id: null,
    meta: {
      field: "my_items",
      interface: "items",
      display_options: {
        template: "",
      },
      hidden: false,
      sort: 2,
      width: "full",
      required: false,
      nullable: true,
      is_internal: false,
      is_deletable: true,
      is_editable: true,
      translations: [],
    },
    schema_definition: {
      name: "my_items",
      type: "Array",
      default: null,
    },
    nox_created_at: "2025-08-25T13:28:56.061Z",
    nox_updated_at: "2025-08-25T13:28:56.061Z",
    nox_created_by: "675aae64c81d071ec87bbb56",
    nox_updated_by: "675aae64c81d071ec87bbb56",
    __v: 0,
  },
  {
    _id: "68ac0a00eac39ad0aed12ae1",
    schema_id: "67ce7a70a2694ea70ad91130",
    field: "new_checks",
    field_type: "Array",
    type: "Array",
    path: "new_checks",
    parent_id: null,
    meta: {
      field: "new_checks",
      interface: "checkboxes",
      options: {
        choices: [
          {
            label: "c1",
            value: "c1",
          },
          {
            label: "c2",
            value: "c2",
          },
          {
            label: "c3",
            value: "c3",
          },
          {
            label: "c4",
            value: "c4",
          },
        ],
      },
      display_options: {
        template: "",
      },
      hidden: false,
      sort: 1,
      width: "full",
      required: false,
      nullable: true,
      is_internal: false,
      is_deletable: true,
      is_editable: true,
      translations: [],
    },
    schema_definition: {
      name: "new_checks",
      type: "String",
      default: ["c2", "c3"],
    },
    nox_created_at: "2025-08-25T07:00:16.387Z",
    nox_updated_at: "2025-09-08T05:29:30.747Z",
    nox_created_by: "675aae64c81d071ec87bbb56",
    nox_updated_by: "675aae64c81d071ec87bbb56",
    __v: 0,
  },
  {
    _id: "6888b379b5cdfdd31158adeb",
    schema_id: "67ce7a70a2694ea70ad91130",
    field: "wysiwyg_json",
    field_type: "Single",
    type: "String",
    path: "wysiwyg_json",
    meta: {
      field: "wysiwyg_json",
      interface: "wysiwyg",
      display_options: {
        template: "",
      },
      hidden: true,
      sort: null,
      width: "full",
      required: false,
      nullable: true,
      is_deletable: true,
      is_editable: false,
      translations: [],
      options: {
        format: "json",
      },
      readonly: true,
    },
    schema_definition: {
      name: "wysiwyg_json",
      type: "String",
      default:
        '<p class="editor-paragraph" dir="ltr"><span style="white-space: pre-wrap;">def lexical</span></p>',
    },
    nox_created_at: "2025-03-10T05:37:41.192Z",
    nox_updated_at: "2025-07-24T11:45:59.976Z",
    nox_created_by: "675aae64c81d071ec87bbb56",
    nox_updated_by: "675aae64c81d071ec87bbb56",
    __v: 0,
    parent_id: null,
  },
  {
    _id: "686e4b02b9138f7df6d21aa3",
    schema_id: "67ce7a70a2694ea70ad91130",
    field: "my_autocomplete",
    field_type: "Single",
    type: "String",
    path: "my_autocomplete",
    parent_id: null,
    meta: {
      field: "my_autocomplete",
      interface: "autocomplete",
      options: {
        url: "https://jsonplaceholder.typicode.com/posts",
        text_path: "title",
        value_path: "title",
        trigger: "Throttle",
        rate: 500,
        placeholder: "",
      },
      display_options: {
        template: "",
      },
      hidden: false,
      sort: -0.5,
      width: "full",
      required: false,
      nullable: true,
      is_internal: false,
      is_deletable: true,
      is_editable: true,
      translations: [],
      readonly: false,
    },
    schema_definition: {
      name: "my_autocomplete",
      type: "String",
      default: null,
    },
    nox_created_at: "2025-07-09T10:57:06.714Z",
    nox_updated_at: "2025-07-09T10:59:10.023Z",
    nox_created_by: "675aae64c81d071ec87bbb56",
    nox_updated_by: "675aae64c81d071ec87bbb56",
    __v: 0,
    parent: null,
  },
  {
    _id: "67ce7f30a2694ea70ad91337",
    schema_id: "67ce7a70a2694ea70ad91130",
    field: "trasnlation_field",
    field_type: "Single",
    type: "Alias",
    path: "trasnlation_field",
    meta: {
      field: "trasnlation_field",
      interface: "translations",
      options: {
        language_field: "code",
        language_collection: "67c6978c1da9de99617adac1",
        language_direction_field: "direction",
      },
      display_options: {
        template: "",
      },
      hidden: true,
      sort: null,
      width: "full",
      required: false,
      nullable: true,
      is_deletable: true,
      is_editable: true,
      translations: [],
    },
    schema_definition: {
      name: "trasnlation_field",
      type: "Alias",
      default: null,
    },
    nox_created_at: "2025-03-10T05:57:04.406Z",
    nox_updated_at: "2025-08-19T09:26:04.647Z",
    nox_created_by: "675aae64c81d071ec87bbb56",
    nox_updated_by: "675aae64c81d071ec87bbb56",
    __v: 0,
    parent_id: null,
  },
  {
    _id: "67ce7e05a2694ea70ad91329",
    schema_id: "67ce7a70a2694ea70ad91130",
    field: "m2o",
    field_type: "Single",
    type: "ObjectId",
    path: "m2o",
    ref: "rel_m2o",
    meta: {
      field: "m2o",
      interface: "list-m2o",
      display_options: {
        template: "",
      },
      hidden: false,
      sort: null,
      width: "half",
      required: false,
      nullable: true,
      is_deletable: true,
      is_editable: true,
      translations: [],
    },
    schema_definition: {
      name: "m2o",
      type: "ObjectId",
      default: null,
      foreign_key_column: "_id",
      foreign_key_table: "rel_m2o",
    },
    nox_created_at: "2025-03-10T05:52:06.179Z",
    nox_updated_at: "2025-04-17T07:02:59.813Z",
    nox_created_by: "675aae64c81d071ec87bbb56",
    nox_updated_by: "675aae64c81d071ec87bbb56",
    __v: 0,
    parent_id: null,
  },
  {
    _id: "67ce7df6a2694ea70ad9131c",
    schema_id: "67ce7a70a2694ea70ad91130",
    field: "o2m",
    field_type: "Array",
    type: "Alias",
    path: "o2m",
    meta: {
      field: "o2m",
      interface: "list-o2m",
      display_options: {
        template: "",
      },
      hidden: false,
      sort: null,
      width: "half",
      required: false,
      nullable: true,
      is_deletable: true,
      is_editable: true,
      translations: [],
    },
    schema_definition: {
      name: "o2m",
      type: "Alias",
      default: null,
    },
    nox_created_at: "2025-03-10T05:51:51.077Z",
    nox_updated_at: "2025-04-17T07:03:02.781Z",
    nox_created_by: "675aae64c81d071ec87bbb56",
    nox_updated_by: "675aae64c81d071ec87bbb56",
    __v: 0,
    parent_id: null,
  },
  {
    _id: "67ce7b3fa2694ea70ad91255",
    schema_id: "67ce7a70a2694ea70ad91130",
    field: "m2m",
    field_type: "Array",
    type: "Alias",
    path: "m2m",
    meta: {
      field: "m2m",
      interface: "list-m2m",
      display_options: {
        template: "",
      },
      hidden: false,
      sort: null,
      width: "full",
      required: false,
      nullable: true,
      is_deletable: true,
      is_editable: true,
      translations: [],
    },
    schema_definition: {
      name: "m2m",
      type: "Alias",
      default: null,
    },
    nox_created_at: "2025-03-10T05:40:15.923Z",
    nox_updated_at: "2025-03-10T05:40:15.923Z",
    nox_created_by: "675aae64c81d071ec87bbb56",
    nox_updated_by: "675aae64c81d071ec87bbb56",
    __v: 0,
    parent_id: null,
  },
  {
    _id: "67ce7b28a2694ea70ad9121c",
    schema_id: "67ce7a70a2694ea70ad91130",
    field: "files",
    field_type: "Array",
    type: "String",
    path: "files",
    meta: {
      field: "files",
      interface: "files",
      display_options: {
        template: "",
      },
      hidden: false,
      sort: null,
      width: "full",
      required: false,
      nullable: true,
      is_deletable: true,
      is_editable: true,
      translations: [],
    },
    schema_definition: {
      name: "files",
      type: "String",
      default: null,
    },
    nox_created_at: "2025-03-10T05:39:52.471Z",
    nox_updated_at: "2025-03-10T05:39:52.471Z",
    nox_created_by: "675aae64c81d071ec87bbb56",
    nox_updated_by: "675aae64c81d071ec87bbb56",
    __v: 0,
    parent_id: null,
  },
  {
    _id: "67ce7b22a2694ea70ad9120b",
    schema_id: "67ce7a70a2694ea70ad91130",
    field: "image",
    field_type: "Single",
    type: "ObjectId",
    path: "image",
    ref: "nox_files",
    meta: {
      field: "image",
      interface: "file-image",
      display_options: {
        template: "",
      },
      hidden: false,
      sort: null,
      width: "full",
      required: false,
      nullable: true,
      is_deletable: true,
      is_editable: true,
      translations: [],
    },
    schema_definition: {
      name: "image",
      type: "ObjectId",
      default: null,
      foreign_key_column: "_id",
      foreign_key_table: "nox_files",
      foreign_key_table_id: "6799d8a1c2270237fbb47e3e",
    },
    nox_created_at: "2025-03-10T05:39:46.532Z",
    nox_updated_at: "2025-03-10T05:39:46.532Z",
    nox_created_by: "675aae64c81d071ec87bbb56",
    nox_updated_by: "675aae64c81d071ec87bbb56",
    __v: 0,
    parent_id: null,
  },
  {
    _id: "67ce7b1ba2694ea70ad911fa",
    schema_id: "67ce7a70a2694ea70ad91130",
    field: "file",
    field_type: "Single",
    type: "ObjectId",
    path: "file",
    ref: "nox_files",
    meta: {
      field: "file",
      interface: "file",
      display_options: {
        template: "",
      },
      hidden: false,
      sort: null,
      width: "full",
      required: true,
      nullable: false,
      is_deletable: true,
      is_editable: true,
      translations: [],
      options: {},
      readonly: false,
    },
    schema_definition: {
      name: "file",
      type: "ObjectId",
      default: null,
      foreign_key_column: "_id",
      foreign_key_table: "nox_files",
      foreign_key_table_id: "6799d8a1c2270237fbb47e3e",
    },
    nox_created_at: "2025-03-10T05:39:39.572Z",
    nox_updated_at: "2025-07-23T10:34:31.568Z",
    nox_created_by: "675aae64c81d071ec87bbb56",
    nox_updated_by: "675aae64c81d071ec87bbb56",
    __v: 0,
    parent_id: null,
  },
  {
    _id: "67ce7b15a2694ea70ad911ed",
    schema_id: "67ce7a70a2694ea70ad91130",
    field: "rads",
    field_type: "Single",
    type: "String",
    path: "rads",
    meta: {
      field: "rads",
      interface: "radio",
      options: {
        choices: [
          {
            label: "x",
            value: "x",
          },
          {
            label: "y",
            value: "y",
          },
          {
            label: "z",
            value: "z",
          },
        ],
      },
      display_options: {
        template: "",
      },
      hidden: false,
      sort: null,
      width: "full",
      required: false,
      nullable: true,
      is_deletable: true,
      is_editable: true,
      translations: [],
    },
    schema_definition: {
      name: "rads",
      type: "String",
      default: "z",
    },
    nox_created_at: "2025-03-10T05:39:33.214Z",
    nox_updated_at: "2025-09-08T05:30:01.764Z",
    nox_created_by: "675aae64c81d071ec87bbb56",
    nox_updated_by: "675aae64c81d071ec87bbb56",
    __v: 0,
    parent_id: null,
  },
  {
    _id: "67ce7affa2694ea70ad911e2",
    schema_id: "67ce7a70a2694ea70ad91130",
    field: "dpdn_mul",
    field_type: "Array",
    type: "Array",
    path: "dpdn_mul",
    meta: {
      field: "dpdn_mul",
      interface: "dropdown_multiple",
      options: {
        choices: [
          {
            label: "11",
            value: "11",
          },
          {
            label: "vv",
            value: "22",
          },
          {
            label: "33",
            value: "33",
          },
          {
            label: "add_product_name",
            value: "adddd",
          },
        ],
        placeholder: "",
      },
      display_options: {
        template: "",
      },
      hidden: false,
      sort: null,
      width: "full",
      required: false,
      nullable: true,
      is_deletable: true,
      is_editable: true,
      translations: [],
    },
    schema_definition: {
      name: "dpdn_mul",
      type: "String",
      default: ["11", "22"],
    },
    nox_created_at: "2025-03-10T05:39:11.336Z",
    nox_updated_at: "2025-07-24T04:34:13.086Z",
    nox_created_by: "675aae64c81d071ec87bbb56",
    nox_updated_by: "675aae64c81d071ec87bbb56",
    __v: 0,
    parent_id: null,
  },
  {
    _id: "67ce7adba2694ea70ad911cc",
    schema_id: "67ce7a70a2694ea70ad91130",
    field: "dpdn",
    field_type: "Single",
    type: "String",
    path: "dpdn",
    meta: {
      field: "dpdn",
      interface: "dropdown",
      options: {
        choices: [
          {
            label: "1",
            value: "1",
          },
          {
            label: "2",
            value: "2",
          },
          {
            label: "3",
            value: "3",
          },
        ],
      },
      display_options: {
        template: "",
      },
      hidden: false,
      sort: null,
      width: "full",
      required: false,
      nullable: true,
      is_deletable: true,
      is_editable: true,
      translations: [],
    },
    schema_definition: {
      name: "dpdn",
      type: "String",
      default: "1",
    },
    nox_created_at: "2025-03-10T05:38:35.261Z",
    nox_updated_at: "2025-07-24T04:46:43.707Z",
    nox_created_by: "675aae64c81d071ec87bbb56",
    nox_updated_by: "675aae64c81d071ec87bbb56",
    __v: 0,
    parent_id: null,
  },
  {
    _id: "67ce7ac8a2694ea70ad911c1",
    schema_id: "67ce7a70a2694ea70ad91130",
    field: "color",
    field_type: "Single",
    type: "String",
    path: "color",
    meta: {
      field: "color",
      interface: "color",
      display_options: {
        template: "",
      },
      hidden: false,
      sort: null,
      width: "full",
      required: false,
      nullable: true,
      is_deletable: true,
      is_editable: true,
      translations: [],
    },
    schema_definition: {
      name: "color",
      type: "String",
      default: null,
    },
    nox_created_at: "2025-03-10T05:38:17.266Z",
    nox_updated_at: "2025-03-10T05:38:17.266Z",
    nox_created_by: "675aae64c81d071ec87bbb56",
    nox_updated_by: "675aae64c81d071ec87bbb56",
    __v: 0,
    parent_id: null,
  },
  {
    _id: "67ce7ac3a2694ea70ad911b6",
    schema_id: "67ce7a70a2694ea70ad91130",
    field: "date",
    field_type: "Single",
    type: "datetime",
    path: "date",
    meta: {
      field: "date",
      interface: "datetime",
      display_options: {
        template: "",
      },
      hidden: false,
      sort: null,
      width: "full",
      required: false,
      nullable: true,
      is_deletable: true,
      is_editable: true,
      translations: [],
    },
    schema_definition: {
      name: "date",
      type: "Date",
      default: null,
    },
    nox_created_at: "2025-03-10T05:38:12.146Z",
    nox_updated_at: "2025-03-10T05:38:12.146Z",
    nox_created_by: "675aae64c81d071ec87bbb56",
    nox_updated_by: "675aae64c81d071ec87bbb56",
    __v: 0,
    parent_id: null,
  },
  {
    _id: "67ce7abca2694ea70ad911ab",
    schema_id: "67ce7a70a2694ea70ad91130",
    field: "toggle",
    field_type: "Single",
    type: "Boolean",
    path: "toggle",
    meta: {
      field: "toggle",
      interface: "toggle",
      display_options: {
        template: "",
      },
      hidden: false,
      sort: null,
      width: "full",
      required: false,
      nullable: true,
      is_deletable: true,
      is_editable: true,
      translations: [],
    },
    schema_definition: {
      name: "toggle",
      type: "Boolean",
      default: null,
    },
    nox_created_at: "2025-03-10T05:38:04.257Z",
    nox_updated_at: "2025-03-10T05:38:04.257Z",
    nox_created_by: "675aae64c81d071ec87bbb56",
    nox_updated_by: "675aae64c81d071ec87bbb56",
    __v: 0,
    parent_id: null,
  },
  {
    _id: "67ce7ab3a2694ea70ad911a0",
    schema_id: "67ce7a70a2694ea70ad91130",
    field: "json",
    field_type: "Single",
    type: "String",
    path: "json",
    meta: {
      field: "json",
      interface: "json",
      display_options: {
        template: "",
      },
      hidden: false,
      sort: null,
      width: "full",
      required: true,
      nullable: false,
      is_deletable: true,
      is_editable: true,
      translations: [],
      options: {},
      readonly: false,
      is_internal: false,
    },
    schema_definition: {
      name: "json",
      type: "String",
      default: "{}",
    },
    nox_created_at: "2025-03-10T05:37:55.735Z",
    nox_updated_at: "2025-08-28T05:27:20.246Z",
    nox_created_by: "675aae64c81d071ec87bbb56",
    nox_updated_by: "675aae64c81d071ec87bbb56",
    __v: 0,
    parent_id: null,
  },
  {
    _id: "67ce7aa9a2694ea70ad91195",
    schema_id: "67ce7a70a2694ea70ad91130",
    field: "tags",
    field_type: "Array",
    type: "String",
    path: "tags",
    meta: {
      field: "tags",
      interface: "tags",
      display_options: {
        template: "",
      },
      hidden: false,
      sort: null,
      width: "full",
      required: false,
      nullable: true,
      is_deletable: true,
      is_editable: true,
      translations: [],
    },
    schema_definition: {
      name: "tags",
      type: "String",
      default: null,
    },
    nox_created_at: "2025-03-10T05:37:45.818Z",
    nox_updated_at: "2025-03-10T05:37:45.818Z",
    nox_created_by: "675aae64c81d071ec87bbb56",
    nox_updated_by: "675aae64c81d071ec87bbb56",
    __v: 0,
    parent_id: null,
  },
  {
    _id: "67ce7aa4a2694ea70ad9118a",
    schema_id: "67ce7a70a2694ea70ad91130",
    field: "wysiwyg",
    field_type: "Single",
    type: "String",
    path: "wysiwyg",
    meta: {
      field: "wysiwyg",
      interface: "wysiwyg",
      display_options: {
        template: "",
      },
      hidden: false,
      sort: -0.25,
      width: "full",
      required: false,
      nullable: true,
      is_deletable: true,
      is_editable: true,
      translations: [],
      options: {
        has_json: true,
        font_family_options: [],
        placeholder: "",
        toolbar: ["undo", "redo", "bold", "heading"],
      },
      readonly: false,
      is_internal: false,
    },
    schema_definition: {
      name: "wysiwyg",
      type: "String",
      default:
        '<p class="editor-paragraph" dir="ltr"><span style="white-space: pre-wrap;">def lexical value</span></p>',
    },
    nox_created_at: "2025-03-10T05:37:41.192Z",
    nox_updated_at: "2025-09-23T09:09:31.868Z",
    nox_created_by: "675aae64c81d071ec87bbb56",
    nox_updated_by: "675aae64c81d071ec87bbb56",
    __v: 0,
    parent_id: null,
    parent: null,
  },
  {
    _id: "67ce7a9ba2694ea70ad9117d",
    schema_id: "67ce7a70a2694ea70ad91130",
    field: "text_area",
    field_type: "Object",
    type: "String",
    path: "group_1.text_area",
    meta: {
      field: "text_area",
      interface: "textarea",
      display_options: {
        template: "",
      },
      hidden: false,
      sort: 2.25,
      width: "full",
      required: false,
      nullable: true,
      is_deletable: true,
      is_editable: true,
      translations: [],
      options: {},
      readonly: false,
    },
    schema_definition: {
      name: "text_area",
      type: "String",
      default: null,
    },
    nox_created_at: "2025-03-10T05:37:31.674Z",
    nox_updated_at: "2025-09-24T10:17:13.055Z",
    nox_created_by: "675aae64c81d071ec87bbb56",
    nox_updated_by: "675aae64c81d071ec87bbb56",
    __v: 0,
    parent_id: "68d3c5175aa50577e979b1fc",
    parent: null,
  },
  {
    _id: "67ce7a8da2694ea70ad91172",
    schema_id: "67ce7a70a2694ea70ad91130",
    field: "inp_num",
    field_type: "Single",
    type: "Number",
    path: "inp_num",
    meta: {
      field: "inp_num",
      interface: "input",
      display_options: {
        template: "",
      },
      hidden: false,
      sort: null,
      width: "full",
      required: false,
      nullable: true,
      is_deletable: true,
      is_editable: true,
      translations: [],
    },
    schema_definition: {
      name: "inp_num",
      type: "Number",
      default: 7777,
    },
    nox_created_at: "2025-03-10T05:37:17.670Z",
    nox_updated_at: "2025-09-08T05:29:43.044Z",
    nox_created_by: "675aae64c81d071ec87bbb56",
    nox_updated_by: "675aae64c81d071ec87bbb56",
    __v: 0,
    parent_id: null,
  },
  {
    _id: "67ce7a7fa2694ea70ad91163",
    schema_id: "67ce7a70a2694ea70ad91130",
    field: "inp_str",
    field_type: "Single",
    type: "String",
    path: "inp_str",
    meta: {
      field: "inp_str",
      interface: "input",
      display_options: {
        template: "",
      },
      hidden: false,
      sort: null,
      width: "full",
      required: false,
      nullable: true,
      is_deletable: true,
      is_editable: true,
      translations: [],
      options: {},
      readonly: false,
    },
    schema_definition: {
      name: "inp_str",
      type: "String",
      default: "def inp str",
    },
    nox_created_at: "2025-03-10T05:37:03.918Z",
    nox_updated_at: "2025-09-08T05:29:25.038Z",
    nox_created_by: "675aae64c81d071ec87bbb56",
    nox_updated_by: "675aae64c81d071ec87bbb56",
    __v: 0,
    parent_id: null,
  },
  {
    _id: "67ce7a70a2694ea70ad91137",
    schema_id: "67ce7a70a2694ea70ad91130",
    field: "_id",
    field_type: "Single",
    type: "ObjectId",
    path: "_id",
    ref: "",
    meta: {
      is_deletable: false,
      field: "_id",
      interface: "none",
      is_editable: true,
      translations: [],
    },
    schema_definition: {
      name: "_id",
      type: "ObjectId",
      is_primary: true,
      default: null,
    },
    nox_created_at: "2025-03-10T05:36:47.770Z",
    nox_updated_at: "2025-03-10T05:36:47.770Z",
    nox_created_by: "675aae64c81d071ec87bbb56",
    nox_updated_by: "675aae64c81d071ec87bbb56",
    __v: 0,
    parent_id: null,
  },
];

function convertFieldsToConvertedData(fields) {
  const fieldMap = new Map();
  const tree = { fields: [] };

  // First, create a map of all fields by _id for quick lookup
  fields.forEach((field) => {
    if (field.type === "Alias" || field.schema_definition?.type === "Alias") return;
    const fieldType = {};
    let type = field.schema_definition?.type || field.type;

    if (field.type === "Array" && field.field_type === "Object" && type !== field.type) {
      fieldType["arrayType"] = type;
      type = "Array";
    }

    if (field.field_type === "Array") {
      fieldType["arrayType"] = field.schema_definition?.type;
      type = "Array";
    }

    fieldMap.set(field._id, {
      fieldName: field.field,
      type,
      ...fieldType,
      schemaDef: field.schema_definition,
      fields: [],
    });
  });

  // Then, iterate through the fields again to build the hierarchy
  fields.forEach((field) => {
    // if (field.type === "Alias" || field.schema_definition?.type === "Alias") return;
    const node = fieldMap.get(field._id);
    if (field.ref) {
      node.ref = field.ref;
    }

    if (field.parent_id) {
      const parent = fieldMap.get(field.parent_id);
      if (parent) {
        parent.fields.push(node);
      }
    } else {
      tree.fields.push(node);
    }
  });

  return tree;
}

// console.log(convertFieldsToConvertedData(fields), "convertFieldsToConvertedData(fields)");

function convertToPlainSchema(fieldsTree) {
  const schemaObj = {};

  fieldsTree?.fields?.forEach((field) => {
    // CASE 1: Nested Object
    if (field.type === "Object") {
      schemaObj[field.fieldName] = convertToPlainSchema({ fields: field.fields });
      return;
    }

    // CASE 2: Array
    if (field.type === "Array") {
      let arrayType;

      if (field.ref) {
        arrayType = {
          type: "ObjectId",
          ref: field.ref,
        };
      } else if (field.arrayType === "Object") {
        arrayType = convertToPlainSchema({ fields: field.fields });
      } else if (field.arrayType) {
        arrayType = field.arrayType; // "String", "Number", etc.
      } else {
        arrayType = convertToPlainSchema({ fields: field.fields });
      }

      schemaObj[field.fieldName] = [arrayType];
      return;
    }

    // CASE 3: Primitive field
    schemaObj[field.fieldName] = {
      type: field.type,
    };

    // Bind optional constraints
    if (field.required !== undefined) schemaObj[field.fieldName].required = !!field.required;
    if (field.schemaDef?.default !== undefined)
      schemaObj[field.fieldName].default = field.schemaDef.default;
    if (field.ref) schemaObj[field.fieldName].ref = field.ref;
    if (field.schemaDef?.unique) schemaObj[field.fieldName].unique = true;
    if (field.schemaDef?.match) schemaObj[field.fieldName].match = field.schemaDef.match;
    if (field.schemaDef?.min !== undefined) schemaObj[field.fieldName].min = field.schemaDef.min;
    if (field.schemaDef?.max !== undefined) schemaObj[field.fieldName].max = field.schemaDef.max;
    if (field.schemaDef?.trim) schemaObj[field.fieldName].trim = true;
    if (field.schemaDef?.lowercase) schemaObj[field.fieldName].lowercase = true;
  });

  return schemaObj;
}

function createPlainSchema(schemaJson) {
  const deepCopiedFields = JSON.parse(JSON.stringify(schemaJson));
  const convertedTree = convertFieldsToConvertedData(deepCopiedFields);
  return convertToPlainSchema(convertedTree);
}

console.dir(createPlainSchema(fields), { depth: null });

// const mongoose = require("mongoose").Types.ObjectId;

// mongoose
//   .connect("mongodb://root:root@localhost:27017", { dbName: "test" })
//   .then(() => {
//     console.log("MongoDB connected");
//     // Example usage of the UserModel
//     const schemaDef = convertToSchemaTypes(convertFieldsToConvertedData(fields));
//     const UserModel = mongoose.model("user", schemaDef);
//     UserModel.findOneAndReplace(
//       {},
//       {
//         username: "sahil_test1_user",
//         email: "sahil_test1@example.com",
//         date: ["2023-09-06T12:00:00Z"],
//         address: {
//           street: "sahil_test1_street",
//           city: "sahil_test1_city",
//           zip: "sahil_test1_zip",
//           extra: "123",
//         },
//         comments: [
//           {
//             zip1: false,
//             extra: "123",
//             author: "sahil_test1_author",
//             text: "sahil_test1_comment_text",
//             date: "2023-09-05T12:00:00Z",
//             replies: {
//               author: "sahil_test1_reply_author",
//               text: "sahil_test1_reply_text",
//               date: "2023-09-06T12:00:00Z",
//               extra: "123",
//               newarray: [
//                 {
//                   sahil: "2023-09-07T12:00:00Z",
//                   sahil1: "2023-09-08T12:00:00Z",
//                   extra: "123",
//                 },
//               ],
//             },
//           },
//         ],
//         age: 30,
//         numbers: [123, 456],
//         many_to_many: ["alias1", "alias2"],
//         one_to_many: ["alias1", "alias2"],
//         many_to_one: "64eacf5f5a9e4b1d895d9d8c",
//       }
//     )
//       .then((user) => {
//         // console.log("User created:", user);
//       })
//       .catch((err) => {
//         console.error("Error creating user:", err);
//       });
//   })
//   .catch((err) => {
//     console.error("Error connecting to MongoDB:", err);
//   });

// const extractedFields = fields.map(({ field, path }) => ({ field, path, _id: new mongoose() }));
// console.log(JSON.parse(JSON.stringify(extractedFields)));
