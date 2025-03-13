import ProjectController from "../controllers/projectController";

class ProjectView {
    constructor() {
        this.appController = new AppController();
        this.projectController = this.appController.projectController;
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