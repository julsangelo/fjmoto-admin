import React, { useContext, useEffect, useState } from "react";
import styles from "./Main.module";
import Button from "../components/Button";
import Input from "../components/Input";
import Table from "../components/Table";
import { getProducts } from "../ajax/backend";
import Modal from "../components/Modal";
import Filter from "../components/Filter";
import Sort from "../components/Sort";
import { search } from "../utils/search";
import { toggleFilter, toggleSort, toggleSearch } from "../utils/toggle";
import { useModal } from "../utils/modal";
import { ReferenceContext } from "../context/ReferenceProvider";

export default function ProductCategory({ branchID }) {
    const { references } = useContext(ReferenceContext);
    const [productCategoryData, setProductCategoryData] = useState(
        references.productCategory,
    );
    const [modifiedData, setModifiedData] = useState(null);
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [isSortOpen, setIsSortOpen] = useState(false);

    const {
        isModalOpen,
        modalType,
        selectedValue,
        selectedData,
        openModal,
        closeModal,
    } = useModal();

    useEffect(() => {
        setProductCategoryData(references.productCategory);
    }, [references]);

    const { searchTerm, handleSearchChange } = search();
    // modifiedData ? modifiedData.data : productCategoryData.data,
    // ["productName", "productCode"],
    // setModifiedData,

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                Inventory
                <Button
                    label="Add Product Category"
                    icon="add"
                    size="24"
                    onClick={() => openModal("addProductCategory")}
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
                        onClick={() =>
                            toggleSearch(setIsFilterOpen, setIsSortOpen)
                        }
                    />
                    <div className={styles.optionsContainer}>
                        <Button
                            icon="filter"
                            size="24"
                            className={styles.options}
                            label="Filter"
                            onClick={() =>
                                toggleFilter(setIsFilterOpen, setIsSortOpen)
                            }
                        />
                        {isFilterOpen && (
                            <Filter
                                visibleFilter={["category", "price"]}
                                data={
                                    modifiedData ? modifiedData : inventoryData
                                }
                                dataPrefix="product"
                                onFilterApply={setModifiedData}
                            />
                        )}
                    </div>
                    <div className={styles.optionsContainer}>
                        <Button
                            icon="sort"
                            size="24"
                            className={styles.options}
                            label="Sort"
                            onClick={() =>
                                toggleSort(setIsSortOpen, setIsFilterOpen)
                            }
                        />
                        {isSortOpen && (
                            <Sort
                                visibleSort={["price", "stockQuantity"]}
                                data={
                                    modifiedData ? modifiedData : inventoryData
                                }
                                dataPrefix="product"
                                onSort={setModifiedData}
                            />
                        )}
                    </div>
                </div>
                <Table
                    checkbox={false}
                    data={{
                        // headers: productCategoryData.headers || [],
                        data: productCategoryData,
                    }}
                    openModal={openModal}
                    action={true}
                    branchID={branchID}
                    visibleColumns={[
                        "productCategoryID",
                        "productCategoryImage",
                        "productCategoryName",
                    ]}
                    visibleActions={["delete", "edit"]}
                />
                {isModalOpen && (
                    <Modal
                        onClose={closeModal}
                        branchID={branchID}
                        modal={modalType}
                        value={selectedValue}
                        data={selectedData}
                        references={references}
                    />
                )}
            </div>
        </div>
    );
}
