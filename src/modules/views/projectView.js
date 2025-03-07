import ProjectController from "../controllers/projectController";

class ProjectView {
    constructor() {
        this.projectController = new ProjectController();
    }

    createSidebarProject(project) {
        const sidebarProject = document.createElement("li");
        sidebarProject.classList.add("sideBarProject");
        sidebarProject.textContent = project.title;
        return sidebarProject;
    };

    renderProjects() {

    }
}