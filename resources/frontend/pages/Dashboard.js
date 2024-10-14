import React from "react";
import styles from "./Dashboard.module";
import SideBar from "../components/SideBar";
import Brand from "../components/Brand";
import BarLink from "../components/BarLink";
import TopBar from "../components/TopBar";
import User from "../components/User";
import Button from "../components/Button";
import Input from "../components/Input";
import Filter from "../components/Filter";
import Table from "../components/Table";

const productTableData = {
    headers: [
        "Image",
        "Product",
        "ID",
        "Category",
        "Price",
        "Stock Quantity",
        "Action",
    ],
    data: [
        {
            id: 1,
            image: "https://via.placeholder.com/100",
            product: "Wireless Headphones",
            category: "Electronics",
            price: 99.99,
            stockquantity: 25,
        },
        {
            id: 2,
            image: "https://via.placeholder.com/100",
            product: "Running Shoes",
            category: "Sportswear",
            price: 79.99,
            stockquantity: 50,
        },
        {
            id: 2,
            image: "https://via.placeholder.com/100",
            product: "Running Shoes",
            category: "Sportswear",
            price: 79.99,
            stockquantity: 50,
        },
    ],
};

export default function Dashboard() {
    return (
        <>
            <SideBar>
                <Brand />
                <div className={styles.barLinkContainer}>
                    <BarLink
                        label="Dashboard"
                        icon="dashboard"
                        height="24"
                        width="24"
                    ></BarLink>
                    <BarLink
                        label="Inventory"
                        icon="inventory"
                        height="24"
                        width="24"
                    ></BarLink>
                    <BarLink
                        label="Customers"
                        icon="customer"
                        height="24"
                        width="24"
                    ></BarLink>
                    <BarLink
                        label="Orders"
                        icon="order"
                        height="24"
                        width="24"
                    ></BarLink>
                </div>
            </SideBar>
            <TopBar>
                <User />
            </TopBar>
            <div className={styles.inventoryContent}>
                <div className={styles.inventoryHeader}>
                    Inventory
                    <Button label="Add Inventory" />
                </div>
                <div className={styles.inventoryMain}>
                    <div className={styles.inventorySearchFilter}>
                        <Input
                            label="Search products"
                            icon="search"
                            height="24"
                            width="24"
                        />
                        <Filter />
                    </div>
                    <Table checkbox={true} data={productTableData} />
                </div>
            </div>
        </>
    );
}
