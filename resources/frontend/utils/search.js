import { useState } from "react";

export const search = (data) => {
    const [searchTerm, setSearchTerm] = useState("");

    const handleSearchChange = (event) => {
        const value = event.target.value;
        setSearchTerm(value);
        console.log(value);
    };

    const searchData = data
        ? data.filter((item) =>
              Object.values(item).some((value) =>
                  String(value)
                      .toLowerCase()
                      .includes(searchTerm.toLowerCase()),
              ),
          )
        : [];

    return { searchTerm, handleSearchChange, searchData };
};
