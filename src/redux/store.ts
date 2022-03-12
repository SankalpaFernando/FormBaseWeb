import { configureStore } from "@reduxjs/toolkit"
import { formAPI } from "./api/form";
import { infoAPI } from "./api/info";
import { projectAPI } from "./api/project";
import routeReducer from "./reducer/routes";
export const store = configureStore({
  reducer: {
    [infoAPI.reducerPath]: infoAPI.reducer,
    [projectAPI.reducerPath]: projectAPI.reducer,
    [formAPI.reducerPath] : formAPI.reducer,
    route: routeReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;