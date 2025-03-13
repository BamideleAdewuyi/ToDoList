import ProjectController from "../controllers/projectController";

class ProjectView {
    constructor() {
        this.projectController = new ProjectController();
        this.projectList = document.querySelector(".projectList");
    }

    createSidebarProject(project) {
        const sidebarProject = document.createElement("li");
        sidebarProject.classList.add("sideBarProject");
        sidebarProject.textContent = project.title;
        return sidebarProject;
    };

    renderProjects(projectList) {
        // for (const project of this.projectController.projects()) {
            // const sidebarProject = this.createSidebarProject(project)
            // projectList.append(sidebarProject);
        //     console.log(project)
        // }
        console.log(this.projectController.projects)
        return;
    };
}

export default ProjectView;