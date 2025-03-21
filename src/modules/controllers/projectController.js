import Project from "../models/projects";

class ProjectController{
    constructor() {
        this.projects = [];
    };

    createProject(title) {
        const project = new Project(title);
        return project;
    };

    addProject(project) {
        this.projects.push(project);
        return;
    };

    getProject(title) {
        const project = this.projects.find((obj) => obj.title === title);
        return project;
    };

    clearProjects() {
        for (const project of this.projects) {
            project.tasks = [];
        }
    };

    refreshProjects(taskController) {
        this.clearProjects();
        for (const task of taskController.tasks) {
            for (const project of this.projects) {
                if (task.project === project.title) {
                    taskController.addTask(task, project.tasks)
                }
            }
        }
    };

};

export default ProjectController;