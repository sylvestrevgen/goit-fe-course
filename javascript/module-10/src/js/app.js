import { PRIORITY_TYPES, ICON_TYPES, NOTE_ACTIONS, SHORTID } from "./utils/constants";
import initialNotes from "../assets/notes.json";
import Notepad from "./notepad-model";
import { domRefs, renderNoteList, addListItem } from "./view";

export const notepad = new Notepad(initialNotes);

// CREATE REMOVE LIST ITEM FUNCTION
export const removeListItem = target => {
  const deletedListItem = target.closest("li");
  notepad.deleteNote(deletedListItem.dataset.id);
  deletedListItem.remove();
};

// HANDLERS
export const handleFormSubmit = event => {
  event.preventDefault();
  const noteObj = {};

  if (domRefs.formTitleInput.value === "" || domRefs.formBodyInput.value === "") {
    return alert("Необходимо заполнить все поля!");
  }

  noteObj.id = SHORTID.generate();
  noteObj.title = domRefs.formTitleInput.value;
  noteObj.body = domRefs.formBodyInput.value;
  noteObj.priority = Notepad.Priority.LOW;

  notepad.saveNote(noteObj);
  domRefs.form.reset();

  addListItem(domRefs.noteList, noteObj);
};

export const handleDeleteNote = event => {
  if (
    event.target.nodeName === "I" &&
    event.target.closest("button").dataset.action === "delete-note"
  ) {
    removeListItem(event.target);
    console.log(notepad.notes);
  }
};

export const handleFilterNotes = event => {
  const input = event.target;

  const filteredItems = notepad.filterNotesByQuery(input.value.trim());
  renderNoteList(domRefs.noteList, filteredItems);
};