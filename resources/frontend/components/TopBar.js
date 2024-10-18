import React from "react";
import styles from "./TopBar.module";
import Branch from "./Branch";
import Role from "./Role";
import User from "./User";

export default function TopBar({ setSelectedBranch }) {
    return (
        <div className={styles.topBar}>
            <div className={styles.topBarGroup}>
                <Branch setSelectedBranch={setSelectedBranch} />
                <Role />
            </div>
            <User />
        </div>
    );
}
