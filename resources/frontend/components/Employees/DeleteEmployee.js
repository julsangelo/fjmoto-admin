import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import styles from "./DeleteEmployee.module";
import Button from "../Button";
import Input from "../Input";
import { useFlashMessage } from "../../context/FlashMessage";
import { deleteEmployee } from "../../ajax/backend";

export default function DeleteEmployee({ employee, onClose, onBack }) {
    const { setFlashMessage, setFlashStatus } = useFlashMessage();

    const validationSchema = Yup.object({
        employeeID: Yup.string()
            .oneOf([employee.employeeID.toString()], "ID does not match")
            .required("Employee ID is required to confirm deletion"),
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(validationSchema),
    });

    const onDelete = (employeeID) => {
        deleteEmployee(
            employeeID,
            setFlashMessage,
            setFlashStatus,
            onClose,
            onBack,
        );
    };

    return (
        <form onSubmit={handleSubmit(onDelete)}>
            <div className={styles.deleteEmployeeTitle}>Are you sure?</div>
            <div className={styles.deleteEmployeeText}>
                This will permanently delete{" "}
                <strong>
                    {employee.employeeFirstName} {employee.employeeLastName}
                </strong>{" "}
                and all associated data, including roles, permissions, and
                history. This action cannot be undone.
                <div className={styles.deleteEmployeeConfirmation}>
                    To confirm, please type the{" "}
                    <strong>Employee ID: {employee.employeeID}</strong>
                    <Input
                        {...register("employeeID")}
                        containerStyle={styles.deleteEmployeeConfirmationInput}
                        error={errors.employeeID?.message}
                    />
                </div>
            </div>
            <div className={styles.deleteEmployeeButton}>
                <Button
                    label="Cancel"
                    onClick={onClose}
                    className={styles.deleteEmployeeCancel}
                />
                <Button
                    label="Delete employee"
                    type="submit"
                    icon="delete"
                    size="24"
                    className={styles.deleteEmployeeSubmit}
                />
            </div>
        </form>
    );
}
