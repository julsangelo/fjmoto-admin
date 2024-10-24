import React, { useEffect, useState } from "react";
import styles from "./Sidebar.module";
import BarLink from "./BarLink";
import Brand from "./Brand";

export default function Sidebar({ setActiveComponent }) {
    const [activeLink, setActiveLink] = useState(() => {
        return localStorage.getItem("activeComponent") || "dashboard";
    });

    useEffect(() => {
        localStorage.setItem("activeComponent", activeLink);
    }, [activeLink]);

    const handleLinkClick = (component) => {
        setActiveComponent(component);
        setActiveLink(component);
    };

    return (
        <div className={styles.sideBar}>
            <Brand />
            <div className={styles.barLinkContainer}>
                <BarLink
                    onClick={() => handleLinkClick("dashboard")}
                    label="Dashboard"
                    icon="dashboard"
                    size="24"
                    isActive={activeLink === "dashboard"}
                ></BarLink>
                <BarLink
                    onClick={() => handleLinkClick("inventory")}
                    label="Inventory"
                    icon="inventory"
                    size="24"
                    isActive={activeLink === "inventory"}
                ></BarLink>
                <BarLink
                    onClick={() => handleLinkClick("customers")}
                    label="Customers"
                    icon="customer"
                    size="24"
                    isActive={activeLink === "customers"}
                ></BarLink>
                <BarLink
                    onClick={() => handleLinkClick("orders")}
                    label="Orders"
                    icon="order"
                    size="24"
                    isActive={activeLink === "orders"}
                ></BarLink>
                <p className={styles.otherMenu}>Management</p>
                <BarLink
                    onClick={() => handleLinkClick("employees")}
                    label="Employees"
                    icon="employees"
                    size="24"
                    isActive={activeLink === "employees"}
                ></BarLink>
            </div>
        </div>
    );
}
