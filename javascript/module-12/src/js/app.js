import { NOTIFICATION_MESSAGES, SHORTID } from "./utils/constants";
import initialNotes from "../assets/notes.json";
import Notepad from "./notepad-model";
import { domRefs, findParentNode, createNoteListItems } from "./view";
import storage from "./storage";
import MicroModal from "micromodal";
import { Notyf } from "notyf";
import "notyf/notyf.min.css";

// INIT NOTEPAD WITH INITIAL NOTES OR STORAGE NOTES

const storageNotes = storage.load("notes");
const initNotes = storageNotes ? storageNotes : initialNotes;

const notepad = new Notepad(initNotes);

// INIT NOTYF
const notyf = new Notyf();

// HANDLERS
const handleFormSubmit = event => {
  event.preventDefault();
  const noteObj = {};

  if (
    domRefs.formTitleInput.value === "" ||
    domRefs.formBodyInput.value === ""
  ) {
    return notyf.error(`${NOTIFICATION_MESSAGES.EDITOR_FIELDS_EMPTY}`);
  }

  noteObj.id = SHORTID.generate();
  noteObj.title = domRefs.formTitleInput.value;
  noteObj.body = domRefs.formBodyInput.value;
  noteObj.priority = Notepad.Priority.LOW;

  notepad.saveNote(noteObj)
    .then(savedNote => {
      storage.save("notes", notepad.notes);
      storage.remove("new-note-title");
      storage.remove("new-note-body");
      domRefs.form.reset();

      const markup = createNoteListItems(notepad.notes);
      domRefs.noteList.innerHTML = markup;
       // NOTYF
      notyf.success(`${NOTIFICATION_MESSAGES.NOTE_ADDED_SUCCESS}`);
      // MICROMODAL
      MicroModal.close("note-editor-modal");
  });
};

const handleDeleteNote = event => {
  if (
    event.target.nodeName === "I" &&
    event.target.closest("button").dataset.action === "delete-note"
  ) {
    const parentNode = findParentNode(event.target);

    notepad.deleteNote(parentNode.dataset.id)
      .then(() => {
        storage.save("notes", notepad.notes);

        const markup = createNoteListItems(notepad.notes);
        domRefs.noteList.innerHTML = markup;

        notyf.success(`${NOTIFICATION_MESSAGES.NOTE_DELETED_SUCCESS}`);
    })
  }
};

const handleFilterNotes = event => {
  const input = event.target;

  notepad.filterNotesByQuery(input.value.trim())
    .then(filteredItems => {
      const markup = createNoteListItems(filteredItems);
      domRefs.noteList.innerHTML = markup;
    })
};

const handleOpenModal = () => MicroModal.show("note-editor-modal");

const handleKeyNewNote = event => {
  const [title, body] = domRefs.form.elements;
  if (event.target === title) {
    storage.save("new-note-title", title.value);
  }

  if (event.target === body) {
    storage.save("new-note-body", body.value);
  }
};

// EVENT LISTENERS
domRefs.form.addEventListener("submit", handleFormSubmit);
domRefs.noteList.addEventListener("click", handleDeleteNote);
domRefs.searchForm.addEventListener("input", handleFilterNotes);
domRefs.openModalButton.addEventListener("click", handleOpenModal);
domRefs.form.addEventListener("keyup", handleKeyNewNote);

// CREATE AND RENDER NOTES
const markup = createNoteListItems(notepad.notes);
domRefs.noteList.innerHTML = markup;

// RENDER FORM WITH STORAGE DATA
const storageNoteTitle = storage.load("new-note-title");
const storageNoteBody = storage.load("new-note-body");

if (storageNoteTitle || storageNoteBody) {
  domRefs.form.elements[0].value = storageNoteTitle;
  domRefs.form.elements[1].value = storageNoteBody;
}
