import { configureStore } from "@reduxjs/toolkit";
import podcastSlice from "./podcastSlice";

export default configureStore({
  reducer: {
    podcasts: podcastSlice,
  },
});
