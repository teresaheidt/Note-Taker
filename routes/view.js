const router = require("express").Router()
const path = require("path")

// other routes respond to the index.html 
router.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "index.html"));
  });

// notes correspondes with the notes.html file
router.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "notes.html"));
  });

  module.exports = router;