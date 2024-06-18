import { JSONSchemaType } from "ajv";
import { z } from "zod";

export const IS_DEV = process.env.NODE_ENV === "development";

export const STATUS_MAP = {
  renewed: "r",
  finished: "f",
  canceled: "c",
  unknown: "",
} as const;
const STATUSES = Object.keys(STATUS_MAP) as Array<keyof typeof STATUS_MAP>;
export type Status = keyof typeof STATUS_MAP;

export const WEEKDAY_MAP = {
  Monday: 1,
  Tuesday: 2,
  Wednesday: 3,
  Thursday: 4,
  Friday: 5,
  Saturday: 6,
  Sunday: 7,
  Binge: 8,
} as const;
export const WEEKDAYS = Object.keys(WEEKDAY_MAP) as Array<
  keyof typeof WEEKDAY_MAP
>;
export type Weekday = keyof typeof WEEKDAY_MAP;

export type Season = {
  num: number;
  days?: Weekday[];
  studio?: string;
  page?: { title: string; link: string };
  runningPeriods?: {
    startDate: string;
    startDateUncertain?: boolean;
    endDate?: string;
    endDateUncertain?: boolean;
  }[];
};

export type Show = {
  name: string;
  imdb?: string;
  seasons: Season[];
  genre?: string;
  page?: { title: string; link: string };
  status: Status;
  statusUncertain: boolean;
  studio?: string;
};

type TableData = {
  name: string;
  genre?: string;
  status: Status;
  statusUncertain: boolean;
  studio?: string;
  imdb?: string;
  page?: { title: string; link: string };
};

type TableDataRun = TableData & {
  season: number;
  startDate?: string;
  startDateUncertain?: boolean;
  endDate?: string;
  endDateUncertain?: boolean;
};

export type CurrentRun = TableDataRun & {
  days?: Weekday[];
};

export type UpcomingRun = TableDataRun;

export type PastShow = TableData & {
  nbSeasons: number;
  finale: string;
};

export type LogEntry = {
  date: string;
  text: string;
};

export const logSchema: JSONSchemaType<LogEntry[]> = {
  type: "array",
  items: {
    type: "object",
    properties: {
      date: { type: "string" },
      text: { type: "string" },
    },
    required: ["date", "text"],
  },
};
export const showSchema: JSONSchemaType<Show[]> = {
  type: "array",
  items: {
    type: "object",
    properties: {
      name: { type: "string" },
      imdb: { type: "string", nullable: true },
      genre: { type: "string", nullable: true },
      status: { type: "string", nullable: true, enum: STATUSES },
      statusUncertain: { type: "boolean", nullable: true },
      studio: { type: "string", nullable: true },
      page: {
        type: "object",
        properties: {
          title: { type: "string", nullable: true },
          link: { type: "string", nullable: true },
        },
        nullable: true,
        required: ["link"],
        additionalProperties: false,
      },
      seasons: {
        type: "array",
        uniqueItems: true,
        items: {
          type: "object",
          properties: {
            num: { type: "integer" },
            days: {
              type: "array",
              nullable: true,
              items: {
                type: "string",
                enum: WEEKDAYS,
              },
            },
            studio: { type: "string", nullable: true },
            page: {
              type: "object",
              properties: {
                title: { type: "string", nullable: true },
                link: { type: "string", nullable: true },
              },
              nullable: true,
              required: ["link"],
              additionalProperties: false,
            },
            runningPeriods: {
              type: "array",
              nullable: true,
              items: {
                type: "object",
                properties: {
                  startDate: { type: "string", nullable: true },
                  startDateUncertain: { type: "boolean", nullable: true },
                  endDate: { type: "string", nullable: true },
                  endDateUncertain: { type: "boolean", nullable: true },
                },
                required: [],
                additionalProperties: false,
              },
            },
          },
          required: ["num"],
          additionalProperties: false,
        },
      },
    },
    required: ["name"],
    additionalProperties: false,
  },
};

export const zshowSchema = z.array(
  z
    .object({
      name: z.string(),
      imdb: z.string().optional(),
      genre: z.string().optional(),
      status: z.nativeEnum(STATUS_MAP).optional(),
      statusUncertain: z.boolean().optional(),
      studio: z.string().optional(),
      page: z
        .object({ title: z.string().optional(), link: z.string() })
        .strict()
        .optional(),
      seasons: z
        .array(
          z
            .object({
              num: z.any(),
              days: z.array(z.nativeEnum(WEEKDAY_MAP)).optional(),
              studio: z.string().optional(),
              page: z
                .object({ title: z.string().optional(), link: z.string() })
                .strict()
                .optional(),
              runningPeriods: z
                .array(
                  z
                    .object({
                      startDate: z.string().optional(),
                      startDateUncertain: z.boolean().optional(),
                      endDate: z.string().optional(),
                      endDateUncertain: z.boolean().optional(),
                    })
                    .strict()
                )
                .optional(),
            })
            .strict()
        )
        .optional(),
    })
    .strict()
);
