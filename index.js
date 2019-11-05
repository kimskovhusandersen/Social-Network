const express = require("express");
const app = (exports.app = express());
const db = require("./db");

// Socket.io
const compression = require("compression");
const server = require("http").Server(app);
const io = require("socket.io")(server, { origins: "localhost:8080" }); // add " myherokuapp.herokuapp.com:*" to origins when deploying

// middleware
const { SESSION_SECRET: sessionSecret } =
    process.env.NODE_ENV == "production"
        ? process.env
        : require("./secrets.json");

const csurf = require("csurf");
const authRouter = require("./routes-authentication");
const messagesRouter = require("./routes-messages");
const profilesRouter = require("./routes-profiles");
const photosRouter = require("./routes-photos");
const friendsRouter = require("./routes-friends");
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
// Routes
app.use(authRouter);
app.use(messagesRouter);
app.use(profilesRouter);
app.use(photosRouter);
app.use(friendsRouter);

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

const onlineUsers = {};
const threads = [];
const participants = [];
io.on("connection", async socket => {
    const { profileId } = socket.request.session;
    if (!profileId) {
        return socket.disconnect(true);
    }
    onlineUsers[socket.id] = profileId;
    console.log(
        `A socket with the id ${socket.id} just connected`,
        `and with the profileId ${profileId}`
    );

    // const { data } = await db.getLastTenChatMessages();
    socket.on("addMessage", async (content, threadId) => {
        let values = {
            senderId: profileId,
            content,
            threadId
        };
        const { rows } = await db.addMessage(values);
        io.sockets.emit("addMessage", rows[0]);
    });

    socket.on("disconnect", () => {
        console.log(`A socket with the id ${socket.id} just disconnected`);
        delete onlineUsers[socket.id];
    });
});

if (require.main === module) {
    // app.listen(process.env.PORT || 8080, console.log("I'm listening!"));
    server.listen(process.env.PORT || 8080, console.log("I'm listening!"));
}
