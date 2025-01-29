import "./style.css";

class ProjectManager {
    constructor() {
        this.projects = {};
        this.defaultProject = new Project("Default");
        this.addProject(this.defaultProject);
    }

    createProject(title) {
        const newProject = new Project(title);
        return newProject;
    }

    addProject(project) {
        this.projects[project.title] = [];
        return;
    }
}

class Project {
    constructor(title) {
        this.title = title;
        this.toDos = [];
    }
}

class ToDo {
    constructor(title, description, dueDate, priority) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.project = "Default";
    }
}

const projectManager = new ProjectManager();

console.log(projectManager.projects)