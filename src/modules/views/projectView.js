import ProjectController from "../controllers/projectController";

class ProjectView {
    constructor() {
        this.projectController = new ProjectController();
    }

    createProjectForm() {
        const dialog = document.createElement("dialog");
        dialog.classList.add("newProjectForm")
        const form = document.createElement("form");
        form.innerHTML = `<form action="#">
                        <h3>New Project</h3>
                        <label for="projectTitle">Title</label>
                        <input type="text" placeholder="Title" name="projectTitle" id="projectTitle" required>
                        <button class="submit" id="createProject">Add Project</button>
                        <button type="button" class="closeProjectFormButton" autofocus>Close</button>
                        </form>
                        `
        dialog.append(form);
        return dialog;
    };
}

export default ProjectView;