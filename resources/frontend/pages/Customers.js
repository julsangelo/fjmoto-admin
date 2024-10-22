import React, { useEffect, useState } from "react";
import styles from "./Customers.module";
import Input from "../components/Input";
import Table from "../components/Table";
import { getCustomers } from "../ajax/backend";

export default function Customer({ showPurchases }) {
    const [customerData, setCustomerData] = useState({});
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        getCustomers((data) => {
            setCustomerData(data);
        });
    }, []);

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
        console.log(event.target.value);
    };

    const filteredData = customerData.data
        ? customerData.data.filter((item) =>
              Object.values(item).some((value) =>
                  String(value)
                      .toLowerCase()
                      .includes(searchTerm.toLowerCase()),
              ),
          )
        : [];

    const handleView = (customerId) => {
        showPurchases(customerId);
    };

    return (
        <div className={styles.customersContent}>
            <div className={styles.customersHeader}>Customers</div>
            <div className={styles.customersMain}>
                <div className={styles.customersSearchFilter}>
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
                        data: searchTerm
                            ? filteredData
                            : customerData.data || [],
                    }}
                    action={true}
                    visibleActions={["view"]}
                    onView={handleView}
                    visibleColumns={[
                        "customerName",
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
