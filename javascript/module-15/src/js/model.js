export default class Notepad {
  constructor(notes = []) {
    this._notes = notes;
  }

  static Priority = {
    LOW: 0,
    NORMAL: 1,
    HIGH: 2
  };

  findNoteById(id) {
    for (const note of this._notes) {
      if (note.id === id) return note;
    }
  }

  saveNote(note) {
    this._notes.push(note);
    return note;
  }

  deleteNote(id) {
    const note = this.findNoteById(id);
    this._notes.splice(this._notes.indexOf(note), 1);
  }

  updateNoteContent(id, updatedContent) {
    const note = this.findNoteById(id);
    Object.assign(note, updatedContent);
    return note;
  }

  updateNotePriority(id, priority) {
    const note = this.findNoteById(id);
    note.priority = priority;
    return note;
  }

  filterNotesByQuery(query) {
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
    return notesFilteredByQuery;
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
