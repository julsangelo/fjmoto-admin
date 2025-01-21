import React from "react";
import styles from "./Brand.module";

export default function Brand() {
    return (
        <div className={styles.brandContainer}>
            <img
                className={styles.brandLogo}
                src="/hydrogen/images/logo/logo.png"
                alt=""
            />
            <div className={styles.brandName}>FJ Moto Enduro</div>
        </div>
    );
}
