import React, { useEffect, useState } from "react";
import { getEmployees } from "../ajax/backend";
import styles from "./Employees.module";
import Button from "../components/Button";
import Input from "../components/Input";
import Table from "../components/Table";
import Filter from "../components/Filter";

export default function Employees({ branchID, showDetails }) {
    const [employeesData, setEmployeesData] = useState({});
    const [searchTerm, setSearchTerm] = useState("");
    const [isFilterOpen, setIsFilterOpen] = useState(false);

    useEffect(() => {
        getEmployees(branchID, (data) => {
            setEmployeesData(data);
        });
    }, [branchID]);

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const filteredData = employeesData.data
        ? employeesData.data.filter((item) =>
              Object.values(item).some((value) =>
                  String(value)
                      .toLowerCase()
                      .includes(searchTerm.toLowerCase()),
              ),
          )
        : [];

    const toggleFilterModal = () => {
        setIsFilterOpen((prev) => !prev);
    };

    const handleView = (employeeID) => {
        showDetails(employeeID);
    };

    return (
        <div className={styles.employeesContent}>
            <div className={styles.employeesHeader}>
                Employees
                <Button
                    label="Add employee"
                    icon="add"
                    size="24"
                    // onClick={() => openModal("add")}
                />
            </div>
            <div className={styles.employeesMain}>
                <div className={styles.employeesSearchFilter}>
                    <Input
                        placeholder="Search employees"
                        icon="search"
                        size="24"
                        value={searchTerm}
                        onChange={handleSearchChange}
                    />
                    <Button
                        icon="filter"
                        size="24"
                        className={styles.employeesFilter}
                        label="Filter"
                        onClick={toggleFilterModal}
                    />
                </div>
                <Table
                    checkbox={true}
                    data={{
                        headers: employeesData.headers || [],
                        data: searchTerm
                            ? filteredData
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
    );
}
