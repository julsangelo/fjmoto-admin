import React from "react";
import styles from "./OrderItem.module";
import Button from "./Button";

export default function OrderItem({ orderItems }) {
    return (
        <div className={styles.orderItemContainer}>
            {orderItems &&
                orderItems.map((item, index) => (
                    <div key={index} className={styles.orderItemInfo}>
                        <div className={styles.image}>
                            <img
                                src={item.productImage}
                                alt={item.productName}
                            />
                        </div>
                        <div className={styles.description}>
                            <p>{item.productName}</p>
                            <div>Product Specification</div>
                        </div>
                        <div className={styles.priceQuantity}>
                            <span>{item.orderItemTotal}</span>
                            <span>x</span>
                            <span>{item.orderItemQuantity}</span>
                        </div>
                        <span className={styles.itemTotalPrice}>
                            {item.orderItemTotal}
                        </span>
                    </div>
                ))}
            <Button label="Fulfill items" />
        </div>
    );
}
