import Dexie, { Table } from "dexie";
import { getData, showsValidator } from "./common";
import { DEFAULT_DATA_URL } from "./features/jsonfiles/Jsonfiles";
import { Show } from "./types";

export class PersistedShows extends Dexie {
  shows!: Table<Show>;
  constructor() {
    super("genretv");
    this.version(1).stores({
      shows: "name",
    });
    this.on("populate", async () => {
      await this.repopulate();
    });
  }
  async repopulate() {
    const data = await getData([DEFAULT_DATA_URL]);
    console.log("got new data", data);
    if (showsValidator(data)) {
      await this.shows.clear();
      for (const show of data) {
        await this.shows.put(show);
      }
    } else {
      console.error(JSON.stringify(showsValidator.errors));
    }
  }
  async pushUpdate() {
    const data = await this.shows.toArray();
    if (showsValidator(data)) {
      console.log("valid, can send", data);
    } else {
      throw new Error(JSON.stringify(showsValidator.errors));
    }
  }
}

export const db = new PersistedShows();
