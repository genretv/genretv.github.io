import { ErrorObject } from "ajv";
import { useEffect, useState } from "react";
import { useAppSelector } from "./app/store";
import { getLogs, logValidator } from "./common";
import { LogEntry } from "./types";

export default function TableHeader() {
  const [logs, setLogs] = useState<LogEntry[]>();
  const [errors, setErrors] = useState<
    ErrorObject<string, Record<string, any>, unknown>[] | null
  >();
  const logUrl = useAppSelector((state) => state.jsonfiles.updateLogUrl);
  useEffect(() => {
    (async () => {
      const llogs = await getLogs(logUrl);
      if (logValidator(llogs)) {
        setLogs(llogs);
      } else {
        setErrors(logValidator.errors);
      }
    })();
  }, []);
  return (
    <div>
      {logs && logs.length > 0 && (
        <p>
          <strong>Updated {logs[0]?.date}: </strong>
          {logs[0]?.text}
        </p>
      )}
      {errors && errors.length > 0 && <p>{JSON.stringify(errors)}</p>}
      <p>
        Start dates for every sci-fi/fantasy shows so none of us miss the first
        episode of our favorite shows or new shows. I try to keep this list
        fairly up-to-date so that everyone can see at a glance what shows are
        currently running and what shows will be starting soon. Title links go
        to IMDb pages when they exist. If I am missing something, please let me
        know in the comments.
        <br />
        (r) = renewed, (c) = canceled, (f) = final season, (rf) = renewed for
        final season, (m) = moving to new channel
        <br />S = Current, Upcoming or Total Season #. (0 = Pilot only, h =
        season on hiatus)
      </p>
    </div>
  );
}
