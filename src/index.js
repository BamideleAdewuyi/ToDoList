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

    findToDo(project, toDoTitle) {
        const toDo = project.toDos.find((obj) => obj.title === toDoTitle);
        return toDo;
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
        this.projectButton = document.querySelector(".sidebarProject");
        this.openToDoForm();
        this.submitToDoForm();
        this.closeToDoForm();
        this.openProjectForm();
        this.closeProjectForm();
        this.submitProjectForm();
        this.refreshProjectSelection();
        this.addProjectsToSidebar();
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
            this.refreshProjectSelection();
            this.addProjectsToSidebar();
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
            const project = this.projectManager.findProject(document.getElementById("project").value)
            const priority = document.querySelector('input[name="priority"]:checked').value;
            this.projectManager.createToDo(title, description, dueDate, priority, project);
            this.resetToDoForm();
            this.newToDoDialog.close();
            console.log(this.projectManager);
        })
        return;
    }

    refreshProjectSelection() {
        const select = document.getElementById("project");
        select.innerHTML = "";
        const projects = this.projectManager.projects;
        for (const project of projects) {
            const newProject = document.createElement("option");
            newProject.value = project.title;
            newProject.innerHTML = project.title;
            select.appendChild(newProject);
        }
        return;
    }

    addProjectsToSidebar() {
        const projectList = document.querySelector(".projectList");
        projectList.innerHTML = "";
        const projects = this.projectManager.projects;
        for (const project of projects) {
            const newProject = document.createElement("li");
            newProject.id = project.title;
            newProject.innerHTML = project.title;
            newProject.classList.add("sidebarProject");
            projectList.appendChild(newProject);
            this.displayProject(newProject);
        }
        return;
    }

    displayProject(newProject) {
        newProject.addEventListener("click", () => {
            const taskArea = document.querySelector(".taskArea");
            const toDos = this.projectManager.findProject(newProject.id).toDos;
            taskArea.innerHTML = "";
            taskArea.innerHTML = `<h4 class="toDoPreviewHeading">${newProject.id}</h4>`;
            console.log(newProject);
            console.log(toDos)
            for (const toDo of toDos) {
                const toDoPreview = document.createElement("div");
                console.log(toDo)
                toDoPreview.id = toDo.title;
                toDoPreview.classList.add("toDoPreview");
                toDoPreview.classList.add(`${toDo.priority}`);
                toDoPreview.innerHTML = `<p class="toDoPreviewTitle">Title: ${toDo.title}</p>
                                        <p class="toDoPreviewDueDate"> Due Date: ${toDo.dueDate}</p>`;
                taskArea.appendChild(toDoPreview);
            }
            
        })
    }

    // Expand todos
    expandToDo(projectTitle, toDoPreview) {
        toDoPreview.addEventListener("click", () => {
            const toDo = this.projectManager.findToDo(this.projectManager.findProject(projectTitle), toDoPreview.id);
            const toDoElement = document.createElement("dialog");
            const taskArea = document.querySelector(".taskArea");
            toDoElement.classList.add("fullToDo");
            toDoElement.textContent = `TESTING ONETWO`;
            toDoElement.showModal();
            taskArea.appendChild(toDoElement);
        })
    }

    // Delete Todo
    // move todo
    //delete project
    

}

const screenController = new ScreenController();

const projectManager = new ProjectManager();
const testProject = projectManager.createProject("TestPro");
projectManager.addProject(testProject);
const testToDo = projectManager.createToDo("TESTER", "TESTER", "TODAY", "HIGH", projectManager.findProject("TestPro"));
const anotherTestToDo = projectManager.createToDo("MMMM", "HMMM", "YESTERYEAR", "LOW", projectManager.findProject("TestPro"))

const result = projectManager.findToDo(projectManager.findProject("TestPro"), "TESTER");
console.log(result)