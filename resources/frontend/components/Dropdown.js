import React from "react";
import styles from "./Dropdown.module";

export default function Dropdown({ onSelect, label, className, error, value }) {
    const handleChange = (event) => {
        onSelect(event.target.value);
    };

    console.log(value);

    return (
        <div className={className}>
            <div className={styles.dropdownLabel}>{label}</div>
            <select
                className={styles.dropdown}
                onChange={handleChange}
                value={value || ""}
            >
                <option selected disabled>
                    Select Category
                </option>
                <option value="1">Mandaluyong Branch</option>
                <option value="2">Rizal Branch</option>
            </select>
            <div className={styles.dropdownError}>{error}</div>
        </div>
    );
}
