import React from "react";
import styles from "./Sort.module";
import Button from "./Button";
import Input from "./Input";

export default function Sort({ visibleSort }) {
    return (
        <div className={styles.sort}>
            {visibleSort.includes("price") && (
                <div className={styles.sortRadiobox}>
                    Price
                    <div className={styles.sortRadioboxOption}>
                        <label className={styles.sortRadioboxLabel}>
                            <input
                                type="radio"
                                name="Motorcycle"
                                id="1"
                                className={styles.sortRadioboxCircle}
                            />
                            Low to high
                        </label>
                        <label className={styles.sortRadioboxLabel}>
                            <input
                                type="radio"
                                name="Motorcycle"
                                id="1"
                                className={styles.sortRadioboxCircle}
                            />
                            High to low
                        </label>
                    </div>
                </div>
            )}
            {visibleSort.includes("stockQuantity") && (
                <div className={styles.sortRadiobox}>
                    Stock Quantity
                    <div className={styles.sortRadioboxOption}>
                        <label className={styles.sortRadioboxLabel}>
                            <input
                                type="radio"
                                name="Motorcycle"
                                id="1"
                                className={styles.sortRadioboxCircle}
                            />
                            Low to high
                        </label>
                        <label className={styles.sortRadioboxLabel}>
                            <input
                                type="radio"
                                name="Motorcycle"
                                id="1"
                                className={styles.sortRadioboxCircle}
                            />
                            High to low
                        </label>
                    </div>
                </div>
            )}
            {visibleSort.includes("date") && (
                <div className={styles.sortRadiobox}>
                    Date
                    <div className={styles.sortRadioboxOption}>
                        <label className={styles.sortRadioboxLabel}>
                            <input
                                type="radio"
                                name="Motorcycle"
                                id="1"
                                className={styles.sortRadioboxCircle}
                            />
                            Newest to oldest
                        </label>
                        <label className={styles.sortRadioboxLabel}>
                            <input
                                type="radio"
                                name="Motorcycle"
                                id="1"
                                className={styles.sortRadioboxCircle}
                            />
                            Oldest to newest
                        </label>
                    </div>
                </div>
            )}
            {visibleSort.includes("total") && (
                <div className={styles.sortRadiobox}>
                    Total
                    <div className={styles.sortRadioboxOption}>
                        <label className={styles.sortRadioboxLabel}>
                            <input
                                type="radio"
                                name="Motorcycle"
                                id="1"
                                className={styles.sortRadioboxCircle}
                            />
                            Low to High
                        </label>
                        <label className={styles.sortRadioboxLabel}>
                            <input
                                type="radio"
                                name="Motorcycle"
                                id="1"
                                className={styles.sortRadioboxCircle}
                            />
                            High to Low
                        </label>
                    </div>
                </div>
            )}
            {visibleSort.includes("items") && (
                <div className={styles.sortRadiobox}>
                    Items
                    <span className={styles.sortRadioboxSecondTitle}>
                        (Quantity)
                    </span>
                    <div className={styles.sortRadioboxOption}>
                        <label className={styles.sortRadioboxLabel}>
                            <input
                                type="radio"
                                name="Motorcycle"
                                id="1"
                                className={styles.sortRadioboxCircle}
                            />
                            Low to High
                        </label>
                        <label className={styles.sortRadioboxLabel}>
                            <input
                                type="radio"
                                name="Motorcycle"
                                id="1"
                                className={styles.sortRadioboxCircle}
                            />
                            High to Low
                        </label>
                    </div>
                </div>
            )}
            <div className={styles.sortButtonContainer}>
                <Button label="Clear" className={styles.sortClearButton} />
                <Button label="Apply" className={styles.sortApplyButton} />
            </div>
        </div>
    );
}
