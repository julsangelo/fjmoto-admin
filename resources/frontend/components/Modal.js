import React from "react";
import styles from "./Modal.module";
import Icon from "./Icon";
import AddInventory from "./Inventory/AddInventory";
import DeleteInventory from "./Inventory/DeleteInventory";
import EditInventory from "./Inventory/EditInventory";
import DeleteEmployee from "./Employees/DeleteEmployee";

export default function Modal({
    onClose,
    branchID,
    modal,
    value,
    data,
    tab,
    onBack,
    references,
}) {
    const renderContent = () => {
        switch (modal) {
            case "add":
                return (
                    <AddInventory
                        onClose={onClose}
                        branchID={branchID}
                        category={references.categories}
                    />
                );
            case "delete":
                switch (tab) {
                    case "employee":
                        return (
                            <DeleteEmployee
                                onClose={onClose}
                                employee={data}
                                onBack={onBack}
                            />
                        );
                    default:
                        return (
                            <DeleteInventory
                                onClose={onClose}
                                productID={value}
                            />
                        );
                }
            case "edit":
                return (
                    <EditInventory
                        onClose={onClose}
                        product={data}
                        category={references.categories}
                    />
                );
            case "image":
                return (
                    <div className={styles.modalImage}>
                        <img src={`/fjmoto/${value}`} alt="" />
                    </div>
                );
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
