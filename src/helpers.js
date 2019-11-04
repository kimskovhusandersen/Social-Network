import React, { useState } from "react";
import axios from "./axios_csurf";
import moment from "moment";

export const kebabToCamel = key => {
    return key
        .toLowerCase()
        .split("_")
        .map((word, i) => {
            return i != 0 ? word[0].toUpperCase() + word.slice(1) : word;
        })
        .join("");
};

export const camelToKebab = key => {
    return key
        .split(/(?=[A-Z])/)
        .map((word, i) => {
            return i != 0 ? word[0].toLowerCase() + word.slice(1) : word;
        })
        .join("_");
};

export const camelObjToKebab = obj => {
    let newObj = {};
    for (let key in obj) {
        newObj[camelToKebab(key)] = obj[key];
    }
    return newObj;
};

export const kebabObjToCamel = obj => {
    let newObj = {};
    for (let key in obj) {
        newObj[kebabToCamel(key)] = obj[key];
    }
    return newObj;
};

export const optionsYear = () => {
    let years = [];
    const year = new Date().getFullYear();
    for (let i = year; i > year - 130; i--) {
        let option = (
            <option key={i} value={i}>
                {i}
            </option>
        );
        years.push(option);
    }
    return years;
};

export const optionsMonth = () => {
    return (
        <React.Fragment>
            {<option value="1">Jan</option>}
            {<option value="2">Feb</option>}
            {<option value="3">Mar</option>}
            {<option value="4">Apr</option>}
            {<option value="5">May</option>}
            {<option value="6">Jun</option>}
            {<option value="7">Jul</option>}
            {<option value="8">Aug</option>}
            {<option value="9">Sep</option>}
            {<option value="10">Oct</option>}
            {<option value="11">Nov</option>}
            {<option value="12">Dec</option>}
        </React.Fragment>
    );
};

export const optionsDay = () => {
    let days = [];
    for (let i = 1; i < 32; i++) {
        let option = (
            <option key={i} value={i}>
                {i}
            </option>
        );
        days.push(option);
    }
    return days;
};

export const useFetchData = async (url, values) => {
    const { data } =
        (values && (await axios.post(url, values))) || (await axios.get(url));

    let result;
    if (data.name == "error") {
        console.log(data);
        return;
    }
    if (data.length == 1) {
        result = kebabObjToCamel(data[0]);
    } else if (data.length > 1) {
        result = [];

        data.map(obj => result.push(kebabObjToCamel(obj)));
    }
    return result;
};

export const formatTimestamp = ts => {
    return moment(ts).format("YYYYMMDD HH:mm:ss");
};

export const useRelativeTime = timestamp => {
    return moment(timestamp).fromNow();
};
