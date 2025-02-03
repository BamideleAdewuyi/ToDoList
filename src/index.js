import "./style.css";

class ProjectManager {
    constructor() {
        this.projects = [];
        this.defaultProject = this.createProject("Default");
        this.addProject(this.defaultProject);
    }

    createProject(title) {
        const newProject = new Project(title);
        return newProject;
    }

    findProject(projectTitle) {
        const project = this.projects.find((obj) => obj.title === projectTitle);
        return project;
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
        fromThisProject.toDos = fromThisProject.removeItemOnce(fromThisProject.toDos, toDo);
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
        this.addToDoButton = document.querySelector(".addToDo");
        this.newToDoDialog = document.querySelector(".newToDoDialog");
        this.newToDoForm = document.querySelector(".newToDoForm");
        this.closeToDoFormButton = document.querySelector(".closeToDoFormButton");
        this.addProjectButton = document.querySelector(".createProject");
        this.closeNewProjectFormButton = document.querySelector(".closeProjectForm");
        this.newProjectDialog = document.querySelector(".newProjectDialog");
        this.createProjectForm = document.querySelector(".createProjectForm");
        this.openToDoForm();
        this.submitToDoForm();
        this.closeToDoForm();
        this.openProjectForm();
        this.closeProjectForm();
        this.submitProjectForm();
        this.refreshProjects();
    }

    openProjectForm() {
        this.addProjectButton.addEventListener("click", () => {
            this.newProjectDialog.showModal();
        });
        return;
    }

    closeProjectForm() {
        this.closeNewProjectFormButton.addEventListener("click", () => {
            this.newProjectDialog.close();
        });
        return;
    }

    resetProjectForm() {
        document.getElementById("newProjectTitle").value = "";
        return;
    }

    submitProjectForm() {
        this.createProjectForm.addEventListener("submit", (e) => {
            e.preventDefault()
            const newProjectTitle = document.getElementById("newProjectTitle").value;
            const newProject = this.projectManager.createProject(newProjectTitle);
            this.projectManager.addProject(newProject);
            console.log(this.projectManager);
            this.resetProjectForm();
            this.newProjectDialog.close();
            this.refreshProjects();
        })
        return;
    }

    openToDoForm() {
        this.addToDoButton.addEventListener("click", () => {
            this.newToDoDialog.showModal();
        })
        return;
    };

    closeToDoForm() {
        this.closeToDoFormButton.addEventListener("click", () => {
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
        return;
    }

    submitToDoForm() {
        this.newToDoForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const title = document.getElementById("title").value;
            const description = document.getElementById("description").value;
            const dueDate = document.getElementById("dueDate").value;
            // const project = document.querySelector("#project").value;
            const project = this.projectManager.findProject(document.getElementById("project").value)
            const priority = document.querySelector('input[name="priority"]:checked').value;
            // const testProject = this.projectManager.createProject("FENEERIO")
            // this.projectManager.addProject(testProject)
            console.log(project)
            this.projectManager.createToDo(title, description, dueDate, priority, project);
            // this.projectManager.addToDo(newToDo, project);
            this.resetToDoForm();
            this.newToDoDialog.close();
            console.log(this.projectManager);
        })
        return;
    }

    refreshProjects() {
        const select = document.getElementById("project");
        select.innerHTML = "";
        const projects = this.projectManager.projects;
        for (const project of projects) {
            const newProject = document.createElement("option");
            newProject.value = project.title;
            // newProject.id = project.title;
            newProject.innerHTML = project.title;
            select.appendChild(newProject);
        }
        return;
        // for (const [key, value] of Object.entries(projects)) {
        //     const newProject = document.createElement("option");
        //     newProject.value = key;
        //     newProject.id = key;
        //     newProject.innerHTML = key;
        //     select.appendChild(newProject);
        // }



        // const select = document.getElementById("project");
        // select.innerHTML = ""; // Clear existing options
        // const projects = this.projectManager.projects; // Get all projects
        // for (const project of projects) {
        //     const newProject = document.createElement("option");
        //     newProject.value = project.title; // Set the value to the project title
        //     newProject.id = project.title; // Assign an ID to the option
        //     newProject.innerHTML = project.title; // Set the inner text (displayed text) to the project title
        //     select.appendChild(newProject); // Add the option to the select element
        // }
        // return;
        // return;
    }


}

const screenController = new ScreenController();

// const projectManager = new ProjectManager();
// const fennerio = projectManager.createProject("Fennerio")
// projectManager.addProject(fennerio)
// const fennerioToDo = projectManager.createToDo("FENNERIO", "PEGGY", "TODAY", "HIGH", fennerio)
// console.log(projectManager)
// console.log(projectManager.projects.find((project => project.title === "Fennerio")))
// const theOneIWant = projectManager.findProject("Fennerio")
// console.log(theOneIWant)


console.log(screenController.projectManager.findProject(document.querySelector("#project").value))