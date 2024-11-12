import React, { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import styles from "./EditProfile.module";
import Input from "./Input";
import Button from "./Button";
import Icon from "./Icon";
import { editProfile } from "../ajax/backend";
import { useFlashMessage } from "../context/FlashMessage";
import { LoginContext } from "../context/LoginProvider";

const employeeValidationSchema = Yup.object().shape({
    employeeFirstName: Yup.string()
        .max(50, "First name cannot exceed 50 characters.")
        .required("First name is required."),
    employeeMiddleName: Yup.string()
        .max(50, "Middle name cannot exceed 50 characters.")
        .nullable(),
    employeeLastName: Yup.string()
        .max(50, "Last name cannot exceed 50 characters.")
        .required("Last name is required."),
    employeeEmail: Yup.string()
        .email("Invalid email format.")
        .required("Email is required."),
    employeePassword: Yup.string()
        .nullable()
        .min(8, "Password must be at least 8 characters")
        .matches(/[a-z]/, "Password must contain at least one lowercase letter")
        .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
        .matches(/[0-9]/, "Password must contain at least one number"),
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
});

export default function EditProfile({ user, onBack }) {
    const { setComponentOnLoad } = useContext(LoginContext);
    const { setFlashMessage, setFlashStatus } = useFlashMessage();

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
    } = useForm({
        resolver: yupResolver(employeeValidationSchema),
        defaultValues: {
            employeeFirstName: user?.user?.employeeFirstName || "",
            employeeMiddleName: user?.user?.employeeMiddleName || "",
            employeeLastName: user?.user?.employeeLastName || "",
            employeeEmail: user?.user?.employeeEmail || "",
            employeeContactNo: user?.user?.employeeContactNo || "",
            employeeAddress: user?.user?.employeeAddress || "",
            employeeID: user?.user?.employeeID || "",
        },
    });

    const onSubmit = (data) => {
        console.log(data);
        editProfile(
            data,
            setFlashMessage,
            setFlashStatus,
            onBack,
            setComponentOnLoad,
        );
    };

    useEffect(() => {
        if (user) {
            setValue("employeeFirstName", user.user.employeeFirstName);
            setValue("employeeMiddleName", user.user.employeeMiddleName);
            setValue("employeeLastName", user.user.employeeLastName);
            setValue("employeeEmail", user.user.employeeEmail);
            setValue("employeeContactNo", user.user.employeeContactNo);
            setValue("employeeAddress", user.user.employeeAddress);
        }
    }, [user, setValue]);

    return (
        <div className={styles.editProfileContent}>
            <div className={styles.editProfileBackButton}>
                <Icon icon="back" size="20" onClick={onBack} />
            </div>
            <div className={styles.editProfileContainer}>
                <div className={styles.editProfileGroupContainer}>
                    <p>Personal Details</p>
                    <div className={styles.editProfileInputContainer}>
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
                            label="Password"
                            optional={true}
                            type="password"
                            {...register("employeePassword")}
                            error={errors.employeePassword?.message}
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
                <div className={styles.editProfileButtonContainer}>
                    <Button
                        label="Cancel"
                        className={styles.editProfileCancelButton}
                        onClick={onBack}
                    />
                    <Button label="Save" onClick={handleSubmit(onSubmit)} />
                </div>
            </div>
        </div>
    );
}
