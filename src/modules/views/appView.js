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
        this.projectForm = this.projectView.createProjectForm();
        this.closeProjectFormButton = this.projectForm.querySelector(".closeProjectFormButton");
        this.projectList = document.querySelector(".projectList");
        this.taskArea = document.querySelector(".taskArea");
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
            this.renderProjects();
            this.refreshTaskForm(this.taskForm);
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
            const projectId = Number(this.getSelectedOption(document.getElementById("taskProject")).id);
            const newTask = this.taskView.taskController.createTask(title, description, dueDate, priority, projectId, this.taskView.taskController.id);
            this.taskView.taskController.addTask(newTask, this.taskView.taskController.tasks);
            this.projectView.projectController.refreshProjects(this.taskView.taskController);
            this.closeForm(this.taskForm);
            this.resetForm(this.taskForm);
        });
    };

    createSidebarProject(project) {
        const sidebarProject = document.createElement("li");
        sidebarProject.classList.add("sideBarProject");
        sidebarProject.id = project.title;
        sidebarProject.textContent = project.title;
        return sidebarProject;
    };

    renderProjects() {
        this.projectList.innerHTML = "";
        for (const project of this.projectView.projectController.projects) {
            const sidebarProject = this.createSidebarProject(project)
            this.projectList.append(sidebarProject);
            sidebarProject.addEventListener("click", () => this.previewProject(project));
        }
        return;
    };

    previewProject(project) {
        const currentPreview = this.taskArea.querySelector(".projectPreview");
        if (currentPreview) {
            currentPreview.remove();
        };
        
        const projectPreview = document.createElement("div");
        const projectPreviewHeading = document.createElement("h4");
        projectPreviewHeading.textContent = project.title;
        projectPreview.classList.add("projectPreview");
        projectPreview.append(projectPreviewHeading);
        for (const task of project.tasks) {
            const taskPreview = this.previewTask(task);
            const detailsButton = taskPreview.querySelector(".expandButton")
            const taskForm = this.taskView.createTaskForm();
            this.refreshTaskForm(taskForm);
            const editTaskForm = this.fillTaskForm(taskForm, task);
            detailsButton.addEventListener("click", () => {
                this.taskArea.append(editTaskForm.form);
                this.openForm(editTaskForm.form);
                this.submitEditedTask(editTaskForm.form, editTaskForm.editButton, editTaskForm.closeButton, editTaskForm.task);
            });
            projectPreview.append(taskPreview);
        }
        this.taskArea.append(projectPreview)

    };

    previewTask(task) {
        const taskPreview = document.createElement("div");
        taskPreview.classList.add("taskPreview");
        taskPreview.setAttribute("id", task.title+task.id);
        const taskHeading = document.createElement("h5");
        taskHeading.textContent = task.title;
        const taskDueDate = document.createElement("p");
        taskDueDate.textContent = task.dueDate;
        const expandButton = document.createElement("button");
        expandButton.textContent = "See details";
        expandButton.classList.add("expandButton");
        taskPreview.append(taskHeading, taskDueDate, expandButton);
        return taskPreview;
    };

    getSelectedOption(selectElement) {
        const selectedOption = selectElement.options[selectElement.selectedIndex];
        return selectedOption;
    };

    refreshTaskForm(taskForm) {
        const projectList = taskForm.querySelector("#taskProject");
        projectList.innerHTML = ``;
        for (const project of this.projectView.projectController.projects) {
            const newProject = document.createElement("option");
            newProject.setAttribute("id", project.id)
            newProject.setAttribute("value", project.id);
            newProject.textContent = project.title;
            projectList.append(newProject);
        }
    };

    fillTaskForm(taskForm, task) {
        const editTaskButton = taskForm.querySelector("#createToDo");
        editTaskButton.textContent = "Edit Task"
        const closeFormButton = taskForm.querySelector(".closeToDoFormButton");
        const title = taskForm.querySelector("#taskTitle");
        title.value = task.title;
        const description = taskForm.querySelector("#taskDescription");
        description.value = task.description;
        const dueDate = taskForm.querySelector("#taskDueDate");
        dueDate.value = task.dueDate;
        const priority = taskForm.querySelector("#taskPriority");
        const selectedPriority = priority.querySelector(`#${task.priority}`)
        selectedPriority.checked = true;
        const project = taskForm.querySelector("#taskProject")
        const selectedProject = project.querySelector(`#\\3${task.projectId}`)
        if (selectedProject) {
            selectedProject.selected = true;
        }
        return {
            form: taskForm,
            editButton: editTaskButton,
            closeButton: closeFormButton,
            task: task
        };
    };

    submitEditedTask(taskForm, editButton, closeButton, task) {
        closeButton.addEventListener("click", () => this.closeForm(taskForm))
        
        editButton.addEventListener("click", (e) => {
            e.preventDefault();
            const title = taskForm.querySelector("#taskTitle").value;
            const description = taskForm.querySelector("#taskDescription").value;;
            const dueDate = taskForm.querySelector("#taskDueDate").value;;
            const priority = taskForm.querySelector('input[name="taskPriority"]:checked')?.value;
            const projectId = Number(this.getSelectedOption(taskForm.querySelector("#taskProject")).id);
            const project = this.projectView.projectController.getProject(task.projectId)
            this.taskView.taskController.editTask(task, title, description, dueDate, priority, projectId);
            this.projectView.projectController.refreshProjects(this.taskView.taskController);
            this.previewProject(project)
            this.closeForm(taskForm);
        })
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