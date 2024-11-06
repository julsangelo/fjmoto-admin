import React from "react";
import styles from "./OrderItem.module";
import Button from "./Button";

export default function OrderItem({ orderItems }) {
    return (
        <div className={styles.orderItemContainer}>
            {orderItems &&
                orderItems.map((item, index) => (
                    <div key={index} className={styles.orderItemInfo}>
                        <div className={styles.orderItemImageContainer}>
                            <img
                                src={`/fjmoto/${item.product?.productImage}`}
                                alt={item.product?.productName}
                                className={styles.orderItemImage}
                            />
                        </div>
                        <div className={styles.description}>
                            <p>{item.product?.productName}</p>
                            <div>Product Specification</div>
                        </div>
                        <div className={styles.priceQuantity}>
                            <span>₱ {item.product?.productPrice}</span>
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
