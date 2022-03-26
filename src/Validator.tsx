import { TextField } from "@mui/material";
import { useState } from "react";
import DataValidator from "./DataValidator";
import LogValidator from "./LogValidator";

export default function Validator() {
  const [dataJson, setDataJson] = useState("");
  const [logJson, setLogJson] = useState("");
  return (
    <>
      <DataValidator data={dataJson} title="Data JSON validator">
        <TextField
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            setDataJson(event.currentTarget.value)
          }
          multiline
          maxRows={15}
          fullWidth
          label="Data JSON"
          variant="outlined"
        />
      </DataValidator>
      <LogValidator data={logJson} title="Update log JSON validator">
        <TextField
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            setLogJson(event.currentTarget.value)
          }
          multiline
          maxRows={15}
          fullWidth
          label="Update log JSON"
          variant="outlined"
        />
      </LogValidator>
    </>
  );
}
