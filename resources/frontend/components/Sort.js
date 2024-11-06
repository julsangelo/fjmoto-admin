import React, { useRef, useState } from "react";
import styles from "./Sort.module";
import Button from "./Button";

const sortOptions = {
    price: ["priceLowToHigh", "priceHighToLow"],
    stockQuantity: ["stockLowToHigh", "stockHighToLow"],
    date: ["dateNewestToOldest", "dateOldestToNewest"],
    total: ["totalLowToHigh", "totalHighToLow"],
    items: ["itemsLowToHigh", "itemsHighToLow"],
};

const sortData = (data, sortValue, dataPrefix) => {
    const sortBy = {
        priceLowToHigh: (a, b) =>
            parseFloat(a[`${dataPrefix}Price`]) -
            parseFloat(b[`${dataPrefix}Price`]),
        priceHighToLow: (a, b) =>
            parseFloat(b[`${dataPrefix}Price`]) -
            parseFloat(a[`${dataPrefix}Price`]),
        stockLowToHigh: (a, b) =>
            a[`${dataPrefix}StockQuantity`] - b[`${dataPrefix}StockQuantity`],
        stockHighToLow: (a, b) =>
            b[`${dataPrefix}StockQuantity`] - a[`${dataPrefix}StockQuantity`],
        dateNewestToOldest: (a, b) =>
            new Date(b.productDate) - new Date(a.productDate),
        dateOldestToNewest: (a, b) =>
            new Date(a.productDate) - new Date(b.productDate),
        totalLowToHigh: (a, b) => a.total - b.total,
        totalHighToLow: (a, b) => b.total - a.total,
        itemsLowToHigh: (a, b) => a.items - b.items,
        itemsHighToLow: (a, b) => b.items - a.items,
    };

    return sortValue in sortBy
        ? [...data.data].sort(sortBy[sortValue])
        : data.data;
};

export default function Sort({ visibleSort, data, dataPrefix, onSort }) {
    const [selectedSort, setSelectedSort] = useState("");
    const sortRefs = Object.fromEntries(
        Object.keys(sortOptions).map((key) => [key, useRef(null)]),
    );

    const handleChange = (event) => {
        const value = event.target.value;
        setSelectedSort(value);
    };

    const clear = () => {
        setSelectedSort("");
        Object.values(sortRefs).forEach((ref) => {
            if (ref.current) {
                const radios = ref.current.querySelectorAll(
                    'input[type="radio"]',
                );
                radios.forEach((radio) => (radio.checked = false));
            }
        });
        onSort(data);
    };

    const applySort = () => {
        if (selectedSort) {
            const sortedData = sortData(data, selectedSort, dataPrefix);
            onSort({ data: sortedData });
        }
    };

    return (
        <div className={styles.sort}>
            {Object.entries(sortOptions).map(
                ([key, options]) =>
                    visibleSort.includes(key) && (
                        <div
                            className={styles.sortRadiobox}
                            ref={sortRefs[key]}
                            key={key}
                        >
                            {key.charAt(0).toUpperCase() + key.slice(1)}
                            <div className={styles.sortRadioboxOption}>
                                {options.map((option) => (
                                    <label
                                        className={styles.sortRadioboxLabel}
                                        key={option}
                                    >
                                        <input
                                            type="radio"
                                            name="sort"
                                            value={option}
                                            checked={selectedSort === option}
                                            onChange={handleChange}
                                            className={
                                                styles.sortRadioboxCircle
                                            }
                                        />
                                        {option
                                            .replace(/([A-Z])/g, " $1")
                                            .toLowerCase()}
                                    </label>
                                ))}
                            </div>
                        </div>
                    ),
            )}
            <div className={styles.sortButtonContainer}>
                <Button
                    label="Clear"
                    className={styles.sortClearButton}
                    onClick={clear}
                />
                <Button
                    label="Apply"
                    className={styles.sortApplyButton}
                    onClick={applySort}
                />
            </div>
        </div>
    );
}
