/**
 * Import express and initialize it.
 */
const express = require("express");
const app = express();


// Path module to construct absolute paths from relative ones.
const path = require("path");


// Make this directory available.
// Thus, index.html, chunk js and other files in this directory will be directly available.
// This will also allow our html file to request the js file.

app.use(express.static(path.join(__dirname, '../public')));

// request to root are redirect to index.html
app.get("/", (req, res, next) => {
    // res.sendFile (path.join(__dirname, '../public/index.html'));
    res.redirect('/index.html');
});

app.get("/projects", (req, res, next) => {
    res.status(200).send('Under maintenance, will be back in a few days');
});

// 404 for all other routes.
app.get("*",  (req, res, next) => {
    res.status(404).send("Wrong URL maybe ?");
})

// Start on the port specified by the environment.
const PORT = process.env.port || 3010;
app.listen(PORT, () => {
    console.log("Server is up and listening on port ", PORT);
});
