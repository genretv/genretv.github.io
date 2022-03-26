import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import { Box, Button, IconButton, TextField } from "@mui/material";
import { useEffect } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "./app/store";
import DataValidator from "./DataValidator";
import { setDataUrls } from "./features/jsonfiles/Jsonfiles";

type FormValues = {
  fieldArray: { dataUrl: string }[];
};

export default function Datafiles() {
  const dataUrls = useAppSelector((state) => state.jsonfiles.dataUrls);
  const dispatch = useAppDispatch();

  const { register, control, watch } = useForm<FormValues>();
  const { fields, append, remove, replace } = useFieldArray({
    control,
    name: "fieldArray",
  });
  const watchFieldArray = watch("fieldArray");
  const controlledFields = fields.map((field, index) => {
    return {
      ...field,
      ...watchFieldArray[index],
    };
  });
  useEffect(() => {
    replace(
      dataUrls.map((u) => {
        return { dataUrl: u };
      })
    );
  }, []);

  useEffect(() => {
    const updates = controlledFields.map((x) => x.dataUrl);
    const same =
      updates.length === dataUrls.length &&
      updates.join("") === dataUrls.join("");
    if (!same) {
      dispatch(setDataUrls(controlledFields.map((x) => x.dataUrl)));
    }
  }, [controlledFields]);

  return (
    <DataValidator
      urls={controlledFields.map((x) => x.dataUrl)}
      title="Data URLs"
    >
      <Button
        onClick={() =>
          append({
            dataUrl: "",
          })
        }
        variant="outlined"
        startIcon={<AddIcon />}
      >
        Add Data URL
      </Button>
      {controlledFields.map((field, index) => {
        return (
          <Box
            key={`fieldArray.${index}.dataUrl`}
            sx={{ padding: 2, width: "100%" }}
          >
            <TextField
              sx={{ width: "90%" }}
              label="Data URL"
              required
              {...register(`fieldArray.${index}.dataUrl` as const)}
            />
            <IconButton aria-label="delete" onClick={() => remove(index)}>
              <DeleteIcon />
            </IconButton>
          </Box>
        );
      })}
    </DataValidator>
  );
}
