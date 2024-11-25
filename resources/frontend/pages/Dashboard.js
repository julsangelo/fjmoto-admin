import React, { useContext } from "react";
import styles from "./Main.module";
import { LoginContext } from "../context/LoginProvider.js";
import Sales from "../components/Dashboard/Sales.js";
import DashboardLink from "../components/Dashboard/DashboardLink.js";

export default function Dashboard({ branchID }) {
    const { user } = useContext(LoginContext);

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                Welcome, {user?.user?.employeeFirstName}!
            </div>
            <div className={styles.mainContent}>
                <div className={styles.dashboardSideBar}>
                    <DashboardLink label="Sales" />
                    <DashboardLink label="Stocks" />
                </div>
                <div style={{ width: "100%" }}>
                    <Sales branch={branchID} />
                </div>
            </div>
        </div>
    );
}
