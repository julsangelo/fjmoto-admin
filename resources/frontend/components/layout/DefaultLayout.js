import React, { useContext, useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { LoginContext } from "../../context/LoginProvider";
import { getUser } from "../../ajax/backend";

export default function DefaultLayout() {
    let { token, setUser, onLoad } = useContext(LoginContext);

    if (!token) {
        return <Navigate to="/login" />;
    } else {
        useEffect(() => {
            getUser((data) => {
                setUser(data);
            });
        }, [onLoad]);
    }

    return (
        <div>
            <Outlet />
        </div>
    );
}
