import TaskController from "../controllers/taskController";

class TaskView {
    constructor() {
        this.appController = new AppController();
        this.taskController = this.appController.taskController;
    }
}

export default TaskView;