import { Box, CircularProgress, ClassNameMap } from "@mui/material";
import CSS from "csstype";

interface Props {
  message?: string;
  size?: CSS.Property.FontSize;
  disableShrink?: boolean;
  classes?: ClassNameMap<"message" | "loading">;
  position?: CSS.Property.Position;
  top?: string;
  show?: boolean;
}

export default function Loading({
  classes,
  size,
  disableShrink,
  message,
  position,
  top,
  show,
}: Props) {
  return show ? (
    <Box
      sx={{
        textAlign: "center",
        left: "50%",
        position: position || "absolute",
        top: top || "100px",
        zIndex: 100000,
        transform: "translate(-50%, 0)",
        fontSize: "3em",
      }}
    >
      <CircularProgress size={size || 200} disableShrink={disableShrink} />
      {message && <div className={classes?.message}>{message}</div>}
    </Box>
  ) : (
    <></>
  );
}
