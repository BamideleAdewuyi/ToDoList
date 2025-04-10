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
        this.tasks = this.sortTasks(this.tasks);
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

    sortTasks(tasks) {
        tasks.sort((a, b) => {
            return compareAsc(new Date(a.dueDate), new Date(b.dueDate))
        });
        return tasks;
    }

    deleteTask(taskID) {
        const task = this.getTask(taskID, this.tasks);
        this.tasks = this.removeItem(this.tasks, task);
        return;
    }

    editTask(task, title, description, dueDate, priority, projectId) {
        task.title = title;
        task.description = description;
        task.dueDate = format(dueDate, "dd/MM/yyyy");
        task.priority = priority;
        task.projectId = projectId;
        this.tasks = this.sortTasks(this.tasks);
        return;
    }
};

export default TaskController;