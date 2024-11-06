import React, { useRef, useState } from "react";
import styles from "./Filter.module";
import Button from "./Button";
import Input from "./Input";

export default function Filter({
    visibleFilter,
    data,
    dataPrefix,
    onFilterApply,
}) {
    console.log(data);
    const filterRefs = {
        category1: useRef(null),
        category2: useRef(null),
        priceMin: useRef(null),
        priceMax: useRef(null),
        dateFrom: useRef(null),
        dateTo: useRef(null),
        totalMin: useRef(null),
        totalMax: useRef(null),
        paymentStatus: useRef(null),
        fulfillmentStatus: useRef(null),
        orderStatus: useRef(null),
        branch: useRef(null),
        position: useRef(null),
        employmentStatus: useRef(null),
    };

    const clear = () => {
        Object.values(filterRefs).forEach((ref) => {
            if (ref.current) {
                ref.current.value = "";
                if (ref.current.type === "checkbox") {
                    ref.current.checked = false;
                }
            }
        });

        onFilterApply(null);
    };

    const applyFilters = () => {
        const filters = {
            category: [],
            price: {
                min: filterRefs.priceMin.current?.value || "",
                max: filterRefs.priceMax.current?.value || "",
            },
            date: {
                from: filterRefs.dateFrom.current?.value || "",
                to: filterRefs.dateTo.current?.value || "",
            },
            total: {
                min: filterRefs.totalMin.current?.value || "",
                max: filterRefs.totalMax.current?.value || "",
            },
            paymentStatus: filterRefs.paymentStatus.current?.value || "",
            fulfillmentStatus:
                filterRefs.fulfillmentStatus.current?.value || "",
            orderStatus: filterRefs.orderStatus.current?.value || "",
            branch: filterRefs.branch.current?.value || "",
            position: filterRefs.position.current?.value || "",
            employmentStatus: filterRefs.employmentStatus.current?.value || "",
        };

        const filteredData = data.data.filter((item) => {
            const matchesCategory =
                filters.category.length === 0 ||
                filters.category.includes(item[`${dataPrefix}Category`]);
            const matchesPrice =
                (!filters.price.min ||
                    item[`${dataPrefix}Price`] >= filters.price.min) &&
                (!filters.price.max ||
                    item[`${dataPrefix}Price`] <= filters.price.max);
            const matchesDate =
                (!filters.date.from ||
                    new Date(item.date) >= new Date(filters.date.from)) &&
                (!filters.date.to ||
                    new Date(item.date) <= new Date(filters.date.to));
            const matchesTotal =
                (!filters.total.min || item.total >= filters.total.min) &&
                (!filters.total.max || item.total <= filters.total.max);
            const matchesPaymentStatus =
                !filters.paymentStatus ||
                item.paymentStatus === filters.paymentStatus;
            const matchesFulfillmentStatus =
                !filters.fulfillmentStatus ||
                item.fulfillmentStatus === filters.fulfillmentStatus;
            const matchesOrderStatus =
                !filters.orderStatus ||
                item.orderStatus === filters.orderStatus;
            const matchesBranch =
                !filters.branch || item.branch === filters.branch;
            const matchesPosition =
                !filters.position || item.position === filters.position;
            const matchesEmploymentStatus =
                !filters.employmentStatus ||
                item.employmentStatus === filters.employmentStatus;

            return (
                matchesCategory &&
                matchesPrice &&
                matchesDate &&
                matchesTotal &&
                matchesPaymentStatus &&
                matchesFulfillmentStatus &&
                matchesOrderStatus &&
                matchesBranch &&
                matchesPosition &&
                matchesEmploymentStatus
            );
        });

        onFilterApply({ data: filteredData });
    };

    return (
        <div className={styles.filter}>
            {visibleFilter.includes("category") && (
                <div className={styles.filterContainer}>
                    Category
                    <div className={styles.filterInput}>
                        <label className={styles.filterOptionLabel}>
                            <input
                                type="checkbox"
                                name="category1"
                                id="1"
                                className={styles.filterOptionCheckbox}
                                ref={filterRefs.category1}
                                onChange={() => {
                                    if (filterRefs.category1.current.checked) {
                                        filterRefs.category1.current.value =
                                            "Motorcycle";
                                    } else {
                                        filterRefs.category1.current.value = "";
                                    }
                                }}
                            />
                            Motorcycle
                        </label>
                        <label className={styles.filterOptionLabel}>
                            <input
                                type="checkbox"
                                name="category2"
                                id="2"
                                className={styles.filterOptionCheckbox}
                                ref={filterRefs.category2}
                                onChange={() => {
                                    if (filterRefs.category2.current.checked) {
                                        filterRefs.category2.current.value =
                                            "Motorcycle";
                                    } else {
                                        filterRefs.category2.current.value = "";
                                    }
                                }}
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
                            ref={filterRefs.priceMin}
                            label="Minimum"
                            labelStyle={styles.filterInputLabel}
                            containerStyle={styles.filterInputContainer}
                            type="number"
                            peso={true}
                        />
                        <Input
                            ref={filterRefs.priceMax}
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
                            ref={filterRefs.dateFrom}
                            labelStyle={styles.filterInputLabel}
                            containerStyle={styles.filterInputContainer}
                            type="date"
                        />
                        to
                        <Input
                            ref={filterRefs.dateTo}
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
                            ref={filterRefs.totalMin}
                            labelStyle={styles.filterInputLabel}
                            containerStyle={styles.filterInputContainer}
                            type="number"
                            label="Minimum"
                            peso={true}
                        />
                        <Input
                            ref={filterRefs.totalMax}
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
                        <select
                            ref={filterRefs.paymentStatus}
                            className={styles.filterDropdown}
                        >
                            <option value="">Select</option>
                            <option value="Paid">Paid</option>
                            <option value="Pending">Pending</option>
                        </select>
                    </div>
                </div>
            )}
            {visibleFilter.includes("fulfillment") && (
                <div className={styles.filterContainer}>
                    Fulfillment Status
                    <div className={styles.filterInput}>
                        <select
                            ref={filterRefs.fulfillmentStatus}
                            className={styles.filterDropdown}
                        >
                            <option value="">Select</option>
                            <option value="Fulfilled">Fulfilled</option>
                            <option value="Not Fulfilled">Not Fulfilled</option>
                        </select>
                    </div>
                </div>
            )}
            {visibleFilter.includes("order") && (
                <div className={styles.filterContainer}>
                    Order Status
                    <div className={styles.filterInput}>
                        <select
                            ref={filterRefs.orderStatus}
                            className={styles.filterDropdown}
                        >
                            <option value="">Select</option>
                            <option value="Completed">Completed</option>
                            <option value="Pending">Pending</option>
                        </select>
                    </div>
                </div>
            )}
            {visibleFilter.includes("branch") && (
                <div className={styles.filterContainer}>
                    Branch
                    <div className={styles.filterInput}>
                        <select
                            ref={filterRefs.branch}
                            className={styles.filterDropdown}
                        >
                            <option value="">Select</option>
                            <option value="Branch A">Branch A</option>
                            <option value="Branch B">Branch B</option>
                        </select>
                    </div>
                </div>
            )}
            {visibleFilter.includes("position") && (
                <div className={styles.filterContainer}>
                    Position
                    <div className={styles.filterInput}>
                        <select
                            ref={filterRefs.position}
                            className={styles.filterDropdown}
                        >
                            <option value="">Select</option>
                            <option value="Position A">Position A</option>
                            <option value="Position B">Position B</option>
                        </select>
                    </div>
                </div>
            )}
            {visibleFilter.includes("employment") && (
                <div className={styles.filterContainer}>
                    Employment Status
                    <div className={styles.filterInput}>
                        <select
                            ref={filterRefs.employmentStatus}
                            className={styles.filterDropdown}
                        >
                            <option value="">Select</option>
                            <option value="Active">Active</option>
                            <option value="Inactive">Inactive</option>
                        </select>
                    </div>
                </div>
            )}
            <div className={styles.filterButtonContainer}>
                <Button
                    label="Clear"
                    onClick={clear}
                    className={styles.filterClearButton}
                />
                <Button
                    label="Apply"
                    className={styles.filterApplyButton}
                    onClick={applyFilters}
                />
            </div>
        </div>
    );
}
