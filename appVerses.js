  
const cafeList = document.querySelector('#cafe-list');
const form = document.querySelector('#add-cafe-form');

// create element & render cafe
function renderCafe(doc){
    let li = document.createElement('li');
    let name = document.createElement('span');
    let message = document.createElement('span');
    let notes = document.createElement('span');
    notes.id = 'notes';
    notes.contentEditable = true;
      
    let cross = document.createElement('div');
    let saveVerse = document.createElement('span');
    saveVerse.id = 'saveVerse';
    li.setAttribute('data-id', doc.id);
    name.textContent = doc.data().name + " ";
    message.textContent = doc.data().message;
    notes.textContent = doc.data().notes
    if (notes.textContent =="") {notes.textContent ="Enter notes here"}
    cross.textContent = "x";
    saveVerse.textContent = "save";
    li.appendChild(name);
    li.appendChild(message);
    li.appendChild(notes);
    li.appendChild(saveVerse);
    li.appendChild(cross);  
    cafeList.appendChild(li);

    // deleting data
    cross.addEventListener('click', (e) => {
        let id = e.target.parentElement.getAttribute('data-id');
        db.collection('studyverse').doc(id).delete().then(mooCow => {location.reload()});       
    })
    
    // Saving Changes
    saveVerse.addEventListener('click', (e) => {
        saveVerse.style.color = "Green";
        saveVerse.innerText = "Saved";
        let id = e.target.parentElement.getAttribute('data-id');
        let selectedMessage = message.innerText
        let selectedNotes = notes.innerText
        console.log(selectedMessage)
         console.log(selectedNotes)
        db.collection('studyverse').doc(id).update({
            message: selectedMessage,
            notes: selectedNotes

        })

        
    })



 
}

// getting data
db.collection('studyverse').get().then(snapshot => {
    snapshot.docs.forEach(doc => {
        renderCafe(doc);
    });
});





/* // saving data this is old code and most likely can go
form.addEventListener('submit', (e) => {
    e.preventDefault();
    db.collection('studyverse').add({
        name: form.name.value,
        message: form.message.value
    }).then(mooCow => {location.reload()});
    form.name.value = '';
    form.message.value = '';
}); */