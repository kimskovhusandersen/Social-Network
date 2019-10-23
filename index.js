const express = require("express");
const app = (exports.app = express());
// middleware
const cookieSession = require("cookie-session");
const { SESSION_SECRET: sessionSecret } =
    process.env.NODE_ENV == "production"
        ? process.env
        : require("./secrets.json");

const csurf = require("csurf");
const compression = require("compression");
const authRouter = require("./user-routes");
const userRouter = require("./authentication-routes");
// Required to run React
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
//

app.use(compression());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(
    cookieSession({
        secret: sessionSecret,
        maxAge: 1000 * 60 * 60 * 24 * 14
    })
);
app.use(csurf()); // place after body-parsing (urlencoded) and cookieSession.
app.use(function(req, res, next) {
    res.cookie("csrfToken", req.csrfToken());
    next();
});
// Routes
app.use(authRouter);
app.use(userRouter);

app.get("/welcome", function(req, res) {
    if (req.session.user) {
        console.log("WE ARE LOGGED IN WITH:", req.session.user);
        res.redirect("/");
    } else {
        res.sendFile(__dirname + "/index.html");
    }
});

app.get("*", function(req, res) {
    if (!req.session.user) {
        console.log("WE ARE NOT LOGGED IN:", req.session.user);
        res.redirect("/welcome");
    } else {
        res.sendFile(__dirname + "/index.html");
    }
});

if (require.main === module) {
    app.listen(process.env.PORT || 8080, console.log("I'm listening!"));
}
