import React from "react";
import styles from "./Filter.module";
import Button from "./Button";
import Input from "./Input";

export default function Filter({ visibleFilter }) {
    return (
        <div className={styles.filter}>
            {visibleFilter.includes("category") && (
                <div className={styles.filterContainer}>
                    Category
                    <div className={styles.filterInput}>
                        <label className={styles.filterOptionLabel}>
                            <input
                                type="checkbox"
                                name="Motorcycle"
                                id="1"
                                className={styles.filterOptionCheckbox}
                            />
                            Motorcycle
                        </label>
                        <label className={styles.filterOptionLabel}>
                            <input
                                type="checkbox"
                                name="Motorcycle"
                                id="1"
                                className={styles.filterOptionCheckbox}
                            />
                            Motorcycle
                        </label>
                    </div>
                </div>
            )}
            {visibleFilter.includes("price") && (
                <div className={styles.filterContainer}>
                    Price
                    <div className={styles.filterInput}>
                        <Input
                            label="Minumum"
                            labelStyle={styles.filterInputLabel}
                            containerStyle={styles.filterInputContainer}
                            type="number"
                            peso={true}
                        />
                        <Input
                            label="Maximum"
                            labelStyle={styles.filterInputLabel}
                            containerStyle={styles.filterInputContainer}
                            type="number"
                            peso={true}
                        />
                    </div>
                </div>
            )}
            {visibleFilter.includes("date") && (
                <div className={styles.filterContainer}>
                    Date
                    <div className={styles.filterDateTotal}>
                        <Input
                            labelStyle={styles.filterInputLabel}
                            containerStyle={styles.filterInputContainer}
                            type="date"
                        />
                        to
                        <Input
                            labelStyle={styles.filterInputLabel}
                            containerStyle={styles.filterInputContainer}
                            type="date"
                        />
                    </div>
                </div>
            )}
            {visibleFilter.includes("total") && (
                <div className={styles.filterContainer}>
                    Total Amount
                    <div className={styles.filterDateTotal}>
                        <Input
                            labelStyle={styles.filterInputLabel}
                            containerStyle={styles.filterInputContainer}
                            type="number"
                            label="Minimum"
                            peso={true}
                        />
                        <Input
                            labelStyle={styles.filterInputLabel}
                            containerStyle={styles.filterInputContainer}
                            type="number"
                            label="Maximum"
                            peso={true}
                        />
                    </div>
                </div>
            )}
            {visibleFilter.includes("payment") && (
                <div className={styles.filterContainer}>
                    Payment Status
                    <div className={styles.filterInput}>
                        <select name="" id="" className={styles.filterDropdown}>
                            <option value="">Paid</option>
                            <option value="">Pending</option>
                        </select>
                    </div>
                </div>
            )}
            {visibleFilter.includes("fulfillment") && (
                <div className={styles.filterContainer}>
                    Fulfillment Status
                    <div className={styles.filterInput}>
                        <select name="" id="" className={styles.filterDropdown}>
                            <option value="">Paid</option>
                            <option value="">Pending</option>
                        </select>
                    </div>
                </div>
            )}
            {visibleFilter.includes("order") && (
                <div className={styles.filterContainer}>
                    Order Status
                    <div className={styles.filterInput}>
                        <select name="" id="" className={styles.filterDropdown}>
                            <option value="">Paid</option>
                            <option value="">Pending</option>
                        </select>
                    </div>
                </div>
            )}
            {visibleFilter.includes("branch") && (
                <div className={styles.filterContainer}>
                    Branch
                    <div className={styles.filterInput}>
                        <select name="" id="" className={styles.filterDropdown}>
                            <option value="">Paid</option>
                            <option value="">Pending</option>
                        </select>
                    </div>
                </div>
            )}
            {visibleFilter.includes("position") && (
                <div className={styles.filterContainer}>
                    Position
                    <div className={styles.filterInput}>
                        <select name="" id="" className={styles.filterDropdown}>
                            <option value="">Paid</option>
                            <option value="">Pending</option>
                        </select>
                    </div>
                </div>
            )}
            {visibleFilter.includes("employment") && (
                <div className={styles.filterContainer}>
                    Employment Status
                    <div className={styles.filterInput}>
                        <select name="" id="" className={styles.filterDropdown}>
                            <option value="">Paid</option>
                            <option value="">Pending</option>
                        </select>
                    </div>
                </div>
            )}
            <div className={styles.filterButtonContainer}>
                <Button label="Clear" className={styles.filterClearButton} />
                <Button label="Apply" className={styles.filterApplyButton} />
            </div>
        </div>
    );
}
