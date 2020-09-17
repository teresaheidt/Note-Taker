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

// sets routers
const htmlRoutes = require("./routes/view");
const apiRoutes = require("./routes/api");

// Set up body parsing and static
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// Set up route middleware
app.use("/api", apiRoutes);
app.use(require("./routes/view"))
app.use("/", htmlRoutes);

// LISTENER
app.listen(PORT, function() {
    console.log("The Note Server is listening... " + PORT);
  });