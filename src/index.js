class Projects {
    constructor() {
        this.allProjects = [];
    }

    createProject(projectName) {
        const project = new Project(projectName);
        this.allProjects.push(project);
        return project;
    }
}

class Project {
    constructor(name) {
        this.name = name
        this.toDos = []
    }
    addToDo(toDo) {
        this.toDos.push(toDo);
    }
}