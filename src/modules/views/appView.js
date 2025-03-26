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
        })

        this.projectForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const title = document.getElementById("projectTitle").value;
            const project = this.projectView.projectController.createProject(title);
            this.projectView.projectController.addProject(project);
            this.projectView.renderProjects();
            this.closeForm(this.projectForm);
            this.resetForm(this.projectForm);
        })
    };

    appendForms() {
        this.taskArea.append(this.projectForm, this.taskView.taskForm)
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

// May have to set up listeners in projectView and taskView




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

// I see the issue now! The problem is that in AppView, you are trying to access this.closeProjectFormButton directly, but that element (in ProjectView) is not being correctly referenced until after the form is created. Here's a breakdown of the problem:

// In ProjectView, the this.closeProjectFormButton is set in the initialize() method after the form has been created.

// In AppView, you are trying to add an event listener to this.closeProjectFormButton in the addListeners() method, which is run before initialize() in ProjectView has been called. So this.closeProjectFormButton is still null.

// Solution:
// Instead of setting up the listener for closeProjectFormButton directly in AppView, make sure to use a method in ProjectView that sets up the listeners. This way, you encapsulate the logic for button references within ProjectView and ensure the elements are properly set up before the listeners are added.

// Here's the corrected approach:
// ProjectView.js
// In this file, you will not just create the form but also add event listeners for the buttons inside ProjectView itself. This will ensure the button references are set correctly before any listeners are used.

// javascript
// Copy
// import ProjectController from "../controllers/projectController";

// class ProjectView {
//     constructor() {
//         this.projectController = new ProjectController();
//         this.projectForm = this.createProjectForm();
//         this.projectList = document.querySelector(".projectList");
//         this.taskArea = document.querySelector(".taskArea");
//         this.createProjectButton = document.querySelector(".createProject");
//         this.closeProjectFormButton = null;
//     }

//     createSidebarProject(project) {
//         const sidebarProject = document.createElement("li");
//         sidebarProject.classList.add("sideBarProject");
//         sidebarProject.id = project.title;
//         sidebarProject.textContent = project.title;
//         return sidebarProject;
//     }

//     renderProjects() {
//         this.projectList.innerHTML = "";
//         for (const project of this.projectController.projects) {
//             const sidebarProject = this.createSidebarProject(project);
//             this.projectList.append(sidebarProject);
//             sidebarProject.addEventListener("click", () => this.previewProject(project));
//         }
//     }

//     previewProject(project) {
//         this.taskArea.innerHTML = "";
//         const projectPreview = document.createElement("div");
//         const projectPreviewHeading = document.createElement("h4");
//         projectPreviewHeading.textContent = project.title;
//         projectPreview.classList.add("projectPreview");
//         projectPreview.append(projectPreviewHeading);
//         for (const task of project.tasks) {
//             projectPreview.append(this.previewTask(task));
//         }
//         this.taskArea.append(projectPreview);
//     }

//     previewTask(task) {
//         const taskPreview = document.createElement("div");
//         taskPreview.classList.add("taskPreview");
//         const taskHeading = document.createElement("h5");
//         taskHeading.textContent = task.title;
//         const taskDueDate = document.createElement("p");
//         taskDueDate.textContent = task.dueDate;
//         taskPreview.append(taskHeading, taskDueDate);
//         return taskPreview;
//     }

//     createProjectForm() {
//         const dialog = document.createElement("dialog");
//         const form = document.createElement("form");
//         form.innerHTML = `<form action="#" class="newProjectForm">
//                         <h3>New Project</h3>
//                         <label for="title">Title</label>
//                         <input type="text" placeholder="Title" name="title" id="title" required>
//                         <button class="submit" id="createProject">Add Project</button>
//                         <button type="button" class="closeProjectFormButton" autofocus>Close</button>
//                         </form>`;
//         dialog.append(form);
//         return dialog;
//     }

//     initialize() {
//         this.closeProjectFormButton = this.projectForm.querySelector(".closeProjectFormButton");
//         this.addListeners();  // Adding listeners here ensures the button exists
//     }

//     addListeners() {
//         // Add event listener for close project form button
//         this.closeProjectFormButton.addEventListener("click", () => {
//             this.closeProjectForm();
//         });

//         // Add event listener for create project button
//         this.createProjectButton.addEventListener("click", () => {
//             this.openProjectForm();
//         });
//     }

//     closeProjectForm() {
//         this.projectForm.close(); // Close the form (dialog)
//     }

//     openProjectForm() {
//         this.projectForm.show(); // Open the form (dialog)
//     }
// }

// export default ProjectView;
// Key Changes:
// Moved the listener setup inside ProjectView:

// The listeners are now set up within the initialize() and addListeners() methods of ProjectView. This ensures that both buttons are properly referenced when the listeners are added.

// Encapsulated the logic for handling button events:

// The closeProjectForm() and openProjectForm() methods are responsible for showing and closing the project form. This encapsulation makes the logic more maintainable.

// AppView.js
// In AppView, the only thing you need to do is call the initialize() method on projectView before appending the forms. There's no need to add event listeners for closeProjectFormButton here anymore, as it's handled inside ProjectView.

// javascript
// Copy
// import ProjectView from "./projectView";
// import TaskView from "./taskView";

// class AppView {
//     constructor() {
//         this.projectView = new ProjectView();
//         this.taskView = new TaskView();
//         this.taskArea = document.querySelector(".taskArea");

//         // Initialize the project view, which now includes adding listeners for buttons
//         this.projectView.initialize(); 

//         // Append forms and set up event listeners
//         this.appendForms();
//         this.update();
//     }

//     update() {
//         // Any logic to update the view can go here
//     }

//     appendForms() {
//         // Append the forms to the task area
//         this.taskArea.append(this.projectView.projectForm, this.taskView.taskForm);
//     }

//     openForm(form) {
//         // Open the form (dialog)
//         form.show();
//     }

//     closeForm(form) {
//         // Close the form (dialog)
//         form.close();
//     }
// }

// export default AppView;
// Why This Works:
// Encapsulation: By encapsulating the event listener logic inside ProjectView, we ensure that everything related to project form handling is handled within that class.

// Initialization Order: We ensure that initialize() is called before any listener setup, meaning the button references will be valid when we try to add event listeners.

// Now, with these changes, you should no longer get the null reference error, and everything will work as expected.