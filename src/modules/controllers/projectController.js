import Project from "../models/projects";

class ProjectController{
    constructor() {
        this.projects = [];
    }

    createProject(title) {
        const project = new Project(title);
        return project;
    }

    addProject(project) {
        this.projects.push(project);
        return;
    }

    getProject(title) {
        const project = this.projects.find((obj) => obj.title === title);
        return project;
    }


};

export default ProjectController;