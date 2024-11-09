import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import styles from "./AddEditEmployee.module";
import Input from "../Input";
import Button from "../Button";
import Icon from "../Icon";
import Dropdown from "../Dropdown";
import { addEmployee, editEmployee } from "../../ajax/backend";
import { useFlashMessage } from "../../context/FlashMessage";

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
        .required("Contact number is required.")
        .matches(/^[0-9]+$/, "Contact number must only contain numbers.")
        .test("starts-with-09", "Contact number must start with 09", (value) =>
            value?.startsWith("09"),
        )
        .length(11, "Contact number must be exactly 11 digits."),
    employeeAddress: Yup.string()
        .min(5, "Address must be at least 5 characters.")
        .required("Address is required."),
    employeePosition: Yup.string().required("Position/Role is required."),
    employeeDateHired: Yup.string().matches(
        /^\d{4}-\d{2}-\d{2}$/,
        "Date hired is required.",
    ),
    employeeStatus: Yup.string().required("Employment status is required."),
    employeeBranch: Yup.string().required("Branch is required."),
});

export default function AddEditEmployee({ employee, onBack, references }) {
    const { setFlashMessage, setFlashStatus } = useFlashMessage();

    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
        trigger,
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
            employeePosition: employee?.employeePositionID || "",
            employeeDateHired: employee?.employeeDateHired || "",
            employeeStatus: employee?.employeeStatusID || "",
            employeeBranch: employee?.branchID || "",
            employeeID: employee?.employeeID || "",
        },
    });

    const onSubmit = (data) => {
        if (employee) {
            editEmployee(data, setFlashMessage, setFlashStatus, onBack);
        } else {
            addEmployee(data, setFlashMessage, setFlashStatus, onBack);
        }
    };

    useEffect(() => {
        if (employee) {
            setValue("employeeFirstName", employee.employeeFirstName);
            setValue("employeeMiddleName", employee.employeeMiddleName);
            setValue("employeeLastName", employee.employeeLastName);
            setValue("employeeEmail", employee.employeeEmail);
            setValue("employeeContactNo", employee.employeeContactNo);
            setValue("employeeAddress", employee.employeeAddress);
            setValue("employeePosition", employee.employeePositionID);
            setValue("employeeDateHired", employee.employeeDateHired);
            setValue("employeeStatus", employee.employeeStatusID);
            setValue("employeeBranch", employee.branchID);
            setValue("employeeID", employee.employeeID);
        }
    }, [employee, setValue]);

    const handleDropdownChange = (value, fieldName) => {
        setValue(fieldName, value);
        trigger(fieldName);
    };

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
                            optional={true}
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
                            onSelect={(value) =>
                                handleDropdownChange(value, "employeePosition")
                            }
                            value={watch("employeePosition")}
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
                            onSelect={(value) =>
                                handleDropdownChange(value, "employeeStatus")
                            }
                            value={watch("employeeStatus")}
                            {...register("employeeStatus")}
                            error={errors.employeeStatus?.message}
                            data={references.employmentStatus}
                            dataPrefix="employmentStatus"
                        />
                        <Dropdown
                            label="Branch"
                            onSelect={(value) =>
                                handleDropdownChange(value, "employeeBranch")
                            }
                            value={watch("employeeBranch")}
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
