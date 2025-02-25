import { configureStore } from "@reduxjs/toolkit";
import { baseApi } from "./baseApi";
import authReducer from "@/redux/features/auth/auth.slice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      auth: authReducer,
      [baseApi.reducerPath]: baseApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(baseApi.middleware),
  });
};

// get the type of store
export type AppStore = ReturnType<typeof makeStore>;
// get the RootState and AppDispatch types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
