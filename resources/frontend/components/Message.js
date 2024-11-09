import React from "react";
import styles from "./Message.module";
import Icon from "./Icon";

export default function Message({ message, status }) {
    if (!message || !status) return null;

    return (
        <div className={styles.messageContainer}>
            <div
                className={
                    status === "success" ? styles.successIcon : styles.errorIcon
                }
            >
                <Icon
                    icon={status === "success" ? "success" : "error"}
                    size="15"
                    className={styles.icon}
                />
            </div>
            {message}
        </div>
    );
}
