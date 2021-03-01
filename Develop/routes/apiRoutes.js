var db = require("../db/db.json");

module.exports = function(app){
    // GET `/api/notes` - Should read the `db.json` file and return all saved notes as JSON.    
    app.get("/api/notes", function (req, res) {
       console.log(db);
        //res.json(db);
    });

    // POST `/api/notes` - Should receive a new note to save on the request body, add it to the `db.json` file, and then return the new note to the client.
    app.post("/api/notes", function (req, res) {
        var newNote = req.body;
        for (var i = 0; i < db.length; i++) {
            console.log(db[i]);
            
        }
    });

    // DELETE `/api/notes/:id` - Should receive a query parameter containing the id of a note to delete. This means you'll need to find a way to give each note a unique `id` when it's saved. In order to delete a note, you'll need to read all notes from the `db.json` file, remove the note with the given `id` property, and then rewrite the notes to the `db.json` file.
    app.delete('/api/notes/:id', function (req, res) {
        //
    });
}


