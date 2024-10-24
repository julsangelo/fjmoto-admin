import React from "react";
import DashboardIcon from "@mui/icons-material/Dashboard";
import InventoryIcon from "@mui/icons-material/Inventory";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import FilterListIcon from "@mui/icons-material/FilterList";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CloseIcon from "@mui/icons-material/Close";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import SwapVertIcon from "@mui/icons-material/SwapVert";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import BadgeIcon from "@mui/icons-material/Badge";

const ICON_TYPES = {
    dashboard: DashboardIcon,
    inventory: InventoryIcon,
    customer: PeopleAltIcon,
    order: ShoppingCartIcon,
    add: AddIcon,
    search: SearchIcon,
    filter: FilterListIcon,
    delete: DeleteIcon,
    edit: EditIcon,
    chevLeft: ChevronLeftIcon,
    chevRight: ChevronRightIcon,
    chevDown: ExpandMoreIcon,
    close: CloseIcon,
    addImage: AddPhotoAlternateIcon,
    sort: SwapVertIcon,
    view: VisibilityIcon,
    back: ArrowBackIcon,
    employees: BadgeIcon,
};

export default function Icon({ icon, size, onClick, className }) {
    let IconComponent = ICON_TYPES[icon];
    return (
        <IconComponent
            style={{ fontSize: `${size}px`, cursor: "pointer" }}
            className={className}
            onClick={onClick}
        />
    );
}
