import TaskController from "../controllers/taskController";

class TaskView {
    constructor() {
        this.taskController = new TaskController();
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
    }
}

export default TaskView;