import Task from "../models/tasks";

class TaskController{
    constructor() {
        this.tasks = [];
        this.id = 1;
    }

    createTask(title, description, dueDate, priority, projectId, id) {
        const newTask = new Task(title, description, dueDate, priority, projectId, id)
        this.id += 1;
        return newTask;
    }

    addTask(task, arr) {
        arr.push(task);
        return;
    }

    getTask(id, arr) {
        const task = arr.find((obj) => obj.id === id);
        return task;
    }

    removeItem(arr, item) {
        const index = arr.indexOf(item);
        if (index > -1) {
            arr.splice(index, 1);
        }
        return arr;
    }

    deleteTask(taskID) {
        const task = this.getTask(taskID, this.tasks);
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