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

    // Receive a new note to save on the request body, add it to the `db.json` file, and then return the new note to the client.
    app.post('/api/notes', function (req, res) {
        // read the json file
        fs.readFile(`./db/db.json`, (err, data) => {
            //declare a variable that parses the read data
            const json = JSON.parse(data);
            // declare variable that contains a unique/random alphanumeric string
            const id = uuidv4();
            // set a new key in the note with the random id
            const rb = req.body;
            rb.id = id;
            // update the existing note data with the id
            json.push(req.body);
            console.log("Pushed JSON:");
            console.log(json);
            // write the updated note data to the json file, and clean up the json format
            fs.writeFile(`./db/db.json`, JSON.stringify(json, null, 1), (err) => {
                if (err) throw err;
                // end the response
                res.end();
            });
            res.end();
        });
    });

    // Receive a query parameter containing the id of a note to delete.
    app.delete('/api/notes/:id', function (req, res) {
        console.log("req:");
        console.log(req.params); 
        
        fs.readFile(`./db/db.json`, (err, data) => {
            //declare a variable that parses the read data
            console.log("data:");
            console.log(data);
            const json = JSON.parse(data);
            console.log("parsed json:");
            console.log(json);
            console.log("req.params.id:");
            console.log(req.params.id);          
            
            // declare a variable that searches through each item in the note array and locates the matching value          
            const index = db.filter(note => note.id !== req.params.id);
            console.log("index:");
            console.log(index);                
            // update the array with the remaining notes sans deleted note
            
            // write the updated note data to the json file, and clean up the json format
            fs.writeFile(`./db/db.json`, JSON.stringify(index, null, 1), (err) => {
                if (err) throw err;
                console.log("Note deleted");
                // end the response
                res.end();
            });
            res.end();
        });
    });

};
