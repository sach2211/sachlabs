const express = require("express");
const app = express();

const path = require("path");


app.use(express.static(path.join(__dirname, '../public')));

app.get("/", (req, res, next) => {
    // res.sendFile (path.join(__dirname, '../public/index.html'));
    res.redirect('/index.html');
});

app.get("/projects", (req, res, next) => {
    res.sendFile(__dirname + '/views/index.html');
    // res.send("This site will be up in a few days !! Thanks for your patience")
});

// 404 for all other routes.
app.get("*",  (req, res, next) => {
    res.status(404).send("Wrong URL maybe ?");
})

const PORT = process.env.port || 3010;
app.listen(PORT, () => {
    console.log("Server is up and listening on port ", PORT);
});
