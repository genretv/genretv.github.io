import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  Box,
  Checkbox,
  FormControl,
  FormControlLabel,
  IconButton,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import Button from "@mui/material/Button";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useEffect, useState } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { db } from "../database";
import { Season, Show, Status, WEEKDAYS } from "../types";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

type FormValues = {
  seasons: Partial<Season>[];
};

type Props = {
  show?: Show;
  handleClose: (newShows?: Show[]) => void;
};

export default function ShowEditor({ show, handleClose }: Props) {
  const [selectedShow, setSelectedShow] = useState<Partial<Show>>({});
  const { register, control, watch, handleSubmit } = useForm<FormValues>();
  const { fields, append, remove, replace } = useFieldArray({
    control,
    name: "seasons",
  });
  const watchFieldArray = watch("seasons");
  const controlledFields = fields.map((field, index) => {
    return {
      ...field,
      ...watchFieldArray[index],
    };
  });

  function onSubmit() {
    console.log("submit");
    (async () => {
      handleSave();
    })();
  }
  async function handleSave() {
    // const toto = fields.map((x) => x.season as Season);
    selectedShow.seasons = fields.map((x) => x as Season);
    console.log(selectedShow);
    await db.shows.put(selectedShow as Show);
    const lshows = await db.shows.toArray();
    // setAllShows(lshows);
    // setShows(lshows);

    // setOpen(false);
    handleClose(lshows);
  }

  useEffect(() => {
    if (show) {
      setSelectedShow(show);
    }
    // replace(show.seasons || []);
  }, [show]);
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <DialogTitle>Edit Show</DialogTitle>
      <DialogContent>
        <DialogContentText>Enter new show details</DialogContentText>
        <TextField
          onChange={(e) =>
            setSelectedShow({ ...selectedShow, name: e.target.value })
          }
          required
          autoFocus
          defaultValue={selectedShow.name}
          margin="dense"
          id="name"
          label="Name"
          fullWidth
          variant="outlined"
        />
        <TextField
          onChange={(e) =>
            setSelectedShow({ ...selectedShow, genre: e.target.value })
          }
          defaultValue={selectedShow.genre}
          margin="dense"
          id="genre"
          label="Genre"
          fullWidth
          variant="outlined"
        />
        <TextField
          onChange={(e) =>
            setSelectedShow({ ...selectedShow, imdb: e.target.value })
          }
          defaultValue={selectedShow.imdb}
          margin="dense"
          id="imdb"
          label="IMDB URL"
          type={"url"}
          fullWidth
          variant="outlined"
        />
        <TextField
          onChange={(e) =>
            setSelectedShow({
              ...selectedShow,
              page: {
                link: e.target.value,
                title: selectedShow.page?.title || "",
              },
            })
          }
          defaultValue={selectedShow.page?.link}
          margin="dense"
          id="pagelink"
          label="Studio show URL"
          type={"url"}
          fullWidth
          variant="outlined"
        />
        <TextField
          onChange={(e) =>
            setSelectedShow({
              ...selectedShow,
              page: {
                link: selectedShow.page?.link || "",
                title: e.target.value,
              },
            })
          }
          defaultValue={selectedShow.page?.title}
          margin="dense"
          id="studio"
          label="Studio Name"
          type={"url"}
          fullWidth
          variant="outlined"
        />
        <Box sx={{ display: "flex" }}>
          <FormControl margin="dense" fullWidth sx={{ marginRight: "1em" }}>
            {/* <InputLabel id="status-label">Show Status</InputLabel> */}
            <Select
              fullWidth={false}
              labelId="stats-label"
              id="status"
              value={selectedShow.status || "unknown"}
              label="Show Status"
              onChange={(e) =>
                setSelectedShow({
                  ...selectedShow,
                  status: e.target.value as Status,
                })
              }
            >
              <MenuItem value={"renewed"}>Renewed</MenuItem>
              <MenuItem value={"finished"}>Finished</MenuItem>
              <MenuItem value={"canceled"}>Canceled</MenuItem>
              <MenuItem value={"unknown"}>Unknown</MenuItem>
            </Select>
          </FormControl>
          <FormControlLabel
            control={
              <Checkbox
                defaultChecked={selectedShow.statusUncertain}
                onChange={(e, checked) =>
                  setSelectedShow({
                    ...selectedShow,
                    statusUncertain: checked,
                  })
                }
              />
            }
            label="Status uncertain"
          />
        </Box>
        <Box>
          <Button
            onClick={() => append({ num: controlledFields.length + 1 })}
            variant="outlined"
            startIcon={<AddIcon />}
          >
            Add Data URL
          </Button>
          <Typography component="h3">Seasons</Typography>
          {controlledFields.map((field, index) => {
            return (
              <Box
                key={`seasons.${index}.season`}
                sx={{ padding: 2, width: "100%" }}
              >
                <Typography>{index + 1}</Typography>
                <TextField
                  sx={{ width: "90%" }}
                  label="Page URL"
                  required
                  {...register(`seasons.${index}.page.link` as const)}
                />
                <TextField
                  sx={{ width: "90%" }}
                  label="Page Title"
                  required
                  {...register(`seasons.${index}.page.title` as const)}
                />
                <FormControl sx={{ m: 1, width: 300 }}>
                  <InputLabel id="days-label">Days</InputLabel>

                  <Controller
                    // as={<ReactSelect />}
                    render={({ field }) => {
                      return (
                        <Select
                          labelId="days-label"
                          id="days-checkbox"
                          multiple
                          value={field.value || []}
                          // onChange={(e) => {
                          //   field.value .days = e.target.value as Weekday[];
                          // }}
                          input={<OutlinedInput label="Day" />}
                          renderValue={(selected) => selected.join(", ")}
                          MenuProps={MenuProps}
                        >
                          {WEEKDAYS.map((name) => (
                            <MenuItem key={name} value={name}>
                              <Checkbox
                                checked={
                                  field.value && field.value.indexOf(name) > -1
                                }
                              />
                              <ListItemText primary={name} />
                            </MenuItem>
                          ))}
                        </Select>
                      );
                    }}
                    //   (
                    //   )
                    // }
                    control={control}
                    // onChange={([selected]: [any]) => {
                    //   // React Select return object instead of value for selection
                    //   return { value: selected };
                    // }}
                    name={`seasons.${index}.days` as const}
                    defaultValue={field.days}
                  />
                </FormControl>
                <IconButton aria-label="delete" onClick={() => remove(index)}>
                  <DeleteIcon />
                </IconButton>
              </Box>
            );
          })}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button
          sx={{ margin: "1em" }}
          variant="outlined"
          onClick={() => handleClose()}
        >
          Cancel
        </Button>
        {/* <Button sx={{ margin: "1em" }} variant="contained" onClick={handleSave}> */}
        <Button sx={{ margin: "1em" }} variant="contained" type="submit">
          Save
        </Button>
      </DialogActions>
    </form>
  );
}
