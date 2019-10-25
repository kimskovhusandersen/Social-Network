// EXPORTS DATABASE METHODS
const { readdir } = require("fs").promises;
const path = `${__dirname}/db`;

(async function exportModels(path) {
    const files = await readdir(path, { withFileTypes: true });
    const arr = [];
    for (let i = 0; i < files.length; i++) {
        let { name } = files[i];
        let newPath = `${path}/${name}`;
        if (files[i].isDirectory()) {
            arr.push(exportModels(newPath));
        } else if (files[i].isFile() && !newPath.includes("test")) {
            let fn = name.substring(0, name.length - 3);
            module.exports[fn] = require(newPath);
        }
    }
    return Promise.all(arr);
})(path);
