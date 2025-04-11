import Project from "../models/projects";

class ProjectController{
    constructor() {
        this.projects = [];
        this.id = 1;
        if (this.storageAvailable("localStorage")) {
            const stored = localStorage.getItem("projects");
            if (stored) {
                const parsed = JSON.parse(stored);
                this.projects = parsed.map(p => {
                    const project = new Project(p.title, p.id);
                    project.tasks = p.tasks || [];
                    return project;
                })
                const maxId = Math.max(...this.projects.map(p => p.id), 0);
                this.id = maxId + 1;
            }
        }
        console.log(this.projects)
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
        if (this.storageAvailable("localStorage")) {
            const projectData = this.projects.map((project) => ({
                title: project.title,
                id: project.id,
                tasks: project.tasks
            }));
            localStorage.setItem("projects", JSON.stringify(projectData));
        }
        else {
            console.warn("Local storage not available.")
        }
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
        this.saveProjects();
    };

};

export default ProjectController;