import React from "react";
import styles from "./Filter.module";
import Button from "./Button";
import Input from "./Input";

export default function Filter() {
    return (
        <div className={styles.filter}>
            <div className={styles.filterCategory}>
                Category
                <label className={styles.filterCategoryLabel}>
                    <input
                        type="checkbox"
                        name="Motorcycle"
                        id="1"
                        className={styles.filterCategoryCheckbox}
                    />
                    Motorcycle
                </label>
            </div>
            <div className={styles.filterPrice}>
                Price
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

            <div className={styles.filterButtonContainer}>
                <Button label="Clear" className={styles.filterClearButton} />
                <Button label="Apply" className={styles.filterApplyButton} />
            </div>
        </div>
    );
}
