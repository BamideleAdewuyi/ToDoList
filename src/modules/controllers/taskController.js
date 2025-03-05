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

    getTask(title, arr) {
        const task = arr.find((obj) => obj.title === title);
        return task;
    }

    removeItem(arr, item) {
        const index = arr.indexOf(item);
        if (index > -1) {
            arr.splice(index, 1);
        }
        return arr;
    }

    deleteTask(taskTitle, projectTitle) {
        this.tasks = this.removeItem(this.tasks, taskTitle);
        return;
    }
}