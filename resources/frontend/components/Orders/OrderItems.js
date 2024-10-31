import React, { useEffect, useState } from "react";
import { getOrderItems } from "../../ajax/backend";
import styles from "./OrderItems.module";
import Button from "../Button";
import OrderItem from "../OrderItem";

export default function Details({ order, onBack }) {
    const [orderItems, setOrderItems] = useState({});

    useEffect(() => {
        getOrderItems(
            order.orderID,
            (data) => {
                setOrderItems(data);
            },
            true,
        );
    }, [order.orderID]);

    console.log("Order List: ", orderItems);

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
                    <p>Order No. {orderItems.orderID}</p>
                    <div className={styles.orderBadge}>
                        <p>{orderItems.orderFulfillmentStatus}</p>
                    </div>
                    <div className={styles.orderBadge}>
                        <p>{orderItems.orderStatus}</p>
                    </div>
                </div>
                <div className={styles.orderDateTime}>
                    <p>Order made in {orderItems.orderDateTime}</p>
                </div>
            </div>
            <div className={styles.detailsContainer}>
                <div className={styles.infoContainer}>
                    <OrderItem />
                </div>
                <div className={styles.infoContainer}>
                    <p>Customer</p>
                    <div className={styles.infoTable}>
                        <div>
                            <p>{orderItems.customerFirstName}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
