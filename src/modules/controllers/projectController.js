import Project from "../models/projects";

class ProjectController{
    constructor() {
        this.projects = [];
        this.id = 1;
    };

    storageAvailable(type) {
        let storage;
        try {
          storage = window[type];
          const x = "__storage_test__";
          storage.setItem(x, x);
          storage.removeItem(x);
          return true;
        } catch (e) {
          return (
            e instanceof DOMException &&
            e.name === "QuotaExceededError" &&
            // acknowledge QuotaExceededError only if there's something already stored
            storage &&
            storage.length !== 0
          );
        }
    }

    saveProjects() {

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