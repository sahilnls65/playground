const express = require("express");
const app = express();
const { upperFirst } = require("lodash");

const schema = {
  type: "object",
  title: "",
  $schema: "http://json-schema.org/draft-07/schema#",
  version: 141,
  metadata: {
    render_order: [
      "opdracht",
      "zichtbaarheid",
      "skills",
      "reactionform",
      "das",
      "admincompanysettings",
      "intermediair",
      "netive",
      "netive_updates",
    ],
  },
  required: ["opdracht"],
  properties: {
    das: {
      type: "object",
      title: "DAS",
      metadata: {
        index: true,
        optional: true,
        render_order: [
          "accorderingdasaanvraag",
          "dasarchiveren",
          "dasredenomtearchiveren",
          "das_omschrijving_archiveren",
          "dasguid",
          "das_aanvraag_nummer",
          "das_datum_archiveren",
          "optieverlengingaantal",
          "optieverlengingperiode",
          "dataselectiegesprekken",
          "dataterugkoppelingselectiegesprekken",
          "gevraagdedocumenten",
          "sluitingsdatumopdracht",
          "redenvaninhuur",
          "ko_criteria",
          "linknaardeaanvraag",
          "uurtariefminimaalopdrachtgever",
          "uurtariefmaximaalopdrachtgever",
          "landingspaginaurl",
          "periode_beschrijving",
          "opdracht_periode",
          "documenten",
          "solliciteren_verplichte_documenten",
        ],
      },
      properties: {
        dasguid: {
          type: "string",
          title: "DAS GUID",
          metadata: {
            index: true,
            optional: true,
          },
        },
        documenten: {
          type: "array",
          items: {
            type: "object",
            title: "List item",
            metadata: {
              index: true,
              render_order: [
                "documenttype",
                "documentnaam",
                "document_extensie",
                "document_deeplink",
              ],
            },
            properties: {
              documentnaam: {
                type: "string",
                title: "Documentnaam",
                metadata: {
                  index: true,
                },
              },
              documenttype: {
                enum: ["CV", "VOG", "Motivatie"],
                type: "string",
                title: "Documenttype",
                metadata: {
                  index: true,
                },
              },
              document_deeplink: {
                type: "string",
                title: "Documentdeeplink",
                metadata: {
                  index: true,
                },
              },
              document_extensie: {
                type: "string",
                title: "Documentextensie",
                metadata: {
                  index: true,
                },
              },
            },
          },
          title: "Documenten",
          metadata: {},
        },
        ko_criteria: {
          type: "string",
          title: "KO Criteria",
          metadata: {
            index: true,
            optional: true,
            sub_type: "textarea",
          },
        },
        dasarchiveren: {
          type: "boolean",
          title: "DAS archiveren",
          default: false,
          metadata: {
            index: true,
            optional: true,
            sub_type: "BooleanConfirm",
          },
        },
        redenvaninhuur: {
          type: "string",
          title: "Reden van inhuur",
          metadata: {
            index: true,
            optional: true,
            sub_type: "textarea",
          },
        },
        opdracht_periode: {
          type: "string",
          title: "Opdracht periode",
          metadata: {
            index: true,
            optional: true,
          },
        },
        landingspaginaurl: {
          type: "string",
          title: "LandingspaginaURL",
          metadata: {
            index: true,
          },
        },
        linknaardeaanvraag: {
          type: "string",
          title: "Link naar de aanvraag",
          metadata: {
            index: true,
            optional: true,
          },
        },
        das_aanvraag_nummer: {
          type: "string",
          title: "DAS ​Aanvraag nummer",
          metadata: {
            index: true,
            optional: true,
          },
        },
        gevraagdedocumenten: {
          type: "string",
          title: "Gevraagde documenten",
          metadata: {
            index: true,
            optional: true,
            sub_type: "textarea",
          },
        },
        das_datum_archiveren: {
          type: "string",
          title: "DAS datum archiveren",
          format: "date",
          metadata: {
            index: true,
            optional: true,
          },
        },
        periode_beschrijving: {
          type: "string",
          title: "Periode beschrijving",
          metadata: {
            index: true,
          },
        },
        optieverlengingaantal: {
          type: "string",
          title: "Optie verlenging aantal",
          metadata: {
            index: true,
            optional: true,
          },
        },
        accorderingdasaanvraag: {
          type: "boolean",
          title: "Accordering DAS aanvraag",
          default: false,
          metadata: {
            index: true,
            optional: true,
            sub_type: "BooleanConfirm",
          },
        },
        dasredenomtearchiveren: {
          enum: [
            "Uurtarief",
            "Sluitingsdatum",
            "Locatie",
            "Duur van de opdracht",
            "Niet geschikt voor ondernemer(s)",
            "Werving niet van toepassing",
            "Overig",
          ],
          type: "string",
          title: "DAS reden om te archiveren",
          metadata: {
            index: true,
            optional: true,
          },
        },
        dataselectiegesprekken: {
          type: "string",
          title: "Data selectiegesprekken",
          format: "date",
          metadata: {
            index: true,
            optional: true,
          },
        },
        optieverlengingperiode: {
          type: "string",
          title: "Optie verlenging periode",
          metadata: {
            index: true,
            optional: true,
          },
        },
        sluitingsdatumopdracht: {
          type: "string",
          title: "Sluitingsdatum opdracht",
          format: "date",
          metadata: {
            index: true,
            optional: true,
          },
        },
        das_omschrijving_archiveren: {
          type: "string",
          title: "DAS omschrijving archiveren",
          metadata: {
            index: true,
            optional: true,
            sub_type: "textarea",
          },
        },
        uurtariefmaximaalopdrachtgever: {
          type: "number",
          title: "Uurtarief maximaal opdrachtgever",
          metadata: {
            index: true,
            optional: true,
          },
        },
        uurtariefminimaalopdrachtgever: {
          type: "number",
          title: "Uurtarief minimaal opdrachtgever",
          metadata: {
            index: true,
            optional: true,
          },
        },
        solliciteren_verplichte_documenten: {
          type: "array",
          items: {
            enum: [
              "CV",
              "Diploma",
              "Geheimhoudingsverklaring",
              "VOG",
              "Persoonlijke motivatie ondernemer",
              "Beroepsaansprakelijkheidsverzekering",
              "Bedrijfsaansprakelijkheidsverzekering",
            ],
            type: "string",
            metadata: {
              index: true,
              optional: true,
            },
          },
          title: "Solliciteren verplichte documenten",
          metadata: {
            optional: true,
            sub_type: "MultipleSelectDropdown",
          },
        },
        dataterugkoppelingselectiegesprekken: {
          type: "string",
          title: "Data terugkoppeling selectiegesprekken",
          format: "date",
          metadata: {
            index: true,
            optional: true,
          },
        },
      },
    },
    netive: {
      type: "object",
      title: "Netive",
      metadata: {
        render_order: [
          "referencekey",
          "netivearchiveren",
          "netive_datum_archiveren",
          "netiveredenomtearchiveren",
          "jobrequisition",
          "isnetive",
        ],
      },
      properties: {
        isnetive: {
          type: "boolean",
          title: "isnetive",
          default: false,
          metadata: {
            index: true,
            sub_type: "BooleanConfirm",
          },
        },
        referencekey: {
          type: "string",
          title: "Reference Key",
        },
        jobrequisition: {
          type: "object",
          title: "jobrequisition",
          metadata: {
            index: true,
            render_order: ["publication"],
          },
          properties: {
            publication: {
              type: "object",
              title: "publication",
              metadata: {
                index: true,
                render_order: [
                  "lastmodifieddate",
                  "maximumsubmissions",
                  "publishallowed",
                  "channeltype",
                  "status",
                  "request",
                  "recordid",
                  "publicationstartdate",
                  "publicationlanguage",
                  "publicationenddate",
                  "organizationname",
                  "creationdate",
                  "channel",
                ],
              },
              properties: {
                status: {
                  type: "string",
                  title: "status",
                  metadata: {
                    index: true,
                  },
                },
                channel: {
                  type: "object",
                  title: "channel",
                  metadata: {
                    index: true,
                    render_order: ["channeltype"],
                  },
                  properties: {
                    channeltype: {
                      type: "string",
                      title: "channeltype",
                      metadata: {
                        index: true,
                      },
                    },
                  },
                },
                request: {
                  type: "object",
                  title: "request",
                  metadata: {
                    index: true,
                    render_order: [
                      "url",
                      "status",
                      "lastmodifieddate",
                      "requestdetails",
                      "allocation",
                      "contactdetails",
                      "organisationdetails",
                      "requestnumber",
                      "recordid",
                      "creationdate",
                      "awardcriteria",
                    ],
                  },
                  properties: {
                    url: {
                      type: "string",
                      title: "url",
                      metadata: {
                        index: true,
                      },
                    },
                    status: {
                      type: "string",
                      title: "status",
                      metadata: {
                        index: true,
                      },
                    },
                    recordid: {
                      type: "string",
                      title: "recordid",
                      metadata: {
                        index: true,
                      },
                    },
                    allocation: {
                      type: "object",
                      title: "allocation",
                      metadata: {
                        index: true,
                        render_order: [
                          "grouping",
                          "parcel",
                          "segment",
                          "step",
                          "scale",
                          "regions",
                          "functionlevel",
                          "functioncategory",
                          "function",
                          "educationlevel",
                        ],
                      },
                      properties: {
                        step: {
                          type: "object",
                          title: "step",
                          metadata: {
                            index: true,
                            render_order: ["name"],
                          },
                          properties: {
                            name: {
                              type: "string",
                              title: "name",
                              metadata: {
                                index: true,
                              },
                            },
                          },
                        },
                        scale: {
                          type: "object",
                          title: "scale",
                          metadata: {
                            index: true,
                            render_order: ["name"],
                          },
                          properties: {
                            name: {
                              type: "string",
                              title: "name",
                              metadata: {
                                index: true,
                              },
                            },
                          },
                        },
                        parcel: {
                          type: "string",
                          title: "parcel",
                          metadata: {
                            index: true,
                          },
                        },
                        regions: {
                          type: "object",
                          title: "regions",
                          metadata: {
                            index: true,
                            render_order: ["name"],
                          },
                          properties: {
                            name: {
                              type: "string",
                              title: "name",
                              metadata: {
                                index: true,
                              },
                            },
                          },
                        },
                        segment: {
                          type: "string",
                          title: "segment",
                          metadata: {
                            index: true,
                          },
                        },
                        function: {
                          type: "object",
                          title: "function",
                          metadata: {
                            index: true,
                            render_order: ["name"],
                          },
                          properties: {
                            name: {
                              type: "string",
                              title: "name",
                              metadata: {
                                index: true,
                              },
                            },
                          },
                        },
                        grouping: {
                          type: "string",
                          title: "grouping",
                          metadata: {
                            index: true,
                          },
                        },
                        functionlevel: {
                          type: "object",
                          title: "functionlevel",
                          metadata: {
                            index: true,
                            render_order: ["name"],
                          },
                          properties: {
                            name: {
                              type: "string",
                              title: "name",
                              metadata: {
                                index: true,
                              },
                            },
                          },
                        },
                        educationlevel: {
                          type: "object",
                          title: "educationlevel",
                          metadata: {
                            index: true,
                            render_order: ["name", "textkernelid"],
                          },
                          properties: {
                            name: {
                              type: "string",
                              title: "name",
                              metadata: {
                                index: true,
                              },
                            },
                            textkernelid: {
                              type: "string",
                              title: "textkernelid",
                              metadata: {
                                index: true,
                              },
                            },
                          },
                        },
                        functioncategory: {
                          type: "object",
                          title: "functioncategory",
                          metadata: {
                            index: true,
                            render_order: ["name"],
                          },
                          properties: {
                            name: {
                              type: "string",
                              title: "name",
                              metadata: {
                                index: true,
                              },
                            },
                          },
                        },
                      },
                    },
                    creationdate: {
                      type: "string",
                      title: "creationdate",
                      format: "date",
                      metadata: {
                        index: true,
                      },
                    },
                    awardcriteria: {
                      type: "object",
                      title: "awardcriteria",
                      metadata: {
                        index: true,
                        render_order: ["awardcriterium"],
                      },
                      properties: {
                        awardcriterium: {
                          type: "array",
                          items: {
                            type: "object",
                            title: "List item",
                            metadata: {
                              render_order: [
                                "recordid",
                                "question",
                                "possibleanswers",
                                "criteriontype",
                              ],
                            },
                            properties: {
                              question: {
                                type: "string",
                                title: "question",
                              },
                              recordid: {
                                type: "string",
                                title: "recordId",
                              },
                              criteriontype: {
                                type: "string",
                                title: "criterionType",
                              },
                              possibleanswers: {
                                type: "object",
                                title: "possibleAnswers",
                                metadata: {
                                  render_order: ["answer"],
                                },
                                properties: {
                                  answer: {
                                    type: "array",
                                    items: {
                                      type: "object",
                                      title: "List item",
                                      metadata: {
                                        render_order: ["points", "isknockout", "answer"],
                                      },
                                      properties: {
                                        answer: {
                                          type: "string",
                                          title: "answer",
                                        },
                                        points: {
                                          type: "number",
                                          title: "points",
                                        },
                                        isknockout: {
                                          type: "boolean",
                                          title: "isKnockout",
                                          metadata: {
                                            sub_type: "BooleanConfirm",
                                          },
                                        },
                                      },
                                    },
                                    title: "answer",
                                    metadata: {},
                                  },
                                },
                              },
                            },
                          },
                          title: "awardcriterium",
                          metadata: {},
                        },
                      },
                    },
                    requestnumber: {
                      type: "string",
                      title: "requestnumber",
                      metadata: {
                        index: true,
                      },
                    },
                    contactdetails: {
                      type: "object",
                      title: "Contact Details",
                      metadata: {
                        index: true,
                        render_order: ["mspunit", "mspuser", "requestor"],
                      },
                      properties: {
                        mspunit: {
                          type: "object",
                          title: "msp Unit",
                          metadata: {
                            index: true,
                            render_order: ["phonenumber", "name", "emailaddress"],
                          },
                          properties: {
                            name: {
                              type: "string",
                              title: "name",
                              metadata: {
                                index: true,
                              },
                            },
                            phonenumber: {
                              type: "string",
                              title: "phoneNumber",
                              metadata: {
                                index: true,
                              },
                            },
                            emailaddress: {
                              type: "string",
                              title: "emailAddress",
                              metadata: {
                                index: true,
                              },
                            },
                          },
                        },
                        mspuser: {
                          type: "object",
                          title: "msp User",
                          metadata: {
                            index: true,
                            render_order: [
                              "phonenumber",
                              "name",
                              "middlename",
                              "lastname",
                              "initials",
                              "functiontitle",
                              "firstname",
                              "emailaddress",
                            ],
                          },
                          properties: {
                            name: {
                              type: "string",
                              title: "name",
                              metadata: {
                                index: true,
                              },
                            },
                            initials: {
                              type: "string",
                              title: "initials",
                              metadata: {
                                index: true,
                              },
                            },
                            lastname: {
                              type: "string",
                              title: "lastname",
                              metadata: {
                                index: true,
                              },
                            },
                            firstname: {
                              type: "string",
                              title: "firstname",
                              metadata: {
                                index: true,
                              },
                            },
                            middlename: {
                              type: "string",
                              title: "middlename",
                              metadata: {
                                index: true,
                              },
                            },
                            phonenumber: {
                              type: "string",
                              title: "phoneNumber",
                              metadata: {
                                index: true,
                              },
                            },
                            emailaddress: {
                              type: "string",
                              title: "emailAddress",
                              metadata: {
                                index: true,
                              },
                            },
                            functiontitle: {
                              type: "string",
                              title: "functionTitle",
                              metadata: {
                                index: true,
                              },
                            },
                          },
                        },
                        requestor: {
                          type: "object",
                          title: "requestor",
                          metadata: {
                            index: true,
                            render_order: [
                              "name",
                              "emailaddress",
                              "firstname",
                              "functiontitle",
                              "initials",
                              "lastname",
                              "middlename",
                              "phonenumber",
                            ],
                          },
                          properties: {
                            name: {
                              type: "string",
                              title: "name",
                              metadata: {
                                index: true,
                              },
                            },
                            initials: {
                              type: "string",
                              title: "initials",
                              metadata: {
                                index: true,
                              },
                            },
                            lastname: {
                              type: "string",
                              title: "lastname",
                              metadata: {
                                index: true,
                              },
                            },
                            firstname: {
                              type: "string",
                              title: "firstname",
                              metadata: {
                                index: true,
                              },
                            },
                            middlename: {
                              type: "string",
                              title: "middlename",
                              metadata: {
                                index: true,
                              },
                            },
                            phonenumber: {
                              type: "string",
                              title: "phoneNumber",
                              metadata: {
                                index: true,
                              },
                            },
                            emailaddress: {
                              type: "string",
                              title: "emailAddress",
                              metadata: {
                                index: true,
                              },
                            },
                            functiontitle: {
                              type: "string",
                              title: "functionTitle",
                              metadata: {
                                index: true,
                              },
                            },
                          },
                        },
                      },
                    },
                    requestdetails: {
                      type: "object",
                      title: "Request Details",
                      metadata: {
                        index: true,
                        render_order: [
                          "functiontitle",
                          "maxsalary",
                          "minsalary",
                          "ratetype",
                          "attachmentdetails",
                          "closedreason",
                          "worklocationdescription",
                          "summary",
                          "startdate",
                          "seatcount",
                          "salarytype",
                          "requestprocedure",
                          "minrate",
                          "maxrate",
                          "maximumnumberofextensions",
                          "jobrequirements",
                          "joboffer",
                          "jobdescription",
                          "hoursperweek",
                          "extensionoption",
                          "extensionfinalenddate",
                          "extensionallowed",
                          "estimatedtotalvalue",
                          "estimatedtotalhours",
                          "enddate",
                          "currencyisocode",
                          "companyinformation",
                          "attachmentparentids",
                        ],
                      },
                      properties: {
                        enddate: {
                          type: "string",
                          title: "enddate",
                          format: "date",
                          metadata: {
                            index: true,
                          },
                        },
                        maxrate: {
                          type: "number",
                          title: "maxrate",
                          metadata: {
                            index: true,
                          },
                        },
                        minrate: {
                          type: "number",
                          title: "minRate",
                          metadata: {
                            index: true,
                          },
                        },
                        summary: {
                          type: "string",
                          title: "summary",
                          metadata: {
                            index: true,
                          },
                        },
                        joboffer: {
                          type: "string",
                          title: "joboffer",
                          metadata: {
                            index: true,
                            sub_type: "textarea",
                          },
                        },
                        ratetype: {
                          type: "string",
                          title: "Rate Type",
                          metadata: {
                            index: true,
                          },
                        },
                        maxsalary: {
                          type: "number",
                          title: "Max Salary",
                          metadata: {
                            index: true,
                          },
                        },
                        minsalary: {
                          type: "number",
                          title: "Min Salary",
                          metadata: {
                            index: true,
                          },
                        },
                        seatcount: {
                          type: "integer",
                          title: "seatcount",
                          metadata: {
                            index: true,
                          },
                        },
                        startdate: {
                          type: "string",
                          title: "startdate",
                          format: "date",
                          metadata: {
                            index: true,
                          },
                        },
                        salarytype: {
                          type: "string",
                          title: "salarytype",
                          metadata: {
                            index: true,
                          },
                        },
                        closedreason: {
                          type: "object",
                          title: "Closed Reason",
                          metadata: {
                            index: true,
                            render_order: ["name", "remarks"],
                          },
                          properties: {
                            name: {
                              type: "string",
                              title: "name",
                              metadata: {
                                index: true,
                              },
                            },
                            remarks: {
                              type: "string",
                              title: "remarks",
                              metadata: {
                                index: true,
                              },
                            },
                          },
                        },
                        hoursperweek: {
                          type: "string",
                          title: "hoursperweek",
                          metadata: {
                            index: true,
                          },
                        },
                        functiontitle: {
                          type: "string",
                          title: "Function Title",
                          metadata: {
                            index: true,
                          },
                        },
                        jobdescription: {
                          type: "string",
                          title: "jobdescription",
                          metadata: {
                            index: true,
                            sub_type: "textarea",
                          },
                        },
                        currencyisocode: {
                          type: "string",
                          title: "currencyisocode",
                          metadata: {
                            index: true,
                          },
                        },
                        extensionoption: {
                          type: "string",
                          title: "extensionoption",
                          metadata: {
                            index: true,
                          },
                        },
                        jobrequirements: {
                          type: "string",
                          title: "jobrequirements",
                          metadata: {
                            index: true,
                          },
                        },
                        extensionallowed: {
                          type: "string",
                          title: "extensionallowed",
                          metadata: {
                            index: true,
                          },
                        },
                        requestprocedure: {
                          type: "string",
                          title: "requestprocedure",
                          metadata: {
                            index: true,
                          },
                        },
                        attachmentdetails: {
                          type: "array",
                          items: {
                            type: "object",
                            title: "List item",
                            metadata: {
                              index: true,
                              render_order: ["id", "name", "size", "contenttype", "type"],
                            },
                            properties: {
                              id: {
                                type: "string",
                                title: "id",
                                metadata: {
                                  index: true,
                                },
                              },
                              name: {
                                type: "string",
                                title: "name",
                                metadata: {
                                  index: true,
                                },
                              },
                              size: {
                                type: "string",
                                title: "size",
                                metadata: {
                                  index: true,
                                },
                              },
                              type: {
                                type: "string",
                                title: "type",
                                metadata: {
                                  index: true,
                                },
                              },
                              contenttype: {
                                type: "string",
                                title: "Content Type",
                                metadata: {
                                  index: true,
                                },
                              },
                            },
                          },
                          title: "Attachment Details",
                          metadata: {},
                        },
                        companyinformation: {
                          type: "string",
                          title: "companyinformation",
                          metadata: {
                            index: true,
                          },
                        },
                        attachmentparentids: {
                          type: "array",
                          items: {
                            type: "string",
                            title: "List item",
                            metadata: {
                              index: true,
                            },
                          },
                          title: "attachmentParentIds",
                          metadata: {
                            sub_type: "List",
                          },
                        },
                        estimatedtotalhours: {
                          type: "string",
                          title: "estimatedtotalhours",
                          metadata: {
                            index: true,
                          },
                        },
                        estimatedtotalvalue: {
                          type: "string",
                          title: "estimatedtotalvalue",
                          metadata: {
                            index: true,
                          },
                        },
                        extensionfinalenddate: {
                          type: "string",
                          title: "extensionfinalenddate",
                          format: "date",
                          metadata: {
                            index: true,
                          },
                        },
                        worklocationdescription: {
                          type: "string",
                          title: "worklocationdescription",
                          metadata: {
                            index: true,
                          },
                        },
                        maximumnumberofextensions: {
                          type: "string",
                          title: "maximumnumberofextensions",
                          metadata: {
                            index: true,
                          },
                        },
                      },
                    },
                    lastmodifieddate: {
                      type: "string",
                      title: "Lastmodified Date",
                      format: "date-time",
                      metadata: {
                        index: true,
                      },
                    },
                    organisationdetails: {
                      type: "object",
                      title: "Organisation Details",
                      metadata: {
                        index: true,
                        render_order: ["worklocation", "department", "customer", "businessunit"],
                      },
                      properties: {
                        customer: {
                          type: "object",
                          title: "Customer",
                          metadata: {
                            index: true,
                            optional: true,
                            render_order: ["name", "chambercommercenr"],
                          },
                          properties: {
                            name: {
                              type: "string",
                              title: "Name",
                              metadata: {
                                index: true,
                                optional: true,
                              },
                            },
                            chambercommercenr: {
                              type: "string",
                              title: "chambercommercenr",
                              metadata: {
                                index: true,
                                optional: true,
                              },
                            },
                          },
                        },
                        department: {
                          type: "object",
                          title: "Department",
                          metadata: {
                            index: true,
                            optional: true,
                            render_order: ["name"],
                          },
                          properties: {
                            name: {
                              type: "string",
                              title: "Name",
                              metadata: {
                                index: true,
                                optional: true,
                              },
                            },
                          },
                        },
                        businessunit: {
                          type: "object",
                          title: "businessunit",
                          metadata: {
                            index: true,
                            render_order: ["name"],
                          },
                          properties: {
                            name: {
                              type: "string",
                              title: "name",
                              metadata: {
                                index: true,
                              },
                            },
                          },
                        },
                        worklocation: {
                          type: "object",
                          title: "Work Location",
                          metadata: {
                            index: true,
                            render_order: ["name", "address"],
                          },
                          properties: {
                            name: {
                              type: "string",
                              title: "name",
                              metadata: {
                                index: true,
                              },
                            },
                            address: {
                              type: "object",
                              title: "address",
                              metadata: {
                                index: true,
                                render_order: [
                                  "streetnameadd",
                                  "streetname",
                                  "postalcode",
                                  "housenumberadd",
                                  "housenumber",
                                  "country",
                                  "city",
                                ],
                              },
                              properties: {
                                city: {
                                  type: "string",
                                  title: "city",
                                  metadata: {
                                    index: true,
                                  },
                                },
                                country: {
                                  type: "string",
                                  title: "country",
                                  metadata: {
                                    index: true,
                                  },
                                },
                                postalcode: {
                                  type: "string",
                                  title: "postalCode",
                                  metadata: {
                                    index: true,
                                  },
                                },
                                streetname: {
                                  type: "string",
                                  title: "streetName",
                                  metadata: {
                                    index: true,
                                  },
                                },
                                housenumber: {
                                  type: "string",
                                  title: "houseNumber",
                                  metadata: {
                                    index: true,
                                  },
                                },
                                streetnameadd: {
                                  type: "string",
                                  title: "streetNameAdd",
                                  metadata: {
                                    index: true,
                                  },
                                },
                                housenumberadd: {
                                  type: "string",
                                  title: "houseNumberAdd",
                                  metadata: {
                                    index: true,
                                  },
                                },
                              },
                            },
                          },
                        },
                      },
                    },
                  },
                },
                recordid: {
                  type: "string",
                  title: "recordid",
                  metadata: {
                    index: true,
                  },
                },
                channeltype: {
                  enum: ["Option 1"],
                  type: "string",
                  title: "Channel Type",
                  metadata: {
                    index: true,
                  },
                },
                creationdate: {
                  type: "string",
                  title: "creationdate",
                  format: "date",
                  metadata: {
                    index: true,
                  },
                },
                publishallowed: {
                  type: "boolean",
                  title: "Publish Allowed",
                  metadata: {
                    index: true,
                    sub_type: "BooleanConfirm",
                  },
                },
                lastmodifieddate: {
                  type: "string",
                  title: "Lastmodified Date",
                  format: "date-time",
                  metadata: {
                    index: true,
                  },
                },
                organizationname: {
                  type: "string",
                  title: "organizationname",
                  metadata: {
                    index: true,
                  },
                },
                maximumsubmissions: {
                  type: "integer",
                  title: "Maximum submissions",
                  metadata: {
                    index: true,
                  },
                },
                publicationenddate: {
                  type: "string",
                  title: "publicationenddate",
                  format: "date",
                  metadata: {
                    index: true,
                  },
                },
                publicationlanguage: {
                  type: "string",
                  title: "publicationlanguage",
                  metadata: {
                    index: true,
                  },
                },
                publicationstartdate: {
                  type: "string",
                  title: "publicationstartdate",
                  format: "date",
                  metadata: {
                    index: true,
                  },
                },
              },
            },
          },
        },
        netivearchiveren: {
          type: "boolean",
          title: "netivearchiveren",
          metadata: {
            index: true,
            sub_type: "BooleanConfirm",
          },
        },
        netive_datum_archiveren: {
          type: "string",
          title: "netive_datum_archiveren",
          format: "date-time",
          metadata: {
            index: true,
          },
        },
        netiveredenomtearchiveren: {
          type: "string",
          title: "netiveredenomtearchiveren",
          metadata: {
            index: true,
          },
        },
      },
    },
    skills: {
      type: "object",
      title: "Skills",
      metadata: {
        index: true,
        render_order: ["selectedskills", "selected_skillcodes"],
      },
      properties: {
        selectedskills: {
          type: "array",
          items: {
            type: "object",
            properties: {
              display: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    path: {
                      type: "string",
                      title: "Selected Skills - path",
                      metadata: {
                        index: true,
                      },
                    },
                    value: {
                      type: "string",
                      title: "Selected Skills",
                      metadata: {
                        index: true,
                      },
                    },
                  },
                },
              },
              identification: {
                type: "string",
                title: "Selected Skills",
                metadata: {
                  index: true,
                },
              },
            },
          },
          title: "Selected Skills",
          metadata: {
            custom_type: "omniselect2",
            custom_component: true,
            omniselect_query: {
              definitions: ["75dda2b1-7390-4a90-ada2-2ad0dc30e5d9"],
            },
            omniselect_display: ["$.name", '$.content["skillnaam-skillgroep-identification"]'],
            omniselect_multiple: true,
            omniselect_variables: [],
            omniselect_search_options: ["NAME", "IDENTIFIER", "IDENTIFICATION", "CONTENT"],
            omniselect_populate_fields: [],
          },
        },
        selected_skillcodes: {
          type: "array",
          items: {
            type: "object",
            metadata: {
              index: true,
              sub_type: "TableRow",
              render_order: ["description", "category", "code_id", "is_other"],
              indexing_text_search: true,
            },
            required: [],
            properties: {
              code_id: {
                type: "string",
                title: "code_id",
                metadata: {
                  index: true,
                  indexing_text_search: true,
                },
              },
              category: {
                type: "string",
                title: "category",
                metadata: {
                  index: true,
                  indexing_text_search: true,
                },
              },
              is_other: {
                type: "boolean",
                title: "is_other",
                metadata: {
                  index: true,
                  sub_type: "BooleanConfirm",
                },
              },
              description: {
                type: "string",
                title: "description",
                metadata: {
                  index: true,
                  indexing_text_search: true,
                },
              },
            },
          },
          title: "Selected Skillcodes",
          metadata: {
            sub_type: "Table",
          },
        },
      },
    },
    opdracht: {
      type: "object",
      title: "Opdracht",
      metadata: {
        optional: true,
        render_order: [
          "status",
          "aantal_ondernemers_die_je_wilt_aannemen",
          "naamopdracht",
          "korteomschrijving",
          "preview_tekst",
          "uitgebreideomschrijving",
          "mijnbedrijf",
          "mijnvestiging",
          "plaatsvanopdracht",
          "werklocatielat",
          "werklocatielng",
          "mogelijkheid_hybride_werken",
          "startdatumopdracht",
          "startdatum_opdracht_in_overleg",
          "einddatumopdracht",
          "einddatum_opdracht_in_overleg",
          "aantaluurperweek",
          "maximumaantaluurperweek",
          "aantalurenperiode",
          "uurtarief",
          "uurtariefmax",
          "all_in_tarief",
          "opdrachttype",
          "opdracht_type__opdrachtduur_optie_tot_verlenging",
          "verwachte_kennismaking",
          "sector",
          "vakgebied",
          "benodigdeskills",
          "opleidingsniveau",
          "opzegtermijn",
          "concurrentiebeding",
          "aansprakelijkheidsbeperkingzzper",
          "minverzekerdbedragpergebeurtenis",
          "minverzekerdbedragperkalenderjaar",
          "eigenaar",
          "opdrachtlite",
          "url",
          "bedrijfsnaam",
          "jobfeedid",
          "jobfeeduniquename",
          "order",
          "tellertotaalaantalkeerbekeken",
          "isdasopdracht",
          "afbeelding_bedrijfslogo",
          "afbeelding_eigenupload",
          "professiondescription",
          "priority_assignment",
        ],
      },
      required: [
        "status",
        "naamopdracht",
        "korteomschrijving",
        "uitgebreideomschrijving",
        "eigenaar",
        "aantaluurperweek",
        "aantalurenperiode",
        "mijnbedrijf",
        "uurtarief",
        "uurtariefmax",
        "aantal_ondernemers_die_je_wilt_aannemen",
        "maximumaantaluurperweek",
      ],
      properties: {
        url: {
          type: "string",
          title: "Url",
          format: "uri",
          metadata: {
            index: true,
            optional: true,
          },
        },
        order: {
          type: "integer",
          title: "Bron opdracht",
          default: 0,
          metadata: {
            index: true,
            optional: true,
          },
        },
        sector: {
          type: "array",
          items: {
            enum: ["Option 1"],
            type: "string",
            metadata: {
              index: true,
              optional: true,
            },
          },
          title: "Sector",
          metadata: {
            optional: true,
            sub_type: "MultipleSelectDropdown",
          },
        },
        status: {
          enum: ["Open", "Gesloten", "Ingetrokken", "Vervuld door Younited®", "Vervuld anders"],
          type: "string",
          title: "Status",
          default: "Open",
          metadata: {
            index: true,
            optional: true,
          },
        },
        eigenaar: {
          type: "object",
          title: "Eigenaar",
          metadata: {
            optional: true,
            custom_type: "omniselect2",
            view_instance: true,
            custom_component: true,
            omniselect_query: {
              definitions: ["65acdc47-369c-4089-a6b8-c6937fb7a356"],
            },
            omniselect_display: [
              "$.name",
              '$.content["profiel-voornaam"]',
              '$.content["profiel-tussenvoegsel"]',
              '$.content["profiel-achternaam"]',
            ],
            omniselect_variables: [],
            omniselect_populate_fields: [],
          },
          required: ["identification"],
          properties: {
            display: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  path: {
                    type: "string",
                    title: "Eigenaar - path",
                    metadata: {
                      index: true,
                    },
                  },
                  value: {
                    type: "string",
                    title: "Eigenaar",
                    metadata: {
                      index: true,
                    },
                  },
                },
              },
            },
            identification: {
              type: "string",
              title: "Eigenaar",
              metadata: {
                index: true,
              },
            },
          },
        },
        jobfeedid: {
          type: "string",
          title: "JobFeedId",
          metadata: {
            index: true,
            optional: true,
            sub_type: "textarea",
            textarea_rows: 4,
          },
        },
        uurtarief: {
          type: "number",
          title: "Uurtarief Minimaal",
          metadata: {
            index: true,
            optional: true,
          },
        },
        vakgebied: {
          type: "array",
          items: {
            enum: ["Option 1"],
            type: "string",
            metadata: {
              index: true,
              optional: true,
            },
          },
          title: "Vakgebied",
          metadata: {
            optional: true,
            sub_type: "MultipleSelectDropdown",
          },
        },
        mijnbedrijf: {
          type: "object",
          title: "Mijn bedrijf",
          metadata: {
            optional: true,
            custom_type: "omniselect2",
            view_instance: true,
            custom_component: true,
            omniselect_query: {
              definitions: ["c3c4c3c8-c64e-4eef-a5b6-7ead138cb4a7"],
            },
            navigate_instance: true,
            omniselect_display: ["$.name", "$.identification"],
            omniselect_variables: [],
            omniselect_search_options: ["NAME", "IDENTIFIER", "IDENTIFICATION"],
            omniselect_populate_fields: [],
          },
          required: ["identification"],
          properties: {
            display: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  path: {
                    type: "string",
                    title: "Mijn bedrijf - path",
                  },
                  value: {
                    type: "string",
                    title: "Mijn bedrijf",
                    metadata: {
                      index: true,
                    },
                  },
                },
              },
            },
            identification: {
              type: "string",
              title: "Mijn bedrijf",
            },
          },
        },
        bedrijfsnaam: {
          type: "string",
          title: "Bedrijfsnaam",
          metadata: {
            index: true,
            optional: true,
          },
        },
        naamopdracht: {
          type: "string",
          title: "Naam opdracht",
          metadata: {
            index: true,
            optional: true,
            indexing_text_search: true,
            conditional_rendering: [],
          },
          maxLength: 500,
        },
        opdrachtlite: {
          type: "boolean",
          title: "opdracht-lite",
          metadata: {
            index: true,
          },
        },
        opdrachttype: {
          type: "array",
          items: {
            enum: [
              "Tot 3 maanden",
              "3 tot 6 maanden",
              "6 tot 12 maanden",
              "Langer dan 12 maanden",
              " ",
            ],
            type: "string",
            metadata: {
              index: true,
              optional: true,
            },
          },
          title: "Opdracht type / Opdrachtduur",
          default: [" "],
          metadata: {
            optional: true,
            sub_type: "MultipleSelectDropdown",
          },
        },
        opzegtermijn: {
          enum: ["Ja, 1 maand wederzijds"],
          type: "string",
          title: "Opzegtermijn",
          default: "Ja, 1 maand wederzijds",
          metadata: {},
        },
        uurtariefmax: {
          type: "number",
          title: "Uurtarief Maximaal",
          metadata: {
            index: true,
            optional: true,
          },
        },
        all_in_tarief: {
          type: "boolean",
          title: "all-in tarief",
          default: true,
          metadata: {
            index: true,
            optional: true,
            sub_type: "BooleanConfirm",
          },
        },
        isdasopdracht: {
          type: "boolean",
          title: "IsDasOpdracht",
          default: false,
          metadata: {
            sub_type: "BooleanConfirm",
          },
        },
        mijnvestiging: {
          type: "object",
          title: "Mijn vestiging/locatie",
          metadata: {
            optional: true,
            custom_type: "omniselect2",
            custom_component: true,
            omniselect_query: {
              definitions: ["10063e0c-9655-4240-af37-717b1d220d2f"],
            },
            omniselect_variables: [],
            omniselect_populate_fields: [],
          },
          properties: {
            display: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  path: {
                    type: "string",
                    title: "Mijn vestiging/locatie - path",
                  },
                  value: {
                    type: "string",
                    title: "Mijn vestiging/locatie",
                    metadata: {
                      index: true,
                    },
                  },
                },
              },
            },
            identification: {
              type: "string",
              title: "Mijn vestiging/locatie",
            },
          },
        },
        preview_tekst: {
          type: "string",
          title: "Preview tekst",
          metadata: {
            index: true,
            sub_type: "textarea",
          },
        },
        werklocatielat: {
          type: "string",
          title: "werklocatie-lat",
          metadata: {
            index: true,
            optional: true,
          },
        },
        werklocatielng: {
          type: "string",
          title: "werklocatie-lng",
          metadata: {
            index: true,
            optional: true,
          },
        },
        benodigdeskills: {
          type: "array",
          items: {
            type: "object",
            metadata: {
              optional: true,
            },
            properties: {
              display: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    path: {
                      type: "string",
                      title: "Vaardigheden - path",
                    },
                    value: {
                      type: "string",
                      title: "Vaardigheden",
                    },
                  },
                },
              },
              identification: {
                type: "string",
                title: "Vaardigheden",
              },
            },
          },
          title: "Vaardigheden",
          metadata: {
            optional: true,
            custom_type: "omniselect2",
            custom_component: true,
            omniselect_query: {
              definitions: ["75dda2b1-7390-4a90-ada2-2ad0dc30e5d9"],
            },
            omniselect_multiple: true,
            omniselect_variables: [],
            omniselect_populate_fields: [],
          },
        },
        aantaluurperweek: {
          type: "number",
          title: "Aantal uur Minimaal",
          metadata: {
            index: true,
            optional: true,
          },
        },
        opleidingsniveau: {
          enum: ["Geen", "Basisonderwijs", "MAVO/VMBO", "HAVO", "VWO", "MBO", "HBO", "WO"],
          type: "string",
          title: "Opleidingsniveau",
          metadata: {
            index: true,
            optional: true,
          },
        },
        aantalurenperiode: {
          enum: ["Per dag", "Per week", "Per maand", "Per kwartaal", "Per half jaar", "Per jaar"],
          type: "string",
          title: "Aantal uren periode",
          default: "Per week",
          metadata: {
            index: true,
            optional: true,
          },
        },
        einddatumopdracht: {
          type: "string",
          title: "Einddatum opdracht",
          format: "date",
          metadata: {
            index: true,
            optional: true,
          },
        },
        jobfeeduniquename: {
          type: "string",
          title: "JobFeedUniqueName",
          metadata: {
            index: true,
            optional: true,
          },
        },
        korteomschrijving: {
          type: "string",
          title: "Korte omschrijving",
          metadata: {
            index: true,
            optional: true,
            sub_type: "textarea",
            textarea_rows: 20,
          },
        },
        plaatsvanopdracht: {
          enum: ["Utrecht", "Arnhem", "Amsterdam", "Rotterdam", "Den Haag"],
          type: "string",
          title: "Plaats van opdracht",
          metadata: {
            index: true,
            optional: true,
            indexing_text_search: true,
          },
        },
        concurrentiebeding: {
          enum: ["Geen"],
          type: "string",
          title: "Concurrentiebeding",
          default: "Geen",
          metadata: {},
        },
        startdatumopdracht: {
          type: "string",
          title: "Startdatum opdracht",
          format: "date",
          metadata: {
            index: true,
            optional: true,
          },
        },
        priority_assignment: {
          type: "boolean",
          title: "Priority assignment",
          default: false,
          metadata: {
            index: true,
            sub_type: "BooleanConfirm",
          },
        },
        professiondescription: {
          type: "string",
          title: "professionDescription",
          metadata: {
            index: true,
          },
        },
        afbeelding_eigenupload: {
          type: "boolean",
          title: "Afbeelding eigenupload",
          default: false,
          metadata: {
            sub_type: "BooleanConfirm",
          },
        },
        verwachte_kennismaking: {
          type: "object",
          title: "Verwachte kennismaking",
          metadata: {
            index: true,
            optional: true,
            render_order: ["optie_1", "optie_2"],
          },
          properties: {
            optie_1: {
              type: "string",
              title: "Optie 1",
              format: "date",
              metadata: {
                index: true,
                optional: true,
              },
            },
            optie_2: {
              type: "string",
              title: "Optie 2",
              format: "date",
              metadata: {
                index: true,
                optional: true,
              },
            },
          },
        },
        afbeelding_bedrijfslogo: {
          type: "boolean",
          title: "afbeelding bedrijfslogo",
          default: false,
          metadata: {
            sub_type: "BooleanConfirm",
          },
        },
        maximumaantaluurperweek: {
          type: "number",
          title: "Aantal uur Maximaal",
          metadata: {
            index: true,
          },
        },
        uitgebreideomschrijving: {
          type: "string",
          title: "Omschrijving opdracht",
          metadata: {
            index: true,
            optional: true,
            sub_type: "texteditor",
            texteditorOptions: [
              "bold",
              "underline",
              "headings",
              "italic",
              "strike",
              "heading1",
              "heading2",
              "heading3",
              "ordered_list",
              "bullet_list",
            ],
          },
        },
        mogelijkheid_hybride_werken: {
          type: "boolean",
          title: "Mogelijkheid hybride werken",
          default: false,
          metadata: {
            index: true,
            optional: true,
            sub_type: "BooleanConfirm",
          },
        },
        einddatum_opdracht_in_overleg: {
          type: "boolean",
          title: "Einddatum Opdracht in overleg",
          default: false,
          metadata: {
            index: true,
            sub_type: "BooleanConfirm",
          },
        },
        tellertotaalaantalkeerbekeken: {
          type: "integer",
          title: "Teller totaal aantal keer bekeken",
          metadata: {
            index: true,
          },
        },
        startdatum_opdracht_in_overleg: {
          type: "boolean",
          title: "Startdatum Opdracht in overleg",
          default: false,
          metadata: {
            index: true,
            optional: true,
            sub_type: "BooleanConfirm",
          },
        },
        aansprakelijkheidsbeperkingzzper: {
          type: "string",
          title: "Aansprakelijkheidsbeperking zzp'er",
          default: "Nog overeen te komen",
          metadata: {},
        },
        minverzekerdbedragpergebeurtenis: {
          type: "number",
          title: "Min. verzekerd bedrag per gebeurtenis",
          metadata: {},
        },
        minverzekerdbedragperkalenderjaar: {
          type: "number",
          title: "Min. verzekerd bedrag per kalenderjaar",
          metadata: {
            optional: true,
          },
        },
        aantal_ondernemers_die_je_wilt_aannemen: {
          type: "integer",
          title: "Aantal ondernemers die je wilt aannemen",
          default: 1,
          metadata: {
            index: true,
            optional: true,
            help_message:
              "Geef hier op hoeveel ondernemers je wilt aannemen voor deze opdracht. Standaard waarde is 1 maar het is mogelijk om meer dan 1 ondernemer voor de opdracht aan te nemen. ",
          },
        },
        opdracht_type__opdrachtduur_optie_tot_verlenging: {
          type: "boolean",
          title: "Opdracht type / Opdrachtduur Optie tot verlenging",
          default: false,
          metadata: {
            index: true,
            optional: true,
            sub_type: "BooleanConfirm",
          },
        },
      },
    },
    intermediair: {
      type: "object",
      title: "Intermediair",
      metadata: {
        index: true,
        render_order: [
          "is_intermediair_opdracht",
          "intermediair_mag_voorstellen",
          "opdracht_als_intermediair_tonen_of_als_intermediair_met_organisatie",
          "intermediair_bedrijf",
        ],
      },
      properties: {
        intermediair_bedrijf: {
          type: "object",
          title: "Intermediair bedrijf",
          metadata: {
            custom_type: "omniselect2",
            omniselect_type: "search",
            custom_component: true,
            omniselect_query: {
              definitions: ["4b6ac88d-afb3-4492-8fc3-874624e86358"],
            },
            omniselect_populate: false,
            omniselect_variables: [],
            omniselect_populate_fields: [
              {
                field: "",
                property: "",
              },
            ],
          },
          properties: {
            display: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  path: {
                    type: "string",
                    title: "Intermediair bedrijf - path",
                  },
                  value: {
                    type: "string",
                    title: "Intermediair bedrijf",
                    metadata: {
                      index: true,
                    },
                  },
                },
              },
            },
            identification: {
              type: "string",
              title: "Intermediair bedrijf",
            },
          },
        },
        is_intermediair_opdracht: {
          type: "boolean",
          title: "Is intermediair opdracht",
          default: false,
          metadata: {
            index: true,
            sub_type: "BooleanConfirm",
          },
        },
        intermediair_mag_voorstellen: {
          type: "boolean",
          title: "Intermediair mag voorstellen",
          default: false,
          metadata: {
            index: true,
            sub_type: "BooleanConfirm",
            description:
              "Option so we know if intermediair can propose any freelancer on the assignment. When set to true, then all intermediates see this assignment and can propose candidates",
          },
        },
        opdracht_als_intermediair_tonen_of_als_intermediair_met_organisatie: {
          type: "boolean",
          title: "Opdracht als intermediair tonen of als intermediair met organisatie",
          metadata: {
            index: true,
            sub_type: "BooleanConfirm",
            description:
              "TRUE = Show as intermediair only (Example: NowOnline) \nFALSE = Show as intermediair with the underlaying organisation. (Example: NowOnline (Samsung))",
          },
        },
      },
    },
    reactionform: {
      type: "object",
      title: "Reactionform",
      metadata: {
        index: true,
        render_order: ["reference", "documents", "certificates", "diplomas", "knock-out_questions"],
      },
      properties: {
        diplomas: {
          type: "object",
          title: "Diplomas",
          metadata: {
            render_order: ["diplomas_required", "custom_diploma"],
          },
          properties: {
            custom_diploma: {
              type: "array",
              items: {
                type: "object",
                title: "List item",
                metadata: {
                  index: true,
                  render_order: ["diplomaname", "required"],
                },
                properties: {
                  required: {
                    type: "boolean",
                    title: "Required",
                    default: false,
                    metadata: {
                      index: true,
                      sub_type: "BooleanConfirm",
                    },
                  },
                  diplomaname: {
                    type: "string",
                    title: "Diplomaname",
                    metadata: {
                      index: true,
                    },
                  },
                },
              },
              title: "Custom diploma",
              metadata: {
                sub_type: "List",
              },
            },
            diplomas_required: {
              type: "boolean",
              title: "Diplomas required",
              default: false,
              metadata: {
                index: true,
                sub_type: "BooleanConfirm",
              },
            },
          },
        },
        documents: {
          type: "object",
          title: "Documents",
          metadata: {
            render_order: ["documents_required", "document", "custom_document"],
          },
          properties: {
            document: {
              type: "object",
              title: "Document",
              metadata: {
                index: true,
                render_order: [
                  "beroepsaansprakelijkheidsverzekering",
                  "bhv",
                  "geheimhoudingsverklaring",
                  "gedragscode",
                  "integriteitsverklaring",
                  "vog",
                ],
              },
              properties: {
                bhv: {
                  type: "boolean",
                  title: "BHV",
                  default: false,
                  metadata: {
                    index: true,
                    sub_type: "BooleanConfirm",
                  },
                },
                vog: {
                  type: "boolean",
                  title: "VOG",
                  default: false,
                  metadata: {
                    index: true,
                    sub_type: "BooleanConfirm",
                  },
                },
                gedragscode: {
                  type: "boolean",
                  title: "Gedragscode",
                  default: false,
                  metadata: {
                    index: true,
                    sub_type: "BooleanConfirm",
                  },
                },
                integriteitsverklaring: {
                  type: "boolean",
                  title: "Integriteitsverklaring",
                  default: false,
                  metadata: {
                    index: true,
                    sub_type: "BooleanConfirm",
                  },
                },
                geheimhoudingsverklaring: {
                  type: "boolean",
                  title: "Geheimhoudingsverklaring",
                  default: false,
                  metadata: {
                    index: true,
                    sub_type: "BooleanConfirm",
                  },
                },
                beroepsaansprakelijkheidsverzekering: {
                  type: "boolean",
                  title: "Beroepsaansprakelijkheidsverzekering",
                  default: false,
                  metadata: {
                    index: true,
                    sub_type: "BooleanConfirm",
                  },
                },
              },
            },
            custom_document: {
              type: "array",
              items: {
                type: "object",
                title: "List item",
                metadata: {
                  index: true,
                  render_order: ["documentname", "required"],
                },
                properties: {
                  required: {
                    type: "boolean",
                    title: "Required",
                    default: false,
                    metadata: {
                      index: true,
                      sub_type: "BooleanConfirm",
                    },
                  },
                  documentname: {
                    type: "string",
                    title: "Documentname",
                    metadata: {
                      index: true,
                    },
                  },
                },
              },
              title: "Custom document",
              metadata: {
                sub_type: "List",
              },
            },
            documents_required: {
              type: "boolean",
              title: "Documents required",
              default: false,
              metadata: {
                index: true,
                sub_type: "BooleanConfirm",
              },
            },
          },
        },
        reference: {
          type: "object",
          title: "Reference",
          metadata: {
            render_order: ["reference_required"],
          },
          properties: {
            reference_required: {
              type: "boolean",
              title: "Reference required",
              default: false,
              metadata: {
                index: true,
                sub_type: "BooleanConfirm",
              },
            },
          },
        },
        certificates: {
          type: "object",
          title: "Certificates",
          metadata: {
            render_order: ["certificates_required", "certificate", "custom_certificate"],
          },
          properties: {
            certificate: {
              type: "object",
              title: "Certificate",
              metadata: {
                index: true,
                render_order: ["big-registratie", "haccp", "medicatie", "skj-registratie", "vca"],
              },
              properties: {
                vca: {
                  type: "boolean",
                  title: "VCA",
                  default: false,
                  metadata: {
                    index: true,
                    sub_type: "BooleanConfirm",
                  },
                },
                haccp: {
                  type: "boolean",
                  title: "HACCP",
                  default: false,
                  metadata: {
                    index: true,
                    sub_type: "BooleanConfirm",
                  },
                },
                medicatie: {
                  type: "boolean",
                  title: "Medicatie",
                  metadata: {
                    index: true,
                    sub_type: "BooleanConfirm",
                  },
                },
                "big-registratie": {
                  type: "boolean",
                  title: "BIG-registratie",
                  default: false,
                  metadata: {
                    index: true,
                    sub_type: "BooleanConfirm",
                  },
                },
                "skj-registratie": {
                  type: "boolean",
                  title: "SKJ-registratie",
                  default: false,
                  metadata: {
                    index: true,
                    sub_type: "BooleanConfirm",
                  },
                },
              },
            },
            custom_certificate: {
              type: "array",
              items: {
                type: "object",
                title: "List item",
                metadata: {
                  index: true,
                  render_order: ["certificatename", "required"],
                },
                properties: {
                  required: {
                    type: "boolean",
                    title: "Required",
                    default: false,
                    metadata: {
                      index: true,
                      sub_type: "BooleanConfirm",
                    },
                  },
                  certificatename: {
                    type: "string",
                    title: "Certificatename",
                    metadata: {
                      index: true,
                    },
                  },
                },
              },
              title: "Custom certificate",
              metadata: {
                sub_type: "List",
              },
            },
            certificates_required: {
              type: "boolean",
              title: "Certificates required",
              default: false,
              metadata: {
                index: true,
                sub_type: "BooleanConfirm",
              },
            },
          },
        },
        "knock-out_questions": {
          type: "object",
          title: "Knock-out questions",
          metadata: {
            render_order: ["knock-out_questions_required", "knock-out_question"],
          },
          properties: {
            "knock-out_question": {
              type: "array",
              items: {
                type: "object",
                title: "List item",
                metadata: {
                  index: true,
                  render_order: ["question", "anwser"],
                },
                properties: {
                  anwser: {
                    type: "boolean",
                    title: "Anwser",
                    default: false,
                    metadata: {
                      index: true,
                      sub_type: "BooleanConfirm",
                    },
                  },
                  question: {
                    type: "string",
                    title: "Question",
                    metadata: {
                      index: true,
                    },
                  },
                },
              },
              title: "Knock-out question",
              metadata: {
                sub_type: "List",
              },
            },
            "knock-out_questions_required": {
              type: "boolean",
              title: "Knock-out questions required",
              default: false,
              metadata: {
                index: true,
                sub_type: "BooleanConfirm",
              },
            },
          },
        },
      },
    },
    zichtbaarheid: {
      type: "object",
      title: "Zichtbaarheid",
      metadata: {
        index: true,
        optional: true,
        render_order: ["zichtbaar", "zichtbaarvanaf", "zichtbaartot", "allreactionsareviewed"],
      },
      properties: {
        zichtbaar: {
          type: "boolean",
          title: "De opdracht is gepubliceerd?",
          metadata: {
            index: true,
            optional: true,
            help_message: "",
            conditional_rendering: [],
          },
        },
        zichtbaartot: {
          type: "string",
          title: "Zichtbaar tot",
          format: "date",
          metadata: {
            index: true,
            optional: true,
          },
        },
        zichtbaarvanaf: {
          type: "string",
          title: "Zichtbaar vanaf",
          format: "date",
          metadata: {
            index: true,
            optional: true,
          },
        },
        allreactionsareviewed: {
          type: "boolean",
          title: "AllReactionsAreViewed",
          metadata: {
            index: true,
            sub_type: "BooleanConfirm",
          },
        },
      },
    },
    netive_updates: {
      type: "array",
      items: {
        type: "object",
        title: "List item",
        metadata: {
          index: true,
          render_order: ["date", "json", "seen_and_close"],
        },
        properties: {
          date: {
            type: "string",
            title: "date",
            format: "date-time",
            metadata: {
              index: true,
            },
          },
          json: {
            type: "string",
            title: "json",
            metadata: {
              index: true,
              sub_type: "textarea",
            },
          },
          seen_and_close: {
            type: "boolean",
            title: "seen and close",
            metadata: {
              index: true,
              sub_type: "BooleanConfirm",
            },
          },
        },
      },
      title: "Netive Updates",
      metadata: {
        sub_type: "List",
      },
    },
    admincompanysettings: {
      type: "object",
      title: "AdminCompanySettings",
      metadata: {
        render_order: ["isdisabled", "preview_tekst_op_younitednl"],
      },
      properties: {
        isdisabled: {
          type: "boolean",
          title: "IsDisabled",
          default: false,
          metadata: {
            index: true,
          },
        },
        preview_tekst_op_younitednl: {
          type: "boolean",
          title: "Preview tekst op younited.nl",
          default: true,
          metadata: {
            index: true,
            optional: true,
            sub_type: "BooleanConfirm",
          },
        },
      },
    },
  },
};

function convertSchemaToNewObject(schema) {
  const newObject = {};
  for (const [propertyName, propertySchema] of Object.entries(schema.properties)) {
    const propertyType = propertySchema.type;
    if (propertyType === "object") {
      if (propertySchema.metadata?.omniselect_query?.definitions?.length > 0) {
        newObject[propertyName] = {
          type: "mongoose.Schema.Types.ObjectId",
          ref: "ref model",
        };
      } else {
        newObject[propertyName] = convertSchemaToNewObject(propertySchema);
      }
    } else if (propertyType === "array") {
      if (propertySchema.metadata?.omniselect_query?.definitions?.length > 0) {
        newObject[propertyName] = [
          {
            type: "mongoose.Schema.Types.ObjectId",
            ref: "ref model",
          },
        ];
      } else {
        const itemsSchema = propertySchema.items;
        const itemsType = itemsSchema.type;
        if (itemsType === "object") {
          newObject[propertyName] = [convertSchemaToNewObject(itemsSchema)];
        } else if (itemsType === "string") {
          let type = upperFirst(propertyType);
          if (["date"].includes(itemsSchema.format)) {
            type = "Date";
          }

          let typeObject = {
            type: type,
          };

          if (schema?.required?.includes(propertyName)) {
            typeObject = {
              ...typeObject,
              required: true,
            };
          }

          // if (itemsSchema?.metadata?.optional) {
          //   typeObject = {
          //     ...typeObject,
          //     optional: itemsSchema?.metadata?.optional,
          //   };
          // }

          if (itemsSchema.enum) {
            typeObject = {
              ...typeObject,
              enum: itemsSchema.enum,
            };
          }

          newObject[propertyName] = {
            ...typeObject,
          };
        } else {
          newObject[propertyName] = [];
        }
      }
    } else {
      let type = upperFirst(propertyType);
      if (["date"].includes(propertySchema.format)) {
        type = "Date";
      }

      let typeObject = {
        type: type,
      };

      if (schema?.required?.includes(propertyName)) {
        typeObject = {
          ...typeObject,
          required: true,
        };
      }

      // if (propertySchema?.metadata?.optional) {
      //   typeObject = {
      //     ...typeObject,
      //     optional: propertySchema?.metadata?.optional,
      //   };
      // }

      if (propertySchema.enum) {
        typeObject = {
          ...typeObject,
          enum: propertySchema.enum,
        };
      }

      newObject[propertyName] = {
        ...typeObject,
      };
    }
  }
  return newObject;
}

app.get("/schema", async (req, res) => {
  const newObject = convertSchemaToNewObject(schema);
  res.send(newObject);
});

let server = app.listen(5000, () => {
  console.log("Server listening on port 5000");
});
