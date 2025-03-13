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

    refreshProjects(projectController, taskController) {
        this.projectController.clearProjects();
        for (const task of this.taskController.tasks) {
            for (const project of this.projectController.projects) {
                if (task.project === project.title) {
                    this.taskController.addTask(task, project.tasks)
                }
            }
        }
    };

};

export default ProjectController;