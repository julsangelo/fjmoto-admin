import React, { useEffect, useState } from "react";
import styles from "./Inventory.module";
import Button from "../components/Button";
import Input from "../components/Input";
import Table from "../components/Table";
import { getInventory } from "../ajax/backend";
import Modal from "../components/Modal";
import Filter from "../components/Filter";
import Sort from "../components/Sort";

export default function Inventory({ branchID }) {
    const [inventoryData, setInventoryData] = useState({});
    const [searchTerm, setSearchTerm] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [isSortOpen, setIsSortOpen] = useState(false);
    const [modalType, setModalType] = useState("");
    const [selectedProductId, setSelectedProductId] = useState(null);
    const [selectedProduct, setSelectedProduct] = useState(null);

    useEffect(() => {
        getInventory(branchID, (data) => {
            setInventoryData(data);
        });
    }, [branchID]);

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

    const openModal = (type, productId, product) => {
        console.log(product);
        setModalType(type);
        setSelectedProductId(productId);
        setIsModalOpen(true);
        setSelectedProduct(product);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedProductId(null);
        setSelectedProduct(null);
    };

    const toggleFilterModal = () => {
        setIsFilterOpen((prev) => !prev);
        setIsSortOpen(false);
    };

    const toggleSortModal = () => {
        setIsSortOpen((prev) => !prev);
        setIsFilterOpen(false);
    };

    const toggleSearch = () => {
        setIsFilterOpen(false);
        setIsSortOpen(false);
    };

    return (
        <div className={styles.inventoryContent}>
            <div className={styles.inventoryHeader}>
                Inventory
                <Button
                    label="Add Product"
                    icon="add"
                    size="24"
                    onClick={() => openModal("add")}
                />
            </div>
            <div className={styles.inventoryMain}>
                <div className={styles.inventorySearchFilter}>
                    <Input
                        placeholder="Search products"
                        icon="search"
                        size="24"
                        value={searchTerm}
                        onChange={handleSearchChange}
                        onClick={toggleSearch}
                    />
                    <div className={styles.inventoryOptionContainer}>
                        <Button
                            icon="filter"
                            size="24"
                            className={styles.inventoryFilter}
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
                    <div className={styles.inventoryOptionContainer}>
                        <Button
                            icon="sort"
                            size="24"
                            className={styles.inventoryFilter}
                            label="Sort"
                            onClick={toggleSortModal}
                        />
                        {isSortOpen && (
                            <Sort visibleSort={["price", "stockQuantity"]} />
                        )}
                    </div>
                </div>
                <Table
                    checkbox={false}
                    data={{
                        headers: inventoryData.headers || [],
                        data: searchTerm
                            ? filteredData
                            : inventoryData.data || [],
                    }}
                    openModal={openModal}
                    action={true}
                    branchID={branchID}
                    visibleColumns={[
                        "productImage",
                        "productName",
                        "productCode",
                        "productCategory",
                        "productPrice",
                        "productStockQuantity",
                    ]}
                    visibleActions={["delete", "edit"]}
                />
                {isModalOpen && (
                    <Modal
                        onClose={closeModal}
                        branchID={branchID}
                        modal={modalType}
                        productId={selectedProductId}
                        product={selectedProduct}
                    />
                )}
            </div>
        </div>
    );
}
