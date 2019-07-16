import { NOTIFICATION_MESSAGES, SHORTID } from "./utils/constants";
import initialNotes from "../assets/notes.json";
import Notepad from "./notepad-model";
import { domRefs, findParentNode, createNoteListItems } from "./view";
import MicroModal from 'micromodal';
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';
import noteTemplate from "../templates/note.hbs";

// INIT NOTEPAD
const notepad = new Notepad(initialNotes);

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

  notepad.saveNote(noteObj);
  domRefs.form.reset();

  // addListItem(domRefs.noteList, noteObj);
  const markup = createNoteListItems(notepad.notes);
  domRefs.noteList.innerHTML = markup;

  // NOTYF 
  notyf.success(`${NOTIFICATION_MESSAGES.NOTE_ADDED_SUCCESS}`)
  // MICROMODAL
  MicroModal.close('note-editor-modal');
};

const handleDeleteNote = event => {
  if (
    event.target.nodeName === "I" &&
    event.target.closest("button").dataset.action === "delete-note"
  ) {
    const parentNode = findParentNode(event.target);
    notepad.deleteNote(parentNode.dataset.id);
    parentNode.remove();
    notyf.success(`${NOTIFICATION_MESSAGES.NOTE_DELETED_SUCCESS}`);
  }
};

const handleFilterNotes = event => {
  const input = event.target;

  const filteredItems = notepad.filterNotesByQuery(input.value.trim());

  const markup = createNoteListItems(filteredItems);
  domRefs.noteList.innerHTML = markup;
};

const handleOpenModal = () => MicroModal.show('note-editor-modal');

// EVENT LISTENERS
domRefs.form.addEventListener("submit", handleFormSubmit);
domRefs.noteList.addEventListener("click", handleDeleteNote);
domRefs.searchForm.addEventListener("input", handleFilterNotes);
domRefs.openModalButton.addEventListener("click", handleOpenModal);

// CREATE AND RENDER NOTES
const markup = createNoteListItems(initialNotes);
domRefs.noteList.innerHTML = markup;
