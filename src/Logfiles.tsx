import { TextField } from "@mui/material";
import { useAppDispatch, useAppSelector } from "./app/store";
import { setUpdateLogUrl } from "./features/jsonfiles/Jsonfiles";
import LogValidator from "./LogValidator";

export default function Logfiles() {
  function validateUrl(url: string) {
    dispatch(setUpdateLogUrl(url));
  }
  const logUrl = useAppSelector((state) => state.jsonfiles.updateLogUrl);
  const dispatch = useAppDispatch();
  return (
    <LogValidator url={logUrl} title="Update log URL">
      <TextField
        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
          validateUrl(event.currentTarget.value)
        }
        fullWidth
        defaultValue={logUrl}
        label="Log file URL"
        variant="outlined"
      />
    </LogValidator>
  );
}
