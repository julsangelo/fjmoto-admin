import React from "react";
import styles from "./Sort.module";
import Button from "./Button";
import Input from "./Input";

export default function Sort() {
    return (
        <div className={styles.sort}>
            <div className={styles.sortCategory}>
                Price
                <label className={styles.sortCategoryLabel}>
                    <input
                        type="radio"
                        name="Motorcycle"
                        id="1"
                        className={styles.sortCategoryCheckbox}
                    />
                    Low to High
                </label>
                <label className={styles.sortCategoryLabel}>
                    <input
                        type="radio"
                        name="Motorcycle"
                        id="1"
                        className={styles.sortCategoryCheckbox}
                    />
                    Low to High
                </label>
            </div>
            <div className={styles.sortPrice}>
                Price
                <Input
                    label="Minumum"
                    labelStyle={styles.sortInputLabel}
                    containerStyle={styles.sortInputContainer}
                    type="number"
                    peso={true}
                />
                <Input
                    label="Maximum"
                    labelStyle={styles.sortInputLabel}
                    containerStyle={styles.sortInputContainer}
                    type="number"
                    peso={true}
                />
            </div>

            <div className={styles.sortButtonContainer}>
                <Button label="Clear" className={styles.sortClearButton} />
                <Button label="Apply" className={styles.sortApplyButton} />
            </div>
        </div>
    );
}
