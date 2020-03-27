// Define UI Vars
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');
loadEventListeners();
function loadEventListeners() {
  document.addEventListener('DOMContentLoaded',gettasks);
  form.addEventListener('submit', addTask);
  taskList.addEventListener('click',removeTask);
  clearBtn.addEventListener('click',cleartask);
  filter.addEventListener('keyup',filtertask);
}
function gettasks(){
  let tasks;
  if(localStorage.getItem('tasks')===null){
    tasks=[];
  }else{
    tasks=JSON.parse(localStorage.getItem('tasks'));
  }
  tasks.forEach(function(){
    const li = document.createElement('li');
 
li.className = 'collection-item';
  
li.appendChild(document.createTextNode(task));

const link = document.createElement('a');
link.className = 'delete-item secondary-content';
link.innerHTML = '<i class="fa fa-remove"></i>';
li.appendChild(link);
taskList.appendChild(li);
  });
}
function filtertask(e){
  const text=e.target.value.toLowerCase();
  document.querySelectorAll('.collection-item').forEach(function(task){
    const item=task.firstChild.textContent;
    if(item.toLowerCase().indexOf(text)!=-1){
      task.style.display='block';
    }else{
      task.style.display='none';
    }
  });
}
function cleartask(e){
  //taskList.innerHTML='';
  //faster
  while(taskList.firstChild){
    taskList.removeChild(taskList.firstChild);
    clearTasksfromlocalstorage();
  }
}
function clearTasksfromlocalstorage(){
  localStorage.clear();
}
function removeTask(e){
  if(e.target.parentElement.classList.contains('delete-item')){
    e.target.parentElement.parentElement.remove();
    removeTaskfromlocalstorage(e.target.parentElement.parentElement);
  }
}
function removeTaskfromlocalstorage(taskitem){
  let tasks;
  if(localStorage.getItem('tasks')===null){
    tasks=[];
  }else{
    tasks=JSON.parse(localStorage.getItem('tasks'));
  }
  tasks.forEach(function(task,index){
    if(taskitem.textContent===task){
      tasks.splice(index);
    }
  });
  localStorage.setItem('tasks',JSON.stringify(tasks));
}
function addTask(e) {
  if(taskInput.value === '') {
    alert('Add a task');
  }
const li = document.createElement('li');
 
li.className = 'collection-item';
  
li.appendChild(document.createTextNode(taskInput.value));

const link = document.createElement('a');
link.className = 'delete-item secondary-content';
link.innerHTML = '<i class="fa fa-remove"></i>';
li.appendChild(link);
taskList.appendChild(li);
storeTaskinlocalstorage();
taskInput.value = '';
e.preventDefault();
}
function storeTaskinlocalstorage(task){
  let tasks;
  if(localStorage.getItem('tasks')===null){
    tasks=[];
  }else{
    tasks=JSON.parse(localStorage.getItem('tasks'));
  }
  tasks.push(task);
  localStorage.setItem('tasks',JSON.stringify(tasks));
}