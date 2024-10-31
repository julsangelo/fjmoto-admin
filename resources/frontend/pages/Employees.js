import React, { useEffect, useState } from "react";
import { getEmployees } from "../ajax/backend";
import styles from "./Main.module";
import Button from "../components/Button";
import Input from "../components/Input";
import Table from "../components/Table";
import Filter from "../components/Filter";
import { search } from "../utils/search";

export default function Employees({ branchID, showDetails }) {
    const [employeesData, setEmployeesData] = useState({});
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const { searchTerm, handleSearchChange, searchData } = search(
        employeesData.data,
    );

    useEffect(() => {
        getEmployees(branchID, (data) => {
            setEmployeesData(data);
        });
    }, [branchID]);

    const toggleFilterModal = () => {
        setIsFilterOpen((prev) => !prev);
    };

    const handleView = (employeeID) => {
        showDetails(employeeID);
    };

    const toggleSearch = () => {
        setIsFilterOpen(false);
        setIsSortOpen(false);
    };
    return (
        <div className={styles.container}>
            <div className={styles.header}>
                Employees
                <Button
                    label="Add employee"
                    icon="add"
                    size="24"
                    // onClick={() => openModal("add")}
                />
            </div>
            <div className={styles.mainContent}>
                <div className={styles.contentOptions}>
                    <Input
                        placeholder="Search employees"
                        icon="search"
                        size="24"
                        value={searchTerm}
                        onChange={handleSearchChange}
                        onClick={toggleSearch}
                    />
                    <div className={styles.optionsContainer}>
                        <Button
                            icon="filter"
                            size="24"
                            className={styles.options}
                            label="Filter"
                            onClick={toggleFilterModal}
                        />
                        {isFilterOpen && (
                            <Filter
                                visibleFilter={[
                                    "date",
                                    "total",
                                    "payment",
                                    "fullfillment",
                                    "order",
                                ]}
                            />
                        )}
                    </div>
                </div>
                <Table
                    checkbox={true}
                    data={{
                        headers: employeesData.headers || [],
                        data: searchTerm
                            ? searchData
                            : employeesData.data || [],
                    }}
                    action={true}
                    branch={branchID}
                    visibleColumns={[
                        "employeeFirstName",
                        "employeeMiddleName",
                        "employeeLastName",
                        "branchID",
                        "employeePosition",
                        "employeeStatus",
                    ]}
                    visibleActions={["view", "delete", "edit"]}
                    onView={handleView}
                />
            </div>
        </div>
    );
}
