import React, { useState } from "react";
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
                <Input label="ID" value={formData.id} />
                <Input label="Product Name" value={formData.productName} />
                <Input label="Quantity" value={formData.quantity} />
                <Input label="Price" value={formData.price} />
                <Dropdown
                    label="Category"
                    className={styles.addInventoryDropdown}
                    setSelectedBranch={(value) =>
                        setFormData({ ...formData, category: value })
                    }
                />
            </div>
            <div className={styles.addInventoryButton}>
                <Button
                    label="Cancel"
                    onClick={onClose}
                    className={styles.addInventoryCancel}
                />
                <Button label="Submit" onClick={handleSubmit} />
            </div>
        </>
    );
}
