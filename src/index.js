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

    editToDo(toDo, title, description, dueDate, priority, project) {
        toDo.title = title;
        toDo.description = description;
        toDo.dueDate = dueDate;
        toDo.priority = priority;
        toDo.project = project;
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
        fromThisProject.toDos = this.removeItemOnce(fromThisProject.toDos, toDo);
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
        // this.openToDoForm();
        // this.submitToDoForm();
        // this.closeToDoForm();
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

    createToDoForm() {
        const mainArea = document.querySelector(".mainArea");
        const toDoForm = document.createElement("dialog");
        toDoForm.innerHTML = `<form action="#" class="newToDoForm">
                        <h3>New ToDo</h3>
                        <label for="title">Title</label>
                        <input type="text" placeholder="Title" name="title" id="title" required>
                        <label for="description">Description</label>
                        <input type="text" placeholder="Description" name="description" id="description" required>
                        <label for="dueDate">Due Date</label>
                        <input type="date" name="dueDate" id="dueDate" required>
                        <div class="selectPriority">
                            <p>Select priority</p>
                            <label for="low">Low</label>
                            <input type="radio" id="low" name="priority" value="low" required/>
                            <label for="medium">Medium</label>
                            <input type="radio" id="medium" name="priority" value="medium"/>
                            <label for="high">High</label>
                            <input type="radio" id="high" name="priority" value="high"/>
                        </div>
                        <label for="project">Select project</label>
                        <select name="project" id="project">
                            
                        </select>
                        <button class="submit" id="createToDo">Add ToDo</button>
                        <button type="button" class="closeToDoFormButton" autofocus>Close</button>
                    </form>`
        mainArea.append(toDoForm);
        return;
    };

    // openToDoForm() {
    //     this.addToDoButton.addEventListener("click", () => {
    //         this.newToDoDialog.showModal();
    //     })
    //     return;
    // };

    // closeToDoForm() {
    //     this.closeToDoFormButton.addEventListener("click", () => {
    //         this.newToDoDialog.close();
    //     })
    //     return;
    // }

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
            this.displayProject(project.title);
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
            newProject.addEventListener("click", () => {
                this.displayProject(newProject.id);
            })
        }
        return;
    }

    displayProject(project) {
        const taskArea = document.querySelector(".taskArea");
        const toDos = this.projectManager.findProject(project).toDos;
        taskArea.innerHTML = "";
        taskArea.innerHTML = `<h4 class="toDoPreviewHeading">${project}</h4>`;

        for (const toDo of toDos) {
            const toDoPreview = document.createElement("div");
            toDoPreview.id = toDo.title;
            toDoPreview.classList.add("toDoPreview");
            toDoPreview.classList.add(`${toDo.priority}`);
            toDoPreview.innerHTML = `<p class="toDoPreviewTitle">Title: ${toDo.title}</p>
                                    <p class="toDoPreviewDueDate"> Due Date: ${toDo.dueDate}</p>`;
            taskArea.appendChild(toDoPreview);
            console.log("Project ID: "+ project);
            toDoPreview.addEventListener("click", () => {
                this.expandToDo(project, toDoPreview);
            });
        }
            
        
    }

    // Expand todos
    expandToDo(projectTitle, toDoPreview) {
        const project = this.projectManager.findProject(projectTitle);
        const toDo = this.projectManager.findToDo(project, toDoPreview.id);
        const toDoElement = document.createElement("div");
        const taskArea = document.querySelector(".taskArea");
        toDoElement.classList.add("fullToDo");
        const toDoTitle = document.createElement("h3");
        toDoTitle.textContent = toDo.title;
        const toDoDescription = document.createElement("p");
        toDoDescription.textContent = toDo.description;
        const toDoProject = document.createElement("p");
        toDoProject.textContent = toDo.project;
        const toDoDueDate = document.createElement("p");
        toDoDueDate.textContent = toDo.dueDate;
        const toDoPriority = document.createElement("p");
        toDoPriority.textContent = toDo.priority;
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        const editButton = document.createElement("button");
        editButton.textContent = "Edit";
        this.deleteParentAndToDo(deleteButton, toDoElement, toDo, project);
        toDoElement.append(toDoTitle, toDoDescription, toDoProject, toDoDueDate, toDoPriority, deleteButton, editButton);
        taskArea.innerHTML = "";
        taskArea.appendChild(toDoElement);
    }

    deleteParentAndToDo(button, element, toDo, project) {
        button.addEventListener("click", () => {
            element.remove();
            this.projectManager.deleteToDo(toDo, project);
        })
    }

    // move todo
    //delete project
    

}

const screenController = new ScreenController();

// const projectManager = new ProjectManager();
// const testProject = projectManager.createProject("TestPro");
// const otherTestProject= projectManager.createProject("OTHERCHANGETEST")
// projectManager.addProject(testProject);
// projectManager.addProject(otherTestProject)
// const testToDo = projectManager.createToDo("TESTER", "TESTER", "TODAY", "HIGH", projectManager.findProject("TestPro"));
// console.log(testProject)
// projectManager.editToDo(testToDo, "CHANGED", "CHANGED", "CHANGED", "CHANGED", otherTestProject)