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
        this.tasksDiv = document.querySelector(".tasks");
    }

    renderProjects() {
        this.tasksDiv.textContent = "";
        this.projectManager.projects.forEach((project) => {
            const projectDiv = document.createElement("div");
            projectDiv.classList.add("project");
            projectDiv.textContent = project.name
            this.tasksDiv.appendChild(projectDiv);
        })
    }

    renderToDos(project) {
        this.tasksDiv.textContent = "";
        project.toDos.forEach((toDo) => {
            const toDoPreviewDiv = document.createElement("div");
            toDoPreviewDiv.classList.add("toDoPreview");
            toDoPreviewDiv.textContent = `${toDo.title} ${toDo.dueDate}`;
            this.tasksDiv.appendChild(toDoPreviewDiv)
        })
    }

    renderToDo(toDo) {
        this.tasksDiv.textContent = "";
        const toDoDiv = document.createElement("div");
        toDoDiv.classList.add("toDo");
        toDoDiv.textContent = `${toDo.title} ${toDo.description} ${toDo.dueDate} ${toDo.priority}`;
        this.tasksDiv.appendChild(toDoDiv);
    }
}

const screen = new ScreenController()
const cookToDo = CreateToDo("Cook", "Cooking time", "Today", 1, screen.projectManager)
const lonesomeToDo = CreateToDo("Lonely", "At the Top", "Yesterday", 2, screen.projectManager)
screen.renderProjects();
screen.renderToDos(screen.projectManager.defaultProject);
const natureProject = screen.projectManager.createProject("NATURE");
screen.renderProjects()
MoveToDo(cookToDo, screen.projectManager.defaultProject, natureProject);
screen.renderToDos(natureProject)
screen.renderToDo(cookToDo)