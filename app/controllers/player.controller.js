const Player = require("../models/player.model");

// Create and save a new Player
exports.create = (req, res) => {
    //Validate request
    if(!req.body){
        res.status(400).send({
            message: "Content cannot be empty!"
        });
    }

    // Create a Player
    const player = new Player({
        name: req.body.name,
        last_name: req.body.last_name,
        jersey_number: req.body.jersey_number,
        at_bats: req.body.at_bats,
        H: req.body.H,
        H2: req.body.H2,
        H3: req.body.H3,
        HR: req.body.HR,
        free_agent: req.body.free_agent || false
    });

    //Save player in the database
    Player.create(player, (err, data) => {
        if(err)
            res.status(500).send({
                message: 
                err.message || "Some error ocurred while creating the Player."
            });
            else res.send(data);
    });
};

// Retrieve all Players from the database based on the condition
exports.findAll = (req, res) => {
    const name = req.query.name;

    Player.getAll(name, (err, data) => {
        if(err) 
        res.status(500).send({
            message: 
            err.message || "Some error ocurred while retrieving players."
        });
        else res.send(data);
    });
};

// Find a single Player with id
exports.findOne = (req, res) => {
    Player.findById(req.params.id, (err, data) => {
        if(err) {
            if(err.kind === "not_found"){
                res.status(404).send({
                    message: `Not found player with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving Player with id " + req.params.id
                });
            }
        } else res.send(data);
    });
};

// Find all signed Player[s]
exports.findAllSigned = (req, res) => {
    Player.getAllSigned((err, data) => {
        if(err)
        res.status(500).send({
            message:
            err.message || "Some error occurred while retrieving players."
        });
    else res.send(data);
    });
};

// Update a Player identified by the id in the request
exports.update = (req, res) => {
    //Validate request
    if(!req.body){
        res.status(400).send({
            message: "Content cannot be empty!"
        });
    }

    console.log(req.body);

    Player.updateById(
        req.params.id,
        new Player(req.body),
        (err, data) => {
            if(err){
                if(err.kind === "not_found"){
                    res.status(404).send({
                        message: `Not found Player with id ${req.params.id}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Error updating Player with id " + req.params.id
                    });
                }
            } else res.send(data);
        }
    );
};

// Delete a Player with the specified id in the request
exports.delete = (req, res) => {
    Player.remove(req.params.id, (err, data) => {
        if(err){
            if(err.kind === "not_found"){
                res.status(404).send({
                    message: `Not found Player with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Couldn't remove Player with id " + req.params.id
                });
            }
        } else res.send({ message: `Player was deleted successfully!`});
    });
};

// Delete all Player[s] from the database.
exports.deleteAll = (req, res) => {
    Player.removeAll((err, data) => {
        if(err) 
        res.status(500).send({
            message: 
            
            err.message || "Some error ocurred while removing all players."
        });
        else res.send({ message: `All Player[s] were deleted successfully`});
    });
};