import ProjectView from "./projectView";
import TaskView from "./taskView";

class AppView {
    constructor() {
        this.projectView = new ProjectView();
        this.taskView = new TaskView();
        this.taskArea = document.querySelector(".taskArea");
        this.forms = this.createForms();
        this.addListeners();
        this.update();
    };

    update() {

    };

    addListeners() {
        const taskForm = this.forms.taskForm;
        const projectForm = this.forms.projectForm;
        const addTaskButton = document.querySelector(".addToDo");
        const createProjectButton = document.querySelector(".createProject");
        const closeTaskFormButton = taskForm.querySelector(".closeToDoFormButton");
        const closeProjectFormButton = projectForm.querySelector(".closeProjectFormButton");
        this.taskArea.append(taskForm, projectForm);

        addTaskButton.addEventListener("click", () => {
            this.openForm(taskForm);
        });

        closeTaskFormButton.addEventListener("click", () => {
            this.closeForm(taskForm);
        });

        createProjectButton.addEventListener("click", () => {
            this.taskArea.append(projectForm);
            this.openForm(projectForm);
        });

        closeProjectFormButton.addEventListener("click", () => {
            this.closeForm(projectForm);
        });
    };

    createForms() {
        const newTaskForm = this.createTaskForm();
        const newProjectForm = this.createProjectForm();
        return {
            taskForm: newTaskForm,
            projectForm: newProjectForm
        }
    };

    createTaskForm() {
        const dialog = document.createElement("dialog");
        dialog.classList.add("createTaskForm")
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

// class AppView {
//     constructor() {
//         this.projectView = new ProjectView();
//         this.taskView = new TaskView();
//         this.taskArea = document.querySelector(".taskArea");

//         // Create forms once in the constructor
//         this.forms = this.createForms();

//         // Attach listeners once
//         this.addListeners();
//     };

//     addListeners() {
//         const taskForm = this.forms.taskForm;
//         const projectForm = this.forms.projectForm;
//         const addTaskButton = document.querySelector(".addToDo");
//         const createProjectButton = document.querySelector(".createProject");
//         const closeTaskFormButton = taskForm.querySelector(".closeToDoFormButton");
//         const closeProjectFormButton = projectForm.querySelector(".closeProjectFormButton");

//         addTaskButton.addEventListener("click", () => {
//             this.openForm(taskForm);
//         });

//         closeTaskFormButton.addEventListener("click", () => {
//             this.closeForm(taskForm);
//         });

//         createProjectButton.addEventListener("click", () => {
//             this.taskArea.append(projectForm);
//             this.openForm(projectForm);
//         });

//         closeProjectFormButton.addEventListener("click", () => {
//             this.closeForm(projectForm);
//         });
//     };

//     createForms() {
//         const newTaskForm = this.createTaskForm();
//         const newProjectForm = this.createProjectForm();
//         return {
//             taskForm: newTaskForm,
//             projectForm: newProjectForm
//         }
//     }

//     createTaskForm() {
//         const dialog = document.createElement("dialog");
//         dialog.classList.add("createTaskForm")
//         const form = document.createElement("form");
//         form.innerHTML = `<form action="#" class="newToDoForm">
//                          <h3>New ToDo</h3>
//                          <label for="title">Title</label>
//                          <input type="text" placeholder="Title" name="title" id="title" required>
//                          <label for="description">Description</label>
//                          <input type="text" placeholder="Description" name="description" id="description" required>
//                          <label for="dueDate">Due Date</label>
//                          <input type="date" name="dueDate" id="dueDate" required>
//                          <div class="selectPriority">
//                              <p>Select priority</p>
//                              <label for="low">Low</label>
//                              <input type="radio" id="low" name="priority" value="low" required/>
//                              <label for="medium">Medium</label>
//                              <input type="radio" id="medium" name="priority" value="medium"/>
//                              <label for="high">High</label>
//                              <input type="radio" id="high" name="priority" value="high"/>
//                          </div>
//                          <label for="project">Select project</label>
//                          <select name="project" id="project">
 
//                          </select>
//                          <button class="submit" id="createToDo">Add ToDo</button>
//                          <button type="button" class="closeToDoFormButton" autofocus>Close</button>
//                      </form>
//         `
//         dialog.append(form);
//         return dialog;
//     };

//     createProjectForm() {
//         const dialog = document.createElement("dialog");
//         const form = document.createElement("form");
//         form.innerHTML = `<form action="#" class="newProjectForm">
//                         <h3>New Project</h3>
//                         <label for="title">Title</label>
//                         <input type="text" placeholder="Title" name="title" id="title" required>
//                         <button class="submit" id="createProject">Add Project</button>
//                         <button type="button" class="closeProjectFormButton" autofocus>Close</button>
//                         </form>
//                         `
//         dialog.append(form);
//         return dialog;
//     };

//     openForm(form) {
//         form.show();
//     };

//     closeForm(form) {
//         form.close();
//     }
// };

// export default AppView;