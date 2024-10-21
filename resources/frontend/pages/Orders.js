import React, { useEffect, useState } from "react";
import { getOrders } from "../ajax/backend";
import styles from "./Orders.module";
import Button from "../components/Button";
import Input from "../components/Input";
import Table from "../components/Table";
import Filter from "../components/Filter";
import Sort from "../components/Sort";

export default function Orders({ branch }) {
    const [ordersData, setOrdersData] = useState({});
    const [searchTerm, setSearchTerm] = useState("");
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [isSortOpen, setIsSortOpen] = useState(false);
    const [modalType, setModalType] = useState("");

    useEffect(() => {
        getOrders(branch, (data) => {
            setOrdersData(data);
        });
    }, [branch]);

    console.log(ordersData);

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
        console.log(event.target.value);
    };

    const filteredData = ordersData.data
        ? ordersData.data.filter((item) =>
              Object.values(item).some((value) =>
                  String(value)
                      .toLowerCase()
                      .includes(searchTerm.toLowerCase()),
              ),
          )
        : [];

    const toggleFilterModal = () => {
        setIsFilterOpen((prev) => !prev);
        setIsSortOpen(false);
    };

    const toggleSortModal = () => {
        setIsSortOpen((prev) => !prev);
        setIsFilterOpen(false);
    };

    return (
        <div className={styles.ordersContent}>
            <div className={styles.ordersHeader}>Orders</div>
            <div className={styles.ordersMain}>
                <div className={styles.ordersSearchFilter}>
                    <Input
                        placeholder="Search orders"
                        icon="search"
                        size="24"
                        value={searchTerm}
                        onChange={handleSearchChange}
                    />
                    <Button
                        icon="filter"
                        size="24"
                        className={styles.ordersFilter}
                        label="Filter"
                        onClick={toggleFilterModal}
                    />
                    <Button
                        icon="sort"
                        size="24"
                        className={styles.ordersFilter}
                        label="Sort"
                        onClick={toggleSortModal}
                    />
                </div>
                <Table
                    checkbox={false}
                    data={{
                        headers: ordersData.headers || [],
                        data: searchTerm ? filteredData : ordersData.data || [],
                    }}
                    action={true}
                    branch={branch}
                    visibleColumns={[
                        "ID",
                        "orderDate",
                        "customer",
                        "total",
                        "items",
                        "paymentStatus",
                        "fulfillmentStatus",
                        "orderStatus",
                    ]}
                    visibleActions={["view"]}
                />
                {isFilterOpen && <Filter />}
                {isSortOpen && <Sort />}
            </div>
        </div>
    );
}
