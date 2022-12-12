const buttonDel = document.querySelector('.btn__del');
buttonDel.addEventListener('click', function () {
  console.log('');
});



let addTask = document.querySelector('.createTask'),
addButton = document.querySelector('.btn__done'),
tasksPanel = document.querySelector('.tasksPanel');

let arrTask = [];
if (localStorage.getItem('todo'))
    arrTask = JSON.parse(localStorage.getItem('todo'));
        displayMessages();

addButton.addEventListener('click', function(){
    if(!addTask.value) return;
    let newTask = {
        todo: addTask.value,
        checked: false,
        important: false
    };

    arrTask.push(newTask)
    displayMessages();
    localStorage.setItem('todo', JSON.stringify(arrTask))
    addTask.value = '';
});

function displayMessages(){
    let displayMessage = "";
     arrTask.forEach(function(item, i){
      displayMessage += `
        <li>
        <input type = 'checkbox' id = 'item_${i}' ${item.checked ? 'checked' : ''}>
        <label for='item_${i}' class="${item.important ? 'important' : ''}">${item.todo}</label>
        </li>
        `;
      tasksPanel.innerHTML = displayMessage;
        
    });
}

tasksPanel.addEventListener('change', function(event){
    
    let valueLabel = tasksPanel.querySelector('[for='+event.target.getAttribute('id') +']').innerHTML;
     
    arrTask.forEach(function(item){
        if(item.todo === valueLabel)
          item.checked = !item.checked;
          localStorage.setItem('todo', JSON.stringify(arrTask));
    });
});

todo.addEventListener('contextmenu', function(event){
    event.preventDefault();
    arrTask.forEach(function(item, i){
        if(item.todo === event.target.innerHTML){
            if(event.ctrlKey){
                arrTask.splice(i, 1);
            }else{
                item.important = !item.important;
            }
                 displayMessages();
                localStorage.setItem('todo', JSON.stringify(arrTask));
        }
        
    });
});