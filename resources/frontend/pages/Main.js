import React, { useEffect, useState } from "react";
import SideBar from "../components/SideBar";
import TopBar from "../components/TopBar";
import Dashboard from "./Dashboard";
import Inventory from "./Inventory";
import Customers from "./Customers";
import Orders from "./Orders";
import Purchases from "../components/Customers/Purchases";

export default function Main() {
    const [activeComponent, setActiveComponent] = useState("inventory");
    const [selectedBranch, setSelectedBranch] = useState("1");
    const [selectedCustomer, setSelectedCustomer] = useState(null);

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
