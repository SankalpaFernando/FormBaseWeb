import { configureStore } from "@reduxjs/toolkit";

import { formAPI } from "./api/form";
import { infoAPI } from "./api/info";
import { projectAPI } from "./api/project";
import routeReducer from "./reducer/routes";
import storage from 'redux-persist/lib/storage';
import { persistReducer } from "redux-persist";

export const store = configureStore({
  reducer: {
    [infoAPI.reducerPath]: infoAPI.reducer,
    [projectAPI.reducerPath]: projectAPI.reducer,
    [formAPI.reducerPath]: formAPI.reducer,
    route: persistReducer({key:"root",storage},routeReducer),
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;