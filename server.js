
const express = require("express");
const cors = require("cors");

const app = express();

var corsOptions = {
    origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

// parse content-type application/json requests
app.use(express.json());

// parse content-type - application/x-www-form-urlencoded requests
app.use(express.urlencoded({extended: true}));

// simple route
app.get("/", (req, res) => {
    res.json({ message: "Welcome to the App"})
});

require("./app/routes/player.routes.js")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}.`);
});