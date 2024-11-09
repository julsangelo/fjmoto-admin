import React, { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../../context/ContextProvider";
import axiosClient from "../../ajax/axios";

export default function DefaultLayout() {
    let { session, setUser } = useStateContext();

    if (!session) {
        return <Navigate to="/login" />;
    }

    return (
        <div>
            <Outlet />
        </div>
    );
}
