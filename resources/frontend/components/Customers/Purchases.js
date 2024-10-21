import React from "react";
import styles from "./Purchases.module";
import Button from "../Button";
import Table from "../Table";

export default function Purchases() {
    return (
        <div className={styles.purchasesContent}>
            <div className={styles.purchasesHeader}>
                <Button
                    icon="back"
                    size="20"
                    className={styles.purchasesBackButton}
                />
                Purchases
            </div>
            <div className={styles.purchasesTable}>
                <Table action={false} />
            </div>
        </div>
    );
}
