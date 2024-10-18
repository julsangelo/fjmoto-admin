import React, { useEffect, useState } from "react";
import styles from "./Customers.module";
import Button from "../components/Button";
import Input from "../components/Input";
import Table from "../components/Table";
import { getCustomers } from "../ajax/backend";

export default function Customer() {
    const [customerData, setCustomerData] = useState({});
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        getCustomers((data) => {
            setCustomerData(data);
        });
    });

    console.log(customerData);

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
                        placeholder="Search products"
                        icon="search"
                        height="24"
                        width="24"
                        value={searchTerm} // Bind the value to the state
                        onChange={handleSearchChange} // Handle input changes
                    />
                    <Button
                        icon="filter"
                        size="24"
                        className={styles.customersFilter}
                        label="Filter"
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
                />
            </div>
        </div>
    );
}
