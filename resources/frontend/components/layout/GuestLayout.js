import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { LoginContext } from "../../context/LoginProvider";

export default function GuestLayout() {
    let { token } = useContext(LoginContext);

    if (token) {
        return <Navigate to="/" />;
    }

    return <Outlet />;
}
