export const toggleFilter = (setIsFilterOpen, setIsSortOpen) => {
    setIsFilterOpen((prev) => !prev);
    setIsSortOpen(false);
};

export const toggleSort = (setIsSortOpen, setIsFilterOpen) => {
    setIsSortOpen((prev) => !prev);
    setIsFilterOpen(false);
};

export const toggleSearch = (setIsFilterOpen, setIsSortOpen) => {
    setIsFilterOpen(false);
    setIsSortOpen(false);
};
