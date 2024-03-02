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



function costomProjects() {
    tasks.loadFromStorage();
    let node = document.querySelector('.projects-folder');
    node.innerHTML = "";
    for (let i = 0; i < tasks.categories['projects'].length; i++) {
        let div = document.createElement('div');
        let projectName = tasks.categories['projects'][i];
        let projectCount = tasks.categories[projectName].length;
        div.innerHTML = `<li id="${projectName}">
                            <span class="project-nav">${projectName}</span>
                            <span class="project-count-custom">${projectCount}</span>
                        </li>`;
        node.appendChild(div);
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
}

function addCategory(categoryName) {
    tasks.loadFromStorage();
    if (!tasks.categories.hasOwnProperty(categoryName)) {
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

document.querySelector('#custom-project').addEventListener('submit', (e) => {
    e.preventDefault();
    const value = document.querySelector('#custom-project-input').value;
    addCategory(value);
});





document.querySelector('#custom-project').addEventListener('submit', (e) => {
    e.preventDefault();
    const value = document.querySelector('#custom-project-input').value;
    addCategory(value);
});
