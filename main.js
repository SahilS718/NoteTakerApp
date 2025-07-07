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

