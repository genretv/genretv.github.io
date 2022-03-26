import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { getData, showsValidator } from "./common";
import Loading from "./Loading";
import { Show } from "./types";

const VALID_DATA_MESSAGE = "The data JSON is valid";

interface Props {
  title?: string;
  data?: string;
  urls?: string[];
}

export default function DataValidator({
  title,
  data,
  urls,
  children,
}: React.PropsWithChildren<Props>) {
  const [dataValidationResult, setDataValidationResult] = useState("");
  const [localData, setLocalData] = useState<Show[]>();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    if (urls && urls.length > 0) {
      (async () => {
        try {
          setLocalData(await getData(urls));
        } catch (e: any) {
          setDataValidationResult(e.message);
        }
      })();
    } else {
      try {
        setLocalData(data ? JSON.parse(data) : []);
      } catch (e) {
        if (e instanceof SyntaxError) {
          setDataValidationResult(`${e.name}: ${e.message}`);
        } else {
          setDataValidationResult("Unknown error trying to parse the json");
        }
      }
    }
    setLoading(false);
  }, [urls, data]);

  useEffect(() => {
    if (!localData || !localData.length) {
      setDataValidationResult("");
      return;
    }
    try {
      if (showsValidator(localData)) {
        setDataValidationResult(VALID_DATA_MESSAGE);
        setLoading(false);
      } else {
        setDataValidationResult(JSON.stringify(showsValidator.errors));
      }
    } catch (e) {
      if (e instanceof SyntaxError) {
        setDataValidationResult(`${e.name}: ${e.message}`);
      } else {
        setDataValidationResult("Unknown error trying to parse the json");
      }
    }
    setLoading(false);
  }, [localData]);

  return (
    <Box sx={{ padding: 2 }}>
      <Loading position="fixed" show={loading} />
      <Typography sx={{ padding: 2 }} component="h2">
        {title || "Data"}
      </Typography>
      {dataValidationResult && (
        <Typography
          sx={{
            padding: 2,
            color:
              dataValidationResult === VALID_DATA_MESSAGE ? "inherit" : "red",
          }}
        >
          {dataValidationResult}
        </Typography>
      )}
      {children}
    </Box>
  );
}
