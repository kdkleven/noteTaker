//Require path to send files 
var path = require("path");

module.exports = function (app) {
    // return the `notes.html` file.
    app.get("/notes", function (req, res) {
        res.sendFile(path.join(__dirname, "../public/notes.html"));
    });

    // return the `index.html` file
    app.get("*", function (req, res) {
        res.sendFile(path.join(__dirname, "../public/index.html"));
    });
};


