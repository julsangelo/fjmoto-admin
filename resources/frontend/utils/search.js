import { useState } from "react";

export const search = (data, columns, setModifiedData) => {
    const [searchTerm, setSearchTerm] = useState("");

    const handleSearchChange = (event) => {
        const value = event.target.value;
        setSearchTerm(value);

        console.log(data);
        if (value === "") {
            setModifiedData(null);
        } else {
            const searchData = data.filter((item) =>
                columns.some((column) =>
                    String(item[column] || "")
                        .toLowerCase()
                        .includes(value.toLowerCase()),
                ),
            );

            setModifiedData({ data: searchData });
        }
    };

    return { searchTerm, handleSearchChange };
};
