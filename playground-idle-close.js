const { MongoClient } = require("mongodb");

const uri = "mongodb://root:root@localhost:27017";
const IDLE_THRESHOLD_SECONDS = 60;

async function cleanupIdleConnections() {
  const client = new MongoClient(uri, { maxPoolSize: 5 });
  try {
    await client.connect();
    console.log("[Setup] Connected to MongoDB for cleanup");

    const adminDb = client.db("admin");
    const { inprog } = await adminDb.command({ currentOp: true });

    const idleConnections = inprog.filter((op) => {
      const isIdleOp = !op.op || op.op === "none";
      const isNotSystem = !op.ns?.startsWith("admin.system.");
      const isIdleFlag = op.active === false;
      const longIdle = !op.secs_running || op.secs_running >= IDLE_THRESHOLD_SECONDS;
      const notSelf = op.client && !op.client.includes("127.0.0.1"); // skip this script

      return (
        isIdleOp && isIdleFlag && isNotSystem && longIdle && notSelf && typeof op.opid === "number"
      );
    });

    console.log(`[Info] Found ${idleConnections.length} idle connections`);

    for (const op of idleConnections) {
      console.log(` - Killing opid=${op.opid}, client=${op.client}`);
      try {
        await adminDb.command({ killOp: 1, op: op.opid });
      } catch (err) {
        console.error(`   Failed to kill opid=${op.opid}:`, err.message);
      }
    }

    console.log("[Done] Idle connection cleanup finished");
  } catch (err) {
    console.error("[Error]", err);
  } finally {
    await client.close();
    console.log("[Cleanup] Admin MongoClient closed");
  }
}

cleanupIdleConnections();
