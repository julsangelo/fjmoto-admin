import React from "react";
import styles from "./Brand.module";
import fjmotologo from "../assets/images/logo/fjmoto-logo.png";

export default function Brand() {
    return (
        <div className={styles.brandContainer}>
            <img className={styles.brandLogo} src={fjmotologo} alt="" />
            <div className={styles.brandName}>FJ Moto Enduro</div>
        </div>
    );
}
