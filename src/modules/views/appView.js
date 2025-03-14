import ProjectView from "./projectView";
import TaskView from "./taskView";

class AppView {
    constructor() {
        this.projectView = new ProjectView();
        this.taskView = new TaskView();
        this.update();
    };

    update() {

    };

    addListeners() {

    };
};

export default AppView;