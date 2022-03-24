import { ErrorObject, _ } from "ajv";
import { useEffect, useState } from "react";
import { createUseStyles } from "react-jss";
import "./App.css";
import OnNow from "./OnNow";
import PastShows from "./PastShows";
import TableHeader from "./TableHeader";
import {
  CurrentRun,
  IS_DEV,
  PastShow,
  Show,
  showsValidator,
  Status,
  UpcomingRun,
  Weekday,
} from "./types";
import Upcoming from "./Upcoming";
import { merge } from "lodash";
import { asProperDate } from "./common";
import dayjs from "dayjs";

const DEFAULT_DATA_URL = IS_DEV
  ? "http://localhost:3001/data.json"
  : "https://raw.githubusercontent.com/genretv/data/main/main/data.json";

const useStyles = createUseStyles({
  app: {
    marginTop: "4em",
  },
  header: {
    background:
      "#333333 url(https://www.blogblog.com/1kt/transparent/header_gradient_shade.png) repeat-x scroll top left",
    padding: "1em",
    color: "white",
    borderRadius: "1em",
  },
  spacer: {
    margin: "1em 0",
  },
  main: {
    // textAlign: "center",
  },
  mainbox: {
    border: "solid 1px #dddddd",
    borderRadius: "10px",
    padding: "15px 20px",
    // margin: "0 -20px 20px",
    backgroundColor: "white",
    // maxWidth: "67%",
    maxWidth: "970px",
    margin: "30px auto",
  },
  maintable: {},
});

async function getData() {
  const urlsString = window.localStorage.getItem("dataUrls");
  const dataUrls = urlsString
    ? (JSON.parse(urlsString) as string[])
    : [DEFAULT_DATA_URL];

  const theData: Record<string, Show> = {};
  for (const url of dataUrls) {
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
      return [out.statusText];
    }
  }
  return Object.values(theData);
}

function App() {
  const classes = useStyles();
  const [current, setCurrent] = useState<CurrentRun[]>();
  const [upcoming, setUpcoming] = useState<UpcomingRun[]>();
  const [past, setPast] = useState<PastShow[]>();

  const [data, setData] = useState<Show[]>();
  const [errors, setErrors] = useState<
    ErrorObject<string, Record<string, any>, unknown>[] | null
  >();

  useEffect(() => {
    (async () => {
      const ldata = await getData();

      if (showsValidator(ldata)) {
        setData(ldata);
      } else {
        setErrors(showsValidator.errors);
      }
    })();
  }, []);

  useEffect(() => {
    const currentRuns: CurrentRun[] = [];
    const upcomingRuns: UpcomingRun[] = [];
    const pastShows: PastShow[] = [];
    const now = new Date();
    const twoMonthsAgo = dayjs().add(-1, "month");
    if (data) {
      for (const show of data) {
        const finale =
          show.seasons.slice(-1)[0].runningPeriods.slice(-1)[0].endDate || "";
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
              const periodStart = new Date(
                asProperDate(runningPeriod.startDate)
              );
              const periodEnd = runningPeriod.endDate
                ? new Date(runningPeriod.endDate)
                : undefined;
              if (
                periodStart <= now &&
                (!season.days ||
                  season.days[0] !== "Binge" ||
                  periodStart >= twoMonthsAgo.toDate()) &&
                (!periodEnd || now >= periodEnd)
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
      setCurrent(currentRuns);
      setUpcoming(upcomingRuns);
      setPast(pastShows);
    }
  }, [data]);

  return (
    <div className={classes.app}>
      <div className={classes.mainbox}>
        <header className={classes.header}>
          <div>
            <h1>Fantasy/Sci-Fi TV Show Start Dates 2021-22</h1>
          </div>
          <div>
            <p>
              <span>
                Premiere and Finale dates for all current and upcoming genre tv
                shows.
              </span>
            </p>
          </div>
        </header>
        <main>
          <div className={classes.main}>
            <TableHeader />

            {errors && errors.length > 0 && <p>{JSON.stringify(errors)}</p>}
            <div className={classes.maintable}>
              {current && current.length > 0 && (
                <>
                  <OnNow data={current} />
                </>
              )}
              {upcoming && upcoming.length > 0 && (
                <>
                  <hr className={classes.spacer} />
                  <Upcoming data={upcoming} />
                </>
              )}
              {past && past.length > 0 && (
                <>
                  <hr className={classes.spacer} />
                  <PastShows data={past} />
                </>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
