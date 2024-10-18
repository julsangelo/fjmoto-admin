import React from "react";
import styles from "./Branch.module";

export default function Branch({ setSelectedBranch }) {
    const handleChange = (event) => {
        setSelectedBranch(event.target.value);
    };

    return (
        <select className={styles.branchDropdown} onChange={handleChange}>
            <option value="Branch A">Mandaluyong Branch</option>
            <option value="Branch B">Rizal Branch</option>
        </select>
    );
}
