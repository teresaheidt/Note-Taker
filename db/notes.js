const util = require("util")

const fs = require("fs")

const { v4: uuidv4 } = require("uuid")

const readFileAsync = util.promisify(fs.readFile); 
const writeFileAsync = util.promisify(fs.writeFile);

class Notes {
    read() {
        return readFileAsync("db/db.json", "utf-8")
    }
    write(note) {
        return writeFileAsync("db/db.json", JSON.stringify(note))
    }
    getAllNotes() {
        return this.read().then(function(notes){
            let notesData = [];
            try {
                notesData = notesData.concat(JSON.parse(notes))
            } catch (error) {
                notesData = []
            }
            return notesData;
        })
    }

    addNote(note) {
      const {title, text} = note;

      if(!title || !text) {
          throw new Error("Note cannot be blank")
      }

      const newNote = {
          title, text, id: uuidv4()
      } 
      console.log(newNote);
      
        return this.getAllNotes()
        .then(notesData => [...notesData, newNote])
        .then(newNoteArray => this.write(newNoteArray))
        .then(() => newNote);
    }
    deleteNote(id) {
        return this.getAllNotes()
        .then(notesData => notesData.filter((note) => note.id !== id))
        .then(filteredNotes => this.write(filteredNotes))
    }

}

module.exports = new Notes();