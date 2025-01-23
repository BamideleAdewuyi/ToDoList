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


const projectManager = new Projects();
const testProject = projectManager.createProject("cuisine");
const testToAdd = projectManager.createProject("testToAdd");
const testItem = CreateToDo("Cook", "Cooking", "Today", 1, projectManager);

console.log(IsIn(9, [9,1,2]))