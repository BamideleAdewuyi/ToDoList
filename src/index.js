class Projects {
    constructor() {
        this.projects = [];
        const defaultProject = this.createProject("Default");
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

function CreateToDo(title, description, dueDate, priority) {
    return new ToDo(title, description, dueDate, priority);
}

function AddToProject(Project, ToDo) {
    Project.addToDo(ToDo);
}


const projectManager = new Projects();
const testProject = projectManager.createProject("cuisine");
const testToAdd = projectManager.createProject("testToAdd");
const testItem = CreateToDo("Cook", "Cooking", "Today", 1);
const newTestItem = CreateToDo("Clean", "Cleaning", "Yesterday", 2);

AddToProject(testToAdd, newTestItem)
