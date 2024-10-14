const { ObjectId } = require("mongodb");
const fs = require("fs");

const modules = [
  { name: "actionwidget", code: "ACTIONWIDGET" },
  { name: "auth", code: "AUTH" },
  { name: "chat", code: "CHAT" },
  { name: "common", code: "COMMON" },
  { name: "dasgroup", code: "DASGROUP" },
  { name: "dashboard", code: "DASHBOARD" },
  { name: "dasplatform", code: "DASPLATFORM" },
  { name: "evenement", code: "EVENEMENT" },
  { name: "favorite_opdrachten", code: "FAVORITE_OPDRACHTEN" },
  { name: "favorite_post", code: "FAVORITE_POST" },
  { name: "favorite_user", code: "FAVORITE_USER" },
  { name: "field_restriction", code: "FIELD_RESTRICTION" },
  { name: "follower", code: "FOLLOWER" },
  { name: "inschijving", code: "INSCHIJVING" },
  { name: "kvk", code: "KVK" },
  { name: "locale", code: "LOCALE" },
  { name: "module", code: "MODULE" },
  { name: "nieuws", code: "NIEUWS" },
  { name: "notificatie", code: "NOTIFICATIE" },
  { name: "opdracht", code: "OPDRACHT" },
  { name: "organisatie", code: "ORGANISATIE" },
  { name: "personal_access_token", code: "PERSONAL_ACCESS_TOKEN" },
  { name: "post", code: "POST" },
  { name: "product_statistieken", code: "PRODUCT_STATISTIEKEN" },
  { name: "role", code: "ROLE" },
  { name: "service", code: "SERVICE" },
  { name: "standard_tekst", code: "STANDARD_TEKST" },
  { name: "store_mollie_billing_company", code: "STORE_MOLLIE_BILLING_COMPANY" },
  { name: "store_order", code: "STORE_ORDER" },
  { name: "store_payment_method", code: "STORE_PAYMENT_METHOD" },
  { name: "store_product", code: "STORE_PRODUCT" },
  { name: "store_product_groep", code: "STORE_PRODUCT_GROEP" },
  { name: "store_supplier", code: "STORE_SUPPLIER" },
  { name: "system_notification", code: "SYSTEM_NOTIFICATION" },
  { name: "taak", code: "TAAK" },
  { name: "textkernel", code: "TEXTKERNEL" },
  { name: "transaction", code: "TRANSACTION" },
  { name: "user_action_widget", code: "USER_ACTION_WIDGET" },
  { name: "user_inschijving", code: "USER_INSCHIJVING" },
  { name: "user_organisatie", code: "USER_ORGANISATIE" },
  { name: "user_post", code: "USER_POST" },
  { name: "user_standard_tekst", code: "USER_STANDARD_TEKST" },
  { name: "user_store_product", code: "USER_STORE_PRODUCT" },
  { name: "user_store_product_groep", code: "USER_STORE_PRODUCT_GROEP" },
  { name: "user_taak", code: "USER_TAAK" },
  { name: "user_widget_banner", code: "USER_WIDGET_BANNER" },
  { name: "user", code: "USER" },
  { name: "user_profile_view", code: "USER_PROFILE_VIEW" },
  { name: "user_wizard", code: "USER_WIZARD" },
  { name: "widget_banner", code: "WIDGET_BANNER" },
  { name: "work_experience", code: "WORK_EXPERIENCE" },
];

const roles = [
  { code: "Admin", name: "Admin" },
  { code: "Freelancer", name: "Freelancer" },
  { code: "Opdrachtgever", name: "Opdrachtgever" },
  { code: "DasImport", name: "DasImport" },
  { code: "NetiveImport", name: "NetiveImport" },
  { code: "BackOffice", name: "BackOffice" },
];

const modulesIds = [];
const rolesIds = [];

const moduleWriteStream = fs.createWriteStream("module.json");
moduleWriteStream.write("[");
let moduleFirst = true;

for (const iterator of modules) {
  if (!moduleFirst) {
    moduleWriteStream.write(",");
  }
  const moduleId = new ObjectId();

  modulesIds.push({
    _id: { $oid: moduleId },
  });

  const moduleData = JSON.stringify({
    _id: {
      $oid: moduleId,
    },
    name: iterator.name,
    icon: iterator.code,
    code: iterator.code,
  });
  moduleFirst = false;
  moduleWriteStream.write(moduleData);
}

moduleWriteStream.write("]");
moduleWriteStream.end();
moduleWriteStream.on("finish", () => {
  const roleWriteStream = fs.createWriteStream("role.json");
  roleWriteStream.write("[");
  let roleFirst = true;
  for (const iterator of roles) {
    if (!roleFirst) {
      roleWriteStream.write(",");
    }
    const roleId = new ObjectId();
    rolesIds.push({
      _id: { $oid: roleId },
    });
    const roleData = JSON.stringify({
      _id: {
        $oid: roleId,
      },
      name: iterator.name,
      code: iterator.code,
    });
    roleFirst = false;
    roleWriteStream.write(roleData);
  }
  roleWriteStream.write("]");
  roleWriteStream.end();
  roleWriteStream.on("finish", () => {
    console.log("Script is Done");
  });
});
