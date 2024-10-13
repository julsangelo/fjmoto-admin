import React from "react";
import style from "./Sidebar.module";

export default function Sidebar({ children }) {
    return <div className={style.sideBar}>{children}</div>;
}
