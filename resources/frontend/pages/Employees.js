import React, { useEffect, useState } from "react";
import { getEmployees } from "../ajax/backend";
import styles from "./Employees.module";
import Button from "../components/Button";
import Input from "../components/Input";
import Table from "../components/Table";
import Filter from "../components/Filter";
import Sort from "../components/Sort";

export default function Employees({ branch }) {
    const [employeesData, setEmployeesData] = useState({});
    const [searchTerm, setSearchTerm] = useState("");
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [isSortOpen, setIsSortOpen] = useState(false);
    const [modalType, setModalType] = useState("");

    useEffect(() => {
        getEmployees(branch, (data) => {
            setEmployeesData(data);
        });
    }, [branch]);

    console.log(employeesData);

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
        console.log(event.target.value);
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
        setIsSortOpen(false);
    };

    const handleView = (customerId) => {
        showPurchases(customerId);
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
                    branch={branch}
                    visibleColumns={[
                        "name",
                        "ID",
                        "branch",
                        "position",
                        "employmentStatus",
                    ]}
                    visibleActions={["view", "delete", "edit"]}
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
