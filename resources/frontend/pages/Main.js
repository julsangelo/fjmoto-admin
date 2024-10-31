import React, { useEffect, useState } from "react";
import SideBar from "../components/SideBar";
import TopBar from "../components/TopBar";
import Dashboard from "./Dashboard";
import Inventory from "./Inventory";
import Customers from "./Customers";
import Orders from "./Orders";
import Employees from "./Employees";
import CustomerOrders from "../components/Customers/CustomerOrders";
import Details from "../components/Employees/Details";
import OrderItems from "../components/Orders/OrderItems";

export default function Main() {
    const [activeComponent, setActiveComponent] = useState("inventory");
    const [selectedBranch, setSelectedBranch] = useState("1");
    const [selectedCustomer, setSelectedCustomer] = useState(null);
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [selectedOrder, setSelectedOrder] = useState(null);

    useEffect(() => {
        const storedComponent = localStorage.getItem("activeComponent");
        if (storedComponent) {
            setActiveComponent(storedComponent);
        }
    }, []);

    const showPurchases = (customerId) => {
        setSelectedCustomer(customerId);
        setActiveComponent("customerOrders");
    };

    const showDetails = (employeeID) => {
        setSelectedEmployee(employeeID);
        setActiveComponent("employeeDetails");
    };

    const showOrders = (orderID) => {
        setSelectedOrder(orderID);
        setActiveComponent("orderList");
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
                return (
                    <Orders branchID={selectedBranch} showOrders={showOrders} />
                );
            case "customerOrders":
                return (
                    <CustomerOrders
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
            case "employeeDetails":
                return (
                    <Details
                        employee={selectedEmployee}
                        onBack={() => setActiveComponent("employees")}
                    />
                );
            case "orderList":
                return <OrderItems order={selectedOrder} />;
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
