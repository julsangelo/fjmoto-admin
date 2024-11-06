import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import router from "./index/router.js";
import { ContextProvider } from "./context/ContextProvider.js";
import { FlashMessage } from "./context/FlashMessage.js";
import { ReferenceProvider } from "./context/ReferenceProvider.js";

ReactDOM.createRoot(document.getElementById("root")).render(
    <ContextProvider>
        <ReferenceProvider>
            <FlashMessage>
                <RouterProvider router={router} />
            </FlashMessage>
        </ReferenceProvider>
    </ContextProvider>,
);
