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

// const projectManager = new ProjectManager();
// const testProject = projectManager.createProject("testProject");
// projectManager.addProject(testProject)
// const testProject2 = projectManager.createProject("testProject2");
// projectManager.addProject(testProject2);
// const testToDo = testProject.createToDo("TestToDo", "Testing", "Today", "High");
// testProject.addToDo(testToDo);
// projectManager.moveToDo(testToDo, testProject, testProject2);
// testToDo.tickOff()
// console.log(projectManager)

class ScreenController {
    constructor() {
        this.projectManager = new ProjectManager();
        this.addToDoButton = document.querySelector(".addToDo");
        this.newToDoDialog = document.querySelector(".newToDoDialog");
        this.newToDoForm = document.querySelector(".newToDoForm");
        this.closeToDoButton = document.querySelector(".closeToDoFormButton");
        this.openToDoForm();
        this.submitToDoForm();
        this.closeToDoForm();
    }

    openToDoForm() {
        this.addToDoButton.addEventListener("click", () => {
            this.newToDoDialog.showModal();
        })
        return;
    };

    closeToDoForm() {
        this.closeToDoButton.addEventListener("click", () => {
            this.newToDoDialog.close();
        })
        return;
    }

    resetToDoForm() {
        document.getElementById("title").value = "";
        document.getElementById("description").value = "";
        document.getElementById("dueDate").value = "";
        const priorityRadios = document.querySelectorAll('input[name="priority"]')
        priorityRadios.forEach(radio => {
            radio.checked = false;
        })
    }

    submitToDoForm() {
        const newToDoForm = this.newToDoForm;
        newToDoForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const title = document.getElementById("title").value;
            const description = document.getElementById("description").value;
            const dueDate = document.getElementById("dueDate").value;
            const priority = document.querySelector('input[name="priority"]:checked').value;
            const newToDo = this.projectManager.defaultProject.createToDo(title, description, dueDate, priority);
            this.projectManager.defaultProject.addToDo(newToDo);
            this.resetToDoForm()
            this.newToDoDialog.close();
            console.log(this.projectManager);
        })
    }
}

const screenController = new ScreenController()
