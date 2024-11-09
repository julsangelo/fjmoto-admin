import React from "react";
import styles from "./DeleteInventory.module";
import Button from "../Button";
import { deleteInventory } from "../../ajax/backend";
import { useFlashMessage } from "../../context/FlashMessage";

export default function DeleteInventory({ onClose, productID }) {
    const { setFlashMessage, setFlashStatus } = useFlashMessage();

    const deleteProduct = (productID) => {
        deleteInventory(productID, setFlashMessage, setFlashStatus, onClose);
    };

    return (
        <>
            <div className={styles.deleteInventoryTitle}>Are you sure?</div>
            <div className={styles.deleteInventoryText}>
                This will permanently delete this item from the inventory. This
                action cannot be undone.
            </div>
            <div className={styles.deleteInventoryButton}>
                <Button
                    label="Cancel"
                    onClick={onClose}
                    className={styles.deleteInventoryCancel}
                />
                <Button
                    label="Delete item"
                    type="submit"
                    icon="delete"
                    size="24"
                    className={styles.deleteInventorySubmit}
                    onClick={() => deleteProduct(productID)}
                />
            </div>
        </>
    );
}
