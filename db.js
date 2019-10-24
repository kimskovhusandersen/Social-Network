// EXPORT DATABASE METHODS
const { readdir, stat } = require("fs").promises;
const path = `${__dirname}/db`;
(async function exportModels(path) {
    const files = await readdir(path, { withFileTypes: true });
    const arr = [];
    for (let i = 0; i < files.length; i++) {
        let newPath = `${path}/${files[i].name}`;
        if (files[i].isDirectory()) {
            arr.push(exportModels(newPath));
        } else if (files[i].isFile()) {
            const stats = await stat(`${newPath}`);
            arr.push(stats);
            if (!newPath.includes("test")) {
                let fn = files[i].name.substring(0, files[i].name.length - 3);
                module.exports[fn] = require(newPath);
            }
        }
    }
    return Promise.all(arr);
})(path);
