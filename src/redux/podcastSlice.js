import { createSlice } from "@reduxjs/toolkit";

export const podcastSlice = createSlice({
  name: "podcasts",
  initialState: {},
  reducers: {
    add: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { add } = podcastSlice.actions;
export default podcastSlice.reducer;
