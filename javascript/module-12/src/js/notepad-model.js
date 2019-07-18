export default class Notepad {
  static Priority = {
    LOW: 0,
    NORMAL: 1,
    HIGH: 2
  };

  constructor(notes = []) {
    this._notes = notes;
  }

  findNoteById(id) {
    for (const note of this._notes) {
      if (note.id === id) return note;
    }
  }

  saveNote(note) {
    return new Promise(resolve => {
      setTimeout(() => {
        this._notes.push(note);
        resolve(note);
      }, 300);
    });
  }

  deleteNote(id) {
    return new Promise(resolve => {
      setTimeout(() => {
        const note = this.findNoteById(id);
        if (note.id === id) {
          resolve(this._notes.splice(this._notes.indexOf(note), 1));
        }
      }, 300);
    });
  }

  updateNoteContent(id, updatedContent) {
    const note = this.findNoteById(id);
    if (note.id === id) {
      Object.assign(note, updatedContent);
      return note;
    }
  }

  updateNotePriority(id, priority) {
    const note = this.findNoteById(id);
    if (note.id === id) {
      note.priority = priority;
      return note;
    }
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

  set notes(newNotes) {
    this._notes = newNotes;
    return this._notes;
  }
}
