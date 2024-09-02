import {configureStore} from "@reduxjs/toolkit";
import lists from "./reducers/lists";

export const store = configureStore({
    reducer: {
        lists
    }
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch