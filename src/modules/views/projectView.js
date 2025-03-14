import ProjectController from "../controllers/projectController";

class ProjectView {
    constructor() {
        this.projectController = new ProjectController();
        this.projectList = document.querySelector(".projectList");
        this.taskArea = document.querySelector(".taskArea");
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
        const projectPreview = document.createElement("div");
        const projectPreviewHeading = document.createElement("h4");
        projectPreviewHeading.textContent = project.title;
        projectPreview.classList.add("projectPreview");
        projectPreview.append(projectPreviewHeading);
        this.taskArea.append(projectPreview)

    }
}

export default ProjectView;