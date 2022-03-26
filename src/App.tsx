import SettingsIcon from "@mui/icons-material/Settings";
import { Box, IconButton } from "@mui/material";
import { useState } from "react";
import "./App.css";
import Config from "./Config";
import Tables from "./Tables";

function App() {
  const [showConfig, setShowConfig] = useState(false);
  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <IconButton
          onClick={() => setShowConfig(!showConfig)}
          color="primary"
          aria-label="Settings"
          size="large"
          sx={{ backgroundColor: "white" }}
        >
          <SettingsIcon />
        </IconButton>
      </Box>
      {showConfig ? <Config /> : <Tables />}
    </>
  );
}

export default App;
