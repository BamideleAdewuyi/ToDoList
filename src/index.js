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






// class Projects {
//     constructor() {
//         this.allProjects = [];
//     }

//     createProject(project) {
//         this.project = [];
//     }
//     addToProject(ToDo, array) {
//         array.push(ToDo)
//     }
// }

// class ToDo {
//     constructor(title, description, dueDate, priority) {
//         this.title = title;
//         this.description = description;
//         this.dueDate = dueDate;
//         this.priority = priority;
//     }
// };

// function CreateToDo(title, description, dueDate, priority) {
//     return new ToDo(title, description, dueDate, priority);
// };

// const Project = new Projects;
// // const testItem = CreateToDo("Cook", "Cooking", "Today", 1);

// // Project.addToProject(testItem, Project.allProjects);

// // console.log(Project)
// Project.createProject(cuisine)