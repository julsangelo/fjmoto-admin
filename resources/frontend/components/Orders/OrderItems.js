import React, { useEffect, useState } from "react";
import { getOrderItems, setComplete } from "../../ajax/backend";
import { getCustomerInfo } from "../../ajax/backend";
import styles from "./OrderItems.module";
import Button from "../Button";
import OrderItem from "../OrderItem";
import Tag from "../Tag";
import { useFlashMessage } from "../../context/FlashMessage";

export default function OrderItems({ order, onBack }) {
    const [orderItems, setOrderItems] = useState({});
    const [customerData, setCustomerData] = useState({});
    const [fulfillmentStatus, setFulfillmentStatus] = useState(
        order.orderFulfillmentStatus,
    );
    const [completeStatus, setCompleteStatus] = useState(order.orderStatus);
    const { setFlashMessage, setFlashStatus } = useFlashMessage();

    useEffect(() => {
        getOrderItems(
            order.orderID,
            (data) => {
                setOrderItems(data);
            },
            true,
        );
    }, [order.orderID]);

    const handleComplete = () => {
        setComplete(order.orderID, setFlashMessage, setFlashStatus);
        setCompleteStatus("Completed");
    };

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
                    <Tag text={completeStatus} icon={true} />
                </div>
                <div className={styles.orderDateTime}>
                    <p>Order made in {order.orderDate}</p>
                </div>
            </div>
            <div className={styles.detailsContainer}>
                <div className={styles.infoContent}>
                    <div className={styles.infoContainer}>
                        <OrderItem
                            orderItems={orderItems.data}
                            orderID={order.orderID}
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
                        {fulfillmentStatus === "Fulfilled" &&
                            completeStatus !== "Completed" && (
                                <Button
                                    label="Complete order"
                                    className={styles.infoButton}
                                    onClick={() => {
                                        handleComplete();
                                    }}
                                />
                            )}
                    </div>
                </div>
                <div className={styles.infoContainer}>
                    <div className={styles.info}>
                        Customer
                        <div className={styles.infoDetails}>
                            <p>
                                {order.customerUsername}
                                <span>(ID:{order.customerID})</span>
                            </p>
                            <p>{orderItems.data?.length || 0} items</p>
                        </div>
                    </div>
                    <div className={styles.info}>
                        Contact Information
                        <div className={styles.infoDetails}>
                            <p>{order.customerEmail}</p>
                            <p>{order.customerContactNo}</p>
                        </div>
                    </div>
                    <div className={styles.info}>
                        Shipping Address
                        <div className={styles.infoDetails}>
                            <p>{order.orderDelivery.deliveryFullName}</p>
                            <p>
                                {order.orderDelivery.deliveryAddressExtra &&
                                    `${order.orderDelivery.deliveryAddressExtra}, `}
                                {order.orderDelivery.deliveryAddress},{" "}
                                {order.orderDelivery.deliveryBarangay},{" "}
                                {order.orderDelivery.deliveryCity},{" "}
                                {order.orderDelivery.deliveryProvince},{" "}
                                {order.orderDelivery.deliveryRegion}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
