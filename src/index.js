class Projects {
    constructor() {
        this.allProjects = [];
    }
}

class ToDo {
    constructor(title, description, dueDate, priority) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
    }
};

function CreateToDo(title, description, dueDate, priority) {
    return new ToDo(title, description, dueDate, priority);
};

function AddToProjects(ToDo, Projects, project) {
    Projects.project.append(ToDo);
    return;
};