import TaskController from "./taskController";
import ProjectController from "./projectController";

class AppController{
    constructor() {
        this.taskController = new TaskController();
        this.projectController = new ProjectController();
        this.tasks = this.taskController.tasks
        this.projects = this.projectController.projects;
    };

    refreshProjects() {

    };

    
};

export default AppController;