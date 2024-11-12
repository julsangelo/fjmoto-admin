import React, { createContext, useState, useEffect, useContext } from "react";
import { getReferences } from "../ajax/backend";
import { LoginContext } from "./LoginProvider";

export const ReferenceContext = createContext();

export const ReferenceProvider = ({ children }) => {
    const { onLoad } = useContext(LoginContext);

    const [references, setReferences] = useState({
        branches: [],
        categories: [],
        employmentStatus: [],
        fulfillmentStatus: [],
        paymentStatus: [],
        orderStatus: [],
        position: [],
    });

    useEffect(() => {
        getReferences((data) => {
            setReferences(data);
        });
    }, [onLoad]);

    return (
        <ReferenceContext.Provider value={{ references }}>
            {children}
        </ReferenceContext.Provider>
    );
};
