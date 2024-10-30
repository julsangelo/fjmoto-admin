import React, { useEffect, useState } from "react";
import { getOrders } from "../../ajax/backend";
import styles from "./OrderList.module";
import Button from "../Button";

export default function Details({ order, onBack }) {
    const [orderList, setOrderList] = useState({});

    useEffect(() => {
        getOrders(
            order.orderID,
            (data) => {
                setOrderList(data);
            },
            true,
        );
    }, [order.orderID]);

    console.log("Order List: ", orderList);

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
                    <p>Order No. {orderList.orderID}</p>
                    <div className={styles.orderBadge}>
                        <p>{orderList.orderFulfillmentStatus}</p>
                    </div>
                    <div className={styles.orderBadge}>
                        <p>{orderList.orderStatus}</p>
                    </div>
                </div>
                <div className={styles.orderDateTime}>
                    <p>Order made in {orderList.orderDateTime}</p>
                </div>
            </div>
            <div className={styles.detailsContainer}>
                <div className={styles.infoContainer}>
                    <div></div>
                </div>
                <div className={styles.infoContainer}>
                    <p>Customer</p>
                    <div className={styles.infoTable}>
                        <div>
                            <p>{orderList.customerFirstName}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
