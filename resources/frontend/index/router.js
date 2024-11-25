import React from "react";
import { createBrowserRouter } from "react-router-dom";
import DefaultLayout from "../components/Layout/DefaultLayout.js";
import Main from "../pages/Main.js";
import GuestLayout from "../components/Layout/GuestLayout";
import Login from "../pages/Login.js";

let router = createBrowserRouter([
    {
        element: <GuestLayout />,
        children: [
            {
                path: "/login",
                element: <Login />,
            },
        ],
    },
    {
        element: <DefaultLayout />,
        children: [
            {
                path: "/",
                element: <Main />,
            },
        ],
    },
]);

export default router;
