"use client";

import { Provider } from "react-redux";

import { QueryClientProviderWrapper } from "./QueryClientProvider";
import { Suspense } from "react";
import RouteChangeLoader from "@/component/RouteChangeLoader";
import store from "@/Components/Redux/Store";

export default function ReduxProvider({ children }) {
    return <Provider store={store}>

        <QueryClientProviderWrapper>
            <Suspense fallback={null}>
                <RouteChangeLoader />
            </Suspense>

            {children}


        </QueryClientProviderWrapper>



    </Provider>;
}
