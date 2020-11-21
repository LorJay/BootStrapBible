  
const cafeList = document.querySelector('#cafe-list');
const form = document.querySelector('#add-cafe-form');

// create element & render cafe
function renderCafe(doc){
    let li = document.createElement('li');
    let name = document.createElement('span');
    let message = document.createElement('span');
    let cross = document.createElement('div');
    li.setAttribute('data-id', doc.id);
    name.textContent = doc.data().name + " ";
    message.textContent = doc.data().message;
    cross.textContent = "x";

    li.appendChild(name);
    li.appendChild(message);
    li.appendChild(cross);

    cafeList.appendChild(li);

    // deleting data
    cross.addEventListener('click', (e) => {
    
        let id = e.target.parentElement.getAttribute('data-id');
        db.collection('studyverse').doc(id).delete().then(mooCow => {location.reload()});
      
       
})
 
}

// getting data
db.collection('studyverse').get().then(snapshot => {
    snapshot.docs.forEach(doc => {
        renderCafe(doc);
    });
});

// saving data
form.addEventListener('submit', (e) => {
    e.preventDefault();
    db.collection('studyverse').add({
        name: form.name.value,
        message: form.message.value
    }).then(mooCow => {location.reload()});
    form.name.value = '';
    form.message.value = '';
});