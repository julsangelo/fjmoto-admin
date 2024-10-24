import React from "react";
import styles from "./Modal.module";
import Icon from "./Icon";
import AddInventory from "./Inventory/AddInventory";
import DeleteInventory from "./Inventory/DeleteInventory";
import EditInventory from "./Inventory/EditInventory";

export default function Modal({
    onClose,
    branchID,
    modal,
    productId,
    product,
}) {
    const renderContent = () => {
        switch (modal) {
            case "add":
                return <AddInventory onClose={onClose} branchID={branchID} />;
            case "delete":
                return (
                    <DeleteInventory onClose={onClose} productId={productId} />
                );
            case "edit":
                return <EditInventory onClose={onClose} product={product} />;
            default:
                return <div>No content available</div>;
        }
    };

    return (
        <div className={styles.modal}>
            <div className={styles.modalContainer}>
                <div className={styles.modalHeader}>
                    <Icon icon="close" size="24" onClick={onClose} />
                </div>
                <div className={styles.modalContent}>{renderContent()}</div>
            </div>
        </div>
    );
}
