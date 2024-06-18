import { Box, TextField, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { db } from "../database";
import { Season, Show } from "../types";
import ShowEditor from "./ShowEditor";

const columns: GridColDef[] = [
  { field: "name", headerName: "Name", width: 200 },
  {
    field: "genre",
    headerName: "Genre",
    width: 150,
    editable: false,
  },
  {
    field: "status",
    headerName: "Status",
    width: 110,
    editable: false,
  },
  {
    field: "studio",
    headerName: "Studio",
    sortable: false,
    width: 160,
    valueGetter: (params: GridValueGetterParams) => {
      return params.row.page?.title;
    },
  },
  {
    field: "nbSeasons",
    headerName: "Seasons",
    sortable: false,
    width: 160,
    valueGetter: (params: GridValueGetterParams) => {
      return params.row.seasons?.length;
    },
  },
];

export default function Shows() {
  const [filterName, setFilterName] = useState("");
  const [allShows, setAllShows] = useState<Show[]>([]);
  const [shows, setShows] = useState<Show[]>([]);
  const [selectedShow, setSelectedShow] = useState<Show>();
  const [open, setOpen] = useState(false);
  const [seasons, setSeasons] = useState<Season[]>([]);

  // useEffect(() => {
  //   // replace(
  //   //   dataUrls.map((u) => {
  //   //     return { dataUrl: u };
  //   //   })
  //   // );
  // }, []);
  useEffect(() => {
    (async () => {
      setAllShows(await db.shows.toArray());
    })();
  }, []);

  function launchDialog(show?: Show) {
    setSelectedShow(show);
    setOpen(true);
  }

  function handleClickNew() {
    launchDialog();
    // setSelectedShow({});
    // setOpen(true);
  }

  function handleClose(newShows?: Show[]) {
    if (newShows) {
      setAllShows(newShows);
      setShows(newShows);
    }
    setSelectedShow(undefined);
    setOpen(false);
  }

  useEffect(() => {
    (async () => {
      const lshows = await db.shows.toArray();
      setAllShows(lshows);
      setShows(lshows);
    })();
  }, []);

  useEffect(() => {
    if (filterName) {
      setShows(
        allShows.filter((show) =>
          show.name.toLowerCase().includes(filterName.toLowerCase())
        )
      );
    } else {
      setShows(allShows);
    }
  }, [filterName]);
  return (
    <div>
      <Button variant="outlined" onClick={handleClickNew}>
        New Show
      </Button>
      <Dialog open={open} onClose={() => handleClose()}>
        <ShowEditor show={selectedShow} handleClose={handleClose} />
      </Dialog>
      <Box>
        <Typography sx={{ margin: "1em 0" }}>Shows</Typography>
        <TextField
          sx={{ marginBottom: "1em" }}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            setFilterName(event.currentTarget.value)
          }
          fullWidth
          defaultValue={filterName}
          label="Filter by name"
          variant="outlined"
        />
        <div style={{ display: "flex", height: "100%" }}>
          <div style={{ flexGrow: 1 }}>
            <DataGrid
              autoHeight
              getRowId={(row) => row.name}
              rows={shows}
              columns={columns}
              pageSize={5}
              rowsPerPageOptions={[5]}
              density={"compact"}
              editMode="row"
              onRowClick={(row) => {
                // setSelectedShow(row.row as Show);
                // setOpen(true);

                launchDialog(row.row as Show);
              }}
              // checkboxSelection
              // disableSelectionOnClick
            />
          </div>
        </div>
      </Box>
      {/* {shows?.map((show) => {
        return <Box key={show.name}>{show.name}</Box>;
      })} */}
    </div>
  );
}
