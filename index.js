const express = require("express");
const app = (exports.app = express());
const cookieSession = require("cookie-session");
const { SESSION_SECRET: sessionSecret } =
    process.env.NODE_ENV == "production"
        ? process.env
        : require("./secrets.json");

const csurf = require("csurf");
const compression = require("compression");
const db = require("./db.js");
// const mw = require("./middleware");
// const profileRouter = require("./profile-routes");
// const authRouter = require("./auth-routes");
// ------------------------------
// Do not delete (required to run React)
app.use(compression());
if (process.env.NODE_ENV != "production") {
    app.use(
        "/bundle.js",
        require("http-proxy-middleware")({
            target: "http://localhost:8081/"
        })
    );
} else {
    app.use("/bundle.js", (req, res) => res.sendFile(`${__dirname}/bundle.js`));
}

// ------------------------------
// ADD YOUR CODE BELOW HERE:

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(
    cookieSession({ secret: sessionSecret, maxAge: 1000 * 60 * 60 * 24 * 14 })
);

app.use(csurf()); // place after body-parsing (urlencoded) and cookieSession.
app.use(function(req, res, next) {
    res.cookie("csrftoken", req.csrfToken());
    next();
});

app.get("/users/", (req, res) => {
    console.log("INSIDE USERS ROUTE");
    db.getFileThree();
    // db.getUsers()
    //     .then(result => {
    //         console.log(result);
    //     })
    //     .catch(err => {
    //         console.log(err);
    //     });
});

app.get("/welcome", function(req, res) {
    if (req.session.userId) {
        res.redirect("/");
    } else {
        res.sendFile(__dirname + "/index.html");
    }
});

app.get("*", function(req, res) {
    if (!req.session.userId) {
        res.redirect("/welcome");
    } else {
        res.sendFile(__dirname + "/index.html");
    }
});

if (require.main === module) {
    app.listen(process.env.PORT || 8080, console.log("I'm listening!"));
}
