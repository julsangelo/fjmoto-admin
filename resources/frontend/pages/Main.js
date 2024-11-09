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
import AddEditEmployee from "../components/Employees/AddEditEmployee";
import { useContext } from "react";
import { ReferenceContext } from "../context/ReferenceProvider";

export default function Main() {
    const { references } = useContext(ReferenceContext);
    const [activeComponent, setActiveComponent] = useState("addEditEmployee");
    const [selectedBranch, setSelectedBranch] = useState("1");
    const [selectedCustomer, setSelectedCustomer] = useState(null);
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [selectedEmployeeEdit, setSelectedEmployeeEdit] = useState(null);
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

    const showAddEdit = (employeeID) => {
        setSelectedEmployeeEdit(employeeID);
        setActiveComponent("addEditEmployee");
    };

    const renderContent = () => {
        switch (activeComponent) {
            case "dashboard":
                return <Dashboard branchID={selectedBranch} />;
            case "inventory":
                return (
                    <Inventory
                        branchID={selectedBranch}
                        references={references}
                    />
                );
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
                        showAdd={showAddEdit}
                    />
                );
            case "employeeDetails":
                return (
                    <Details
                        employee={selectedEmployee}
                        onBack={() => setActiveComponent("employees")}
                        showEdit={showAddEdit}
                    />
                );
            case "orderList":
                return (
                    <OrderItems
                        order={selectedOrder}
                        onBack={() => setActiveComponent("orders")}
                    />
                );
            case "addEditEmployee":
                return (
                    <AddEditEmployee
                        employee={selectedEmployeeEdit}
                        onBack={() =>
                            setActiveComponent(
                                selectedEmployeeEdit
                                    ? "employeeDetails"
                                    : "employees",
                            )
                        }
                        references={references}
                    />
                );
        }
    };

    return (
        <>
            <SideBar setActiveComponent={setActiveComponent} />
            <TopBar
                setSelectedBranch={setSelectedBranch}
                branches={references?.branches}
            />
            <div>{renderContent()}</div>
        </>
    );
}
