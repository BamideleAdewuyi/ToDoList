import TaskController from "../controllers/taskController";

class TaskView {
    constructor() {
        this.taskController = new TaskController();
        this.taskForm = this.createTaskForm();
        this.createTaskButton = document.querySelector(".addToDo");
        this.initialize();
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
        dialog.classList.add("createTaskForm")
        const form = document.createElement("form");
        form.innerHTML = `<form action="#" class="newToDoForm">
                         <h3>New ToDo</h3>
                         <label for="title">Title</label>
                         <input type="text" placeholder="Title" name="title" id="title" required>
                         <label for="description">Description</label>
                         <input type="text" placeholder="Description" name="description" id="description" required>
                         <label for="dueDate">Due Date</label>
                         <input type="date" name="dueDate" id="dueDate" required>
                         <div class="selectPriority">
                             <p>Select priority</p>
                             <label for="low">Low</label>
                             <input type="radio" id="low" name="priority" value="low" required/>
                             <label for="medium">Medium</label>
                             <input type="radio" id="medium" name="priority" value="medium"/>
                             <label for="high">High</label>
                             <input type="radio" id="high" name="priority" value="high"/>
                         </div>
                         <label for="project">Select project</label>
                         <select name="project" id="project">
 
                         </select>
                         <button class="submit" id="createToDo">Add ToDo</button>
                         <button type="button" class="closeToDoFormButton" autofocus>Close</button>
                     </form>
        `
        dialog.append(form);
        return dialog;
    };

    initialize() {
        this.closeTaskFormButton = document.querySelector(".closeToDoFormButton");
    };

    addListeners() {
        this.createTaskButton.addEventListener("click", () => {
            this.openTaskForm();
        })

        this.closeTaskFormButton.addEventListener("click", () => {
            this.closeTaskForm();
        })
    };

    openTaskForm() {
        this.taskForm.show();
    };

    closeTaskForm() {
        this.taskForm.close();
    };
}

export default TaskView;