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

    renderProjects(projectList) {
        for (const project of this.projectController.projects()) {
            const sidebarProject = this.createSidebarProject(project)
            projectList.append(sidebarProject);
        }
        return;
    };
}

export default ProjectView;