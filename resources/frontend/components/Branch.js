import React, { useEffect, useState } from "react";
import styles from "./Branch.module";

export default function Branch({ setSelectedBranch, branch, data, disable }) {
    const [selectedBranch, setSelectedBranchLocal] = useState(
        data?.user?.branchID,
    );

    useEffect(() => {
        if (data?.user?.branchID !== null) {
            setSelectedBranchLocal(data?.user?.branchID);
            setSelectedBranch(data?.user?.branchID);
        }
    }, [data?.user?.branchID]);

    const handleChange = (event) => {
        const branch = event.target.value;
        setSelectedBranch(branch);
        setSelectedBranchLocal(branch);
    };

    return (
        <select
            className={styles.branchDropdown}
            onChange={handleChange}
            value={selectedBranch}
            disabled={disable}
        >
            {branch?.map((item, index) => (
                <option key={index} value={item.branchID}>
                    {item.branchName}
                </option>
            ))}
        </select>
    );
}
