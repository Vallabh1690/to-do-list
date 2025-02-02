'use strict'


const dark = document.getElementById("themeSwitch"); //theme saver && reloader
// EVENT LISTENERS
dark.checked = localStorage.getItem("dark") === "true";
dark.addEventListener("click", () => {
    localStorage.setItem("dark", dark.checked);
});

// CONSTANTS
const API = `https://json-bins.herokuapp.com/bin/614ba253815b7dac76e143fc`;
// lists
const todoList = document.getElementById('todo-tasks')
const inProgressList = document.getElementById('in-progress-tasks')
const doneList = document.getElementById('done-tasks')
// buttons
const todoBtn = document.getElementById('submit-add-to-do');
const inProgressBtn = document.getElementById('submit-add-in-progress');
const doneBtn = document.getElementById('submit-add-done');
const deleteAllTasksButton = document.getElementById('delete-all-tasks'); //Access to the delete al tasks button element
// inputs
const todo = document.getElementById('add-to-do-task');
const inProgress = document.getElementById('add-in-progress-task');
const done = document.getElementById('add-done-task');

// // event listeners
// todoBtn.addEventListener("click", () => addTask('todo'));
// inProgressBtn.addEventListener("click", () => addTask('inProgress'));
// doneBtn.addEventListener("click", () => addTask('done'));

// WEB API(S) 
// async function fetchTasks() {
//   const res = await fetch(API);
//   const data = await res.json();

//   localStorage.setItem("tasks", JSON.stringify(data));
//   ['todo', 'in-progress', 'done'].forEach(listName => {
//     data.tasks[listName].forEach(task => {
//         const li = document.createElement('li');
//         li.innerText = task;
//         console.log(li.innerText)
//         if (listName === 'todo') todoList.append(li);
//         if (listName === 'in-progress') inProgressList.append(li);
//         if (listName === 'done') doneList.append(li);
//     });
//   })

// }
// fetchTasks();

// async function addTask(type) {
//     const li = document.createElement('li');
//     const data = JSON.parse(localStorage.getItem("tasks"));
//     if (type === 'todo') {
//         if (!todo.value) return;
//         data.tasks.todo.push(todo.value);
//         li.innerText = todo.value;
//         todoList.append(li);
//         todo.value = '';
//     } else if (type === 'inProgress') {
//         if (!inProgress.value) return;
//         data.tasks['in-progress'].push(inProgress.value);
//         li.innerText = inProgress.value;
//         inProgressList.append(li);
//         inProgress.value = '';
//     } else {
//         if (!done.value) return;
//         data.tasks.done.push(done.value);
//         li.innerText = done.value;
//         doneList.append(li);
//         done.value = '';
//     }

//     try {
//         const res = await fetch(API, {
//             method: "PUT",
//             headers: {
//                 "Content-type": "application/json; charset=UTF-8",
//             },
//             body: JSON.stringify(data),
//         });
//         if (res.status >= 400) throw new Error('Something went wrong');
//     } catch (error) {
//         console.log(error);
//     }
//     localStorage.setItem('tasks', JSON.stringify(data));
// }


// for(const listName in dataStr["tasks"])
//         {
//             for(const elData of dataStr["tasks"][`${listName}`])
//             {   
//                     const listEl = document.getElementById(`${listName}-tasks`);
//                     elcreaterAppenderToList(listEl, elData.task, elData.date, elData.time);
//             }  
//         }


const search = document.getElementById('search'); //search bar input section holder









function elcreaterAppenderToList(listEl,task,date,time) //from data to ul in the DOM
{
    const liElFirst = elCreator( 'span', [task], ['li-task', 'hover', 'draggable'], {} ); //creating and inserting li el to list from user input
    const liEl = elCreator( 'li', [liElFirst], ['list', 'draggable'], {} ); 
    
    //Full Date Structure!
            const fulldateEl = elCreator('span', [
                ' { ',
                date,
                time,
                ' }'
            ], ['full-date']);
        try{
            console.log(listEl)
            eleDOMAppender(liEl, fulldateEl); //apending full date to the task list
            if(listEl.firstChild === undefined) //if it doesnt have a  child, append it.
            {
                eleDOMAppender( listEl , liEl ); //sets the value of the input to the currrent state of it
            }
            else{ //if it does  have a child insert the generated li from user to the top of the ul
                listEl.insertBefore(liEl, listEl.firstChild);
            }
        }
        catch(err)
        {
            console.error(err);
        }
    
}



let data ;
//let UserContentInputArray; //public array of user inputs li

//UserContentInputArray = !localStorage["tasks"]["todo"] && !localStorage["tasks"]["in-progress"] && !localStorage["tasks"]["done"] ? dataResetter() : UserContentInputArray; //initialize data to last state exist.
// console.log(localStorage.getItem("tasks"))
if(!JSON.parse(localStorage.getItem("tasks")))
{
    localStorage.setItem("tasks", JSON.stringify({todo: [], inProgress: [], done: []}) );
    dataResetter();  
}
else 
{
    data =  JSON.parse(localStorage.getItem("tasks")); //initialize data to beggining state if not exist.
}


console.log(localStorage.getItem("tasks"))
console.log(localStorage)
console.log(data)


//resets data to initial state data.
function dataResetter()
{
    data = {todo: [], "inProgress": [], done: []};
}

function setDataToLocalStorage()
{
    // localStorage.setItem("todo", JSON.stringify(data["todo"]));
    // localStorage.setItem("in-progress", JSON.stringify(data["inProgress"]))
    // localStorage.setItem("done", JSON.stringify(data["done"]))
    localStorage.setItem("tasks", JSON.stringify(data));
}


function localStorageLoader()
{
    //todo storage loader & appender
    //const tasks = JSON.parse(localStorage.getItem("tasks"));

    console.log(data["todo"]) 
    data["todo"].forEach(taskObj => {
        elcreaterAppenderToList( document.getElementById("todo-tasks"), taskObj.task, taskObj.date, taskObj.time);
    });

    //in-progress storage loader & appender
    data["inProgress"].forEach(taskObj => {
        elcreaterAppenderToList( document.getElementById("in-progress-tasks"), taskObj.task, taskObj.date, taskObj.time);
    });

    //done storage loader & appender
    data["done"].forEach(taskObj => {
        elcreaterAppenderToList( document.getElementById("done-tasks"), taskObj.task, taskObj.date, taskObj.time);
    });

}
localStorageLoader();


    //function gets an input element and sets an li element to the corresponding section of the task//
    function liGenerator( inputElement, listElement )
    {
        const inputsArray = [todo, done, inProgress, search]; //input fields arrays
    
        if (isElementEmpty(inputElement)) 
        {
            if(typeof(inputElement.textContent)) 
            {
                setTimeout(() => {
                    alert("Please Enter text , BOX CANT INCLUDE NUMBERS ONLY!"); //gettin the value of current state and checkinif empty : error!   
                }, 150);
            }
            else{
                setTimeout(() => {
                    alert("Please Enter a value inside the input box, BOX CANT BE EMPTY!"); //gettin the value of current state and checkinif empty : error!   
                }, 150);
            }
            
        }
        else
        {
            inputsArray.forEach( inputField => inputField.classList.remove('error'));  // if not empty (& and submitted one form) remove error style attribute to all input fieldds 
    
            const userInputSection = elCreator('span', [inputElement.value.trim()], ['li-task', 'hover', 'draggable']); //section of user input only creator
            const liEl = elCreator( 'li', [userInputSection], ['list', 'draggable'], {} ); //creating and inserting li el to list from user input
    
            
            //date elements creation!
            const fullDate = new Date(); //date of submitting indicator
            const date = elCreator( 'span', [ ` ${fullDate.getDate()}/${fullDate.getMonth()+1}/${fullDate.getFullYear()} `], ['date']);
            const time = elCreator('span', [` ${fullDate.getHours()}:${fullDate.getMinutes()}:${fullDate.getSeconds()} `], ['time']);
            
            //Full Date Structure!
            const fulldateEl = elCreator('span', [
                ' { ',
                date,
                time,
                ' }'
            ], ['full-date']);
    
            //apend FULLDATE to list!
            eleDOMAppender(liEl, fulldateEl); //apending full date to the task list
    
            
            // listElement.forEach( listElement => {
    
                    if(listElement.firstElementChild === undefined) //if it doesnt have a  child, append it.
                    {
                        eleDOMAppender( listElement , liEl ); //sets the value of the input to the currrent state of it
                    }
                    else{ //if it does  have a child insert the generated li from user to the top of the ul
                        listElement.insertBefore(liEl, listElement.firstChild);
                    }   
                // });
    
            inputElement.value = ''; //resetin the value of input field after submittion
        } 
    } 




//function checking if **INPUT ELEMENT** is empty(including spaces) attach error class style to it etc//

function isElementEmpty(el)
{
   
   if(el.value === '' || (el.value.toLowerCase() === el.value.toUpperCase())) //checing if field empty or only has spaces in it
   {
       el.classList.add('error');
       return true;
   }
   return false;    
}




// add to do task content to matchin list/s  & saving in local storage //
todoBtn.addEventListener('click', (e) => {
    
        //console.log(UserContentInputArray)
        liGenerator( todo, todoList ); 
        search.value = '';  // reseting search input value if there is...

        data["todo"].push({
            task: todoList.firstChild.firstChild.textContent,
            date: todoList.firstChild.childNodes[1].childNodes[1].textContent,
            time: todoList.firstChild.childNodes[1].childNodes[2].textContent
        });
        console.log(data)
        setDataToLocalStorage();
    
}, { passive: true });

todo.addEventListener('keydown' , (e) => {

    if(e.key === "Enter")
    {
        //console.log(todo.value)
        liGenerator( todo, todoList )
        search.value = '';  // reseting search input value if there is...
        
        data["todo"].push({
            task: todoList.firstChild.firstChild.textContent,
            date: todoList.firstChild.childNodes[1].childNodes[1].textContent,
            time: todoList.firstChild.childNodes[1].childNodes[2].textContent
        });
        setDataToLocalStorage();
        //console.log(todoList.firstChild.childNodes[1].childNodes[2].textContent)
        //console.log(data)
    }
    
}, { passive: true });



// add in progress task content to matchin list/s  & saving in local storage //
inProgressBtn.addEventListener('click', () => {

    liGenerator( inProgress, inProgressList );
    search.value = '';  // reseting search input value if there is...

    data["inProgress"].push({
        task: inProgressList.firstChild.firstChild.textContent,
        date: inProgressList.firstChild.childNodes[1].childNodes[1].textContent,
        time: inProgressList.firstChild.childNodes[1].childNodes[2].textContent
    });
    setDataToLocalStorage();
});

inProgress.addEventListener('keydown' , (e) => {

    if(e.key === "Enter") 
    {
        liGenerator( inProgress, inProgressList )
        search.value = '';  // reseting search input value if there is...
        
        data["inProgress"].push({
            task: inProgressList.firstChild.firstChild.textContent,
            date: inProgressList.firstChild.childNodes[1].childNodes[1].textContent,
            time: inProgressList.firstChild.childNodes[1].childNodes[2].textContent
        });
        setDataToLocalStorage();
    }
    
}, { passive: true });


 

            


// add done task cntent to matchin list/s & saving in local storage //
doneBtn.addEventListener('click' , () => {

    liGenerator( done, doneList );
    search.value = '';  // reseting search input value if there is...

    data["done"].push({
        task: doneList.firstChild.firstChild.textContent,
        date: doneList.firstChild.childNodes[1].childNodes[1].textContent,
        time: doneList.firstChild.childNodes[1].childNodes[2].textContent
    });
    setDataToLocalStorage();
        
}, { passive: true });

done.addEventListener('keydown' , (e) => {

    if(e.key === "Enter") 
    {
        liGenerator( done, doneList );
        search.value = '';  // reseting search input value if there is...

        data["done"].push({
            task: doneList.firstChild.firstChild.textContent,
            date: doneList.firstChild.childNodes[1].childNodes[1].textContent,
            time: doneList.firstChild.childNodes[1].childNodes[2].textContent
        });
        console.log(data)
        console.log(localStorage)
        setDataToLocalStorage();
    }
    
}, { passive: true });



//delete all tasks button
deleteAllTasksButton.addEventListener('click', () => {
    
        if(confirm("Are you sure you want to delete all buttons in your lists!? THIS ACTION CANNOT BE REVERSED!")) //ask user if he sure he want delete
        {
            // console.log(UserContentInputArray)
            // UserContentInputArray.forEach(liTask => { //clear lists
            //     liTask.remove();
            // });
            dataResetter();
            // localStorage.setItem("tasks", JSON.stringify(data)); 
            setDataToLocalStorage() //removes it from local storage
            document.querySelectorAll('li').forEach(liTask => {liTask.parentElement.remove()}); // removes all elements
        }

});


//element creator function. gets: element children, classes, attributes, sets: existing element (not yet inserted in DOM!)//

function elCreator(el, children = [], classes = [], attributes = {}){ 
    const ele = document.createElement(el);

    //children
    ele.append(...children);

    //classes
    ele.classList.add(...classes);

    //attributes
    for(const attr in attributes)
    {
    ele.setAttribute(attr, attributes[attr]);
    }

    return ele;
} 


//Element DOM appendor function. gets: where you want to ***apppend***(means last in place) it to, and what you wanna append, which element (which already been made). sets: appending element/s in DOM//
function eleDOMAppender( destintionEle, currentEle ){ 
    try{
        destintionEle.append(currentEle);
    }
    catch(err)
    {
        throw(`there was an error with your element. please make sure it's not Null!`);
    }
}

// try
// {
    
    const listItems = document.querySelectorAll('ul'); //selecting lists
    let isHover = false;
    let currentHoveredEl; // pulic var to store & access the var that being hovered at the moment

    const observer = new MutationObserver( (mutations) => { //observing for changes in the list
        
            mutations.forEach( function (mutation){

            

            if(mutation.addedNodes.length) //if list item got added === true
            {                
                    const liTask = mutation.addedNodes[0];

                    //!!~~**DONT FORGET TO UPDATE WHEN ITEM DELETED**~~!!//
                    //UserContentInputArray.push(liTask); //pushin newcontent to array to store its value
                    console.log(liTask)
                    liTask.addEventListener('click', (e) => { //event when user click 4 times in a row it removes the specific list item from the specific lsit
                        if(e.detail === 4)
                        {
                          e.target.parentElement.remove() //removing its whole from list
                          //UserContentInputArray.splice(UserContentInputArray.indexOf(e.target),1) //removing it from the user input array as well
                        }
                    }, { passive: true });

                    var textContentSaver;
                    liTask.addEventListener( 'dblclick', () => { //add event listener to the first child every time 


                        textContentSaver = liTask.firstChild.textContent;
                        liTask.firstChild.setAttribute("contenteditable", true); //excluding date
                        liTask.classList.remove('hover') // remove element  hovering effect when doublclicked 
                        liTask.classList.add('no_selection') // remove element selection backgroun color when doublclicked 
                        liTask.firstChild.classList.add('no_selection')
                        liTask.firstChild.nextSibling.classList.add('no_selection')

                        localstorageScanner();

                          liTask.addEventListener( 'keydown', (e) => { //when Enter hit prevent its default
                                if(e.key === "Enter") 
                                {
                                    e.preventDefault()
                                }
                            }); 
                    }); 

                    liTask.addEventListener("keydown", (e) => { //if user edited and kept empty content and try to update... revoke changes.
                        if(e.key === "Enter")
                        {
                            if(liTask.firstChild.textContent.length === 0 || liTask.firstChild.textContent[0] === ' ')
                            { 
                                liTask.firstChild.textContent = textContentSaver;
                            }
                        }
                    });


                    liTask.firstChild.addEventListener( 'blur', () => { //revert when user loses focus off the editable field

                        if(liTask.firstChild.textContent.length === 0 || liTask.firstChild.textContent[0] === ' ')
                        { 
                            liTask.firstChild.textContent = textContentSaver;
                        }
                        
                        else{
                            liTask.firstChild.setAttribute("contenteditable", false); //return it to its initial state
                            liTask.firstChild.classList.add('hover');
                            liTask.classList.remove('no_selection');
                            localstorageScanner();
                            liTask.firstChild.classList.remove('no_selection');
                            liTask.firstChild.nextSibling.classList.remove('no_selection');
                        }

                    }, { passive: true });


                    // liTask.parentElement.setAttribute('draggable', true);
                    // liTask.parentElement.setAttribute('onDragStart', onDragStart);
    
                    liTask.addEventListener('mouseover', (e) => {//checking if user hoverin the list item then flag changes to true
                        isHover = true;
                        currentHoveredEl = liTask;
                        //liTask.matches(':hover')
                    }, { passive: true });    
                    
                    liTask.addEventListener('mouseout', () =>{ //checking if user not hoverin the list item then flag changes to false
                        isHover = false;
                    }, { passive: true });
            }
        });       
            
    });


// function localstorageScanner() //if there is data exist. add it to localstorage.
// {
//     if(data["todo"] || data["inProgress"] || data["done"])
//     {
//         for(const listName in data["tasks"])
//         {
//             for(const elData of data["tasks"][`${listName}`])
//             {   
//                     if(elData.task !== liTask.textContent) localStorage.setItem("tasks", JSON.stringify(elData.task))
//             }  
//         }
//     } 
// }



function localStorageTaskRemover(liTask, textContentSaver = '') //get a task and removes it from the localstorage and the data object! && from UserContentInputArray
{
    console.log(textContentSaver)
    //remove to do tasks from data collectors
    if(liTask.parentElement.id === "todo-tasks"){
        //delete todo task from data object
        data["todo"].forEach( (taskObj,i) => taskObj.task === textContentSaver 
                                                                    && taskObj.date === liTask.childNodes[1].childNodes[1].textContent 
                                                                    && taskObj.time === liTask.childNodes[1].childNodes[2].textContent
                                                                    ?  data["todo"].splice(i,1)
                                                                    :  taskObj );

        //remove from localstorage todo === add updated data boject
        localstorageScanner();
    }
    

    //remove in-progress tasks from data collectors
    if(liTask.parentElement.id === "in-progress-tasks") {
        //delete in-progress task from data object
        data["inProgress"].forEach( taskObj => taskObj.task === liTask.firstChild.textContent 
                                                                    && taskObj.date === liTask.childNodes[1].childNodes[1].textContent
                                                                    && taskObj.time === liTask.childNodes[1].childNodes[2].textContent
                                                                    ?  data["inProgress"].splice(data["inProgress"].indexOf(taskObj),1)
                                                                    :  taskObj );



        //remove from localstorage done
        localstorageScanner();
    }
    

    //remove done tasks from data collectors
    if(liTask.parentElement.id === "done-tasks"){
        //delete done task from data object
        data["done"].forEach( taskObj => taskObj.task === liTask.firstChild.textContent 
                                                                    && taskObj.date === liTask.childNodes[1].childNodes[1].textContent 
                                                                    && taskObj.time === liTask.childNodes[1].childNodes[2].textContent 
                                                                    ?  data["done"].splice(data["done"].indexOf(taskObj),1)
                                                                    :  taskObj );


        //remove from localstorage in-progress
        localstorageScanner();
    }
    


//     //UserContentInputArray remover
//     UserContentInputArray.forEach((ContentInputEl,i) => {
//         ContentInputEl === liTask ? UserContentInputArray.splice(i,1) : ContentInputEl
//     });
 }
    

    

    



    listItems.forEach((list) => { //observing the changes for every list
     observer.observe( list, {childList: true }); // observing for list items which being added
    });
/** ~~ !!! STOP THE MUTANT WHEN USER NOT MAKING AN EVENT RELATED TO IT!!! ~~ */

window.addEventListener( 'keydown', (e) => { // detectin keyboard events are only on input type elements so i detect it through window object
                        
    if( e.altKey || e.altGraphKey )
    {   
        e.preventDefault(); //preventing default so it wont switch to other objects and wont capture the windows events!

        if(isHover && e.key === '1' && currentHoveredEl.parentElement.parentElement.parentElement.id !== "todo-tasks-section")    
        {
            console.log(currentHoveredEl)

            if(todoList.firstElementChild === undefined) //if it doesnt have a  child, append it.
            {
                eleDOMAppender(todoList,currentHoveredEl.parentElement);  //if current task is hovered and not in the same list of the destination list then pass it over.. 
            }
            else{ //if it does  have a child insert the generated li from user to the top of the ul
                todoList.insertBefore(currentHoveredEl.parentElement, todoList.firstChild);
            }
        }

        if(isHover && e.key === '2' &&  currentHoveredEl.parentElement.parentElement.parentElement.id !== `in-progress-tasks-section`)    
        {
            if(todoList.firstElementChild === undefined) //if it doesnt have a  child, append it.
            {
                eleDOMAppender(inProgressList,currentHoveredEl.parentElement); //if current task is hovered and not in the same list of the destination list then pass it over.. 
            }
            else{ //if it does  have a child insert the generated li from user to the top of the ul
                inProgressList.insertBefore(currentHoveredEl.parentElement, inProgressList.firstChild);
            }
        }

        if(isHover && e.key === '3' && currentHoveredEl.parentElement.parentElement.parentElement.id !== "done-tasks-section")    
        {
            if(todoList.firstElementChild === undefined) //if it doesnt have a  child, append it.
            {
            eleDOMAppender(doneList,currentHoveredEl.parentElement); //if current task is hovered and not in the same list of the destination list then pass it over..
            }
            else{ //if it does  have a child insert the generated li from user to the top of the ul
                doneList.insertBefore(currentHoveredEl.parentElement, doneList.firstChild);
            }
        }      
    }
});


// UserContentInputArray.forEach((inList) => { //making input lists lower case behind the scenes ;)
//     inList.textContent.toLowerCase();
// });


//Search bar event//
search.addEventListener('keyup', e => {

    
    if(e.key !== "Enter"){
        if(isElementEmpty(search)){
           //checking if field empty and assignin error class style if it is.
        } else {
          [search, inProgress, todo, done].forEach(el => el.classList.remove("error")); //removing error style class. if its not empty and doesnt have the error attached to it it will just keep going cuz no error cass in it
        }
    }

    const searchQuery = e.target.value;
    console.log(searchQuery)
        document.querySelectorAll('li').forEach( (listTask) =>{
            if(searchQuery.length > 0)
            {
                console.log(listTask)
                console.log(listTask.firstChild.textContent.toLowerCase().includes(searchQuery.toLowerCase()))
                if(!listTask.firstChild.textContent.toLowerCase().includes(searchQuery.toLowerCase())) listTask.classList.add('hidden');
                else if(listTask.firstChild.textContent.toLowerCase().includes(searchQuery.toLowerCase())) listTask.classList.remove('hidden');
                else listTask.parentElement.classList.remove('hidden')
                    
            }
            
        }); 
    
}, { passive: true })







// function addEventListener() {
//     const draggables = document.querySelectorAll('.draggable');
//     const dragListItems = document.querySelectorAll('.draggable-list li');

//     draggables.forEach(draggable => {
//         draggable.addEventListener('dragstart', dragStart);
//     });

//     dragListItems.forEach(item => {
//         item.addEventListener('dragover', dragOver);
//         item.addEventListener('drop', dragDrop);
//         item.addEventListener('dragenter', dragEnter);
//         item.addEventListener('dragleave', dragLeave);
//     });
    
// }
