const router = require("express").Router();

const notes = require("./db.json");

// provides acces to utility functions
const util = require("util");

// enables interacting with file system
const fs = require("fs");

// generates ID
const { v4: uuidv4 } = require("uuid");

// converts a callback based function to a promised one
const readFileAsync = util.promisify(fs.readFile); 
const writeFileAsync = util.promisify(fs.writeFile);

// class declaration
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
// adding notes
    addNote(note) {
        const {title, text,} = note;

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
// remove the note
    deleteNote(id) {
        return this.getAllNotes()
        .then(notesData => notesData.filter((note) => note.id !== id))
        .then(filteredNotes => this.write(filteredNotes))
    }

}

module.exports = new Notes();