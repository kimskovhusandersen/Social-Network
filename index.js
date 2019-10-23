const express = require("express");
const app = (exports.app = express());
const cookieSession = require("cookie-session");
const { SESSION_SECRET: sessionSecret } =
    process.env.NODE_ENV == "production"
        ? process.env
        : require("./secrets.json");

const csurf = require("csurf");
const compression = require("compression");
const db = require("./db");
const sess = require("./session");
// const { requireLoggedInUser, requireLoggedOutUser } = require("./middleware");

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
    res.cookie("csrfToken", req.csrfToken());
    next();
});

app.get("/welcome", function(req, res) {
    if (req.session.user) {
        res.redirect("/");
    } else {
        res.sendFile(__dirname + "/index.html");
    }
});

app.post("/users", (req, res) => {
    db.addUser(req, req.body)
        .then(({ rows }) => {
            return sess.addUser(req, rows[0]);
        })
        .then(user => {
            res.redirect("/");
        })
        .catch(err => {
            console.log("BACK IN ROUTE. ERR: ", err);
            res.json(err);
        });
});

app.post("/login", (req, res) => {
    console.log("INSIDE LOGIN ROUTE");
    db.login(req)
        .then(result => {
            console.log("BACK IN LOGIN ROUTE. RESULT:", result);
        })
        .catch(err => {
            console.log("BACK IN ROUTE. ERR: ", err);
            res.json(err);
        });
});

app.get("*", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

if (require.main === module) {
    app.listen(process.env.PORT || 8080, console.log("I'm listening!"));
}
