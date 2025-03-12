import TaskController from "../controllers/taskController";
import AppController from "../controllers/appController";

class TaskView {
    constructor() {
        this.taskController = new TaskController();
    }
}

export default TaskView;