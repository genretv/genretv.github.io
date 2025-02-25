import { PGlite } from "@electric-sql/pglite";
import { worker } from "@electric-sql/pglite/worker";
import { migrate } from "./migration";

const pg = await PGlite.create({
  // debug: 1,
  dataDir: "idb://transcrobes",
  relaxedDurability: true,
  // dataDir: "opfs-ahp://transcrobes",
  // extensions: {
  //   live,
  // },
});
// const db = drizzle(pg, { schema });

worker({
  async init() {
    // Migrate the database to the latest schema
    await pg.waitReady;
    await migrate(pg);
    await pg.refreshArrayTypes();
    return pg;
  },
});

self.onmessage = (msg) => {
  const { data } = msg;
  if (data.type === "startSync") {
    console.log("message from main received in worker:", msg);
  }
};
