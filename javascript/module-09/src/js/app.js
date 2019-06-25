'use strict';

const PRIORITY_TYPES = {
  LOW: 0,
  NORMAL: 1,
  HIGH: 2,
};

const ICON_TYPES = {
  EDIT: 'edit',
  DELETE: 'delete',
  ARROW_DOWN: 'expand_more',
  ARROW_UP: 'expand_less',
};

const NOTE_ACTIONS = {
  DELETE: 'delete-note',
  EDIT: 'edit-note',
  INCREASE_PRIORITY: 'increase-priority',
  DECREASE_PRIORITY: 'decrease-priority',
};

const initialNotes = [
  {
    id: 'id-1',
    title: 'JavaScript essentials',
    body:
      'Get comfortable with all basic JavaScript concepts: variables, loops, arrays, branching, objects, functions, scopes, prototypes etc',
    priority: PRIORITY_TYPES.HIGH,
  },
  {
    id: 'id-2',
    title: 'Refresh HTML and CSS',
    body:
      'Need to refresh HTML and CSS concepts, after learning some JavaScript. Maybe get to know CSS Grid and PostCSS, they seem to be trending.',
    priority: PRIORITY_TYPES.NORMAL,
  },
  {
    id: 'id-3',
    title: 'Get comfy with Frontend frameworks',
    body:
      'First should get some general knowledge about frameworks, then maybe try each one for a week or so. Need to choose between React, Vue and Angular, by reading articles and watching videos.',
    priority: PRIORITY_TYPES.NORMAL,
  },
  {
    id: 'id-4',
    title: 'Winter clothes',
    body:
      "Winter is coming! Need some really warm clothes: shoes, sweater, hat, jacket, scarf etc. Maybe should get a set of sportwear as well so I'll be able to do some excercises in the park.",
    priority: PRIORITY_TYPES.LOW,
  },
];

// NOTEPAD CLASS
class Notepad {
  constructor(notes = []) {
    this._notes = notes;
  }

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
    if (note.id === id) {
      this._notes.splice(this._notes.indexOf(note), 1);
    }
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
// STATIC CLASS PROP NOT SUPPORTED BY FIREFOX CAUSE DONE THIS:
Notepad.Priority = {
  LOW: 0,
  NORMAL: 1,
  HIGH: 2,
};

// HOMEWORK TASKS
const notepad = new Notepad(initialNotes);

// DOM ELEMENTS
const noteList = document.querySelector('.note-list');
const form = document.querySelector('.note-editor');
const searchForm = document.querySelector('.search-form');
const formTitleInput = document.querySelector('input[name="note_title"]');
const formBodyInput = document.querySelector('textarea[name="note_body"]');

// GENERATE UNIQUE ID FUNCTION
const generateUniqueId = () =>
  Math.random()
    .toString(36)
    .substring(2, 15) +
  Math.random()
    .toString(36)
    .substring(2, 15);

// CREATE ACTION BUTTON FUNCTION
const createActionButton = () => {
  const actionBtn = document.createElement('button');
  actionBtn.classList.add('action');

  return actionBtn;
};

// CREATE NOTE CONTENT FUNCTION
const createNoteContent = note => {
  // CREATE DIV with NOTE CONTENT class
  const noteContentDiv = document.createElement('div');
  noteContentDiv.classList.add('note__content');

  // CREATE NOTE TITLE
  const noteTitle = document.createElement('h2');
  noteTitle.classList.add('note__title');
  noteTitle.textContent = note.title;

  // CREATE NOTE BODY
  const noteBody = document.createElement('p');
  noteBody.classList.add('note__body');
  noteBody.textContent = note.body;

  // APPENDING TO NOTE CONTENT
  noteContentDiv.appendChild(noteTitle);
  noteContentDiv.appendChild(noteBody);

  return noteContentDiv;
};

// CREATE NOTE FOOTER FUNCTION
const createNoteFooter = note => {
  // CREATE NOTE FOOTER
  const noteFooter = document.createElement('footer');
  noteFooter.classList.add('note__footer');

  // CREATE NOTE EXPAND SECTION
  const noteExpandSection = document.createElement('section');
  noteExpandSection.classList.add('note__section');

  // CREATE DECREASE PRIORITY ACTION BUTTON
  const decreasePriorBtn = createActionButton();
  decreasePriorBtn.dataset.action = NOTE_ACTIONS.DECREASE_PRIORITY;

  // CREATE MORE ICON
  const moreIcon = document.createElement('i');
  moreIcon.classList.add('material-icons', 'action__icon');
  moreIcon.textContent = ICON_TYPES.ARROW_DOWN;

  // CREATE INCREASE PRIORITY ACTION BUTTON
  const increasePriorBtn = createActionButton();
  increasePriorBtn.dataset.action = NOTE_ACTIONS.INCREASE_PRIORITY;

  // CREATE LESS ICON
  const lessIcon = document.createElement('i');
  lessIcon.classList.add('material-icons', 'action__icon');
  lessIcon.textContent = ICON_TYPES.ARROW_UP;

  // CREATE NOTE PRIORITY SPAN
  const notePrioritySpan = document.createElement('span');
  notePrioritySpan.classList.add('note__priority');
  notePrioritySpan.textContent = 'Priority: Low';

  // CREATE NOTE EDIT SECTION
  const noteEditSection = document.createElement('section');
  noteEditSection.classList.add('note__section');

  // CREATE EDIT BUTTON
  const editBtn = createActionButton();
  editBtn.dataset.action = NOTE_ACTIONS.EDIT;

  // CREATE EDIT ICON
  const editIcon = document.createElement('i');
  editIcon.classList.add('material-icons', 'action__icon');
  editIcon.textContent = ICON_TYPES.EDIT;

  // CREATE DELETE BUTTON
  const deleteBtn = createActionButton();
  deleteBtn.dataset.action = NOTE_ACTIONS.DELETE;

  // CREATE DELETE ICON
  const deleteIcon = document.createElement('i');
  deleteIcon.classList.add('material-icons', 'action__icon');
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
  const listItem = document.createElement('li');
  listItem.classList.add('note-list__item');
  listItem.dataset.id = note.id;

  // CREATE DIV with NOTE class
  const noteDiv = document.createElement('div');
  noteDiv.classList.add('note');

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
const renderNoteList = (listRef, notes) => {
  const listItems = notes.map(note => createListItem(note));

  listRef.innerHTML = '';
  listRef.append(...listItems);
};

// CREATE RENDER NOTE LIST WITH NEW ITEM FUNCTION
const addListItem = (listRef, note) => {
  const listItem = createListItem(note);

  listRef.append(listItem);
};

// RENDER NOTE LIST
renderNoteList(noteList, notepad.notes);

// CREATE REMOVE LIST ITEM FUNCTION
const removeListItem = target => {
  const deletedListItem = target.closest('li');
  notepad.deleteNote(deletedListItem.dataset.id);
  deletedListItem.remove();
};

// HANDLERS
const handleFormSubmit = event => {
  event.preventDefault();
  const noteObj = {};

  if (formTitleInput.value === '' || formBodyInput.value === '') {
    return alert('Необходимо заполнить все поля!');
  }

  noteObj.id = generateUniqueId();
  noteObj.title = formTitleInput.value;
  noteObj.body = formBodyInput.value;
  noteObj.priority = Notepad.Priority.LOW;

  notepad.saveNote(noteObj);
  form.reset();

  addListItem(noteList, noteObj);
};

const handleDeleteNote = event => {
  if (event.target.nodeName === 'I' && event.target.closest('button').dataset.action === 'delete-note') {
    removeListItem(event.target);
    console.log(notepad.notes);
  }
};

const handleFilterNotes = event => {
  if(event.target.nodeName !== 'INPUT') return;
  const input = event.target;
  
  const filteredItems = notepad.filterNotesByQuery(input.value.trim());
  renderNoteList(noteList, filteredItems);
}

// EVENT LISTENERS
form.addEventListener('submit', handleFormSubmit);
noteList.addEventListener('click', handleDeleteNote);
searchForm.addEventListener('input', handleFilterNotes);