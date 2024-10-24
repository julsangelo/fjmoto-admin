import React, { useEffect, useState } from "react";
import styles from "./Purchases.module";
import Button from "../Button";
import Table from "../Table";
import Filter from "../Filter";
import { getPurchases } from "../../ajax/backend";

export default function Purchases({ customer, onBack }) {
    const [purchasesData, setPurchasesData] = useState({});
    const [isFilterOpen, setIsFilterOpen] = useState(false);

    useEffect(() => {
        getPurchases(customer.customerID, (data) => {
            setPurchasesData(data);
        });
    }, [customer.customerID]);

    console.log(purchasesData);

    const toggleFilterModal = () => {
        setIsFilterOpen((prev) => !prev);
        setIsSortOpen(false);
    };
    return (
        <div className={styles.purchasesContent}>
            <div className={styles.purchasesHeader}>
                <Button
                    icon="back"
                    size="20"
                    className={styles.purchasesBackButton}
                    onClick={onBack}
                />
                Purchases
            </div>
            <div className={styles.infoContainer}>
                <div className={styles.purchasesMain}>
                    <div className={styles.purchasesSearchFilter}>
                        <Button
                            icon="filter"
                            size="24"
                            className={styles.purchasesFilter}
                            label="Filter"
                            onClick={toggleFilterModal}
                        />
                    </div>
                    <Table
                        checkbox={false}
                        data={{
                            headers: purchasesData.headers || [],
                            data: purchasesData.data || [],
                        }}
                        action={false}
                        visibleColumns={[
                            "orderID",
                            "orderDateTime",
                            "orderTotal",
                            "orderPaymentStatus",
                            "orderFulfillmentStatus",
                            "orderStatus",
                        ]}
                    />
                    {isFilterOpen && (
                        <Filter visibleFilter={["category", "price"]} />
                    )}
                </div>
                <div className={styles.purchasesInfo}>
                    <div className={styles.purchasesInfoContainer}>
                        Customer
                        <div className={styles.purchasesInfoDetails}>
                            <p>{customer.customerName}</p>
                            <span>2 orders</span>
                        </div>
                    </div>
                    <div className={styles.purchasesInfoContainer}>
                        Contact Information
                        <div className={styles.purchasesInfoDetails}>
                            <p>{customer.customerEmail}</p>
                            <p>{customer.customerContactNo}</p>
                        </div>
                    </div>
                    <div className={styles.purchasesInfoContainer}>
                        Shipping Address
                        <div className={styles.purchasesInfoDetails}>
                            <p>{customer.customerName}</p>
                            <p>{customer.customerAddress}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
