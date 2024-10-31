import React, { useEffect, useState } from "react";
import styles from "./Main.module";
import Input from "../components/Input";
import Table from "../components/Table";
import { getCustomers } from "../ajax/backend";
import { search } from "../utils/search";

export default function Customer({ showPurchases }) {
    const [customerData, setCustomerData] = useState({});
    const { searchTerm, handleSearchChange, searchData } = search(
        customerData.data,
    );

    useEffect(() => {
        getCustomers((data) => {
            setCustomerData(data);
        });
    }, []);

    const handleView = (customerId) => {
        showPurchases(customerId);
    };

    return (
        <div className={styles.container}>
            <div className={styles.header}>Customers</div>
            <div className={styles.mainContent}>
                <div className={styles.contentOptions}>
                    <Input
                        placeholder="Search customers"
                        icon="search"
                        height="24"
                        width="24"
                        value={searchTerm}
                        onChange={handleSearchChange}
                    />
                </div>
                <Table
                    checkbox={false}
                    data={{
                        headers: customerData.headers || [],
                        data: searchTerm ? searchData : customerData.data || [],
                    }}
                    action={true}
                    visibleActions={["view"]}
                    onView={handleView}
                    visibleColumns={[
                        "customerFirstName",
                        "customerLastName",
                        "customerID",
                        "customerEmail",
                        "customerContactNo",
                        "customerAddress",
                    ]}
                />
            </div>
        </div>
    );
}
