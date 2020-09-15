const router = require("express").Router();
const store = require("../db/notes");

// GET "/api/notes" responds with all notes from the database
router.get("/notes", function(req, res) {
  store
    .getAllNotes()
    .then(notes => res.json(notes))
    .catch(err => res.status(500).json(err));
});

router.post("/notes", (req, res) => {
  store
    .addNote(req.body)
    .then((note) => res.json(note))
    .catch(err => res.status(500).json(err));
});

// DELETE "/api/notes" deletes the note with an id equal to req.params.id
router.delete("/api/notes/:id", function(req, res) {
  store
    .removeNote(req.params.id)
    .then(() => res.json({ ok: true }))
    .catch(err => res.status(500).json(err));
});


     //updates the json file whenever a note is added or deleted
     function updateDb() {
      fs.writeFile("db/db.json",JSON.stringify(notes,'\t'),err => {
          if (err) throw err;
          return true;
      });
  }

module.exports = router;
