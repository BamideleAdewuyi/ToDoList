import TaskController from "./taskController";
import ProjectController from "./projectController";

class AppController{
    constructor() {
        this.taskController = new TaskController();
        this.projectController = new ProjectController();
    };

    refreshProjects() {
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

export default AppController;