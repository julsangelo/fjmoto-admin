import React from "react";
import styles from "./DeleteProductCategory.module";
import Button from "../Button";
import { deleteInventory, deleteProductCategory } from "../../ajax/backend";
import { useFlashMessage } from "../../context/FlashMessage";

export default function DeleteProductCategory({ onClose, productCategory }) {
    const { setFlashMessage, setFlashStatus } = useFlashMessage();

    const deleteCategory = (productCategory) => {
        deleteProductCategory(
            productCategory,
            setFlashMessage,
            setFlashStatus,
            onClose,
        );
    };

    return (
        <>
            <div className={styles.deleteInventoryTitle}>Are you sure?</div>
            <div className={styles.deleteInventoryText}>
                This will permanently delete this product category. This action
                cannot be undone.
            </div>
            <div className={styles.deleteInventoryButton}>
                <Button
                    label="Cancel"
                    onClick={onClose}
                    className={styles.deleteInventoryCancel}
                />
                <Button
                    label="Delete category"
                    type="submit"
                    icon="delete"
                    size="24"
                    className={styles.deleteInventorySubmit}
                    onClick={() => deleteCategory(productCategory)}
                />
            </div>
        </>
    );
}
