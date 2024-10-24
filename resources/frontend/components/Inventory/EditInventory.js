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
    productID: yup.number().required(),
    productCode: yup.string().required("ID is required."),
    productName: yup.string().required("Product Name is required."),
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
        .test(
            "required",
            "Image is required.",
            (value) => !value || value instanceof File,
        )
        .test(
            "fileSize",
            "File size must be less than 2 MB.",
            (value) => !value || value.size <= 2 * 1024 * 1024,
        ),
});

export default function EditInventory({ onClose, branch, product }) {
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
        trigger,
    } = useForm({ resolver: yupResolver(schema) });

    useEffect(() => {
        if (product) {
            setValue("productID", product.productID); // Ensure productID is set
            setValue("productCode", product.productCode);
            setValue("productName", product.productName);
            setValue("productStockQuantity", product.productStockQuantity);
            setValue("productPrice", product.productPrice);
            setValue("productCategory", product.productCategory);

            if (product.productImage) {
                fetch(`/fjmoto/${product.productImage}`)
                    .then((res) => res.blob())
                    .then((blob) => {
                        const file = new File([blob], product.productImage, {
                            type: blob.type,
                        });
                        setValue("productImage", file);
                    });
            }
        }
    }, [product, setValue]);

    const handleFileChange = (file) => {
        setValue("productImage", file);
        trigger("productImage");
    };

    const handleCategoryChange = (value) => {
        setValue("productCategory", value);
        trigger("productCategory");
    };

    const onSubmit = (data) => {
        const formData = new FormData();
        Object.entries({ ...data, branch }).forEach(([key, value]) => {
            formData.append(key, value);
        });

        editInventory(formData)
            .then(() => onClose())
            .catch((error) =>
                console.error("Failed to edit inventory:", error),
            );
    };

    const renderInput = (label, name, type = "text", peso = false) => (
        <Input
            label={label}
            type={type}
            peso={peso}
            {...register(name)}
            error={errors[name]?.message}
            onChange={(e) => {
                setValue(name, e.target.value);
                trigger(name);
            }}
        />
    );

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className={styles.editInventoryTitle}>Edit Inventory</div>
            <div className={styles.editInventoryForm}>
                <div className={styles.editInventoryImage}>
                    <UploadImage
                        onFileChange={handleFileChange}
                        uploadedImage={product?.productImage}
                        error={errors.productImage?.message}
                    />
                </div>
                {renderInput("Code", "productCode")}
                {renderInput("Product Name", "productName")}
                {renderInput("Quantity", "productStockQuantity", "number")}
                {renderInput("Price", "productPrice", "number", true)}
                <Dropdown
                    label="Category"
                    className={styles.editInventoryDropdown}
                    onSelect={handleCategoryChange}
                    value={product?.productCategory}
                    error={errors.productCategory?.message}
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
