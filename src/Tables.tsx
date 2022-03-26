import { Box, Divider, Typography } from "@mui/material";
import { ErrorObject } from "ajv";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import "./App.css";
import { useAppSelector } from "./app/store";
import { asProperDate, BOX_STYLE, getData, showsValidator } from "./common";
import OnNow from "./OnNow";
import PastShows from "./PastShows";
import TableHeader from "./TableHeader";
import {
  CurrentRun,
  PastShow,
  Show,
  Status,
  UpcomingRun,
  Weekday,
} from "./types";
import Upcoming from "./Upcoming";

const spacer = {
  margin: "1em 0",
};

function App() {
  const [current, setCurrent] = useState<CurrentRun[]>();
  const [upcoming, setUpcoming] = useState<UpcomingRun[]>();
  const [past, setPast] = useState<PastShow[]>();

  const [data, setData] = useState<Show[]>();
  const [errors, setErrors] = useState<
    ErrorObject<string, Record<string, any>, unknown>[] | null
  >();
  const dataUrls = useAppSelector((state) => state.jsonfiles.dataUrls);

  useEffect(() => {
    (async () => {
      try {
        const ldata = await getData(dataUrls);
        if (showsValidator(ldata)) {
          setData(ldata);
        } else {
          setErrors(showsValidator.errors);
        }
      } catch (e: any) {
        setErrors(e.message);
      }
    })();
  }, []);

  useEffect(() => {
    const currentRuns: CurrentRun[] = [];
    const upcomingRuns: UpcomingRun[] = [];
    const pastShows: PastShow[] = [];
    const now = new Date();
    const twoMonthsAgo = dayjs().add(-2, "month");
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
      setCurrent(currentRuns);
      setUpcoming(upcomingRuns);
      setPast(pastShows);
    }
  }, [data]);

  return (
    <Box
      sx={{
        marginTop: "4em",
      }}
    >
      <Box sx={BOX_STYLE}>
        <Box
          component="header"
          sx={{
            background:
              "#333333 url(https://www.blogblog.com/1kt/transparent/header_gradient_shade.png) repeat-x scroll top left",
            padding: "1em",
            color: "white",
            borderRadius: "1em",
          }}
        >
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
        </Box>
        <main>
          <div>
            <TableHeader />
            {errors && errors.length > 0 && (
              <Typography sx={{ fontSize: "2em", color: "red" }}>
                {"Errors loading data URL: " + JSON.stringify(errors)}
              </Typography>
            )}
            <div>
              {current && current.length > 0 && (
                <>
                  <OnNow data={current} />
                </>
              )}
              {upcoming && upcoming.length > 0 && (
                <>
                  <Divider sx={spacer} />
                  <Upcoming data={upcoming} />
                </>
              )}
              {past && past.length > 0 && (
                <>
                  <Divider sx={spacer} />
                  <PastShows data={past} />
                </>
              )}
            </div>
          </div>
        </main>
      </Box>
    </Box>
  );
}

export default App;
