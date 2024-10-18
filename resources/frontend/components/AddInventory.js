import React from "react";
import styles from "./AddInventory.module";
import Input from "./Input";
import UploadImage from "./UploadImage";
import Button from "./Button";
import Dropdown from "./Dropdown";

export default function AddInventory({ onClose }) {
    return (
        <>
            <div className={styles.addInventoryTitle}>Add Inventory</div>
            <div className={styles.addInventoryForm}>
                <div className={styles.addInventoryImage}>
                    <UploadImage />
                </div>
                <Input label="ID" />
                <Input label="Product Name" />
                <Input label="Quantity" />
                <Input label="Price" />
                <Dropdown
                    label="Category"
                    className={styles.addInventoryDropdown}
                />
            </div>
            <div className={styles.addInventoryButton}>
                <Button
                    label="Cancel"
                    onClick={onClose}
                    className={styles.addInventoryCancel}
                />
                <Button label="Submit" />
            </div>
        </>
    );
}
