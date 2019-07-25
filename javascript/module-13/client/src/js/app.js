import { NOTIFICATION_MESSAGES } from "./utils/constants";
import initialNotes from "../assets/notes.json";
import Notepad from "./notepad-model";
import { domRefs, findParentNode, createNoteListItems, sortNotes } from "./view";
import storage from "./storage";
import MicroModal from "micromodal";
import { Notyf } from "notyf";
import "notyf/notyf.min.css";

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

  noteObj.title = domRefs.formTitleInput.value;
  noteObj.body = domRefs.formBodyInput.value;

  // SUBMIT EDITED NOTE
  if (domRefs.form.dataset.editedNoteId) {
    notepad
      .updateNoteContent(domRefs.form.dataset.editedNoteId, noteObj)
      .then(updatedNote => {
        storage.remove("new-note-title");
        storage.remove("new-note-body");
        domRefs.form.reset();
        domRefs.form.removeAttribute("data-edited-note-id");

        const markup = createNoteListItems(notepad.notes);
        domRefs.noteList.innerHTML = markup;
        // NOTYF
        notyf.success(`${NOTIFICATION_MESSAGES.NOTE_EDITED_SUCCESS}`);
        // MICROMODAL
        MicroModal.close("note-editor-modal");
      });
    return;
  }
  // 

  noteObj.priority = Notepad.Priority.LOW;

  notepad
    .saveNote(noteObj)
    .then(savedNote => {
      storage.remove("new-note-title");
      storage.remove("new-note-body");
      domRefs.form.reset();

      const markup = createNoteListItems(notepad.notes);
      domRefs.noteList.innerHTML = markup;
      // NOTYF
      notyf.success(`${NOTIFICATION_MESSAGES.NOTE_ADDED_SUCCESS}`);
      // MICROMODAL
      MicroModal.close("note-editor-modal");
    })
    .catch(error => notyf.error(`${error}`));
};

const handleDeleteNote = event => {
  if (
    event.target.nodeName === "I" &&
    event.target.closest("button").dataset.action === "delete-note"
  ) {
    const parentNode = findParentNode(event.target);

    notepad
      .deleteNote(parentNode.dataset.id)
      .then(() => {
        const markup = createNoteListItems(notepad.notes);
        domRefs.noteList.innerHTML = markup;

        notyf.success(`${NOTIFICATION_MESSAGES.NOTE_DELETED_SUCCESS}`);
      })
      .catch(error => notyf.error(`${error}`));
  }
};

const handleFilterNotes = event => {
  const input = event.target;

  notepad.filterNotesByQuery(input.value.trim()).then(filteredItems => {
    const markup = createNoteListItems(filteredItems);
    domRefs.noteList.innerHTML = markup;
  });
};

const handleOpenModal = () => {
  domRefs.form.reset();

  MicroModal.show("note-editor-modal");
};

const handleKeyNewNote = event => {
  const [title, body] = domRefs.form.elements;
  if (event.target === title) {
    storage.save("new-note-title", title.value);
  }

  if (event.target === body) {
    storage.save("new-note-body", body.value);
  }
};

const handleClickEditBtn = event => {
  if (
    event.target.nodeName === "I" &&
    event.target.closest("button").dataset.action === "edit-note"
  ) {
    MicroModal.show("note-editor-modal");
    const editedNote = notepad.findNoteById(
      event.target.closest("li").dataset.id
    );
    domRefs.form.elements[0].value = editedNote.title;
    domRefs.form.elements[1].value = editedNote.body;

    // TO HAVE ABILITY TO SUBMIT EDITED NOTE TO NOTEPAD.NOTES, ADD to FORM DATA ID EDITED NOTE
    domRefs.form.dataset.editedNoteId = editedNote.id;
  }
};

const handleEditPriority = event => {
  if(event.target.nodeName !== "I") return;

  const editedPriorNote = notepad.findNoteById(
    event.target.closest("li").dataset.id
  );

  switch (event.target.closest("button").dataset.action) {
    case "decrease-priority":
      if (editedPriorNote.priority === 0) return;
      if (editedPriorNote.priority === 1) {
        notepad
          .updateNotePriority(editedPriorNote.id, {
            priority: Notepad.Priority.LOW
          })
          .then(updatedNote => {
            const sortedNotes = sortNotes(notepad.notes);
            const markup = createNoteListItems(sortedNotes);
            domRefs.noteList.innerHTML = markup;
          });
      }
      if (editedPriorNote.priority === 2) {
        notepad
          .updateNotePriority(editedPriorNote.id, {
            priority: Notepad.Priority.NORMAL
          })
          .then(updatedNote => {
            const sortedNotes = sortNotes(notepad.notes);
            const markup = createNoteListItems(sortedNotes);
            domRefs.noteList.innerHTML = markup;
          });
      }

      break;
    case "increase-priority":
      if (editedPriorNote.priority === 2) return;
      if (editedPriorNote.priority === 1) {
        notepad
          .updateNotePriority(editedPriorNote.id, {
            priority: Notepad.Priority.HIGH
          })
          .then(updatedNote => {
            const sortedNotes = sortNotes(notepad.notes);
            const markup = createNoteListItems(sortedNotes);
            domRefs.noteList.innerHTML = markup;
          });
      }
      if (editedPriorNote.priority === 0) {
        notepad
          .updateNotePriority(editedPriorNote.id, {
            priority: Notepad.Priority.NORMAL
          })
          .then(updatedNote => {
            const sortedNotes = sortNotes(notepad.notes);
            const markup = createNoteListItems(sortedNotes);
            domRefs.noteList.innerHTML = markup;
          });
      }

      break;
    default:
      return;
  };
};


// EVENT LISTENERS
domRefs.form.addEventListener("submit", handleFormSubmit);
domRefs.noteList.addEventListener("click", handleDeleteNote);
domRefs.searchForm.addEventListener("input", handleFilterNotes);
domRefs.openModalButton.addEventListener("click", handleOpenModal);
domRefs.form.addEventListener("keyup", handleKeyNewNote);
domRefs.noteList.addEventListener("click", handleClickEditBtn);
domRefs.noteList.addEventListener("click", handleEditPriority);
// Remove edited note id attribute from form when we close form and anything submit
document.addEventListener("click", event => {
  if(event.target !== document.querySelector("[data-micromodal-close]")) return;
  
  domRefs.form.removeAttribute("data-edited-note-id");
});

// RENDER NOTES FROM BACKEND AND SORTED BY PRIORITY FROM HIGH TO LOW
notepad.getNotes().then(notes => {
  // SORTING
  const sortedNotes = sortNotes(notes);
  // 

  const markup = createNoteListItems(sortedNotes);
  domRefs.noteList.innerHTML = markup;
});

// RENDER FORM VALUES WITH STORAGE DATA
const storageNoteTitle = storage.load("new-note-title");
const storageNoteBody = storage.load("new-note-body");

if (storageNoteTitle || storageNoteBody) {
  domRefs.form.elements[0].value = storageNoteTitle;
  domRefs.form.elements[1].value = storageNoteBody;
}
