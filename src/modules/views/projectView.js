import ProjectController from "../controllers/projectController";

class ProjectView {
    constructor() {
        this.projectController = new ProjectController();
        this.projectList = document.querySelector(".projectList");
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
        }
        return;
    };
}

export default ProjectView;