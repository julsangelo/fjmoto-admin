import React, { useEffect } from "react";
import styles from "./EditInventory.module";
import Input from "../Input";
import UploadImage from "../UploadImage";
import Button from "../Button";
import Dropdown from "../Dropdown";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { editInventory } from "../../ajax/backend";

const schema = yup.object().shape({
    productId: yup.string().required("ID is required."),
    productName: yup.string().required("Product Name is required."),
    stockQuantity: yup
        .number()
        .typeError("Quantity must be a number.")
        .required("Quantity is required.")
        .positive("Quantity must be positive.")
        .integer("Quantity must be an integer."),
    price: yup
        .number()
        .typeError("Price must be a number.")
        .required("Price is required.")
        .positive("Price must be positive."),
    category: yup.string().required("Category is required."),
    image: yup
        .mixed()
        .required("Image is required.")
        .test(
            "fileSize",
            "File size must be less than 2 MB.",
            (value) => value && value.size <= 2 * 1024 * 1024,
        ),
});

export default function EditInventory({ onClose, branch, product }) {
    const {
        register,
        handleSubmit,
        setValue,
        setError,
        formState: { errors },
    } = useForm({ resolver: yupResolver(schema) });

    console.log(product);

    useEffect(() => {
        if (product) {
            setValue("productCode", product.productCode);
            setValue("productName", product.productName);
            setValue("productStockQuantity", product.productStockQuantity);
            setValue("productPrice", product.productPrice);
            setValue("productCategory", product.productCategory);
        }
    }, [product, setValue]);

    const handleFileChange = (file) => {
        if (file) setValue("image", file);
        setError("image", { type: "manual", message: "" });
    };

    const handleCategoryChange = (value) => {
        setValue("productCategory", value);
        setError("productCategory", { type: "manual", message: "" });
    };

    const onSubmit = (data) => {
        const formData = new FormData();
        Object.entries({ ...data, branch }).forEach(([key, value]) => {
            if (key === "image" && value instanceof File)
                formData.append(key, value);
            else formData.append(key, value);
        });

        editInventory(formData)
            .then(() => onClose())
            .catch((error) =>
                console.error("Failed to edit inventory:", error),
            );
    };

    const renderInput = (label, name, type = "text") => (
        <Input
            label={label}
            type={type}
            {...register(name)}
            error={errors[name]?.message}
        />
    );

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className={styles.editInventoryTitle}>Edit Inventory</div>
            <div className={styles.editInventoryForm}>
                <div className={styles.editInventoryImage}>
                    <UploadImage
                        onFileChange={handleFileChange}
                        error={errors.image?.message}
                    />
                </div>
                {renderInput("Code", "productCode")}
                {renderInput("Product Name", "productName")}
                {renderInput("Quantity", "productStockQuantity", "number")}
                {renderInput("Price", "productPrice", "number")}
                <Dropdown
                    label="Category"
                    className={styles.editInventoryDropdown}
                    onSelect={handleCategoryChange}
                    value={product?.category}
                    error={errors.category?.message}
                />
            </div>
            <div className={styles.editInventoryButton}>
                <Button
                    label="Cancel"
                    onClick={onClose}
                    className={styles.editInventoryCancel}
                />
                <Button label="Submit" type="submit" />
            </div>
        </form>
    );
}
