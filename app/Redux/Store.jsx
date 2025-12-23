import { configureStore } from "@reduxjs/toolkit";
import USER from "./Reducer";
import {
    FLUSH,
    PAUSE,
    PERSIST,
    persistReducer,
    persistStore,
    PURGE,
    REGISTER,
    REHYDRATE
} from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
    key: "user",
    storage,
};

const persistedUserReducer = persistReducer(persistConfig, USER);

export const store = configureStore({
    reducer: {
        user: persistedUserReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});

export const persistor = persistStore(store);
