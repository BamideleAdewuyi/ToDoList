// Non-screen section
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
        this.complete = false;
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

function GetAllProjects(projectManager) {
    return projectManager.projects;
}

function GetAllToDos(project) {
    return project.toDos;
}

function GetToDo(project, toDo) {
    const result = project.toDos.filter(obj => {
        return obj.title === toDo;
    })
    return result;
}

function DeleteToDo(project, toDo) {
    removeItem(project.toDos, toDo);
    return;
}

// const projectManager = new Projects();
// const cuisineProject = projectManager.createProject("cuisine");
// const testItem = CreateToDo("Cook", "Cooking", "Today", 1, projectManager);
// const newTest = CreateToDo("FixUp", "LookSharp", "Today", 2, projectManager);
// // console.log(projectManager);
// MoveToDo(testItem, projectManager.defaultProject, cuisineProject)
// // console.log(GetAllProjects(projectManager))
// const dessert = CreateToDo("Make Souffle", "RISE", "Tomorrow", 1, projectManager);
// MoveToDo(dessert, projectManager.defaultProject, cuisineProject);
// console.log(GetAllToDos(cuisineProject));
// // console.log(GetAllToDos(projectManager.defaultProject));

// console.log(GetToDo(cuisineProject, "Make Souffle"))
// console.log(cuisineProject)
// DeleteToDo(cuisineProject, dessert);

// console.log(cuisineProject)

// On screen section
class ScreenController {
    constructor() {
        this.projectManager = new Projects;
        this.containerDiv = document.querySelector(".container");
    }

    renderProjects() {
        this.projectManager.projects.forEach((project) => {
            const projectDiv = document.createElement("div");
            projectDiv.classList.add("project");
            projectDiv.textContent = project.name
            this.containerDiv.appendChild(projectDiv);
        })
    }
}

const screen = new ScreenController()

screen.renderProjects()