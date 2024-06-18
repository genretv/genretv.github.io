import { Box, Divider } from "@mui/material";
import { BOX_STYLE } from "../common";
import Datafiles from "./Datafiles";
import Logfiles from "./Logfiles";
import Validator from "./Validator";

export default function Config() {
  return (
    <Box sx={BOX_STYLE}>
      <Datafiles />
      <Divider />
      <Logfiles />
      <Divider />
      <Validator />
    </Box>
  );
}
