class Projects {
    constructor() {
        this.allProjects = [];
    }

    createProject(projectName) {
        const project = new Projects(projectName);
        this.allProjects.push(project);
        return project;
    }

}