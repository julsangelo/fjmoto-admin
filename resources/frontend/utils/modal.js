import { useState } from "react";

export function useModal() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalType, setModalType] = useState("");
    const [selectedData, setSelectedData] = useState(null);
    const [selectedValue, setSelectedValue] = useState(null);
    const [selectedTab, setSelectedTab] = useState(null);

    const openModal = (type, value, data, tab) => {
        setModalType(type);
        setSelectedData(data);
        setIsModalOpen(true);
        setSelectedValue(value);
        setSelectedTab(tab);
    };

    const closeModal = () => {
        setModalType(null);
        setIsModalOpen(false);
        setSelectedData(null);
        setSelectedValue(null);
        setSelectedTab(null);
    };

    return {
        isModalOpen,
        modalType,
        selectedValue,
        selectedData,
        selectedTab,
        openModal,
        closeModal,
    };
}
