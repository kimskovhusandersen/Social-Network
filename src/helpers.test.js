import React from "react";
import {
    kebabToCamel,
    camelToKebab,
    kebabObjToCamel,
    camelObjToKebab
} from "./helpers";

// kebabToCamel():
test(`if the input is "chokolateIce", it returns "chokolateIce"`, () => {
    expect(kebabToCamel("chokolateIce")).toBe("chokolateIce");
});

test(`if the input is "peanut_butter", it returns "peanutButter"`, () => {
    expect(kebabToCamel("peanut_butter")).toBe("peanutButter");
});

// camelToKebab():
test(`if the input is "milk_shake", it returns "milk_shake"`, () => {
    expect(camelToKebab("milk_shake")).toBe("milk_shake");
});

test(`if the input is "peanutButter", returns "peanut_butter"`, () => {
    expect(camelToKebab("peanutButter")).toBe("peanut_butter");
});

// kebabObjToCamel():
test(`It returns an object where all keys have been translated to Camel Case`, () => {
    expect(
        kebabObjToCamel({
            yummyIce: "yes",
            chokolate: "yes",
            chokolate_ice: "no"
        })
    ).toEqual({ yummyIce: "yes", chokolate: "yes", chokolateIce: "no" });
});
