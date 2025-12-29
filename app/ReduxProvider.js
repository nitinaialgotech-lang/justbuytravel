// app/ReduxProvider.js
"use client"; // This is a client component

import { Provider } from "react-redux";
import { persistor, store } from "./Redux/Store";
import { PersistGate } from "redux-persist/integration/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const queryclient = new QueryClient()
export function ReduxProvider({ children }) {
    return <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <QueryClientProvider client={queryclient}>
                {children}
            </QueryClientProvider>
        </PersistGate>
    </Provider >
}