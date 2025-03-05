import Task from "../models/tasks";

class TaskController{
    constructor() {
        this.tasks = [];
    }

    createTask(title, description, dueDate, priority) {
        const newTask = new Task(title, description, dueDate, priority)
        return newTask;
    }

    addTask(task, arr) {
        this.tasks.push(task);
        arr.push(task);
        return;
    }
}