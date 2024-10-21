import React, { useEffect, useState } from "react";
import SideBar from "../components/SideBar";
import TopBar from "../components/TopBar";
import Dashboard from "./Dashboard";
import Inventory from "./Inventory";
import Customers from "./Customers";
import Orders from "./Orders";

export default function Main() {
    const [activeComponent, setActiveComponent] = useState("inventory");
    const [selectedBranch, setSelectedBranch] = useState("Branch A");
    const [showPurchases, setShowPurchases] = useState(false);

    useEffect(() => {
        const storedComponent = localStorage.getItem("activeComponent");
        if (storedComponent) {
            setActiveComponent(storedComponent);
        }
    }, []);

    const handleViewPurchases = (customerId) => {
        setSelectedCustomer(customerId);
        setActiveComponent("purchases");
    };

    const renderContent = () => {
        switch (activeComponent) {
            case "dashboard":
                return <Dashboard branch={selectedBranch} />;
            case "inventory":
                return <Inventory branch={selectedBranch} />;
            case "customers":
                return (
                    <Customers
                        branch={selectedBranch}
                        onViewPurchases={handleViewPurchases}
                    />
                );
            case "orders":
                return <Orders branch={selectedBranch} />;
            case "purchases":
                return <Purchases customerId={selectedCustomer} />;
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
