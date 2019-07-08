import { PRIORITY_TYPES, ICON_TYPES, NOTE_ACTIONS } from "./utils/constants";

// DOM ELEMENTS REFS
export const domRefs = {
  noteList: document.querySelector(".note-list"),
  form: document.querySelector(".note-editor"),
  searchForm: document.querySelector(".search-form"),
  formTitleInput: document.querySelector('input[name="note_title"]'),
  formBodyInput: document.querySelector('textarea[name="note_body"]'),
}

// CREATE ACTION BUTTON FUNCTION
const createActionButton = () => {
  const actionBtn = document.createElement("button");
  actionBtn.classList.add("action");

  return actionBtn;
};

// CREATE NOTE CONTENT FUNCTION
const createNoteContent = note => {
  // CREATE DIV with NOTE CONTENT class
  const noteContentDiv = document.createElement("div");
  noteContentDiv.classList.add("note__content");

  // CREATE NOTE TITLE
  const noteTitle = document.createElement("h2");
  noteTitle.classList.add("note__title");
  noteTitle.textContent = note.title;

  // CREATE NOTE BODY
  const noteBody = document.createElement("p");
  noteBody.classList.add("note__body");
  noteBody.textContent = note.body;

  // APPENDING TO NOTE CONTENT
  noteContentDiv.appendChild(noteTitle);
  noteContentDiv.appendChild(noteBody);

  return noteContentDiv;
};

// CREATE NOTE FOOTER FUNCTION
const createNoteFooter = note => {
  // CREATE NOTE FOOTER
  const noteFooter = document.createElement("footer");
  noteFooter.classList.add("note__footer");

  // CREATE NOTE EXPAND SECTION
  const noteExpandSection = document.createElement("section");
  noteExpandSection.classList.add("note__section");

  // CREATE DECREASE PRIORITY ACTION BUTTON
  const decreasePriorBtn = createActionButton();
  decreasePriorBtn.dataset.action = NOTE_ACTIONS.DECREASE_PRIORITY;

  // CREATE MORE ICON
  const moreIcon = document.createElement("i");
  moreIcon.classList.add("material-icons", "action__icon");
  moreIcon.textContent = ICON_TYPES.ARROW_DOWN;

  // CREATE INCREASE PRIORITY ACTION BUTTON
  const increasePriorBtn = createActionButton();
  increasePriorBtn.dataset.action = NOTE_ACTIONS.INCREASE_PRIORITY;

  // CREATE LESS ICON
  const lessIcon = document.createElement("i");
  lessIcon.classList.add("material-icons", "action__icon");
  lessIcon.textContent = ICON_TYPES.ARROW_UP;

  // CREATE NOTE PRIORITY SPAN
  const notePrioritySpan = document.createElement("span");
  notePrioritySpan.classList.add("note__priority");
  notePrioritySpan.textContent = "Priority: Low";

  // CREATE NOTE EDIT SECTION
  const noteEditSection = document.createElement("section");
  noteEditSection.classList.add("note__section");

  // CREATE EDIT BUTTON
  const editBtn = createActionButton();
  editBtn.dataset.action = NOTE_ACTIONS.EDIT;

  // CREATE EDIT ICON
  const editIcon = document.createElement("i");
  editIcon.classList.add("material-icons", "action__icon");
  editIcon.textContent = ICON_TYPES.EDIT;

  // CREATE DELETE BUTTON
  const deleteBtn = createActionButton();
  deleteBtn.dataset.action = NOTE_ACTIONS.DELETE;

  // CREATE DELETE ICON
  const deleteIcon = document.createElement("i");
  deleteIcon.classList.add("material-icons", "action__icon");
  deleteIcon.textContent = ICON_TYPES.DELETE;

  // APPENDING TO NOTE FOOTER
  decreasePriorBtn.appendChild(moreIcon);
  increasePriorBtn.appendChild(lessIcon);

  noteExpandSection.append(
    decreasePriorBtn,
    increasePriorBtn,
    notePrioritySpan
  );

  editBtn.appendChild(editIcon);
  deleteBtn.appendChild(deleteIcon);

  noteEditSection.append(editBtn, deleteBtn);

  noteFooter.append(noteExpandSection, noteEditSection);

  return noteFooter;
};

//  CREATE LIST ITEM FUNCTION
const createListItem = note => {
  // CREATE LIST ITEM
  const listItem = document.createElement("li");
  listItem.classList.add("note-list__item");
  listItem.dataset.id = note.id;

  // CREATE DIV with NOTE class
  const noteDiv = document.createElement("div");
  noteDiv.classList.add("note");

  // ADD NOTE CONTENT
  const noteContent = createNoteContent(note);

  // ADD NOTE FOOTER
  const noteFooter = createNoteFooter(note);

  // APPENDING TO LIST ITEM
  noteDiv.append(noteContent, noteFooter);

  listItem.appendChild(noteDiv);

  return listItem;
};

// CREATE RENDER NOTE LIST FUNCTION
export const renderNoteList = (listRef, notes) => {
  const listItems = notes.map(note => createListItem(note));

  listRef.innerHTML = "";
  listRef.append(...listItems);
};

// CREATE RENDER NOTE LIST WITH NEW ITEM FUNCTION
export const addListItem = (listRef, note) => {
  const listItem = createListItem(note);

  listRef.append(listItem);
};