import ProjectView from "./projectView";
import TaskView from "./taskView";

class AppView {
    constructor() {
        this.projectView = new ProjectView();
        this.taskView = new TaskView();
        this.taskArea = document.querySelector(".taskArea");
        this.update();
    };

    update() {
        this.addListeners()
    };

    addListeners() {
        const forms = this.createForms();
        const taskForm = forms.taskForm;
        this.taskArea.append(taskForm);
        const projectForm = forms.projectForm;

        const addTaskButton = document.querySelector(".addToDo");
        const createProjectButton = document.querySelector(".createProject");
        
        const closeTaskFormButton = document.querySelector(".closeToDoFormButton");
        
        addTaskButton.addEventListener("click", () => {
            this.openForm(taskForm)
            this.update();
        });

        createProjectButton.addEventListener("click", () => {
            this.taskArea.append(projectForm);
            this.openForm(projectForm);
            this.update();
        });

        // createTaskForm.addEventListener("click", () => {

        // })
    };

    createForms() {
        const newTaskForm = this.createTaskForm();
        const newProjectForm = this.createProjectForm();
        return {
            taskForm: newTaskForm,
            projectForm: newProjectForm
        }
    }

    createTaskForm() {
        const dialog = document.createElement("dialog");
        dialog.classList.add("createTaskForm")
        // const form = document.createElement("form");
        // const titleLabel = document.createElement("label");
        // titleLabel.textContent = "Title";
        // const title = document.createElement("input");
        const form = document.createElement("form");
        form.innerHTML = `<form action="#" class="newToDoForm">
                         <h3>New ToDo</h3>
                         <label for="title">Title</label>
                         <input type="text" placeholder="Title" name="title" id="title" required>
                         <label for="description">Description</label>
                         <input type="text" placeholder="Description" name="description" id="description" required>
                         <label for="dueDate">Due Date</label>
                         <input type="date" name="dueDate" id="dueDate" required>
                         <div class="selectPriority">
                             <p>Select priority</p>
                             <label for="low">Low</label>
                             <input type="radio" id="low" name="priority" value="low" required/>
                             <label for="medium">Medium</label>
                             <input type="radio" id="medium" name="priority" value="medium"/>
                             <label for="high">High</label>
                             <input type="radio" id="high" name="priority" value="high"/>
                         </div>
                         <label for="project">Select project</label>
                         <select name="project" id="project">
 
                         </select>
                         <button class="submit" id="createToDo">Add ToDo</button>
                         <button type="button" class="closeToDoFormButton" autofocus>Close</button>
                     </form>
        `
        dialog.append(form);
        return dialog;
    };

    createProjectForm() {
        const dialog = document.createElement("dialog");
        const form = document.createElement("form");
        form.innerHTML = `<form action="#" class="newProjectForm">
                        <h3>New Project</h3>
                        <label for="title">Title</label>
                        <input type="text" placeholder="Title" name="title" id="title" required>
                        <button class="submit" id="createProject">Add Project</button>
                        <button type="button" class="closeProjectFormButton" autofocus>Close</button>
                        </form>
                        `
        dialog.append(form);
        return dialog;
    };

    openForm(form) {
        form.show();
    };

    closeForm(form) {
        form.close();
    }
};

export default AppView;