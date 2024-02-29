import { render } from "./todoFunctions";
import { tasks } from "./todoFunctions";

let liElements = document.querySelectorAll(".project-nav");

liElements.forEach((li) => {
    li.addEventListener("click", (event) => {
        let project = event.target.innerHTML;
        render.AddTasksButton(project);
    });
});


render.Tasks("home")
render.AddTasksButton("home")

document.getElementById('dialogForm').addEventListener('submit',(e) => {
    e.preventDefault()
    const formdata = new FormData(e.target);
    const formClassName = e.target.className;

    const formDataObject = {};
    formdata.forEach(function(value, key){
        formDataObject[key] = value;
    });


    console.log(formClassName);
    tasks.add(formDataObject,formClassName);
    render.AddTasksButton(formClassName);


})


document.addEventListener('click', function(event) {
    if (event.target && event.target.id === 'delete-task') {
        // Assuming tasks is your object containing the deletetask method
        tasks.deletetask(event);
    }
});


document.addEventListener('click', function(event) {
    if (event.target && event.target.className === 'edit-task') {
        const indextoedit = parseInt(event.target.id, 10);
        const project = document.getElementById('dialogForm').className;
        
        // Store indextoedit in a data attribute of the editprojectdialogform
        const editprojectdialogform = document.querySelector('#edit-project-dialog-form');
        editprojectdialogform.setAttribute('data-indextoedit', indextoedit);
        
        const viewdiolog = document.querySelector('.edit-project-dialog');
        const viewdiologclosebtn =  document.querySelector('#edit-project-dialog-close-btn');
        
        document.querySelector('.edittitle').value = tasks.categories[project][indextoedit]['title'];
        document.querySelector('.editdesc').value = tasks.categories[project][indextoedit]['desc'];
        document.querySelector('.editdate').value = tasks.categories[project][indextoedit]['date'];
        document.querySelector('.editpriority').value = tasks.categories[project][indextoedit]['priority'];

        viewdiolog.showModal();
        viewdiologclosebtn.addEventListener('click', () => {
            viewdiolog.close();
        });

        editprojectdialogform.addEventListener('submit',(e) => {
            e.preventDefault();
            
            // Retrieve indextoedit from the data attribute of editprojectdialogform
            const indextoedit = parseInt(editprojectdialogform.getAttribute('data-indextoedit'), 10);
            
            const formDataObject = {
                title: document.querySelector('.edittitle').value,
                desc: document.querySelector('.editdesc').value,
                date: document.querySelector('.editdate').value,
                priority: document.querySelector('.editpriority').value
            };
        
            tasks.edittask(formDataObject, project, indextoedit);
            viewdiolog.close();
        });
    }
});
