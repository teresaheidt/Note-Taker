// dependencies
// ===================================================
// need EXPRESS to interact with the front end
const express = require("express");
// need PATH for filename paths
const path = require("path");
// need FS to read and write to files
const fs = require("fs");
// creating an "express" SERVER
const app = express();
// Sets an Initial PORT for listeners
const PORT = process.env.PORT || 3000;

//  Initialize notesData


// Set up body parsing, static, and route middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// Basic route that sends the user first to the AJAX Page
app.use(require("./T-Best-Note-Taker/routes/view"))

app.get("/api/notes", function(req, res) {
  return res.json(notes);
});




// write new note to JSON file 
app.post("/api/notes/", function(err, res) {
  try {
    notesData = fs.readFileSync(".db/db.json", "utf-8");
    console.log("important");
    notesData = JSON.parse(notesData);
  } catch (err) {
    console.log("\n error (in app.get.catch):");
    console.log(err);
  } res.json(notesData);
})

// LISTENER
app.listen(PORT, function() {
    console.log("The Note Server is listening... " + PORT);
  });