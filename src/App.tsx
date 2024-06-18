import EditIcon from "@mui/icons-material/Edit";
import ListIcon from "@mui/icons-material/List";
import SettingsIcon from "@mui/icons-material/Settings";
import { Box, IconButton } from "@mui/material";
import { useEffect, useState } from "react";
import "./App.css";
import { useAppSelector } from "./app/store";
import Config from "./Components/Config";
import ShowsEditor from "./Components/ShowsManager";
import Tables from "./Components/Tables";
import { db } from "./database";

function App() {
  const [currentWindow, setCurrentWindow] = useState(0);
  const autoReload = useAppSelector((state) => state.jsonfiles.autoReload);
  useEffect(() => {
    (async () => {
      if (autoReload) {
        await db.repopulate();
      }
    })();
  }, []);

  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        {currentWindow !== 0 && (
          <IconButton
            onClick={() => setCurrentWindow(0)}
            color="primary"
            aria-label="Settings"
            size="large"
            sx={{ backgroundColor: "white" }}
          >
            <ListIcon />
          </IconButton>
        )}
        {currentWindow !== 1 && (
          <IconButton
            onClick={() => setCurrentWindow(1)}
            color="primary"
            aria-label="Settings"
            size="large"
            sx={{ backgroundColor: "white" }}
          >
            <SettingsIcon />
          </IconButton>
        )}
        {currentWindow !== 2 && (
          <IconButton
            onClick={() => setCurrentWindow(2)}
            color="primary"
            aria-label="Settings"
            size="large"
            sx={{ backgroundColor: "white" }}
          >
            <EditIcon />
          </IconButton>
        )}
      </Box>
      {currentWindow === 0 ? (
        <Tables />
      ) : currentWindow === 1 ? (
        <Config />
      ) : (
        <ShowsEditor />
      )}
    </>
  );
}

export default App;
