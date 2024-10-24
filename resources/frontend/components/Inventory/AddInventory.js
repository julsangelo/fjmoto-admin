import React from "react";
import styles from "./AddInventory.module";
import Input from "../Input";
import UploadImage from "../UploadImage";
import Button from "../Button";
import Dropdown from "../Dropdown";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { addInventory } from "../../ajax/backend";

const schema = yup.object().shape({
    productCode: yup.string().required("Code is required."),
    productName: yup.string().required("Name is required."),
    productStockQuantity: yup
        .number()
        .typeError("Quantity must be a number.")
        .required("Quantity is required.")
        .positive("Quantity must be positive.")
        .integer("Quantity must be an integer."),
    productPrice: yup
        .number()
        .typeError("Price must be a number.")
        .required("Price is required.")
        .positive("Price must be positive."),
    productCategory: yup.string().required("Category is required."),
    productImage: yup
        .mixed()
        .required("Image is required.")
        .test(
            "fileSize",
            "File size must be less than 2 MB.",
            (value) => value && value.size <= 2 * 1024 * 1024,
        ),
});

export default function AddInventory({ onClose, branchID }) {
    const {
        register,
        handleSubmit,
        setValue,
        setError,
        formState: { errors },
    } = useForm({ resolver: yupResolver(schema) });

    const handleFileChange = (file) => {
        if (file) setValue("productImage", file);
        setError("productImage", { type: "manual", message: "" });
    };

    const handleCategoryChange = (value) => {
        setValue("productCategory", value);
        setError("productCategory", { type: "manual", message: "" });
    };

    const onSubmit = (data) => {
        const formData = new FormData();
        Object.entries({ ...data, branchID }).forEach(([key, value]) => {
            if (key === "productImage" && value instanceof File)
                formData.append(key, value);
            else formData.append(key, value);
        });
        console.log(data);
        addInventory(formData);
    };

    const renderInput = (label, name, type = "text", peso = false) => (
        <Input
            label={label}
            type={type}
            {...register(name)}
            error={errors[name]?.message}
            peso={peso}
        />
    );

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className={styles.addInventoryTitle}>Add Product</div>
            <div className={styles.addInventoryForm}>
                <div className={styles.addInventoryImage}>
                    <UploadImage
                        onFileChange={handleFileChange}
                        error={errors.productImage?.message}
                    />
                </div>
                {renderInput("Code", "productCode")}
                {renderInput("Name", "productName")}
                {renderInput("Quantity", "productStockQuantity", "number")}
                {renderInput("Price", "productPrice", "number", true)}
                <Dropdown
                    label="Category"
                    className={styles.addInventoryDropdown}
                    onSelect={handleCategoryChange}
                    error={errors.productCategory?.message}
                />
            </div>
            <div className={styles.addInventoryButton}>
                <Button
                    label="Cancel"
                    onClick={onClose}
                    className={styles.addInventoryCancel}
                />
                <Button label="Submit" type="submit" />
            </div>
        </form>
    );
}
