import React, { useContext, useEffect, useState } from "react";
import styles from "./Details.module";
import Button from "../Button";
import { useModal } from "../../utils/modal";
import Modal from "../Modal";
import { getViewEmployee } from "../../ajax/backend";

export default function Details({ employeeID, onBack, showEdit }) {
    const [viewEmployeeData, setViewEmployeeData] = useState();

    const {
        isModalOpen,
        modalType,
        selectedValue,
        selectedData,
        selectedTab,
        openModal,
        closeModal,
    } = useModal();

    useEffect(() => {
        getViewEmployee(employeeID, (data) => {
            setViewEmployeeData(data.data[0]);
        });
    }, [employeeID]);

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
                    onClick={() => showEdit(viewEmployeeData)}
                />
            </div>
            <div className={styles.detailsContainer}>
                <div className={styles.infoContainer}>
                    <p>Personal Information</p>
                    <div className={styles.infoTable}>
                        <div>
                            <p>Employee ID</p>
                            <p>{viewEmployeeData?.employeeID}</p>
                        </div>
                        <div>
                            <p>First Name</p>
                            <p>{viewEmployeeData?.employeeFirstName}</p>
                        </div>
                        <div>
                            <p>Middle Name</p>
                            <p>{viewEmployeeData?.employeeMiddleName}</p>
                        </div>
                        <div>
                            <p>Last Name</p>
                            <p>{viewEmployeeData?.employeeLastName}</p>
                        </div>
                        <div>
                            <p>Email</p>
                            <p>{viewEmployeeData?.employeeEmail}</p>
                        </div>
                        <div>
                            <p>Contact Number</p>
                            <p>{viewEmployeeData?.employeeContactNo}</p>
                        </div>
                        <div>
                            <p>Address</p>
                            <p>{viewEmployeeData?.employeeAddress}</p>
                        </div>
                    </div>
                </div>
                <div className={styles.infoContainer}>
                    <p>Employment Details</p>
                    <div className={styles.infoTable}>
                        <div>
                            <p>Position/Role</p>
                            <p>{viewEmployeeData?.employeePosition}</p>
                        </div>
                        <div>
                            <p>Date Hired</p>
                            <p>{viewEmployeeData?.employeeDateHired}</p>
                        </div>
                        <div>
                            <p>Employment Status</p>
                            <p>{viewEmployeeData?.employeeStatus}</p>
                        </div>
                        <div>
                            <p>Manager/Supervisor</p>
                            <p>{viewEmployeeData?.employeeManager}</p>
                        </div>
                        <div>
                            <p>Branch</p>
                            <p>{viewEmployeeData?.employeeBranch}</p>
                        </div>
                    </div>
                </div>
            </div>

            <Button
                label="Delete employee"
                icon="delete"
                size="24"
                className={styles.deleteButton}
                onClick={() =>
                    openModal("delete", null, viewEmployeeData, "employee")
                }
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
