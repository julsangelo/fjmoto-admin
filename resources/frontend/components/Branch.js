import React from "react";
import styles from "./Branch.module";

export default function Branch({ setSelectedBranch, branches }) {
    const handleChange = (event) => {
        setSelectedBranch(event.target.value);
    };

    return (
        <select className={styles.branchDropdown} onChange={handleChange}>
            {branches.map((item) => (
                <option value={item.branchID}>{item.branchName}</option>
            ))}
        </select>
    );
}
