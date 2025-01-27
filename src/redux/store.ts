import { configureStore } from "@reduxjs/toolkit";
import { baseApi } from "./baseApi";

export const makeStore = () => {
  return configureStore({
    reducer: {
      [baseApi.reducerPath]: baseApi.reducer,
    },
    middleware(getDefaultMiddleware) {
      return getDefaultMiddleware().concat(baseApi.middleware);
    },
  });
};

// get the type of store
export type AppStore = ReturnType<typeof makeStore>;
// get the RootState and AppDispatch types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
