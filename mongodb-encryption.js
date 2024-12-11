const { ClientEncryption } = require("mongodb-client-encryption");
const mongoose = require("mongoose");
const { Binary } = require("mongodb");

run().catch((err) => console.log(err));

async function run() {
  const arr = [];
  for (let i = 0; i < 96; ++i) {
    arr.push(i);
  }
  const key = Buffer.from(arr);

  const keyVaultNamespace = "client.encryption";
  const kmsProviders = { local: { key } };

  const uri = "mongodb://localhost:27017/mongoose_test";
  const conn = await mongoose
    .createConnection(uri, {
      autoEncryption: {
        keyVaultNamespace,
        kmsProviders,
      },
    })
    .asPromise();

  //   const encryption = new ClientEncryption(conn.client, {
  //     keyVaultNamespace,
  //     kmsProviders,
  //   });

  //   const _key = await encryption.createDataKey("local");
}
