const kebabToCamel = key => {
    return key
        .split("_")
        .map((word, i) => {
            return i != 0 ? word[0].toUpperCase() + word.slice(1) : word;
        })
        .join("");
};

module.exports = kebabToCamel;
