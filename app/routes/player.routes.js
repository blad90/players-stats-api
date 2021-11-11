module.exports = app => {
    const players = require("../controllers/player.controller.js");

    var router = require("express").Router();

    //Create a new Player
    router.post("/", players.create);

    //Retrieve all Player[s]
    router.get("/", players.findAll);

    //Retrieve all signed Player[s]
    router.get("/free_agent", players.findAllSigned);

    //Retrieve a single Player with id
    router.get("/:id", players.findOne);

    //Update a Player with id
    router.put("/:id", players.update);

    //Delete a Player with id
    router.delete("/:id", players.delete);

    //Delete all Players
    router.delete("/", players.deleteAll);

    app.use('/api/players', router);
};