import React, { useEffect, useState } from "react";
import styles from "./Main.module";
import Button from "../components/Button";
import Input from "../components/Input";
import Table from "../components/Table";
import { getInventory } from "../ajax/backend";
import Modal from "../components/Modal";
import Filter from "../components/Filter";
import Sort from "../components/Sort";
import { search } from "../utils/search";

export default function Inventory({ branchID }) {
    const [inventoryData, setInventoryData] = useState({});
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [isSortOpen, setIsSortOpen] = useState(false);
    const [modalType, setModalType] = useState("");
    const [selectedProductId, setSelectedProductId] = useState(null);
    const [selectedProduct, setSelectedProduct] = useState(null);

    const { searchTerm, handleSearchChange, searchData } = search(
        inventoryData.data,
    );

    useEffect(() => {
        getInventory(branchID, (data) => {
            setInventoryData(data);
        });
    }, [branchID]);

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
        <div className={styles.container}>
            <div className={styles.header}>
                Inventory
                <Button
                    label="Add Product"
                    icon="add"
                    size="24"
                    onClick={() => openModal("add")}
                />
            </div>
            <div className={styles.mainContent}>
                <div className={styles.contentOptions}>
                    <Input
                        placeholder="Search products"
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
                    <div className={styles.optionsContainer}>
                        <Button
                            icon="sort"
                            size="24"
                            className={styles.options}
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
                            ? searchData
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
