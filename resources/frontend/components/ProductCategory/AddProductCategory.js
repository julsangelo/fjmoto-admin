import React from "react";
import styles from "./AddProductCategory.module";
import Input from "../Input";
import UploadImage from "../UploadImage";
import Button from "../Button";
import Dropdown from "../Dropdown";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { addInventory, addProductCategory } from "../../ajax/backend";
import { useFlashMessage } from "../../context/FlashMessage";

const schema = yup.object().shape({
    productCategoryName: yup.string().required("Name is required."),
    productCategoryImage: yup
        .mixed()
        .required("Image is required.")
        .test(
            "fileSize",
            "File size must be less than 2 MB.",
            (value) => value && value.size <= 2 * 1024 * 1024,
        ),
});

export default function AddProductCategory({ onClose, branchID }) {
    const { setFlashMessage, setFlashStatus } = useFlashMessage();

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        setError,
        formState: { errors },
    } = useForm({ resolver: yupResolver(schema) });

    const handleFileChange = (file) => {
        if (file) setValue("productCategoryImage", file);
        setError("productCategoryImage", { type: "manual", message: "" });
    };

    const onSubmit = (data) => {
        const formData = new FormData();
        Object.entries({ ...data, branchID }).forEach(([key, value]) => {
            if (key === "productCategoryImage" && value instanceof File)
                formData.append(key, value);
            else formData.append(key, value);
        });
        addProductCategory(formData, setFlashMessage, setFlashStatus, onClose);
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
            <div className={styles.addInventoryTitle}>Add Product Category</div>
            <div className={styles.addInventoryForm}>
                <div className={styles.addInventoryImage}>
                    <UploadImage
                        onFileChange={handleFileChange}
                        error={errors.productCategoryImage?.message}
                    />
                </div>
                {renderInput("Category Name", "productCategoryName")}
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
