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

const projectManager = new ProjectManager();

console.log(projectManager.projects)