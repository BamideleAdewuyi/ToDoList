import ProjectController from "../controllers/projectController";

class ProjectView {
    constructor() {
        this.projectController = new ProjectController();
        this.projectForm = this.createProjectForm();
        this.projectList = document.querySelector(".projectList");
        this.taskArea = document.querySelector(".taskArea");
        this.createProjectButton = document.querySelector(".createProject");
        this.closeProjectFormButton = this.projectForm.querySelector(".closeProjectFormButton");
        this.addListeners();
    }

    createSidebarProject(project) {
        const sidebarProject = document.createElement("li");
        sidebarProject.classList.add("sideBarProject");
        sidebarProject.id = project.title;
        sidebarProject.textContent = project.title;
        return sidebarProject;
    };

    renderProjects() {
        this.projectList.innerHTML = "";
        for (const project of this.projectController.projects) {
            const sidebarProject = this.createSidebarProject(project)
            this.projectList.append(sidebarProject);
            sidebarProject.addEventListener("click", () => this.previewProject(project));
        }
        return;
    };

    previewProject(project) {
        this.taskArea.innerHTML = "";
        const projectPreview = document.createElement("div");
        const projectPreviewHeading = document.createElement("h4");
        projectPreviewHeading.textContent = project.title;
        projectPreview.classList.add("projectPreview");
        projectPreview.append(projectPreviewHeading);
        for (const task of project.tasks) {
            projectPreview.append(this.previewTask(task));
        }
        this.taskArea.append(projectPreview)

    };

    previewTask(task) {
        const taskPreview = document.createElement("div");
        taskPreview.classList.add("taskPreview");
        const taskHeading = document.createElement("h5");
        taskHeading.textContent = task.title;
        const taskDueDate = document.createElement("p");
        taskDueDate.textContent = task.dueDate;
        taskPreview.append(taskHeading, taskDueDate);
        return taskPreview;
    };

    createProjectForm() {
        const dialog = document.createElement("dialog");
        const form = document.createElement("form");
        form.innerHTML = `<form action="#" class="newProjectForm">
                        <h3>New Project</h3>
                        <label for="projectTitle">Title</label>
                        <input type="text" placeholder="Title" name="projectTitle" id="projectTitle" required>
                        <button class="submit" id="createProject">Add Project</button>
                        <button type="button" class="closeProjectFormButton" autofocus>Close</button>
                        </form>
                        `
        dialog.append(form);
        return dialog;
    };

    addListeners() {
        this.createProjectButton.addEventListener("click", () => {
            this.openProjectForm();
        })

        this.closeProjectFormButton.addEventListener("click", () => {
            this.closeProjectForm();
        })

        this.projectForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const title = document.getElementById("projectTitle");
            const project = this.projectController.createProject(title.value);
            this.projectController.addProject(project);
            this.renderProjects();
            this.closeProjectForm();
            this.resetForm();
        })
    };

    openProjectForm() {
        this.projectForm.show();
    };

    closeProjectForm() {
        this.projectForm.close();
    };

    resetForm() {
        const form = this.projectForm.querySelector("form");
        form.reset();
    }
}

export default ProjectView;