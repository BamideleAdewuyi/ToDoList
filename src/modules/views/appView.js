import ProjectView from "./projectView";
import TaskView from "./taskView";

class AppView {
    constructor() {
        this.projectView = new ProjectView();
        this.taskView = new TaskView();
        this.projectForm = this.projectView.projectForm;
        this.taskForm = this.taskView.createTaskForm();
        this.taskArea = document.querySelector(".taskArea");
        this.createProjectButton = document.querySelector(".createProject");
        this.createTaskButton = document.querySelector(".addToDo");
        this.closeTaskFormButton = this.taskForm.querySelector(".closeToDoFormButton");
        this.closeProjectFormButton = this.projectForm.querySelector(".closeProjectFormButton");
        this.appendForms();
        this.addListeners();
        this.update();
    };

    update() {

    };

    addListeners() {
        this.createProjectButton.addEventListener("click", () => {
            this.openForm(this.projectForm);
        });

        this.closeProjectFormButton.addEventListener("click", () => {
            this.closeForm(this.projectForm)
        });

        this.projectForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const title = document.getElementById("projectTitle").value;
            const project = this.projectView.projectController.createProject(title, this.projectView.projectController.id);
            this.projectView.projectController.addProject(project);
            this.projectView.renderProjects();
            this.refreshTaskForm();
            this.closeForm(this.projectForm);
            this.resetForm(this.projectForm);
        });

        this.createTaskButton.addEventListener("click", () => {
            this.openForm(this.taskForm);
        });

        this.closeTaskFormButton.addEventListener("click", () => {
            this.closeForm(this.taskForm);
        });

        this.taskForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const title = document.getElementById("taskTitle").value;
            const description = document.getElementById("taskDescription").value;;
            const dueDate = document.getElementById("taskDueDate").value;;
            const priority = document.querySelector('input[name="taskPriority"]:checked')?.value;
            const project = document.getElementById("taskProject").value;
            const newTask = this.taskView.taskController.createTask(title, description, dueDate, priority, project, this.taskView.taskController.id);
            this.taskView.taskController.addTask(newTask, this.taskView.taskController.tasks);
            this.projectView.projectController.refreshProjects(this.taskView.taskController);
            console.log(newTask)
            console.log(this.projectView.projectController)
            this.closeForm(this.taskForm);
            this.resetForm(this.taskForm);
        })
    };

    refreshTaskForm() {
        const projectList = this.taskForm.querySelector("#taskProject");
        projectList.innerHTML = ``;
        for (const project of this.projectView.projectController.projects) {
            const newProject = document.createElement("option");
            newProject.setAttribute("id", project.id);
            newProject.textContent = project.title;
            projectList.append(newProject);
        }
    };

    appendForms() {
        this.taskArea.append(this.projectForm, this.taskForm)
    };

    openForm(form) {
        form.show();
    };

    closeForm(form) {
        form.close();
    };

    resetForm(dialog) {
        const form = dialog.querySelector("form");
        form.reset();
    };
};

export default AppView;