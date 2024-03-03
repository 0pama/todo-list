import { render } from "./todoFunctions";
import { tasks } from "./todoFunctions";




//   nav 
render.navPagination()

// init the home page
render.Tasks("home")
render.AddTasksButton("home")


render.projectCount()


render.details()
// procces form data 
tasks.processFormData()


//   render delete  btn
render.deletebtn()


// EDIT  functionlity

render.editDiolgForm()   // EDIT DIOLOG FORM 
tasks.processEditFormData()     // procces edit form data 



 export default function costomProjects() {
    tasks.loadFromStorage();
    let node = document.querySelector('.projects-folder');
    node.innerHTML = "";
    for (let i = 0; i < tasks.categories['projects'].length; i++) {
        let div = document.createElement('div');
        let projectName = tasks.categories['projects'][i];
        let projectCount = tasks.categories[projectName].length;
        div.innerHTML = `<li id="${projectName}">
        <button class="delete-category-btn">x</button>
                            <span class="project-nav" id="prok">${projectName}</span>
                            <span class="project-count-custom" id="los">${projectCount}</span>
                        </li>`;
        node.appendChild(div);
        const projectCountElement = document.querySelector('.project-count-Projects');

    projectCountElement.innerHTML = tasks.categories['projects'].length
    }

    // Add event listeners for newly created custom project categories
    const customProjectLinks = document.querySelectorAll('.projects-folder li');
    customProjectLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            const projectName = link.id;
            render.AddTasksButton(projectName);
            render.projectCount(); // Update project count
        });
    });

    // Add event listeners for delete buttons
    const deleteButtons = document.querySelectorAll('.delete-category-btn');
    deleteButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const categoryName = button.parentElement.id;
            deleteCategory(categoryName);
            tasks.loadFromStorage()
            const projectCountElement = document.querySelector('.project-count-Projects');

    projectCountElement.innerHTML = tasks.categories['projects'].length

        });
    });
}

function addCategory(categoryName) {
    tasks.loadFromStorage();
    if (!tasks.categories.hasOwnProperty(categoryName) && categoryName !== "") {
        tasks.categories[categoryName] = [];
        if (!tasks.categories["projects"].includes(categoryName)) {
            tasks.categories["projects"].push(categoryName); // Adding to projects array
        }
        console.log(`Category '${categoryName}' added successfully.`);
        tasks.addToStorage();
        costomProjects();
    } else {
        console.log(`Category '${categoryName}' already exists.`);
    }
}

function deleteCategory(categoryName) {
    if (tasks.categories.hasOwnProperty(categoryName)) {
        // Remove category from categories object
        delete tasks.categories[categoryName];
        // Remove category from projects array
        const index = tasks.categories["projects"].indexOf(categoryName);
        if (index !== -1) {
            tasks.categories["projects"].splice(index, 1);
        }
        console.log(`Category '${categoryName}' deleted successfully.`);
        tasks.addToStorage();
        costomProjects(); // Refresh the UI
    } else {
        console.log(`Category '${categoryName}' does not exist.`);
    }
}

document.querySelector('#custom-project').addEventListener('submit', (e) => {
    e.preventDefault();
    const value = document.querySelector('#custom-project-input').value;
    addCategory(value);
});



costomProjects()

    