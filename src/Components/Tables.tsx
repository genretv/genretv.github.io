import { Box, Divider, Typography } from "@mui/material";
import { ErrorObject } from "ajv";
import { useEffect, useState } from "react";
import { useAppSelector } from "../app/store";
import { BOX_STYLE, showsValidator, splitData } from "../common";
import { db } from "../database";
import { CurrentRun, PastShow, Show, UpcomingRun } from "../types";
import OnNow from "./OnNow";
import PastShows from "./PastShows";
import Shows from "./Shows";
import TableHeader from "./TableHeader";
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
  // const dataUrls = useAppSelector((state) => state.jsonfiles.dataUrls);

  useEffect(() => {
    (async () => {
      try {
        // const ldata: any[] = [];
        // await getData(dataUrls);
        setData(await db.shows.toArray());
        // if (showsValidator(ldata)) {
        //   setData(ldata);
        // } else {
        //   setErrors(showsValidator.errors);
        // }
      } catch (e: any) {
        setErrors(e.message);
      }
    })();
  }, []);

  useEffect(() => {
    if (data) {
      const [currentRuns, upcomingRuns, pastShows] = splitData(data);
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
