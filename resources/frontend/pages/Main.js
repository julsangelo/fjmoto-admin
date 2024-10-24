import React, { useEffect, useState } from "react";
import SideBar from "../components/SideBar";
import TopBar from "../components/TopBar";
import Dashboard from "./Dashboard";
import Inventory from "./Inventory";
import Customers from "./Customers";
import Orders from "./Orders";
import Employees from "./Employees";
import Purchases from "../components/Customers/Purchases";
import Details from "../components/Employees/Details";

export default function Main() {
    const [activeComponent, setActiveComponent] = useState("inventory");
    const [selectedBranch, setSelectedBranch] = useState("1");
    const [selectedCustomer, setSelectedCustomer] = useState(null);
    const [selectedEmployee, setSelectedEmployee] = useState(null);

    useEffect(() => {
        const storedComponent = localStorage.getItem("activeComponent");
        if (storedComponent) {
            setActiveComponent(storedComponent);
        }
    }, []);

    const showPurchases = (customerId) => {
        setSelectedCustomer(customerId);
        setActiveComponent("purchases");
    };

    const showDetails = (employeeID) => {
        setSelectedEmployee(employeeID);
        setActiveComponent("details");
    };

    const renderContent = () => {
        switch (activeComponent) {
            case "dashboard":
                return <Dashboard branchID={selectedBranch} />;
            case "inventory":
                return <Inventory branchID={selectedBranch} />;
            case "customers":
                return (
                    <Customers
                        branchID={selectedBranch}
                        showPurchases={showPurchases}
                    />
                );
            case "orders":
                return <Orders branchID={selectedBranch} />;
            case "purchases":
                return (
                    <Purchases
                        customer={selectedCustomer}
                        onBack={() => setActiveComponent("customers")}
                    />
                );
            case "employees":
                return (
                    <Employees
                        branchID={selectedBranch}
                        showDetails={showDetails}
                    />
                );
            case "details":
                return (
                    <Details
                        employee={selectedEmployee}
                        onBack={() => setActiveComponent("employees")}
                    />
                );
        }
    };

    return (
        <>
            <SideBar setActiveComponent={setActiveComponent} />
            <TopBar setSelectedBranch={setSelectedBranch} />
            <div>{renderContent()}</div>
        </>
    );
}
