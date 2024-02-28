import { render } from "./todoFunctions";
import { tasks } from "./todoFunctions";

let liElements = document.querySelectorAll("li");

liElements.forEach((li) => {
    li.addEventListener("click", (event) => {
        let project = event.target.innerHTML;
        render.AddTasksButton(project);
    });
});



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
    e.target.reset()
    render.AddTasksButton(formClassName);


})