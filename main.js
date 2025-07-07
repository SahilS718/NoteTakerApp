document.addEventListener("DOMContentLoaded", loadNotes);
document.getElementById("add-note").addEventListener("click", addNote);

function getNotes() {
  return JSON.parse(localStorage.getItem("notes") || "[]");
}

function saveNotes(notes) {
  localStorage.setItem("notes", JSON.stringify(notes));
}

function addNote() {
  const title = document.getElementById("note-title").value.trim();
  const body = document.getElementById("note-body").value.trim();

  if (!title || !body) {
    alert("Both title and body are required.");
    return;
  }

  const note = {
    id: Date.now().toString(),
    title,
    body
  };

  const notes = getNotes();
  notes.push(note);
  saveNotes(notes);
  renderNote(note);

  document.getElementById("note-title").value = "";
  document.getElementById("note-body").value = "";
}

function renderNote(note) {
  const container = document.getElementById("notes-container");
  const noteEl = document.createElement("div");
  noteEl.className = "note";
  noteEl.setAttribute("data-id", note.id);
 
 
  noteEl.innerHTML = `
    <h3>${note.title}</h3>
    <p>${note.body}</p>
    <button onclick="deleteNote('${note.id}')">Delete</button>
  `;
 
 
  container.appendChild(noteEl);
 }

 function loadNotes() {
  const notes = getNotes();
  notes.forEach(note => renderNote(note));
 }

 function deleteNote(id) {
  const notes = getNotes().filter(note => note.id !== id);
  saveNotes(notes);
  const noteEl = document.querySelector(`[data-id="${id}"]`);
  if (noteEl) noteEl.remove();
 }
 
 
 