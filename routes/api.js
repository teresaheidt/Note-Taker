// router and store variables to attain serverside info for frontend
const router = require("express").Router();
const store = require("../db/notes");

// GET "/api/notes" responds with all notes from the database
router.get("/notes", function(req, res) {
  store
    .getAllNotes()
    .then(notes => res.json(notes))
    .catch(err => res.status(500).json(err));
});

// post notes on the backend
router.post("/notes", (req, res) => {
  store
    .addNote(req.body)
    .then((note) => res.json(note))
    .catch(err => res.status(500).json(err));
});

// DELETE "/api/notes" deletes the note with an id equal to req.params.id
router.delete("/notes/:id", function(req, res) {
  store
  // we get this from the front end
    .deleteNote(req.params.id)
    .then(() => res.json({ ok: true }))
    .catch(err => res.status(500).json(err));
});


module.exports = router;
