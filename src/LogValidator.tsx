import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { getLogs, logValidator } from "./common";
import { LogEntry } from "./types";

const VALID_LOG_MESSAGE = "The update log JSON is valid";

interface Props {
  title?: string;
  data?: string;
  url?: string;
}

export default function LogValidator({
  data,
  url,
  title,
  children,
}: React.PropsWithChildren<Props>) {
  const [logValidationResult, setLogValidationResult] = useState("");
  const [localData, setLocalData] = useState<LogEntry[]>();
  useEffect(() => {
    if (url) {
      (async () => {
        try {
          setLocalData(await getLogs(url));
        } catch (e: any) {
          setLogValidationResult(e.message);
        }
      })();
    } else {
      try {
        setLocalData(data ? JSON.parse(data) : []);
      } catch (e) {
        if (e instanceof SyntaxError) {
          setLogValidationResult(`${e.name}: ${e.message}`);
        } else {
          setLogValidationResult("Unknown error trying to parse the json");
        }
      }
    }
  }, [url, data]);

  useEffect(() => {
    if (!localData || !localData.length) {
      setLogValidationResult("");
      return;
    }
    try {
      if (logValidator(localData)) {
        setLogValidationResult(VALID_LOG_MESSAGE);
      } else {
        setLogValidationResult(JSON.stringify(logValidator.errors));
      }
    } catch (e) {
      setLogValidationResult("Unknown error trying to parse the json");
    }
  }, [localData]);

  return (
    <Box sx={{ padding: 2 }}>
      <Typography sx={{ padding: 2 }} component="h2">
        {title || "Update log"}
      </Typography>
      {logValidationResult && (
        <Typography
          sx={{
            padding: 2,
            color:
              logValidationResult === VALID_LOG_MESSAGE ? "inherit" : "red",
          }}
        >
          {logValidationResult}
        </Typography>
      )}
      {children}
    </Box>
  );
}
