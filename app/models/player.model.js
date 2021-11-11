const sql = require("./db");

// constructor
const Player = function(player) {
    this.name = player.name;
    this.last_name = player.last_name;
    this.jersey_number = player.jersey_number;
    this.at_bats = player.at_bats;
    this.H = player.H;
    this.H2 = player.H2;
    this.H3 = player.H3;
    this.HR = player.HR;
    this.free_agent = player.free_agent;
};

Player.create = (newPlayer, result) => {
    sql.query("INSERT INTO players SET ?", newPlayer, (err, res) => {
        if(err) {
            console.log("error: " + err);
            result(err, null);
            return;
        }

        console.log("created player: ", { id: res.insertId, ...newPlayer});
        result(null, { id: res.insertId, ...newPlayer});
    });
};

Player.findById = (id, result) => {
    sql.query(`SELECT * FROM players WHERE id = ${id}`, (err, res) => {
        if(err){
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if(res.length){
            console.log("found player: ", res[0]);
            result(null, res[0]);
            return;
        }

        //if not found player with id
        result({ kind: "not_found"}, null);
    });
};

Player.getAll = (name, result) => {
    let query = "SELECT * FROM players";

    if(name){
        query += ` WHERE name LIKE '%${name}%'`;
    }

    sql.query(query, (err, res) => {
        if(err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("players: ", res);
        result(null, res);
    });
};

Player.getAllSigned = result => {
    sql.query("SELECT * FROM players WHERE free_agent=false", (err, res) => {
        if(err){
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("players: ", res);
        result(null, res);
    });
};

Players.updateById = (id, player, result) => {
    sql.query(
        "UPDATE players SET name = ?, last_name = ?, free_agent = ? WHERE id = ?",
        [player.name, player.last_name, player.free_agent, id],
        (err, res) => {
            if(err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            if(res.affectedRows == 0){
                //not found Player with the id
                result({kind: "not_found"}, null);
                return;
            }

            console.log("updated player: ", { id: id, ...player});
            result(null, { id: id, ...player });
        }
    );
};

Player.remove = (id, result) => {
    sql.query("DELETE FROM players WHERE id = ?", id, (err, res) => {
        if(err){
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if(res.affectedRows == 0){
            //not found Player with the id
            result({ kind: "not_found"}, null);
            return;
        }

        console.log("deleted player with id: ", id);
        result(null, res);
    });
};

Player.removeAll = result => {
    sql.query("DELETE FROM players", (err, res) => {
        if(err){
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log(`deleted ${res.affectedRows} players`);
        result(null, res);
    });
};

module.exports = Player;
