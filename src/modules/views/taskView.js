import AppController from "../controllers/appController";

class TaskView {
    constructor() {
        this.appController = new AppController();
        this.taskController = this.appController.taskController;
    }
}

export default TaskView;