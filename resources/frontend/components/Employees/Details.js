import React from "react";
import styles from "./Details.module";
import Button from "../Button";
import { useModal } from "../../utils/modal";
import Modal from "../Modal";

export default function Details({ employee, onBack, showEdit }) {
    const {
        isModalOpen,
        modalType,
        selectedValue,
        selectedData,
        selectedTab,
        openModal,
        closeModal,
    } = useModal();

    return (
        <div className={styles.detailContent}>
            <div className={styles.detailHeader}>
                <Button
                    icon="back"
                    size="20"
                    className={styles.detailBackButton}
                    onClick={onBack}
                />
                <Button
                    label="Edit details"
                    icon="edit"
                    size="24"
                    onClick={() => showEdit(employee)}
                />
            </div>
            <div className={styles.detailsContainer}>
                <div className={styles.infoContainer}>
                    <p>Personal Information</p>
                    <div className={styles.infoTable}>
                        <div>
                            <p>Employee ID</p>
                            <p>{employee.employeeID}</p>
                        </div>
                        <div>
                            <p>First Name</p>
                            <p>{employee.employeeFirstName}</p>
                        </div>
                        <div>
                            <p>Middle Name</p>
                            <p>{employee.employeeMiddleName}</p>
                        </div>
                        <div>
                            <p>Last Name</p>
                            <p>{employee.employeeLastName}</p>
                        </div>
                        <div>
                            <p>Email</p>
                            <p>{employee.employeeEmail}</p>
                        </div>
                        <div>
                            <p>Contact Number</p>
                            <p>{employee.employeeContactNo}</p>
                        </div>
                        <div>
                            <p>Address</p>
                            <p>{employee.employeeAddress}</p>
                        </div>
                    </div>
                </div>
                <div className={styles.infoContainer}>
                    <p>Employment Details</p>
                    <div className={styles.infoTable}>
                        <div>
                            <p>Position/Role</p>
                            <p>{employee.employeePosition}</p>
                        </div>
                        <div>
                            <p>Date Hired</p>
                            <p>{employee.employeeDateHired}</p>
                        </div>
                        <div>
                            <p>Employment Status</p>
                            <p>{employee.employeeStatus}</p>
                        </div>
                        <div>
                            <p>Manager/Supervisor</p>
                            <p>{employee.employeeManager}</p>
                        </div>
                        <div>
                            <p>Branch</p>
                            <p>{employee.branchBranch}</p>
                        </div>
                    </div>
                </div>
            </div>

            <Button
                label="Delete employee"
                icon="delete"
                size="24"
                className={styles.deleteButton}
                onClick={() => openModal("delete", null, employee, "employee")}
            />
            {isModalOpen && (
                <Modal
                    onClose={closeModal}
                    modal={modalType}
                    value={selectedValue}
                    data={selectedData}
                    tab={selectedTab}
                    onBack={onBack}
                />
            )}
        </div>
    );
}
