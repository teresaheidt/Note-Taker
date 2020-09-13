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
const PORT = 8000;

const htmlRoutes = require("./routes/view");

const apiRoutes = require("./routes/api");

// Set up body parsing, static, and route middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// Basic route that sends the user first to the AJAX Page


app.use("/api", apiRoutes);

app.use(require("./routes/view"))

// app.get("/api/notes", function(req, res) {
//   return res.json(notes);
// });

app.use("/", htmlRoutes);

// write new note to JSON file 

// LISTENER
app.listen(PORT, function() {
    console.log("The Note Server is listening... " + PORT);
  });