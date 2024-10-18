import React from "react";
import styles from "./UploadImage.module";
import Icon from "./Icon";

export default function UploadImage() {
    return (
        <div className={styles.uploadImageContainer}>
            <Icon
                icon="addImage"
                size="136"
                className={styles.uploadImageIcon}
            />
            <div className={styles.uploadImageLabel}>Upload image</div>
        </div>
    );
}
