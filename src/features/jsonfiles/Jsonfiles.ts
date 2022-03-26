import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IS_DEV } from "../../types";

const DEFAULT_LOG_URL = IS_DEV
  ? "http://localhost:3001/updateLog.json"
  : "https://raw.githubusercontent.com/genretv/data/main/main/updateLog.json";

const DEFAULT_DATA_URL = IS_DEV
  ? "http://localhost:3001/data.json"
  : "https://raw.githubusercontent.com/genretv/data/main/main/data.json";

export interface JsonfilesState {
  updateLogUrl: string;
  dataUrls: string[];
}

const initialState: JsonfilesState = {
  updateLogUrl: DEFAULT_LOG_URL,
  dataUrls: [DEFAULT_DATA_URL],
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
  },
});

// Action creators are generated for each case reducer function
export const { setDataUrls, setUpdateLogUrl } = jsonfilesSlice.actions;
export default jsonfilesSlice.reducer;
