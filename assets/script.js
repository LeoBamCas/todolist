"use strict";
const addThing = document.querySelector('#addThing')                //variables
const premierTableau = document.querySelector('#premierTableau')
const fini = document.querySelectorAll('.remove')
const change = document.querySelectorAll('.change')
const toDo = document.querySelector('#toDo')
const sections = document.querySelectorAll('section');
const milieu = document.querySelector('.milieu');
const taches = document.querySelectorAll('.task')
let nombreTask = 0

                                                                     //drag drop fix ?

taches.forEach( tache =>{
  tache.addEventListener('dragover', otherDragover);
  tache.addEventListener('drop', otherDrop);
})

function otherDragover(e){
  console.log('otherDragover')
};



function otherDrop(e){
  console.log('test');
  const id = e.dataTransfer.getData('text/plain');
  const draggable = document.getElementById(id);
  draggable.parentElement.appendChild(draggable);
  draggable.classList.remove('hide');
}

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
    let newDivForm = document.createElement('div');
    newDivForm.classList.add('newDivForm');
    newTask.appendChild(newDivForm);
    let newDivDiv = document.createElement('div')
    newDivDiv.classList.add('divDiv');
    newTask.appendChild(newDivDiv)
    let newDivBtn = document.createElement('div')
    newDivDiv.appendChild(newDivBtn)
    let newDivBtn2 = document.createElement('div')
    newDivDiv.appendChild(newDivBtn2)
    let newBtnModify = document.createElement('button')
    newBtnModify.id = 'modify' + nombreTask
    newBtnModify.classList.add('modify')
    newBtnModify.textContent = 'M'
    newDivBtn.appendChild(newBtnModify)
    newBtnModify.addEventListener('click', function () {        //création de la fonction de modification
      newDivForm.innerHTML = '';
      newDivForm.classList.remove('newDivForm')
      let newForm = document.createElement('form')
      newForm.classList.add('newForm')
      newDivForm.appendChild(newForm)
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
      // function animationSortie(){
      //   let keyframes = {
      //     margin-right: [0% 0% 0% 0%, 0% 60% 0% 0%],
      //     opacity: [1, 0]
      // }
      //   let options = {
      //     duration: 1000,

      //   }
      //   newTask.animate(keyframes,options);
      // }
      // animationSortie();
      newBtnRmv.parentElement.parentElement.parentElement.remove()
    })
    let newBtnImp = document.createElement('button');
    newBtnImp.id = 'important' + nombreTask;
    newBtnImp.textContent = 'I';
    newBtnImp.classList.add('important');
    newDivBtn2.appendChild(newBtnImp);
    newDivBtn2.addEventListener('click', function(e){           //changement de couleur
            e.preventDefault();
            if (newDivBtn2.parentElement.parentElement.classList.contains('important')){
                newDivBtn2.parentElement.parentElement.classList.remove('important');
            }else{

                newDivBtn2.parentElement.parentElement.classList.add('important');
            }
    })
    newTask.addEventListener('dragstart', function(e){          //fonctiondrag/drop coté task
        e.dataTransfer.setData('text/plain',e.target.id);
        setTimeout( () =>{
            e.target.classList.add('hide');

        }, 0);
    })
    newTask.addEventListener('dragend',function(e){
      e.target.classList.remove('hide');
    })
  }
  toDo.value ="";
})
