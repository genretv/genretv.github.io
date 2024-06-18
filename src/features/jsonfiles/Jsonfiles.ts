import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IS_DEV } from "../../types";

export const DEFAULT_LOG_URL = IS_DEV
  ? "http://localhost:3001/updateLog.json"
  : "https://raw.githubusercontent.com/genretv/data/main/main/updateLog.json";

export const DEFAULT_DATA_URL = IS_DEV
  ? "http://localhost:3001/data.json"
  : "https://raw.githubusercontent.com/genretv/data/main/main/data.json";

export interface JsonfilesState {
  updateLogUrl: string;
  dataUrls: string[];
  autoReload: boolean;
  githubToken: string;
  githubRepo: string;
}

const initialState: JsonfilesState = {
  updateLogUrl: DEFAULT_LOG_URL,
  dataUrls: [DEFAULT_DATA_URL],
  autoReload: false,
  githubToken: "",
  githubRepo: "genretv/data",
};

export const jsonfilesSlice = createSlice({
  name: "jsonfiles",
  initialState,
  reducers: {
    setUpdateLogUrl: (state, action: PayloadAction<string>) => {
      state.updateLogUrl = action.payload;
    },
    setDataUrls: (state, action: PayloadAction<string[]>) => {
      state.dataUrls = action.payload;
    },
    setAutoReload(state, action: PayloadAction<boolean>) {
      state.autoReload = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setDataUrls, setUpdateLogUrl, setAutoReload } =
  jsonfilesSlice.actions;
export default jsonfilesSlice.reducer;
