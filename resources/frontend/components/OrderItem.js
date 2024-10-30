import React, { useState } from "react";
import styles from "./OrderItem.module";
import Icon from "./Icon";
import Button from "./Button";

export default function OrderItem() {
    return (
        <div className={styles.orderItemContainer}>
            <div className={styles.orderItemInfo}>
                <div className={styles.image}></div>
                <div className={styles.description}>
                    <p>Helmet ni Kap</p>
                    <div>Black</div>
                </div>
                <div className={styles.priceQuantity}>
                    <span>15,000</span>
                    <span>x</span>
                    <span>2</span>
                </div>
                <div>
                    <p>30,000</p>
                </div>
            </div>
            <Button
                label="Fulfill items"
                // onClick={() => openModal("add")}
            />
        </div>
    );
}
