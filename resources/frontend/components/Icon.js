import React from "react";
import DashboardIcon from "@mui/icons-material/Dashboard";
import InventoryIcon from "@mui/icons-material/Inventory";
import PersonIcon from "@mui/icons-material/Person";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import FilterListIcon from "@mui/icons-material/FilterList";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

const ICON_TYPES = {
    dashboard: DashboardIcon,
    inventory: InventoryIcon,
    customer: PersonIcon,
    order: ShoppingCartIcon,
    add: AddIcon,
    search: SearchIcon,
    filter: FilterListIcon,
    delete: DeleteIcon,
    edit: EditIcon,
    chevLeft: ChevronLeftIcon,
    chevRight: ChevronRightIcon,
};

export default function Icon({ icon, height, width }) {
    let IconComponent = ICON_TYPES[icon];
    return (
        <IconComponent style={{ height: `${height}px`, width: `${width}px` }} />
    );
}
