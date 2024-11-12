import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import router from "./index/router.js";
import { LoginProvider } from "./context/LoginProvider.js";
import { FlashMessage } from "./context/FlashMessage.js";
import { ReferenceProvider } from "./context/ReferenceProvider.js";

ReactDOM.createRoot(document.getElementById("root")).render(
    <FlashMessage>
        <LoginProvider>
            <ReferenceProvider>
                <RouterProvider router={router} />
            </ReferenceProvider>
        </LoginProvider>
    </FlashMessage>,
);
