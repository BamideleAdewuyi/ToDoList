import Project from "../models/projects";

class ProjectController{
    constructor() {
        this.projects = [];
    }

    addProject(title) {
        const project = new Project(title);
        return project;
    }
}