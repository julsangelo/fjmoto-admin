import React from "react";
import styles from "./Dropdown.module";

export default function Dropdown({ setSelectedBranch, label, className }) {
    const handleChange = (event) => {
        setSelectedBranch(event.target.value);
    };

    return (
        <div className={className}>
            <div className={styles.dropdownLabel}>{label}</div>
            <select className={styles.dropdown} onChange={handleChange}>
                <option value="Branch A">Mandaluyong Branch</option>
                <option value="Branch B">Rizal Branch</option>
            </select>
        </div>
    );
}
