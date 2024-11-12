import React, { useContext } from "react";
import styles from "./TopBar.module";
import Branch from "./Branch";
import Role from "./Role";
import User from "./User";
import { LoginContext } from "../context/LoginProvider";

export default function TopBar({ setSelectedBranch, branch }) {
    const { user } = useContext(LoginContext);

    return (
        <div className={styles.topBar}>
            <div className={styles.topBarGroup}>
                <Branch
                    setSelectedBranch={setSelectedBranch}
                    branch={branch}
                    data={user}
                />
                <Role data={user} />
            </div>
            <User data={user} />
        </div>
    );
}
