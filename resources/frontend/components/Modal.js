import React from "react";
import styles from "./Modal.module";
import Icon from "./Icon";
import AddInventory from "./AddInventory";

export default function Modal({ onClose }) {
    return (
        <div className={styles.modal}>
            <div className={styles.modalContainer}>
                <div className={styles.modalHeader}>
                    <Icon icon="close" size="24" onClick={onClose} />
                </div>
                <div className={styles.modalContent}>
                    <AddInventory onClose={onClose} />
                </div>
            </div>
        </div>
    );
}
