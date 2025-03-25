import TaskController from "../controllers/taskController";

class TaskView {
    constructor() {
        this.taskController = new TaskController();
        this.taskForm = this.createTaskForm();
        this.createTaskButton = document.querySelector(".addToDo");
        this.closeTaskFormButton = this.taskForm.querySelector(".closeToDoFormButton");
        this.addListeners();
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
                         <label for="taskTitle">Title</label>
                         <input type="text" placeholder="Title" name="taskTitle" id="taskTitle" required>
                         <label for="taskDescription">Description</label>
                         <input type="text" placeholder="Description" name="taskDescription" id="taskDescription" required>
                         <label for="taskDueDate">Due Date</label>
                         <input type="date" name="taskDueDate" id="taskDueDate" required>
                         <div id="taskPriority">
                             <p>Select priority</p>
                             <label for="low">Low</label>
                             <input type="radio" id="low" name="priority" value="low" required/>
                             <label for="medium">Medium</label>
                             <input type="radio" id="medium" name="priority" value="medium"/>
                             <label for="high">High</label>
                             <input type="radio" id="high" name="priority" value="high"/>
                         </div>
                         <label for="taskProject">Select project</label>
                         <select name="taskProject" id="taskProject">
 
                         </select>
                         <button class="submit" id="createToDo">Add ToDo</button>
                         <button type="button" class="closeToDoFormButton" autofocus>Close</button>
                     </form>
        `
        dialog.append(form);
        return dialog;
    };

    addListeners() {
        this.createTaskButton.addEventListener("click", () => {
            this.openTaskForm();
        })

        this.closeTaskFormButton.addEventListener("click", () => {
            this.closeTaskForm();
        })

        this.taskForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const title = document.getElementById("taskTitle").value;
            const description = document.getElementById("taskDescription").value;;
            const dueDate = document.getElementById("taskDueDate").value;;
            const priority = document.getElementById("taskPriority").value;;
            const project = document.getElementById("taskProject").value;
            const newTask = this.taskController.createTask(title, description, dueDate, priority, project);
            this.taskController.addTask(newTask, this.taskController.tasks);
            console.log(this.taskController);
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