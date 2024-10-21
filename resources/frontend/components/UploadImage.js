import React, { useState } from "react";
import styles from "./UploadImage.module";
import Icon from "./Icon";

export default function UploadImage({ onFileChange, error }) {
    const [imageSrc, setImageSrc] = useState(null);

    const handleChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const fileSize = file.size / 1024 / 1024;
            const fileType = file.type;

            if (fileSize > 2) {
                error("File size must be less than 2 MB.");
                return;
            }

            const reader = new FileReader();
            reader.onloadend = () => {
                setImageSrc(reader.result);
            };
            reader.readAsDataURL(file);
            onFileChange(file);
        }
    };

    return (
        <div className={styles.uploadImage}>
            <div className={styles.uploadImageContainer}>
                <input
                    type="file"
                    accept="image/jpeg, image/png"
                    onChange={handleChange}
                    style={{ display: "none" }}
                    id="imageUpload"
                />
                <label
                    htmlFor="imageUpload"
                    className={styles.uploadImageContent}
                >
                    {imageSrc ? (
                        <img
                            src={imageSrc}
                            alt="Uploaded"
                            className={styles.uploadedImage}
                        />
                    ) : (
                        <Icon
                            icon="addImage"
                            size="136"
                            className={styles.uploadImageIcon}
                        />
                    )}
                    <div className={styles.uploadImageLabel}>
                        {imageSrc ? "" : "Upload Image"}
                    </div>
                </label>
            </div>
            {error && <div className={styles.uploadImageError}>{error}</div>}
        </div>
    );
}
