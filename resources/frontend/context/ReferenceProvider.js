import React, { createContext, useState, useEffect } from "react";
import { getReferences } from "../ajax/backend";

export const ReferenceContext = createContext();

export const ReferenceProvider = ({ children }) => {
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
    }, []);

    return (
        <ReferenceContext.Provider value={{ references }}>
            {children}
        </ReferenceContext.Provider>
    );
};
