import React, { createContext, useState } from "react";

export const LoginContext = createContext();

export const LoginProvider = ({ children }) => {
    let [user, setUser] = useState({});
    let [token, setToken] = useState(localStorage.getItem("token"));
    let [onLoad, setOnLoad] = useState(false);

    let setLoginToken = (token) => {
        setToken(token);
        if (token) {
            localStorage.setItem("token", token);
        } else {
            localStorage.removeItem("token");
        }
    };

    let setComponentOnLoad = (onLoad) => {
        setOnLoad(onLoad);
        setTimeout(() => {
            setOnLoad(false);
        }, 1000);
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
