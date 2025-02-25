import { PGliteInterface } from "@electric-sql/pglite";
import initialMigration from "../drizzle/0000_freezing_thor_girl.sql?raw";

export async function migrate(pg: PGliteInterface) {
  await pg.ready;
  await pg.exec(initialMigration);
  await pg.refreshArrayTypes();
}
