import React, { useEffect, useState } from "react";
import styles from "./CustomerOrders.module";
import Button from "../Button";
import Table from "../Table";
import Filter from "../Filter";
import { getCustomerOrders } from "../../ajax/backend";

export default function Purchases({ customer, onBack }) {
    const [purchasesData, setPurchasesData] = useState({});
    const [isFilterOpen, setIsFilterOpen] = useState(false);

    useEffect(() => {
        getCustomerOrders(customer.customerID, (data) => {
            setPurchasesData(data);
        });
    }, [customer.customerID]);

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
                        <div className={styles.customerOrdersOptionContainer}>
                            <Button
                                icon="filter"
                                size="24"
                                className={styles.purchasesFilter}
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
