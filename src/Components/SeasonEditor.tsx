import { Box, Typography } from "@mui/material";
import { Season } from "../types";

type Props = {
  season?: Season;
};

export default function SeasonEditor({ season }: Props) {
  return (
    <Box>
      <Typography>Season Editor</Typography>
      <Box>{season && JSON.stringify(season)}</Box>
    </Box>
  );
}
