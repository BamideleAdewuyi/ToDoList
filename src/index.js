class Projects {
    constructor() {
        this.projects = [];
        this.defaultProject = this.createProject("Default");
    }

    createProject(projectName) {
        const project = new Project(projectName);
        this.projects.push(project);
        return project;
    }
}

class Project {
    constructor(name) {
        this.name = name
        this.toDos = []
    }
    addToDo(toDo) {
        this.toDos.push(toDo);
    }
}

class ToDo {
    constructor(title, description, dueDate, priority) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
    }
}

function CreateToDo(title, description, dueDate, priority, projectManager) {
    const newToDo = new ToDo(title, description, dueDate, priority);
    AddToProject(projectManager.defaultProject, newToDo)
    return newToDo;
}

function AddToProject(Project, ToDo) {
    return Project.addToDo(ToDo);
}

function IsIn(object, array) {
    return array.includes(object);
}

function removeItem(array, item) {
    const index = array.indexOf(item);
    if (index > -1) {
        array.splice(index, 1);
    }
    return array;
}

function MoveToDo(toDo, oldProject, newProject) {
    removeItem(oldProject.toDos, toDo);
    AddToProject(newProject, toDo)
}

const projectManager = new Projects();
const cuisineProject = projectManager.createProject("cuisine");
const testItem = CreateToDo("Cook", "Cooking", "Today", 1, projectManager);
const newTest = CreateToDo("FixUp", "LookSharp", "Today", 2, projectManager);
console.log(projectManager);
MoveToDo(testItem, projectManager.defaultProject, cuisineProject)