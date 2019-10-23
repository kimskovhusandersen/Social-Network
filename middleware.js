// const path = require("path");
//
// const requireLoggedInUser = (req, res, next) => {
//     console.log("NOT LOGGED IN! USER:", !req.session.user);
//     return !req.session.user &&
//         req.url != "/register" &&
//         req.url != "/login" &&
//         path.extname(req.url) == ""
//         ? res.redirect("/welcome")
//         : next();
// };
//
// const requireLoggedOutUser = (req, res, next) => {
//     console.log("LOGGED IN! USER:", req.session.user);
//     return req.session.user ? res.redirect("/") : next();
// };
//
// module.exports = {
//     requireLoggedInUser,
//     requireLoggedOutUser
// };
