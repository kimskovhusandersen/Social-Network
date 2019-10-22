const express = require("express");
const app = express();
const compression = require("compression");
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

app.get("/chocolate", (req, res) => {
    console.log("hi");
    res.json([{ hi: "hi" }]);
});

// ------------------------------
// Do not delete (required to run React)
app.get("*", function(req, res) {
    res.sendFile(__dirname + "/index.html");
});
// ------------------------------

app.listen(8080, function() {
    console.log("I'm listening.");
});
