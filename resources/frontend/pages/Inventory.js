import React, { useEffect, useState } from "react";
import styles from "./Inventory.module";
import Button from "../components/Button";
import Input from "../components/Input";
import Filter from "../components/Filter";
import Table from "../components/Table";
import { getInventory } from "../ajax/backend";
import Modal from "../components/Modal";

export default function Inventory({ branch }) {
    const [inventoryData, setInventoryData] = useState({});
    const [searchTerm, setSearchTerm] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        getInventory(branch, (data) => {
            setInventoryData(data);
        });
    }, [branch]);

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
        console.log(event.target.value);
    };

    const filteredData = inventoryData.data
        ? inventoryData.data.filter((item) =>
              Object.values(item).some((value) =>
                  String(value)
                      .toLowerCase()
                      .includes(searchTerm.toLowerCase()),
              ),
          )
        : [];

    let openModal = () => setIsModalOpen(true);
    let closeModal = () => setIsModalOpen(false);

    return (
        <>
            <div className={styles.inventoryContent}>
                <div className={styles.inventoryHeader}>
                    Inventory
                    <Button
                        label="Add Inventory"
                        icon="add"
                        size="24"
                        onClick={openModal}
                    />
                </div>
                <div className={styles.inventoryMain}>
                    <div className={styles.inventorySearchFilter}>
                        <Input
                            placeholder="Search products"
                            icon="search"
                            height="24"
                            width="24"
                            value={searchTerm} // Bind the value to the state
                            onChange={handleSearchChange} // Handle input changes
                        />
                        <Button
                            icon="filter"
                            size="24"
                            className={styles.inventoryFilter}
                            label="Filter"
                        />
                        {/* <Filter label="Filter" /> */}
                    </div>
                    <Table
                        checkbox={false}
                        data={{
                            headers: inventoryData.headers || [],
                            data: searchTerm
                                ? filteredData
                                : inventoryData.data || [],
                        }}
                        action={true}
                    />
                    {isModalOpen && <Modal onClose={closeModal} />}
                </div>
            </div>
        </>
    );
}
