import React, { forwardRef } from "react";
import styles from "./Input.module";
import Icon from "./Icon";

const Input = forwardRef(
    (
        {
            label = null,
            icon = null,
            peso,
            size = null,
            placeholder,
            error,
            labelStyle,
            containerStyle,
            number,
            optional,
            ...rest
        },
        ref,
    ) => (
        <div className={styles.inputBox}>
            {label && (
                <div className={`${styles.inputLabel} ${labelStyle}`}>
                    {label} {optional && <span>(Optional)</span>}
                </div>
            )}
            <div className={`${styles.inputContainer} ${containerStyle}`}>
                {icon && <Icon icon={icon} size={size} />}
                {peso && <div className={styles.inputPeso}>₱</div>}
                {number && <div className={styles.inputNumber}>+63</div>}
                <input
                    className={styles.input}
                    placeholder={placeholder}
                    ref={ref}
                    {...rest}
                    step="0.01"
                />
            </div>
            {error && <p className={styles.inputError}>{error}</p>}
        </div>
    ),
);

export default Input;
