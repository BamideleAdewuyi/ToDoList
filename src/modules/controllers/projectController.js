import Project from "../models/projects";

class ProjectController{
    constructor() {
        this.projects = [];
    }

    addProject(title) {
        const project = new Project(title);
        return project;
    }

    getProject(title) {
        const project = this.projects.find((obj) => pbj.title === title);
        return project;
    }
};

export default ProjectController;