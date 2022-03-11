import { configureStore } from "@reduxjs/toolkit"
import { infoAPI } from "./api/info";
import { projectAPI } from "./api/project";
export const store = configureStore({
  reducer: {
    [infoAPI.reducerPath]: infoAPI.reducer,
    [projectAPI.reducerPath]: projectAPI.reducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;