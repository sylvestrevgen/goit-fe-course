import "./sass/main.scss";
import { domRefs, renderNoteList } from "./js/view";
import { notepad, handleFormSubmit, handleDeleteNote, handleFilterNotes } from "./js/app";

// RENDER NOTE LIST
renderNoteList(domRefs.noteList, notepad.notes);

// EVENT LISTENERS
domRefs.form.addEventListener("submit", handleFormSubmit);
domRefs.noteList.addEventListener("click", handleDeleteNote);
domRefs.searchForm.addEventListener("input", handleFilterNotes);