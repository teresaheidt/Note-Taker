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
const PORT = process.env.PORT || 5000;

const htmlRoutes = require("./routes/view");

const apiRoutes = require("./routes/api");

// Set up body parsing, static, and route middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/api", apiRoutes);

app.use(require("./routes/view"))

app.use("/", htmlRoutes);


app.delete("/api/notes/:id", function(req, res) {
  try {
    //  reads the json file
    notesData = fs.readFileSync("./db/db.json", "utf8");
    // parse the data to get an array of the objects
    notesData = JSON.parse(notesData);
    // delete the old note from the array on note objects
    notesData = notesData.filter(function(note) {
      return note.id != req.params.id;
    });
    // make it string(stringify)so you can write it to the file
    notesData = JSON.stringify(notesData);
    // write the new notes to the file
    fs.writeFile("./db/db.json", notesData, "utf8", function(err) {
      // error handling
      if (err) throw err;
    });

    // change it back to an array of objects & send it back to the browser (client)
    res.send(JSON.parse(notesData));

    // error handling
  } catch (err) {
    throw err;
    console.log(err);
  }
});




// LISTENER
app.listen(PORT, function() {
    console.log("The Note Server is listening... " + PORT);
  });