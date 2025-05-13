import React, { useContext, useEffect, useState } from "react";
import styles from "./Sidebar.module";
import BarLink from "./BarLink";
import Brand from "./Brand";
import { LoginContext } from "../context/LoginProvider";
import Button from "./Button";

export default function Sidebar({ setActiveComponent, showEdit }) {
    const { user, setUser, setLoginToken } = useContext(LoginContext);
    const [activeLink, setActiveLink] = useState(() => {
        return sessionStorage.getItem("activeComponent") || "dashboard";
    });

    useEffect(() => {
        sessionStorage.setItem("activeComponent", activeLink);
    }, [activeLink]);

    const handleLinkClick = (component) => {
        setActiveComponent(component);
        setActiveLink(component);
    };

    const handleLogout = () => {
        setUser(null);
        setLoginToken(null);
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("activeComponent");
        window.location.reload();
    };

    return (
        <div className={styles.sideBar}>
            <div>
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
                    {(user?.user?.employeePosition === "Admin" ||
                        user?.user?.employeePosition === "Manager") && (
                        <div>
                            <p className={styles.otherMenu}>Management</p>
                            <BarLink
                                onClick={() => handleLinkClick("employees")}
                                label="Employees"
                                icon="employees"
                                size="24"
                                isActive={activeLink === "employees"}
                            ></BarLink>
                            <BarLink
                                onClick={() =>
                                    handleLinkClick("productCategories")
                                }
                                label="Product Categories"
                                icon="employees"
                                size="24"
                                isActive={activeLink === "productCategories"}
                            ></BarLink>
                        </div>
                    )}
                </div>
            </div>
            <div className={styles.sideBarSettingsLink}>
                <div className={styles.sideBarSettings}>
                    <Button
                        label="Edit profile"
                        icon="edit"
                        onClick={() => showEdit(user)}
                    />
                    <Button
                        label="Logout"
                        icon="logout"
                        onClick={handleLogout}
                    />
                </div>
                <BarLink label="Settings" icon="settings" size="24"></BarLink>
            </div>
        </div>
    );
}
