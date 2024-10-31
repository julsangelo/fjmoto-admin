import React, { useEffect, useState } from "react";
import { getOrders } from "../ajax/backend";
import styles from "./Main.module";
import Button from "../components/Button";
import Input from "../components/Input";
import Table from "../components/Table";
import Filter from "../components/Filter";
import Sort from "../components/Sort";
import { search } from "../utils/search";

export default function Orders({ branchID, showOrders }) {
    const [ordersData, setOrdersData] = useState({});
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [isSortOpen, setIsSortOpen] = useState(false);
    const [modalType, setModalType] = useState("");

    const { searchTerm, handleSearchChange, searchData } = search(
        ordersData.data,
    );

    useEffect(() => {
        getOrders(
            branchID,
            (data) => {
                setOrdersData(data);
            },
            false,
        );
    }, [branchID]);

    const toggleFilterModal = () => {
        setIsFilterOpen((prev) => !prev);
        setIsSortOpen(false);
    };

    const toggleSortModal = () => {
        setIsSortOpen((prev) => !prev);
        setIsFilterOpen(false);
    };

    const toggleSearch = () => {
        setIsFilterOpen(false);
        setIsSortOpen(false);
    };

    const handleView = (orderID) => {
        showOrders(orderID);
    };

    return (
        <div className={styles.container}>
            <div className={styles.header}>Orders</div>
            <div className={styles.mainContent}>
                <div className={styles.contentOptions}>
                    <Input
                        placeholder="Search orders"
                        icon="search"
                        size="24"
                        value={searchTerm}
                        onChange={handleSearchChange}
                        onClick={toggleSearch}
                    />
                    <div className={styles.optionsContainer}>
                        <Button
                            icon="filter"
                            size="24"
                            className={styles.options}
                            label="Filter"
                            onClick={toggleFilterModal}
                        />
                        {isFilterOpen && (
                            <Filter
                                visibleFilter={[
                                    "date",
                                    "total",
                                    "payment",
                                    "fullfillment",
                                    "order",
                                ]}
                            />
                        )}
                    </div>
                    <div className={styles.optionsContainer}>
                        <Button
                            icon="sort"
                            size="24"
                            className={styles.options}
                            label="Sort"
                            onClick={toggleSortModal}
                        />
                        {isSortOpen && (
                            <Sort visibleSort={["date", "total", "items"]} />
                        )}
                    </div>
                </div>
                <Table
                    checkbox={false}
                    data={{
                        headers: ordersData.headers || [],
                        data: searchTerm ? searchData : ordersData.data || [],
                    }}
                    action={true}
                    branchID={branchID}
                    visibleColumns={[
                        "orderID",
                        "orderDateTime",
                        "customerID",
                        "orderTotal",
                        "orderPaymentStatus",
                        "orderFulfillmentStatus",
                        "orderStatus",
                    ]}
                    visibleActions={["view"]}
                    onView={handleView}
                />
            </div>
        </div>
    );
}
