const express = require("express");
const app = express();

app.get("/", (req, res, next) => {
    res.send("This site will be up in a few days !! Thanks for your patience")
});

const PORT = process.env.port || 3010;
app.listen(PORT, () => {
    console.log("Server is up and listening on port ", PORT);
});
