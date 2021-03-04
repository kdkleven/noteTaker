var db = require('../db/db.json');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');


module.exports = function(app){
    // GET `/api/notes` - Should read the `db.json` file and return all saved notes as JSON.    
    app.get('/api/notes', function (req, res) {
                    
        return fs.readFile(`./db/db.json`, (err, data) => {
            if (err) throw err;
            res.writeHead(200, { 'Content-Type': 'text/json' });
            res.write(data);
            res.end();
        });
    });

    // POST `/api/notes` - Should receive a new note to save on the request body, add it to the `db.json` file, and then return the new note to the client.
    app.post('/api/notes', function (req, res) {
        const note = req.body;
        const id = uuidv4(note);
        console.log(id);

        return fs.readFile(`./db/db.json`, (err, data) => {    
            const json = JSON.parse(data);
            console.log("read");
            console.log(json);
            //json.splice(0, 0, id);
            json.map(function(e) {
                var o = Object.assign({}, e);
                o.id = id;
                return o;
              });
            
              json.push(note);
            
            
              

            fs.writeFile(`./db/db.json`, JSON.stringify(json, null, 1), (err) => {
                if (err) throw err;
                console.log("write");
                console.log(json);
            });
            res.end();
        });
    });

    // DELETE `/api/notes/:id` - Should receive a query parameter containing the id of a note to delete. This means you'll need to find a way to give each note a unique `id` when it's saved. In order to delete a note, you'll need to read all notes from the `db.json` file, remove the note with the given `id` property, and then rewrite the notes to the `db.json` file.
    app.delete('/api/notes/:id', function (req, res) {
        
        console.log(uuidv4());
        res.send('Note deleted');

    });
};


