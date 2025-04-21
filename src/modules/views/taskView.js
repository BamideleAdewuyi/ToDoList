import TaskController from "../controllers/taskController";

class TaskView {
    constructor() {
        this.taskController = new TaskController();
        this.taskForm = this.createTaskForm();
        this.createTaskButton = document.querySelector(".addToDo");
        this.closeTaskFormButton = this.taskForm.querySelector(".closeToDoFormButton");
    };

    createTaskDiv(task) {
        const taskDiv = document.createElement("div");
        const taskTitle = document.createElement("h3");
        taskTitle.textContent = task.title;
        const taskDescription = document.createElement("p");
        taskDescription.textContent = task.description;
        const taskDueDate = document.createElement("p");
        taskDueDate.textContent = task.dueDate;
        const taskPriority = document.createElement("p");
        taskPriority.textContent = task.priority;
        const closeTask = document.createElement("button");
        closeTask.setAttribute("type", "button");
        closeTask.classList.add("closeTaskButton");
        closeTask.textContent = "X";
        taskDiv.append(taskTitle, taskDescription, taskDueDate, taskPriority, closeTask);
        return taskDiv;
    };

    createTaskForm() {
        const dialog = document.createElement("dialog");
        dialog.classList.add("createTaskDialog")
        const form = document.createElement("form");
        form.classList.add("createTaskForm")
        form.innerHTML = `<form action="#"">
                         <h3>New Task</h3>
                         <label for="taskTitle">Title</label>
                         <input type="text" placeholder="Title" name="taskTitle" id="taskTitle" required>
                         <label for="taskDescription">Description</label>
                         <textarea type="text" placeholder="Description" name="taskDescription" id="taskDescription" required></textarea>
                         <label for="taskDueDate">Due Date</label>
                         <input type="date" name="taskDueDate" id="taskDueDate" required>
                         <div id="taskPriority">
                             <p>Select priority</p>
                             <label for="low">Low</label>
                             <input type="radio" id="low" name="taskPriority" value="low" required/>
                             <label for="medium">Medium</label>
                             <input type="radio" id="medium" name="taskPriority" value="medium"/>
                             <label for="high">High</label>
                             <input type="radio" id="high" name="taskPriority" value="high"/>
                         </div>
                         <label for="taskProject">Select project</label>
                         <select name="taskProject" id="taskProject" required>
 
                         </select>
                         <button class="submit" id="createToDo">Add ToDo</button>
                         <button type="button" class="closeToDoFormButton" autofocus>Close</button>
                     </form>
        `
        dialog.append(form);
        return dialog;
    };
}

export default TaskView;