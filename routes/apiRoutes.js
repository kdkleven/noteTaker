var db = require('../db/db.json');
var fs = require('fs');

module.exports = function(app){
    // GET `/api/notes` - Should read the `db.json` file and return all saved notes as JSON.    
    app.get('/api/notes', function (req, res) {
        // fs.readFile(`${__dirname}/db.json`, (err, req) => {
        //     if (err) {
        //       res.writeHead(500, { 'Content-Type': 'text/json' });
        //       res.end();
        //     } else {
        //       // We then respond to the client with the HTML page by specifically telling the browser that we are delivering
        //       // an html file.
        //       res.writeHead(200, { 'Content-Type': 'text/json' });
        //       res.end();
        //     }
        //   });
        res.json(db);
        console.log("app.get");
        res.end();
    });

    // POST `/api/notes` - Should receive a new note to save on the request body, add it to the `db.json` file, and then return the new note to the client.
    app.post('/api/notes', function (req, res) {
        console.log("This is /api/notes.post");
        // fs.writeFile(`${__dirname}/db.json`, 'utf8', (err) => {
        //     if (err) throw err;
        //     console.log('Note has been saved');
        // });        
        // res.json(true);
        console.log("app.post");
        res.push(db);
        res.end();
    });

    // DELETE `/api/notes/:id` - Should receive a query parameter containing the id of a note to delete. This means you'll need to find a way to give each note a unique `id` when it's saved. In order to delete a note, you'll need to read all notes from the `db.json` file, remove the note with the given `id` property, and then rewrite the notes to the `db.json` file.
    app.delete('/api/notes/:id', function (req, res) {
        console.log("This is /api/notes/:id");
        res.send('Note deleted');

    });
};


