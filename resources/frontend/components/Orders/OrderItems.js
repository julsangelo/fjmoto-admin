import React, { useEffect, useState } from "react";
import { getOrderItems } from "../../ajax/backend";
import { getCustomerInfo } from "../../ajax/backend";
import styles from "./OrderItems.module";
import Button from "../Button";
import OrderItem from "../OrderItem";
import Tag from "../Tag";

export default function OrderItems({ order, onBack }) {
    const [orderItems, setOrderItems] = useState({});
    const [customerData, setCustomerData] = useState({});
    const [fulfillmentStatus, setFulfillmentStatus] = useState(
        order.orderFulfillmentStatus,
    );

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
                    <Tag text={fulfillmentStatus} icon={true} />
                    <Tag text={order.orderStatus} icon={true} />
                </div>
                <div className={styles.orderDateTime}>
                    <p>Order made in {order.orderDateTime}</p>
                </div>
            </div>
            <div className={styles.detailsContainer}>
                <div className={styles.infoContent}>
                    <div className={styles.infoContainer}>
                        <OrderItem
                            orderItems={orderItems.data}
                            order={order}
                            isFulfilled={fulfillmentStatus == "Fulfilled"}
                            isActive={order.orderStatus == "Active"}
                            setFulfillStatus={setFulfillmentStatus}
                        />
                    </div>
                    <div className={styles.infoContainer}>
                        <Tag text={order.orderPaymentStatus} icon={true} />
                        <div className={styles.infoTotal}>
                            <div className={styles.infoTotalDetails}>
                                <p>Subtotal</p>
                                <p>{orderItems.data?.length} item/s</p>
                                <p>₱ {order.orderTotal}</p>
                            </div>
                            <div className={styles.infoTotalDetails}>
                                <p>Shipping Fee</p>
                                <p>₱ 50</p>
                            </div>
                            <div className={styles.infoTotalDetails}>
                                <strong>Total</strong>
                                <strong>₱ {order.orderTotal + 50}</strong>
                            </div>
                        </div>
                        <Button
                            label="Send Invoice"
                            className={styles.infoButton}
                        />
                    </div>
                </div>
                <div className={styles.infoContainer}>
                    <div className={styles.info}>
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
