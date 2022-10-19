const addThing = document.querySelector('#addThing')                //variables
const premierTableau = document.querySelector('#premierTableau')
const fini = document.querySelectorAll('.remove')
const change = document.querySelectorAll('.change')
const toDo = document.querySelector('#toDo')
const sections = document.querySelectorAll('section');
let nombreTask = 0


sections.forEach( section =>{                                       //drag/drop coté reception
    section.addEventListener('dragenter', dragEnter);
    section.addEventListener('dragover', dragOver);
    section.addEventListener('dragleave', dragLeave);
    section.addEventListener('drop', drop);
})

function dragEnter(e){
    e.preventDefault();
    e.target.classList.add('drag-over');
}
function dragOver(e){
    e.preventDefault();
    e.target.classList.add('drag-over');
}
function dragLeave(e){
    e.target.classList.remove('drag-over');
}
function drop(e){
    e.target.classList.remove('drag-over');
    const id = e.dataTransfer.getData('text/plain');
    const draggable = document.getElementById(id);
    e.target.appendChild(draggable);
    draggable.classList.remove('hide');
}


addThing.addEventListener('click', function (e) {           //creation d'une tâche
  e.preventDefault()
  if (toDo.value.length < 1) {
    alert('Veuillez entrer une valeur')
  } else {
    nombreTask++
    let newTask = document.createElement('div')
    newTask.classList.add('task')
    newTask.draggable = "true";
    newTask.id = 'task' + nombreTask
    premierTableau.appendChild(newTask)
    let newP = document.createElement('p')
    newP.classList.add('newP')
    newTask.appendChild(newP)
    newP.textContent = toDo.value
    let newDivBtn = document.createElement('div')
    newTask.appendChild(newDivBtn)
    let newBtnModify = document.createElement('button')
    newBtnModify.id = 'modify' + nombreTask
    newBtnModify.classList.add('modify')
    newBtnModify.textContent = 'M'
    newDivBtn.appendChild(newBtnModify)
    newBtnModify.addEventListener('click', function () {        //création de la fonction de modification
      let newForm = document.createElement('form')
      newForm.classList.add('newForm')
      newTask.appendChild(newForm)
      let newInput = document.createElement('input')
      newInput.id = 'newInput' + nombreTask
      newForm.appendChild(newInput)
      newInput.focus()
      let newBtnOk = document.createElement('button')
      newBtnOk.textContent = 'V'
      newForm.appendChild(newBtnOk)
      newBtnOk.addEventListener('click', function () {
        newP.textContent = newInput.value
        newForm.remove()
      })
    })
    let newBtnRmv = document.createElement('button')            //création de la fonction supprimer
    newBtnRmv.id = 'remove' + nombreTask
    newBtnRmv.classList.add('remove')
    newBtnRmv.textContent = 'X'
    newDivBtn.appendChild(newBtnRmv)
    newBtnRmv.addEventListener('click', function (e) {
      newBtnRmv.parentElement.parentElement.remove()
    })
    newTask.addEventListener('dragstart', function(e){          //fonctiondrag/drop coté task
        e.dataTransfer.setData('text/plain',e.target.id);
        setTimeout( () =>{
            e.target.classList.add('hide');

        }, 0);
    })
  }
})

