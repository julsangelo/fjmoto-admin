import React, { useEffect, useState } from "react";
import { getOrders } from "../ajax/backend";
import styles from "./Main.module";
import Button from "../components/Button";
import Input from "../components/Input";
import Table from "../components/Table";
import Filter from "../components/Filter";
import Sort from "../components/Sort";
import { search } from "../utils/search";
import { toggleFilter, toggleSearch, toggleSort } from "../utils/toggle";

export default function Orders({ branchID, showOrders }) {
    const [ordersData, setOrdersData] = useState({});
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [isSortOpen, setIsSortOpen] = useState(false);

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

    const handleView = (order) => {
        showOrders(order);
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
                        onClick={() =>
                            toggleSearch(setIsFilterOpen, setIsSortOpen)
                        }
                    />
                    <div className={styles.optionsContainer}>
                        <Button
                            icon="filter"
                            size="24"
                            className={styles.options}
                            label="Filter"
                            onClick={() =>
                                toggleFilter(setIsFilterOpen, setIsSortOpen)
                            }
                        />
                        {isFilterOpen && (
                            <Filter
                                visibleFilter={[
                                    "date",
                                    "total",
                                    "payment",
                                    "fulfillment",
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
                            onClick={() =>
                                toggleSort(setIsSortOpen, setIsFilterOpen)
                            }
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
                        "orderDate",
                        "customerUsername",
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
