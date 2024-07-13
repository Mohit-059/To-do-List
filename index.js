//create a function which adds task to local task:-
    //check if the input is empty
    // if not, set item tasks 
    //make input box empty
    //dcall the display function
function addTask() {

    addbtn.addEventListener("click", () => {
        addTaskToList();
    });

    inp.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
            event.preventDefault(); 
            addTaskToList();
        }
    });

    function addTaskToList(){
        let val = inp.value;
        if(val.trim() != ""){
            let tasks = getTasksFromLocalStorage();
            tasks.push(val);
            localStorage.setItem("tasks",JSON.stringify(tasks))
            inp.value = "";

            displayTasks();
        }
        else{
            alert("No Task entered !")
        }
    }

}


//create a function to display the content of local storage to the list
    //run a function to fetch tasks from local storage which will return an array of tasks
    //get the list and by using for each loop get all the tasks displayed by creating li child in the list
function displayTasks() {
    let tasks = getTasksFromLocalStorage();

    let list = document.querySelector(".list");
    list.innerHTML ="";

    tasks.forEach(task => {
        newTask = document.createElement("li");
        newTask.className = "task";
        newTask.innerHTML = `<input type="checkbox" name="check" id="chk">${task}`;
        list.appendChild(newTask)        
    });
}


//create a function remove task which will take text content 
    //like always call the function to get tasks from the local storage
    //filter the tasks whih are not equal to the textcontent provided while calling the function
    //update the local storage with the remaining tasks
    //also call the function to display the tasks 

function removeTask(txtcont) {
    let tasks = getTasksFromLocalStorage();
    tasks = tasks.filter(task => task !== txtcont);
    localStorage.setItem("tasks",JSON.stringify(tasks));
    displayTasks();
}




//create a function to get the tasks from the local storage
    //parse the json file in the local stoarage(where the item name is tasks)
    //also add a condition whih will check that the outcome of the parse will be list, if not declare an empty list in the tasks
    //better to encapsulate the code in a try condition and if it returns any error return an empty array too 

function getTasksFromLocalStorage() {
    try{
        let tasks = JSON.parse(localStorage.getItem("tasks"));

        if(!Array.isArray(tasks)){
            tasks  = [];
        }
        return tasks;

    }

    catch(e){
        return [];
    }

}

document.addEventListener("DOMContentLoaded", () => {
    displayTasks(); 
    addTask();

    // Add the event listener for task completion
    document.querySelector(".list").addEventListener("change", event => {
        if (event.target && event.target.type === "checkbox") {
            if (event.target.checked) {
                let parent = event.target.parentElement;
                parent.classList.add("completed");
                setTimeout(()=>{
                    removeTask(parent.textContent.trim());
                },590)
                
            }
            
        }
    });
});

