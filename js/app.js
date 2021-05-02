//Problem: User interaction doesn't provide desired results
//Solution: Add interactivity so the user can manage daily tasks.

var taskInput = document.getElementById("new-task"); // new-task
var addButton = document.getElementsByTagName("button")[0]; // first button
var incompleteTasksHolder = document.getElementById("incomplete-tasks"); //incomplete-tasks
var completeTasksHolder = document.getElementById("completed-tasks"); //complete-tasks

taskInput.addEventListener("keyup", function(event) {
    // Number 13 is the "Enter" key on the keyboard
    if (event.keyCode === 13) {
        // Cancel the default action, if needed
        event.preventDefault();
        // Trigger the button element with a click
        addButton.click();
    }
});

//New Task List Item
var createNewTaskElement = function (taskString) {
    // Create List Item
    var listItem = document.createElement("li");

    //input (checkbox)
    var checkBox = document.createElement("input"); //checkbox
    //label
    var label = document.createElement("label");
    //input (text)
    var editInput = document.createElement("input"); //text
    //button.edit
    var editButton = document.createElement("button");
    //button.delete
    var deleteButton = document.createElement("button");

    //Each element needs modifying

    checkBox.type = "checkbox";
    editInput.type = "text";

    editButton.innerText = "Edit";
    editButton.classList.add("edit","eB");
    deleteButton.innerText = "Delete";
    deleteButton.className = "delete";

    label.innerText = taskString;

    //Each element needs appending
    listItem.appendChild(checkBox);
    listItem.appendChild(label);
    listItem.appendChild(editInput);
    listItem.appendChild(editButton);
    listItem.appendChild(deleteButton);

    return listItem;
}
//Add a new task
var addTask = function () {
    console.log("Add task ...")
    //Create a new list item with the text from #new-task:
    var listItem = createNewTaskElement(taskInput.value);
    if (taskInput.value == ""){
        alert("NULL");
    } else {

    //Append list item to incompleteTasksHolder
    incompleteTasksHolder.appendChild(listItem);
    bindTaskEvents(listItem,taskCompleted);

    taskInput.value = "";
}}

//Edit an existing task
var editTask = function () {
    console.log("Edit Task ...")

    var listItem = this.parentNode;
    var editInput = listItem.querySelector("input[type=text]");
    var label = listItem.querySelector("label");
    var containsClass = listItem.classList.contains("editMode");
    var eB = listItem.querySelector('.eB');
    //if the class of parent is .editMode
    if (containsClass === "editMode") {

        label.innerText = editInput.value;
    } else {

        //input value becomes the label's text
        editInput.value = label.innerText;
}
    if(eB.innerHTML === "Save"){
        eB.innerHTML = "Edit";
    }else {
        eB.innerHTML = "Save";

    }



    //Toggle .editMode on the list item
    listItem.classList.toggle("editMode");

}

//Delete an existing task
var deleteTask = function () {
    console.log("Delete Task ...")
    var listItem = this.parentNode;
    var ul = listItem.parentNode;
    // Remove the parent list item from the ul
    ul.removeChild(listItem);
}

//Mark a Task as complete
var taskCompleted = function () {
    console.log("Task Complete ...");
    //When the checkbox is checked
    //Append the task list item to the #completed-tasks
    var listItem = this.parentNode;
    completeTasksHolder.appendChild(listItem);
    bindTaskEvents(listItem,taskIncomplete);
}

//Mark a Task as incomplete
var taskIncomplete = function () {
    console.log("Task Incomplete ...");
    //When the chechbox is unchecked
    //Append the task list item to the #incompleted-tasks
    var listItem = this.parentNode;
    incompleteTasksHolder.appendChild(listItem);
    bindTaskEvents(listItem,taskCompleted);
}

var bindTaskEvents =function(taskListItem, checkBoxEventHandler) {
    console.log("Bind list item events");
    //select taskListItem's children
    var checkbox = taskListItem.querySelector("input[type=checkbox]")
    var editButton = taskListItem.querySelector("button.edit");
    var deleteButton = taskListItem.querySelector("button.delete");

        //bind editTask to edit button
    editButton.onclick = editTask;

        //bind deleteTask to the delete button
    deleteButton.onclick = deleteTask ;
        //bind checkBoxEventHandler to the checkbox
    checkbox.onchange= checkBoxEventHandler;
}

var ajaxRequest = function () {
    console.log("Ajax Request");
}
//Set the click handler to the addTask function
addButton.addEventListener("click", addTask);
addButton.addEventListener("click", ajaxRequest);

// addButton.onclick = ajaxRequest;
// cycle over incompleteTasksHolder ul list items
for (var i= 0; i < incompleteTasksHolder.children.length; i++) {
    //bind events to list item's children (taskCompleted)
    bindTaskEvents(incompleteTasksHolder.children[i], taskCompleted);
}
// cycle over completeTasksHolder ul list items
for (var i= 0; i < completeTasksHolder.children.length; i++) {
//bind events to list item's children (taskIncomplete)
    bindTaskEvents(completeTasksHolder.children[i], taskIncomplete);
}