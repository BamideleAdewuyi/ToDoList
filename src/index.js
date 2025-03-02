import "./style.css";

class ProjectManager {
    constructor() {
        this.projects = [];
        this.defaultProject = this.createProject("Default");
    }

    createProject(title) {
        const newProject = new Project(title);
        this.addProject(newProject);
        return newProject;
    }

    findProject(projectTitle) {
        const project = this.projects.find((obj) => obj.title === projectTitle);
        return project;
    }

    findToDo(project, toDoTitle) {
        const toDo = project.toDos.find((obj) => obj.title === toDoTitle);
        return toDo;
    }

    addProject(project) {
        this.projects.push(project)
        return;
    }

    moveToDo(toDo, oldProject, newProject) {
        oldProject.deleteToDo(toDo);
        newProject.addToDo(toDo);
        return;
    }

    editToDo(toDo, title, description, dueDate, priority, project) {
        toDo.title = title;
        toDo.description = description;
        toDo.dueDate = dueDate;
        toDo.priority = priority;
        toDo.project = project;
        return;
    }

    createToDo(title, description, dueDate, priority, project) {
        const newToDo = new ToDo(title, description, dueDate, priority, project)
        this.addToDo(newToDo, project)
        return newToDo;
    }

    addToDo(toDo, toThisproject) {
        toThisproject.toDos.push(toDo);
        toDo.project = toThisproject.title;
        return;
    }

    removeItemOnce(arr, value) {
        const index = arr.indexOf(value);
        if (index > -1) {
            arr.splice(index, 1);
        }
        return arr;
    }
    
    deleteToDo(toDo, fromThisProject) {
        fromThisProject.toDos = this.removeItemOnce(fromThisProject.toDos, toDo);
        return fromThisProject.toDos;
    }
}

class Project {
    constructor(title) {
        this.title = title;
        this.toDos = [];
    }
}

class ToDo {
    constructor(title, description, dueDate, priority, project) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.complete = false;
        this.project = project;
    }

    tickOff() {
        this.complete = true;
        return;
    }
}

class ScreenController {
    constructor() {
        this.projectManager = new ProjectManager();
    }

    createProjectDialog() {
        const projectDialog = document.createElement("dialog");
        return projectDialog;
    }

    createProjectForm(dialog) {
        const projectForm = document.createElement("form");
        const titleLabel = document.createElement("label");
        const projectTitle = document.createElement("input");
        titleLabel.textContent = "title";
        return;
    }
}

const screenController = new ScreenController();