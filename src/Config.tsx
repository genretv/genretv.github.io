import { Box, Divider } from "@mui/material";
import { BOX_STYLE } from "./common";
import Datafiles from "./Datafiles";
import Logfiles from "./Logfiles";
import Validator from "./Validator";

type Props = {};

export default function Config({}: Props) {
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
