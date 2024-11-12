import React, { createContext, useState } from "react";

export const LoginContext = createContext();

export const LoginProvider = ({ children }) => {
    let [user, setUser] = useState({});
    let [token, setToken] = useState(sessionStorage.getItem("token"));
    let [onLoad, setOnLoad] = useState(false);

    let setLoginToken = (token) => {
        setToken(token);
        if (token) {
            sessionStorage.setItem("token", token);
        } else {
            sessionStorage.removeItem("token");
        }
    };

    let setComponentOnLoad = (onLoad) => {
        setOnLoad(onLoad);
        setTimeout(() => {
            setOnLoad(false);
        }, 0);
    };

    return (
        <LoginContext.Provider
            value={{
                user,
                token,
                onLoad,
                setUser,
                setLoginToken,
                setComponentOnLoad,
            }}
        >
            {children}
        </LoginContext.Provider>
    );
};
