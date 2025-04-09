import Project from "../models/projects";
import { compareAsc, format} from "date-fns";

class ProjectController{
    constructor() {
        this.projects = [];
        this.id = 1;
    };

    createProject(title, id) {
        const project = new Project(title, id);
        this.id += 1;
        return project;
    };

    addProject(project) {
        this.projects.push(project);
        return;
    };

    getProject(id) {
        const project = this.projects.find((obj) => obj.id === id);
        return project;
    };

    clearProjects() {
        for (const project of this.projects) {
            project.tasks = [];
        }
    };

    sortTasks() {

    }
    
    refreshProjects(taskController) {
        this.clearProjects();
        for (const task of taskController.tasks) {
            for (const project of this.projects) {
                if (task.projectId === project.id) {
                    taskController.addTask(task, project.tasks)
                }
            }
        }
    };

};

export default ProjectController;