import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import styles from "./AddEditEmployee.module";
import Input from "../Input";
import Button from "../Button";
import Icon from "../Icon";
import Dropdown from "../Dropdown";

const employeeValidationSchema = Yup.object().shape({
    employeeFirstName: Yup.string()
        .max(50, "First name cannot exceed 50 characters.")
        .required("First name is required."),
    employeeMiddleName: Yup.string().max(
        50,
        "Middle name cannot exceed 50 characters.",
    ),
    employeeLastName: Yup.string()
        .max(50, "Last name cannot exceed 50 characters.")
        .required("Last name is required."),
    employeeEmail: Yup.string()
        .email("Invalid email format.")
        .required("Email is required."),
    employeeContactNo: Yup.string()
        .matches(/^[0-9]+$/, "Contact number must only contain numbers.")
        .min(11, "Contact number must be at least 11 digits.")
        .required("Contact number is required."),
    employeeAddress: Yup.string()
        .min(5, "Address must be at least 5 characters.")
        .required("Address is required."),
    employeePosition: Yup.string().required("Position/Role is required."),
    employeeDateHired: Yup.date().required("Date hired is required."),
    employeeEmploymentStatus: Yup.string().required(
        "Employment status is required.",
    ),
    employeeBranch: Yup.string().required("Branch is required."),
});

export default function AddEditEmployee({ employee, onBack, references }) {
    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
    } = useForm({
        resolver: yupResolver(employeeValidationSchema),
        defaultValues: {
            employeeFirstName: employee?.employeeFirstName || "",
            employeeMiddleName: employee?.employeeMiddleName || "",
            employeeLastName: employee?.employeeLastName || "",
            employeeEmail: employee?.employeeEmail || "",
            employeeContactNo: employee?.employeeContactNo || "",
            employeeAddress: employee?.employeeAddress || "",
            employeePosition: employee?.employeePosition || "",
            employeeDateHired: employee?.employeeDateHired || "",
            employeeEmploymentStatus: employee?.employeeEmploymentStatus || "",
            employeeBranch: employee?.employeeBranch || "",
            employeeID: employee?.employeeEmployeeID || "",
        },
    });

    const onSubmit = (data) => {
        console.log(data);
    };

    useEffect(() => {
        if (employee) {
            setValue("employeeFirstName", employee.employeeFirstName);
            setValue("employeeMiddleName", employee.employeeMiddleName);
            setValue("employeeLastName", employee.employeeLastName);
            setValue("employeeEmail", employee.employeeEmail);
            setValue("employeeContactNo", employee.employeeContactNo);
            setValue("employeeAddress", employee.employeeAddress);
            setValue("employeePosition", employee.employeePosition);
            setValue("employeeDateHired", employee.employeeDateHired);
            setValue(
                "employeeEmploymentStatus",
                employee.employeeEmploymentStatus,
            );
            setValue("employeeBranch", employee.employeeBranch);
            setValue("employeeEmployeeID", employee.employeeID);
        }
    }, [employee, setValue]);

    return (
        <div className={styles.addEditEmployeeContent}>
            <div className={styles.addEditEmployeeBackButton}>
                <Icon icon="back" size="20" onClick={onBack} />
            </div>
            <div className={styles.addEditEmployeeContainer}>
                <div className={styles.addEditEmployeeGroupContainer}>
                    <p>Personal Details</p>
                    <div className={styles.addEditEmployeeInputContainer}>
                        <Input
                            label="First Name"
                            {...register("employeeFirstName")}
                            error={errors.employeeFirstName?.message}
                        />
                        <Input
                            label="Middle Name"
                            {...register("employeeMiddleName")}
                            error={errors.employeeMiddleName?.message}
                        />
                        <Input
                            label="Last Name"
                            {...register("employeeLastName")}
                            error={errors.employeeLastName?.message}
                        />
                        <Input
                            label="Email"
                            type="email"
                            {...register("employeeEmail")}
                            error={errors.employeeEmail?.message}
                        />
                        <Input
                            label="Contact Number"
                            number={true}
                            {...register("employeeContactNo")}
                            error={errors.employeeContactNo?.message}
                        />
                        <Input
                            label="Address"
                            {...register("employeeAddress")}
                            error={errors.employeeAddress?.message}
                        />
                    </div>
                </div>
                <hr className={styles.addEditEmployeeLineSeparator} />
                <div className={styles.addEditEmployeeGroupContainer}>
                    <p>Employment Details</p>
                    <div className={styles.addEditEmployeeInputContainer}>
                        <Dropdown
                            label="Position/Role"
                            {...register("employeePosition")}
                            error={errors.employeePosition?.message}
                            data={references.position}
                            dataPrefix="position"
                        />
                        <Input
                            label="Date Hired"
                            type="date"
                            {...register("employeeDateHired")}
                            error={errors.employeeDateHired?.message}
                        />
                        <Dropdown
                            label="Employment Status"
                            {...register("employeeEmploymentStatus")}
                            error={errors.employeeEmploymentStatus?.message}
                            data={references.employmentStatus}
                            dataPrefix="employmentStatus"
                        />
                        <Dropdown
                            label="Branch"
                            {...register("employeeBranch")}
                            error={errors.employeeBranch?.message}
                            data={references.branches}
                            dataPrefix="branch"
                        />
                    </div>
                </div>
                <div className={styles.addEditEmployeeButtonContainer}>
                    <Button
                        label="Cancel"
                        className={styles.addEditEmployeeCancelButton}
                        onClick={onBack}
                    />
                    <Button label="Save" onClick={handleSubmit(onSubmit)} />
                </div>
            </div>
        </div>
    );
}
