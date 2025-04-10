import Task from "../models/tasks";
import {format, compareAsc} from "date-fns";

class TaskController{
    constructor() {
        this.tasks = [];
        this.id = 1;
    }

    createTask(title, description, dueDate, priority, projectId, id) {
        const newTask = new Task(title, description, format(dueDate, "dd/MM/yyyy"), priority, projectId, id)
        this.id += 1;
        return newTask;
    }

    addTask(task, arr) {
        arr.push(task);
        console.log(task.dueDate)
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

    editTask(task, title, description, dueDate, priority, projectId) {
        task.title = title;
        task.description = description;
        task.dueDate = dueDate;
        task.priority = priority;
        task.projectId = projectId;
        return;
    }
};

export default TaskController;