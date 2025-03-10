import Task from "../models/tasks";

class TaskController{
    constructor() {
        this.tasks = [];
    }

    createTask(title, description, dueDate, priority, project) {
        const newTask = new Task(title, description, dueDate, priority, project)
        return newTask;
    }

    addTask(task, arr) {
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

    deleteTask(taskTitle) {
        const task = this.getTask(taskTitle, this.tasks);
        this.tasks = this.removeItem(this.tasks, task);
        return;
    }

    editTask(task, title, description, dueDate, priority, project) {
        task.title = title;
        task.description = description;
        task.dueDate = dueDate;
        task.priority = priority;
        task.project = project;
        return;
    }
};

export default TaskController;