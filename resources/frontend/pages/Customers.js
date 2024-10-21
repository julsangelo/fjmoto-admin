import React, { useEffect, useState } from "react";
import styles from "./Customers.module";
import Button from "../components/Button";
import Input from "../components/Input";
import Table from "../components/Table";
import { getCustomers } from "../ajax/backend";
import Filter from "../components/Filter";
import Sort from "../components/Sort";

export default function Customer({ onViewCustomer }) {
    const [customerData, setCustomerData] = useState({});
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        getCustomers((data) => {
            setCustomerData(data);
        });
    });

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
                    visibleColumns={[
                        "customerName",
                        "customerID",
                        "customerEmail",
                        "customerContactNo",
                        "customerAddress",
                    ]}
                    onViewCustomer={onViewCustomer}
                />
            </div>
        </div>
    );
}
