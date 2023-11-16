document.querySelector('#create').addEventListener('click', add_note)

let _title = document.querySelector('#title')
let _content = document.querySelector('#desc')
let _color = document.querySelector('#color')
let _pinned = document.querySelector('#marked')

let cur_id = 1
let notes = {}

function add_note() {

    let note = {
        title: _title.value,
        content: _content.value,
        color: _color.value,
        pinned: _pinned.value,
        created: Date.now()
    }

    notes[cur_id] = note
    cur_id++
}

