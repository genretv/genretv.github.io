import Ajv from "ajv";
import dayjs from "dayjs";
import { merge } from "lodash";
import {
  CurrentRun,
  logSchema,
  PastShow,
  Show,
  showSchema,
  Status,
  UpcomingRun,
  Weekday,
} from "./types";

export const BOX_STYLE = {
  border: "solid 1px #dddddd",
  borderRadius: "10px",
  padding: "15px 20px",
  backgroundColor: "white",
  maxWidth: "970px",
  margin: "30px auto",
};

export function splitData(
  data: Show[]
): [CurrentRun[], UpcomingRun[], PastShow[]] {
  const currentRuns: CurrentRun[] = [];
  const upcomingRuns: UpcomingRun[] = [];
  const pastShows: PastShow[] = [];
  const now = new Date();
  const twoMonthsAgo = dayjs().add(-2, "month");
  if (data) {
    for (const show of data) {
      if (!show.seasons || show.seasons.length === 0) continue;

      const finale =
        show.seasons.slice(-1)[0].runningPeriods?.slice(-1)[0].endDate || "";
      if (
        (show.status === "canceled" || show.status === "finished") &&
        finale &&
        new Date(finale) < now
      ) {
        pastShows.push({
          genre: show.genre,
          name: show.name,
          page: show.page,
          imdb: show.imdb,
          status: show.status as Status,
          statusUncertain: show.statusUncertain,
          nbSeasons: show.seasons.length,
          studio: show.seasons[0]?.studio,
          finale,
        });
        continue;
      }
      let currentRun: CurrentRun | undefined = undefined;
      let upcomingRun: UpcomingRun | undefined = undefined;
      for (const season of show.seasons) {
        if (season.runningPeriods) {
          for (const runningPeriod of season.runningPeriods) {
            const periodStart = new Date(asProperDate(runningPeriod.startDate));
            const periodEnd = runningPeriod.endDate
              ? new Date(runningPeriod.endDate)
              : undefined;
            if (
              periodStart <= now &&
              (!season.days ||
                season.days[0] !== "Binge" ||
                periodStart >= twoMonthsAgo.toDate()) &&
              (!periodEnd || now <= periodEnd)
            ) {
              currentRun = {
                days: season.days as Weekday[],
                genre: show.genre,
                name: show.name,
                page: season.page,
                imdb: show.imdb,
                status: show.status as Status,
                statusUncertain: show.statusUncertain,
                season: season.num,
                studio: season.studio,
                startDate: runningPeriod.startDate,
                endDate: runningPeriod.endDate,
                startDateUncertain: runningPeriod.startDateUncertain,
                endDateUncertain: runningPeriod.endDateUncertain,
              };
              break;
            } else if (periodStart >= now) {
              upcomingRun = {
                genre: show.genre,
                name: show.name,
                page: season.page,
                imdb: show.imdb,
                status: show.status as Status,
                statusUncertain: show.statusUncertain,
                season: season.num,
                studio: season.studio,
                startDate: runningPeriod.startDate,
                endDate: runningPeriod.endDate,
                startDateUncertain: runningPeriod.startDateUncertain,
                endDateUncertain: runningPeriod.endDateUncertain,
              };
            }
          }
        }
      }
      if (currentRun) {
        currentRuns.push(currentRun);
      } else if (upcomingRun) {
        upcomingRuns.push(upcomingRun);
      }
    }
  }
  return [currentRuns, upcomingRuns, pastShows];
}

export function asProperDate(stringDate: string) {
  const now = new Date();
  if (stringDate === "summer") {
    const year = now.getMonth() < 7 ? now.getFullYear() : now.getFullYear() + 1;
    return "September 21, " + year.toString();
  } else if (stringDate === "fall") {
    const year =
      now.getMonth() < 10 ? now.getFullYear() : now.getFullYear() + 1;
    return "December 21, " + year.toString();
  } else if (stringDate === "winter") {
    return "March 21, " + (now.getFullYear() + 1).toString();
  } else if (stringDate === "spring") {
    const year = now.getMonth() < 4 ? now.getFullYear() : now.getFullYear() + 1;
    return "June 21, " + year.toString();
  } else if (parseInt(stringDate).toString() === stringDate) {
    return "December 31, " + stringDate;
  }
  return stringDate;
}

export async function getLogs(logUrl: string) {
  const out = await fetch(logUrl);
  if (out.ok) {
    return await out.json();
  } else {
    throw new Error(out.statusText);
  }
}

export async function getData(dataUrls: string[]) {
  const theData: Record<string, Show> = {};
  for (const url of dataUrls) {
    if (!url.trim()) continue;
    const out = await fetch(url);
    if (out.ok) {
      const entries = (await out.json()) as Show[];
      for (const entry of entries) {
        if (!(entry.name in theData)) {
          theData[entry.name] = entry;
        } else {
          merge(theData[entry.name], entry);
        }
      }
    } else {
      throw new Error(out.statusText || (await out.text()));
    }
  }
  return Object.values(theData);
}

export async function sendToGithub(repo: string, data: string, path: string) {
  const out = await fetch(
    `https://api.github.com/repos/${repo}/contents/${path}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `token ${process.env.GITHUB_TOKEN}`,
      },
      body: JSON.stringify({
        message: "Updated data",
        content: Buffer.from(data).toString("base64"),
      }),
    }
  );
  if (out.ok) {
    return await out.json();
  } else {
    throw new Error(out.statusText);
  }
}

const ajv = new Ajv({ strict: true });
export const logValidator = ajv.compile(logSchema);
export const showsValidator = ajv.compile(showSchema);
