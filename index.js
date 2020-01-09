const express = require("express");
const app = (exports.app = express());
const db = require("./db");

// Socket.io
const compression = require("compression");
const server = require("http").Server(app);
const io = require("./socket").init(server, { origins: "localhost:8080" });

// middleware
const { SESSION_SECRET: sessionSecret } =
    process.env.NODE_ENV == "production"
        ? process.env
        : require("./secrets.json");

const csurf = require("csurf");
app.use(function(req, res, next) {
    console.log(req.url);
    next();
});

const authRouter = require("./routes-authentication");
const friendsRouter = require("./routes-friends");
const profilesRouter = require("./routes-profiles");
const photosRouter = require("./routes-photos");
const threadsRouter = require("./routes-threads");
const postsRouter = require("./routes-posts");

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

// Middleware
app.use(compression());
app.use(express.urlencoded({ extended: false }));
const cookieSession = require("cookie-session");
const cookieSessionMiddleware = cookieSession({
    secret: sessionSecret,
    maxAge: 1000 * 60 * 60 * 24 * 90
});
app.use(cookieSessionMiddleware);
io.use((socket, next) => {
    cookieSessionMiddleware(socket.request, socket.request.res, next);
});
app.use(express.json());
app.use(csurf()); // place after body-parsing (urlencoded) and cookieSession.
app.use(function(req, res, next) {
    res.cookie("csrfToken", req.csrfToken());
    next();
});

app.use(express.static("public"));

// Socket.io
const onlineUsers = {};

exports.onlineUsers = onlineUsers;

const onConnect = socket => {
    const { profileId } = socket.request.session;
    if (!profileId) {
        return socket.disconnect(true);
    }
    onlineUsers[socket.id] = profileId;
    socket.join(profileId);

    console.log(
        `A socket with the socket ID ${socket.id} and profile ID ${profileId} just connected`
    );

    socket.on("disconnect", () => {
        console.log(`A socket with the id ${socket.id} just disconnected`);
        delete onlineUsers[socket.id];
    });
};
io.on("connection", onConnect);

// Routes
app.use(authRouter);
app.use(friendsRouter);
app.use(profilesRouter);
app.use(photosRouter);
app.use(threadsRouter);
app.use(postsRouter);

// Routes
app.get("/welcome", function(req, res) {
    if (req.session.profileId) {
        res.redirect("/");
    } else {
        res.sendFile(__dirname + "/index.html");
    }
});

app.get("*", function(req, res) {
    if (!req.session.profileId) {
        res.redirect("/welcome");
    } else {
        res.sendFile(__dirname + "/index.html");
    }
});

if (require.main === module) {
    // app.listen(process.env.PORT || 8080, console.log("I'm listening!"));
    server.listen(process.env.PORT || 8080, console.log("I'm listening!"));
}
