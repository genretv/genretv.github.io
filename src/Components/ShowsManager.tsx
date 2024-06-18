import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../app/store";
import { BOX_STYLE } from "../common";
import { db } from "../database";
import { setAutoReload } from "../features/jsonfiles/Jsonfiles";
import Shows from "./Shows";

export default function ShowsManager() {
  const dispatch = useAppDispatch();
  const [message, setMessage] = useState("");

  const autoReload = useAppSelector((state) => state.jsonfiles.autoReload);

  async function handleReload() {
    setMessage("Reloading...");
    await db.repopulate();
    setMessage("Database reloaded");
  }

  async function pushUpdate() {
    setMessage("Pushing update...");
    await db.pushUpdate();
    setMessage("Update pushed");
  }

  return (
    <Box sx={BOX_STYLE}>
      <Box>
        <Typography>Show Manager</Typography>
      </Box>
      <Box sx={{ marginBottom: "1em" }}>
        <Box sx={{ marginBottom: "1em" }}>
          <FormControlLabel
            control={
              <Checkbox
                defaultChecked={autoReload}
                onChange={(_e, checked) => dispatch(setAutoReload(checked))}
              />
            }
            label="Auto-refresh from web on load"
          />
        </Box>
        <Box sx={{ marginBottom: "1em" }}>
          <Button onClick={() => handleReload()} variant="outlined">
            Load from Github
          </Button>
        </Box>
        <Box>
          <Button onClick={() => pushUpdate()} variant="outlined">
            Send updates to Github
          </Button>
        </Box>
        <Typography variant="h6">{message}</Typography>
      </Box>
      <Box sx={{ marginBottom: "1em" }}>
        <Shows />
      </Box>
    </Box>
  );
}
