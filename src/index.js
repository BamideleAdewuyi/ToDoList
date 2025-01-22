// Set up projects arrays that items will be added to
class Projects {
    constructor() {
        this.allProjects = [];
    }
}

// ToDo list items
class ToDo {
    constructor(title, description, dueDate, priority) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
    }
}