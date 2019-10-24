// DATABASE METHODS

// Users:
const addUser = require("./db/users/addUser");

// Images:
const addImage = require("./db/images/addImage");

// Authentication:
const login = require("./db/authentication/login");

module.exports = { addUser, addImage, login };
