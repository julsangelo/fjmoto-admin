import React from "react";
import styles from "./Brand.module";
// import logo from "../../assets/images/fjmoto-logo.png";

export default function Brand() {
    return (
        <div className={styles.brandContainer}>
            <img
                className={styles.brandLogo}
                src="../../assets/images/logo/fjmoto-logo.png"
                alt=""
            />
            <div className={styles.brandName}>FJ Moto Enduro</div>
        </div>
    );
}
