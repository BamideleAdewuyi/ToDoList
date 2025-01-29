import "./style.css";

class ProjectManager {
    constructor() {
        this.projects = {};
        this.defaultProject = this.createProject("Default");
        this.addProject(this.defaultProject);
    }

    createProject(title) {
        const newProject = new Project(title);
        return newProject;
    }

    addProject(project) {
        this.projects[project.title] = project.toDos;
        return;
    }

    moveToDo(toDo, oldProject, newProject) {
        oldProject.deleteToDo(toDo);
        newProject.addToDo(toDo);
        return;
    }
}

class Project {
    constructor(title) {
        this.title = title;
        this.toDos = [];
    }

    createToDo(title, description, dueDate, priority) {
        const newToDo = new ToDo(title, description, dueDate, priority)
        return newToDo;
    }

    addToDo(toDo) {
        this.toDos.push(toDo);
        toDo.project = this.title;
        return;
    }

    removeItemOnce(arr, value) {
        const index = arr.indexOf(value);
        if (index > -1) {
            arr.splice(index, 1);
        }
        return arr;
    }

    deleteToDo(toDo) {
        this.toDos = this.removeItemOnce(this.toDos, toDo);
        return this.toDos;
    }
}

class ToDo {
    constructor(title, description, dueDate, priority) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.complete = false;
        this.project = "Default";
    }

    tickOff() {
        this.complete = true;
        return;
    }
}

const projectManager = new ProjectManager();
const testProject = projectManager.createProject("testProject");
projectManager.addProject(testProject)
const testProject2 = projectManager.createProject("testProject2");
projectManager.addProject(testProject2);
const testToDo = testProject.createToDo("TestToDo", "Testing", "Today", "High");
testProject.addToDo(testToDo);
projectManager.moveToDo(testToDo, testProject, testProject2);
testToDo.tickOff()
console.log(projectManager)
