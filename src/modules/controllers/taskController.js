import Task from "../models/tasks";
import { format, compareAsc, parse } from "date-fns";

class TaskController {
  constructor() {
    this.tasks = [];
    this.id = 1;
  }

  createTask(title, description, dueDate, priority, projectId, id) {
    const parsedDate = parse(dueDate, "dd/MM/yyyy", new Date());
    const newTask = new Task(
      title,
      description,
      parsedDate,
      priority,
      projectId,
      id,
    );
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
      return compareAsc(new Date(a.dueDate), new Date(b.dueDate));
    });
    return tasks;
  }

  deleteTask(taskID) {
    const task = this.getTask(taskID, this.tasks);
    this.tasks = this.removeItem(this.tasks, task);
    return;
  }

  editTask(task, title, description, dueDate, priority, projectId) {
    const parsedDate = parse(dueDate, "dd/MM/yyyy", new Date());
    task.title = title;
    task.description = description;
    task.dueDate = format(parsedDate, "dd/MM/yyyy");
    task.priority = priority;
    task.projectId = projectId;
    this.tasks = this.sortTasks(this.tasks);
    return;
  }
}

export default TaskController;
