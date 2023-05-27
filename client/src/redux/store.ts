import {configureStore} from "@reduxjs/toolkit";
import {authenticationSlice} from "./authentication.ts";

const store = configureStore({
    reducer: {
        authentication: authenticationSlice.reducer,
    },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;