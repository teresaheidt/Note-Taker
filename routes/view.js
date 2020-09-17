// variable set for the path and express to run the app
const router = require("express").Router()
const path = require("path")

// notes correspondes with the notes.html file
router.get("/notes", function(req, res) {
  res.sendFile(path.join(__dirname, "../public/notes.html"));
});

// other routes respond to the index.html 
router.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/index.html"));
  });

  module.exports = router;