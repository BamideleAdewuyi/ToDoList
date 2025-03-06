import TaskController from "./taskController";
import ProjectController from "./projectController";

class AppController{
    constructor() {
        this.taskController = new TaskController();
        this.projectController = new ProjectController();
    };

    refreshProjects() {
        
    }

    
}

export default AppController;