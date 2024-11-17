import React from "react";
import styles from "./Button.module.css";

const Button = ({label, onClick, type = "button", className = "", disabled = false}) => {
    return (
        <button
            type={type}
            className={`${styles.button} ${className}`}
            onClick={onClick}
            disabled={disabled}
        >
            {label}
        </button>
    )
}

export default Button;