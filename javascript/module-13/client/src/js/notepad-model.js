import * as api from "./services/api";

export default class Notepad {
  static Priority = {
    LOW: 0,
    NORMAL: 1,
    HIGH: 2
  };

  constructor(notes = []) {
    this._notes = notes;
  }

  getNotes() {
    return api.getNotes().then(notes => {
      this._notes = notes;

      return this._notes;
    });
  }

  findNoteById(id) {
    for (const note of this._notes) {
      if (note.id === id) return note;
    }
  }

  saveNote(note) {
    return api.saveNote(note).then(savedNote => {
      this._notes.push(savedNote);

      return savedNote;
    });
  }

  deleteNote(id) {
    return api.deleteNote(id).then(() => {
      this._notes = this._notes.filter(note => note.id !== id);

      return id;
    });
  }

  updateNoteContent(id, updatedContent) {
    return api.updateNote(id, updatedContent).then(updatedNote => {
      const note = this.findNoteById(id);
      Object.assign(note, updatedNote);

      return updatedNote;
    });
  }

  updateNotePriority(id, newPriority) {
    return api.updateNote(id, newPriority).then(updatedNote => {
      const note = this.findNoteById(id);
      note.priority = updatedNote.priority;
    
      return note;
    });
  }

  filterNotesByQuery(query) {
    return new Promise(resolve => {
      setTimeout(() => {
        query = query.toLowerCase();
        const notesFilteredByQuery = [];
        for (const note of this._notes) {
          if (
            note.title.toLowerCase().includes(query) ||
            note.body.toLowerCase().includes(query)
          ) {
            notesFilteredByQuery.push(note);
          }
        }
        resolve(notesFilteredByQuery);
      }, 300);
    });
  }

  filterNotesByPriority(priority) {
    const notesFilteredByPriority = [];
    for (const note of this._notes) {
      if (note.priority === priority) {
        notesFilteredByPriority.push(note);
      }
    }
    return notesFilteredByPriority;
  }

  get notes() {
    return this._notes;
  }
}
