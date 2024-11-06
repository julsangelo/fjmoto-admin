import React, { useEffect, useState } from "react";
import { getOrderItems } from "../../ajax/backend";
import { getCustomerInfo } from "../../ajax/backend";
import styles from "./OrderItems.module";
import Button from "../Button";
import OrderItem from "../OrderItem";

export default function Details({ order, onBack }) {
    const [orderItems, setOrderItems] = useState({});
    const [customerData, setCustomerData] = useState({});

    useEffect(() => {
        getOrderItems(
            order.orderID,
            (data) => {
                setOrderItems(data);
            },
            true,
        );
    }, [order.orderID]);

    useEffect(() => {
        getCustomerInfo(order.customerID, (data) => {
            setCustomerData(data);
        });
    }, [order.customerID]);

    console.log("Customer ID in order: ", customerData.data);

    return (
        <div className={styles.detailContent}>
            <div className={styles.detailHeader}>
                <div>
                    <Button
                        icon="back"
                        size="20"
                        className={styles.detailBackButton}
                        onClick={onBack}
                    />
                    <p>Order No. {order.orderID}</p>
                    <div className={styles.orderBadge}>
                        <p>{order.orderFulfillmentStatus}</p>
                    </div>
                    <div className={styles.orderBadge}>
                        <p>{order.orderStatus}</p>
                    </div>
                </div>
                <div className={styles.orderDateTime}>
                    <p>Order made in {order.orderDateTime}</p>
                </div>
            </div>
            <div className={styles.detailsContainer}>
                <div className={styles.infoContainer}>
                    <OrderItem orderItems={orderItems.data} />
                </div>
                <div className={styles.infoContainer}>
                    <div className={styles.info}>
                        {/* <p>Customer</p>
                        <div className={styles.infoTable}>
                            <div>
                                <p></p>
                            </div>
                        </div> */}
                        Customer
                        <div className={styles.infoDetails}>
                            <p>
                                {customerData.data?.[0]?.customerName}
                                <span>
                                    (ID:{customerData.data?.[0]?.customerID})
                                </span>
                            </p>
                            <p>{orderItems.data?.length || 0} items</p>
                        </div>
                    </div>
                    <div className={styles.info}>
                        Contact Information
                        <div className={styles.infoDetails}>
                            <p>{customerData.data?.[0]?.customerEmail}</p>
                            <p>{customerData.data?.[0]?.customerContactNo}</p>
                        </div>
                    </div>
                    <div className={styles.info}>
                        Shipping Address
                        <div className={styles.infoDetails}>
                            <p>{customerData.data?.[0]?.customerName}</p>
                            <p>{customerData.data?.[0]?.customerAddress}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
