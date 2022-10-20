const addThing = document.querySelector('#addThing') //variables
const premierTableau = document.querySelector('#premierTableau')
const fini = document.querySelectorAll('.remove')
const change = document.querySelectorAll('.change')
const toDo = document.querySelector('#toDo')
const sections = document.querySelectorAll('section')
const milieu = document.querySelector('.milieu')
const taches = document.querySelectorAll('.task')
const clear = document.querySelector('#clear')
let nombreTask = 0

//fonction supprimer

function supprimer (aSupprimer) {
  function animationSortie () {
    let keyframes = {
      opacity: [1, 0]
    }
    let options = {
      duration: 800
    }
    aSupprimer.animate(keyframes, options)
  }
  animationSortie()
  aSupprimer.classList.add('translate')
  setTimeout(() => {
    aSupprimer.remove()
  }, 800)
}

  //drag/drop coté reception

sections.forEach(section => {

  section.addEventListener('dragenter', dragEnter)
  section.addEventListener('dragover', dragOver)
  section.addEventListener('dragleave', dragLeave)
  section.addEventListener('drop', drop)
})

function dragEnter (e) {
  e.preventDefault()
  e.target.classList.add('drag-over')
}
function dragOver (e) {
  e.preventDefault()
  e.target.classList.add('drag-over')
}
function dragLeave (e) {
  e.target.classList.remove('drag-over')
}
function drop (e) {
  e.target.classList.remove('drag-over')
  const id = e.dataTransfer.getData('text/plain')
  const draggable = document.getElementById(id)
  e.target.appendChild(draggable)
  draggable.classList.remove('hide')
}

//creation d'une tâche

addThing.addEventListener('click', function (e) {
  e.preventDefault()
  if (toDo.value.length < 1) {
    alert('Veuillez entrer une valeur')
  } else {
    nombreTask++
    let newTask = document.createElement('div')
    newTask.classList.add('task')
    newTask.draggable = 'true'
    newTask.id = 'task' + nombreTask
    premierTableau.appendChild(newTask)
    let newP = document.createElement('p')
    newP.classList.add('newP')
    newTask.appendChild(newP)
    newP.textContent = toDo.value
    let newDivForm = document.createElement('div')
    newDivForm.classList.add('newDivForm')
    newTask.appendChild(newDivForm)
    let newDivDiv = document.createElement('div')
    newDivDiv.classList.add('divDiv')
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

     //création de la fonction de modification

    newBtnModify.addEventListener('click', function () {  
      newDivForm.innerHTML = ''
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

     //création du bouton supprimer

    let newBtnRmv = document.createElement('button')
    newBtnRmv.id = 'remove' + nombreTask
    newBtnRmv.classList.add('remove')
    newBtnRmv.textContent = 'X'
    newDivBtn.appendChild(newBtnRmv)
    newBtnRmv.addEventListener('click', function (e) {
      supprimer(newTask)
    })
    let newBtnImp = document.createElement('button')
    newBtnImp.id = 'important' + nombreTask
    newBtnImp.textContent = 'I'
    newBtnImp.classList.add('important')
    newDivBtn2.appendChild(newBtnImp)

      //changement de couleur

    newDivBtn2.addEventListener('click', function (e) {    
      e.preventDefault()
      if (
        newDivBtn2.parentElement.parentElement.classList.contains('important')
      ) {
        newDivBtn2.parentElement.parentElement.classList.remove('important')
      } else {
        newDivBtn2.parentElement.parentElement.classList.add('important')
      }
    })

     //fonctiondrag/drop coté task
     
    newTask.addEventListener('dragstart', function (e) {
      e.dataTransfer.setData('text/plain', e.target.id)
      setTimeout(() => {
        e.target.classList.add('hide')
      }, 0)
    })
    newTask.addEventListener('dragend', function (e) {
      e.target.classList.remove('hide')
    })
  }
  toDo.value = ''
})

                                                                        //bouton clear all
clear.addEventListener('click', function (e) {
  const taches = document.querySelectorAll('#aValider .task')
  for (let task of taches) {
    supprimer(task)
  }
})
clear.addEventListener('mouseover', function(e){
  clear.classList.remove('important');
  clear.classList.add('hover');
})

clear.addEventListener('mouseout', function(e){
  clear.classList.remove('hover');
  clear.classList.add('important');
})
