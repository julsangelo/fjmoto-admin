import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import DefaultLayout from "../components/layout/DefaultLayout.js";
// import GuestLayout from "../components/layout/GuestLayout";

let router = createBrowserRouter([
    // {
    //     element: <GuestLayout />,
    //     children: [
    //         {
    //             path: "/login",
    //             element: <Login />,
    //         },
    //     ],
    // },
    {
        element: <DefaultLayout />,
        children: [
            {
                path: "/",
                element: <Dashboard />,
            },
        ],
    },
]);

export default router;
