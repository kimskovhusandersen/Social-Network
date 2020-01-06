import React from "react";

import classes from "./Input.module.css";

const input = props => {
    let inputElement = null;
    const inputClasses = [classes.InputElement];

    if (
        props.elementType === "input" &&
        props.elementConfig.type === "checkbox"
    ) {
        inputClasses.push(classes.Checkbox);
        inputElement = (
            <div className={inputClasses.join(" ")}>
                <input
                    {...props.elementConfig}
                    value={props.value === "0" ? "1" : "0"}
                    onChange={props.changed}
                />
                <span>{props.elementConfig.placeholder}</span>
            </div>
        );
    } else if (props.elementType === "input") {
        inputElement = (
            <input
                {...props.elementConfig}
                className={inputClasses.join(" ")}
                value={props.value}
                onChange={props.changed}
            />
        );
    } else if (props.elementType === "textarea") {
        inputElement = (
            <textarea
                {...props.elementConfig}
                className={inputClasses.join(" ")}
                value={props.value}
                onChange={props.changed}
            />
        );
    } else if (props.elementType === "select") {
        inputElement = (
            <select
                className={inputClasses.join(" ")}
                value={props.value}
                onChange={props.changed}
            >
                {props.elementConfig.options.map(option => (
                    <option key={option.value} value={option.value}>
                        {option.displayValue}
                    </option>
                ))}
            </select>
        );
    }
    if (props.elementType === "checkbox") {
        inputElement = (
            <>
                <input
                    {...props.elementConfig}
                    className={inputClasses.join(" ")}
                    value={props.value}
                    onChange={props.changed}
                />
                {props.elementConfig.placeholder}
            </>
        );
    }
    return (
        <div className={classes.Input}>
            <label className={classes.Label}>{props.label}</label>
            {inputElement}
        </div>
    );
};

export default input;
