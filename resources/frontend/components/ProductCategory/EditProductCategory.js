import React, { useEffect } from "react";
import styles from "./EditProductCategory.module";
import Input from "../Input";
import UploadImage from "../UploadImage";
import Button from "../Button";
import Dropdown from "../Dropdown";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { editInventory, editProductCategory } from "../../ajax/backend";
import { useFlashMessage } from "../../context/FlashMessage";

const schema = yup.object().shape({
    productCategoryID: yup.number().required(),
    productCategoryName: yup
        .string()
        .required("Product Category Name is required."),
    productCategoryImage: yup
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

export default function EditProductCategory({ onClose, productCategory }) {
    const { setFlashMessage, setFlashStatus } = useFlashMessage();

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
        trigger,
        watch,
    } = useForm({ resolver: yupResolver(schema) });

    useEffect(() => {
        if (productCategory) {
            setValue(
                "productCategoryName",
                productCategory.productCategoryName,
            );
            setValue("productCategoryID", productCategory.productCategoryID);

            if (productCategory.productCategoryImage) {
                fetch(`/storage/${productCategory.productCategoryImage}`)
                    .then((res) => res.blob())
                    .then((blob) => {
                        const dataTransfer = new DataTransfer();
                        dataTransfer.items.add(file);

                        if (fileInputRef.current) {
                            fileInputRef.current.files = dataTransfer.files;
                        }
                    });
                console.log(productCategory.productCategoryImage);
            }
        }
    }, [productCategory, setValue]);

    const handleFileChange = (file) => {
        setValue("productCategoryImage", file);
        trigger("productCategoryImage");
    };

    const onSubmit = (data) => {
        const formData = new FormData();
        Object.entries({ ...data }).forEach(([key, value]) => {
            formData.append(key, value);
        });
        editProductCategory(formData, setFlashMessage, setFlashStatus, onClose);
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
            <div className={styles.editInventoryTitle}>
                Edit Product Category
            </div>
            <div className={styles.editInventoryForm}>
                <div className={styles.editInventoryImage}>
                    <UploadImage
                        onFileChange={handleFileChange}
                        uploadedImage={productCategory?.productCategoryImage}
                        error={errors.productCategoryImage?.message}
                    />
                </div>
                {renderInput("Product Category Name", "productCategoryName")}
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
