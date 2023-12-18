document.addEventListener('DOMContentLoaded', displayNotes)
document.querySelector('#addNote').addEventListener('click', addNote)
document.querySelector('#find').addEventListener('input', findNotes)

const noteContainer = document.getElementById('noteContainer')

function addNote() {
    const title = document.getElementById('title').value
    const content = document.getElementById('content').value
    const color = document.getElementById('color').value
    const tags = document.getElementById('tags').value.trim().split(' ')
    const fav = document.getElementById('fav').checked
    const date = new Date().toLocaleString()

    const note = {title, content, color, tags, fav, date}

    let notes = JSON.parse(localStorage.getItem('notes')) || []

    notes.push(note)
    localStorage.setItem('notes', JSON.stringify(notes))

    displayNotes()
}

function deleteNote(index) {
    let notes = JSON.parse(localStorage.getItem('notes'))
    notes.splice(index, 1)
    localStorage.setItem('notes', JSON.stringify(notes))

    displayNotes()
}

function displayNotes() {
    noteContainer.textContent = ''

    let notes = JSON.parse(localStorage.getItem('notes')) || []

    const favNotes = notes.filter(note => note.fav)
    const regNotes = notes.filter(note => !note.fav)

    favNotes.forEach((note, index) => {
        noteContainer.appendChild(buildNote(note, index))
    })

    regNotes.forEach((note, index) => {
        noteContainer.appendChild(buildNote(note, index))
    })
}

function buildNote(note, index) {
    const newNote = document.createElement('div')
    newNote.classList.add('note')

    let noteTitle = document.createElement('div')
    noteTitle.classList.add('nTitle')
    noteTitle.innerHTML = note.title
    noteTitle.style.color = note.color
    let noteContent = document.createElement('div')
    noteContent.classList.add('nContent')
    noteContent.innerHTML = note.content
    let noteTags = document.createElement('div')
    noteTags.classList.add('nTags')
    noteTags.innerHTML = note.tags.length > 0 ? note.tags.join(' ') : ''
    let noteDate = document.createElement('div')
    noteDate.classList.add('nDate')
    noteDate.innerHTML = note.date

    const noteDelete = document.createElement('button')
    noteDelete.classList.add('noteDelete')
    noteDelete.setAttribute('onclick',`deleteNote(${index})`);
    noteDelete.textContent = 'Remove'

    newNote.appendChild(noteTitle)
    newNote.appendChild(noteContent)
    newNote.appendChild(noteTags)
    newNote.appendChild(noteDate)
    newNote.appendChild(noteDelete)

    return newNote
}

function findNotes() {
    const prompt = document.getElementById('find').value
    let notes = [...noteContainer.getElementsByClassName('note')]

    notes.forEach((note) => {
        const title = note.querySelector('.nTitle').innerHTML
        const content = note.querySelector('.nTitle').innerHTML
        const tags = note.querySelector('.nTags').innerHTML

        note.style.display = title.includes(prompt) || content.includes(prompt) || tags.includes(prompt) ? 'block' : 'none'
    });
}