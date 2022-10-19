const addThing = document.querySelector("#addThing");
const premierTableau = document.querySelector('#premierTableau');
const fini = document.querySelectorAll('.remove');
const change = document.querySelectorAll('.change');
const toDo = document.querySelector('#toDo');
let nombreTask = 0;

addThing.addEventListener('click', function(e){
    e.preventDefault();
    console.log(e);
    nombreTask++;
    let newTask = document.createElement('div')
    newTask.classList.add('task');
    newTask.id = 'task'+nombreTask; 
    premierTableau.appendChild(newTask);
    let newP = document.createElement('p');
    newP.classList.add('newP');
    newTask.appendChild(newP);
    newP.textContent = toDo.value ;
    let newDivBtn = document.createElement('div');
    newTask.appendChild(newDivBtn);
    let newBtnModify = document.createElement('button');
    newBtnModify.id = 'modify' +nombreTask;
    newBtnModify.classList.add('modify');
    newBtnModify.textContent = 'M';
    newDivBtn.appendChild(newBtnModify);
    newBtnModify.addEventListener('click', function(){
        let newInput = document.createElement('input');
        newInput.id = "newInput" + nombreTask;
        newTask.appendChild(newInput);
        newInput.focus();
        let newBtnOk = document.createElement('button');
        newTask.appendChild(newBtnOk);
        newBtnOk.addEventListener('click',function(){
            if(newInput.value.length>0){
                newP.textContent = newInput.value ;
                newInput.remove();
                newBtnOk.remove();
            }else{
                alert('Veuillez entrer une valeur');
            }
        })
    })
    let newBtnRmv = document.createElement('button');
    newBtnRmv.id = 'remove'+nombreTask;
    newBtnRmv.classList.add('remove');
    newBtnRmv.textContent = 'X';
    newDivBtn.appendChild(newBtnRmv);
    newBtnRmv.addEventListener('click', function(e){
        newBtnRmv.parentElement.parentElement.remove();
    })
})


