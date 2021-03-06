// require db (to access the json file)
const db = require('../db/db.json');
// require uuid (used to generate a unique id for each note)
const { v4: uuidv4 } = require('uuid');
// require fs to read and write to the file
const fs = require('fs');
const { json } = require('express');

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

    // Receive a new note to save on the request body, add it to the `db.json` file, and then return the new note to the client.
    app.post('/api/notes', function (req, res) {
        // declare variable that contains a unique/random alphanumeric string
         const id = uuidv4();
        // read the json file
        return fs.readFile(`./db/db.json`, (err, data) => {
            //declare a variable that parses the read data
            const json = JSON.parse(data);
            // set a new key in the note with the random id
            req.body.id = id;
            console.log(req.body);
            // update the existing note data with the id
            json.push(req.body);
            // write the updated note data to the json file, and clean up the json format
            fs.writeFile(`./db/db.json`, JSON.stringify(json, null, 1), (err) => {
                if (err) throw err;
                // end the response
            });
            res.send("A new note has been created");
        });
    });

    // Receive a query parameter containing the id of a note to delete.
    app.delete('/api/notes/:id', (req, res) => {
        
        fs.readFile(`./db/db.json`, (err, data) => {
            if (err) throw err;
            const update = data.filter(note => note.id !== req.params.id);
            console.log(update);
            // fs.writeFile(`./db/db.json`, JSON.stringify(update, null, 1), (err) => {
            //     if (err) throw err;
            //     console.log("write end");
            //     res.send("Deleted record with ID "+ req.params.id);
            //     console.log("Deleted record with ID "+ req.params.id)
            // });   

        });
        
    });
};
