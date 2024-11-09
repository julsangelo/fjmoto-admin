import React, { forwardRef } from "react";
import styles from "./Dropdown.module";

const Dropdown = forwardRef(
    ({ data, dataPrefix, onSelect, label, className, error, value }, ref) => {
        const handleChange = (event) => {
            onSelect(event.target.value);
        };

        return (
            <div className={className}>
                <div className={styles.dropdownLabel}>{label}</div>
                <select
                    ref={ref}
                    className={styles.dropdown}
                    onChange={handleChange}
                    value={value || ""}
                >
                    <option disabled value="">
                        Select
                    </option>
                    {data?.map((item, index) => (
                        <option key={index} value={item[`${dataPrefix}ID`]}>
                            {item[`${dataPrefix}Name`]}
                        </option>
                    ))}
                </select>
                <div className={styles.dropdownError}>{error}</div>
            </div>
        );
    },
);

export default Dropdown;
