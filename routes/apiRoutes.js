// require db (to access the json file)
const db = require('../db/db.json');
// require uuid (used to generate a unique id for each note)
const { v4: uuidv4 } = require('uuid');
// require fs to read and write to the file
const fs = require('fs');

module.exports = function (app) {
    // GET `/api/notes` - Should read the `db.json` file and return all saved notes as JSON.    
    app.get('/api/notes', function (req, res) {

        // read the json file
        fs.readFile(`./db/db.json`, (err, data) => {
            if (err) throw err;
            // write the header with status, type and format
            res.writeHead(200, { 'Content-Type': 'text/json' });
            // write data to the page
            res.write(data);
            // end the response
            res.end();
        });
    });

    // POST `/api/notes` - Should receive a new note to save on the request body, add it to the `db.json` file, and then return the new note to the client.
    app.post('/api/notes', function (req, res) {
        // read the json file
        fs.readFile(`./db/db.json`, (err, data) => {
            //declare a variable that parses the read data
            const json = JSON.parse(data);
            // declare variable that contains a unique/random alphanumeric string
            const id = uuidv4();
            // set a new key in the note with the random id
            req.body.id = id;
            // update the existing note data with the id
            json.push(req.body);
            // write the updated note data to the json file, and clean up the json format
            fs.writeFile(`./db/db.json`, JSON.stringify(json, null, 1), (err) => {
                if (err) throw err;
            });
            // end the response
            res.end();
        });
    });

    // DELETE `/api/notes/:id` - Should receive a query parameter containing the id of a note to delete. This means you'll need to find a way to give each note a unique `id` when it's saved. In order to delete a note, you'll need to read all notes from the `db.json` file, remove the note with the given `id` property, and then rewrite the notes to the `db.json` file.
    app.delete('/api/notes/:id', function (req, res) {     
        // declare a variable that searches through each item in the note array and locates the matching value 
        const compareNote = db.findIndex(note => note.id === req.params.id);       
        // delete the matched value based on the found index variable
        db.splice(compareNote, 1);
        // write the updated array (sans matched index) to the json file
        fs.writeFile(`./db/db.json`, JSON.stringify(db, null, 1), (err) => {
            if (err) throw err;
        });
        //end the response        
        res.end();
    });
};
