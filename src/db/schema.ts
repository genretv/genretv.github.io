import { integer, pgTable, text, uuid, timestamp, pgEnum } from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
  id: uuid().primaryKey(),
  name: text().notNull(),
});

const commonColumns = {
  id: uuid().primaryKey(),
  createdBy: uuid().references(() => usersTable.id),
  updatedBy: uuid().references(() => usersTable.id),
  createdAt: timestamp({ withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp({ withTimezone: true }).defaultNow().notNull(),
};

export const marketsTable = pgTable("markets", commonColumns);
export const countriesTable = pgTable("countries", commonColumns);
export const genresTable = pgTable("genres", commonColumns);

export const broadcastersTable = pgTable("broadcasters", {
  ...commonColumns,
  marketId: uuid().references(() => marketsTable.id),
});
export const studiosTable = pgTable("studios", {
  ...commonColumns,
});

export const audienceEnum = pgEnum("audience", ["kids", "teens", "adults", "all"]);
export const productionTypeEnum = pgEnum("productionType", ["animation", "live-action", "genai", "mixed"]);
export const seasonStatusEnum = pgEnum("seasonStatus", ["planned", "in-production", "finished", "canceled"]);
export const weekdayEnum = pgEnum("weekday", [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
]);

export const showsTable = pgTable("shows", {
  ...commonColumns,
  countriesIds: uuid()
    .references(() => marketsTable.id)
    .array(),
  originalTitle: text(),
  imdbUrl: text(),
  genre: uuid().references(() => genresTable.id),
  productionType: productionTypeEnum(),
  audience: audienceEnum(),
});

export const seasonsTable = pgTable("seasons", {
  ...commonColumns,
  showId: uuid().references(() => showsTable.id),
  number: integer().notNull().default(1),
  status: seasonStatusEnum(),
});

export const seasonRunsTables = pgTable("seasonruns", {
  ...commonColumns,
  broadcasterId: uuid().references(() => broadcastersTable.id),
  broadcasterUrl: text(),
  seasonId: uuid().references(() => seasonsTable.id),
  expectedStartDate: timestamp({ withTimezone: true }),
  expectedEndDate: timestamp({ withTimezone: true }),
  expectedWeekdays: weekdayEnum().array(),
  expectedTime: text(),
  expectedDurationMinutes: integer(),
  extraData: text(),
});

export const episodesTable = pgTable("episodes", {
  ...commonColumns,
  seasonId: uuid().references(() => seasonsTable.id),
  number: integer().notNull(),
  studioUrl: text(),
});

export const episodeRunsTable = pgTable("episoderuns", {
  ...commonColumns,
  episodeId: uuid().references(() => episodesTable.id),
  broadcasterId: uuid().references(() => broadcastersTable.id),
  broadcasterUrl: text(),
  releaseDate: timestamp({ withTimezone: true }).notNull(),
  extraData: text(),
});
