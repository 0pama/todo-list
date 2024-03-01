export const render = (function() {
    const dialog = document.getElementById("dialog");
    const closediolog = document.getElementById('closediolog');
    const display = document.getElementById("display");
    const displaycontainer = document.getElementById("displaycontainer");
    const dialogForm = document.getElementById('dialogForm')
    const liElements = document.querySelectorAll(".project-nav");
    const editprojectdialogform = document.querySelector('#edit-project-dialog-form');
    const viewdiolog = document.querySelector('.edit-project-dialog');
    const viewdiologclosebtn =  document.querySelector('#edit-project-dialog-close-btn');




    const navPagination = function() {
        liElements.forEach((li) => {
            li.addEventListener("click", (event) => {
                let project = event.target.innerHTML;
                render.AddTasksButton(project);
            });
        });
        
    }

    const deletebtn = function() {
        document.addEventListener('click', function(event) {
            if (event.target && event.target.id === 'delete-task') {
                tasks.deletetask(event);
            }
        });
        
    }

    const editDiolgForm = function() {
        document.addEventListener('click', function(event) {
         if (event.target && event.target.className === 'edit-task') {
             const indextoedit = parseInt(event.target.id, 10);
             const project = document.getElementById('dialogForm').className;
        
             // Store indextoedit in a data attribute of the editprojectdialogform
        
             editprojectdialogform.setAttribute('data-indextoedit', indextoedit);
        
             editprojectdialogform.reset();
             document.querySelector('.edittitle').value = tasks.categories[project][indextoedit]['title'];
             document.querySelector('.editdesc').value = tasks.categories[project][indextoedit]['desc'];
             document.querySelector('.editdate').value = tasks.categories[project][indextoedit]['date'];
             document.querySelector('.editpriority').value = tasks.categories[project][indextoedit]['priority'];

             viewdiolog.showModal();
             viewdiologclosebtn.addEventListener('click', () => {
                  viewdiolog.close();
                 });
 
            }
        });

    }

    const AddTasksButton = function(project) {
        const btn = document.createElement('button');
        btn.innerText = `ADD TASK TO ${project}`;
        btn.id = project;
        btn.className = 'add-task-btn'
        btn.addEventListener('click', () => {
            dialog.showModal();
        });
        displaycontainer.innerHTML = ""
        displaycontainer.appendChild(btn);

        closediolog.addEventListener('click', (e) => {
            dialog.close()
        })

        dialogForm.className = project
        render.Tasks(project)
        
    };


    const Tasks = function(name){
        display.innerHTML = ""
        const name1 = name
        tasks.loadFromStorage();
        const folder = tasks.categories[name]
        folder.forEach((element,index) => {
            const div = document.createElement('div');
            div.className = "project";
            div.id = element.priority; 
            
            div.innerHTML = `<h1>${element.title}</h1>
                             <h2>${element.desc}</h2>
                             <p>${element.date}</p>
                             <h3>${element.priority}</h3>
                             <button class="edit-task" id="${index}">edit</button>
                             <button>details</button>
                             <button id="delete-task" class="${index}-${name}">delete</button>`;
            display.appendChild(div);
        });
    }

    return {
        AddTasksButton,
        Tasks,
        navPagination,
        deletebtn,
        editDiolgForm
    };
})();

export const tasks = (function() {
    const categories = {
        home: [],
        today: [],
        week: [],
        projects: []
    };



    const processFormData = function() {
        document.getElementById('dialogForm').addEventListener('submit',(e) => {
            e.preventDefault()
            const formdata = new FormData(e.target);
            const formClassName = e.target.className;
        
            const formDataObject = {};
            formdata.forEach(function(value, key){
                formDataObject[key] = value;
            });
        
        
            tasks.add(formDataObject,formClassName);
            render.AddTasksButton(formClassName);
        
        
        })
    }



    const processEditFormData = function() {
        const editprojectdialogform = document.querySelector('#edit-project-dialog-form');
        const viewdiolog = document.querySelector('.edit-project-dialog');


        editprojectdialogform.addEventListener('submit',(e) => {
            e.preventDefault();
            
            // Retrieve indextoedit from the data attribute of editprojectdialogform
            const indextoedit = parseInt(editprojectdialogform.getAttribute('data-indextoedit'), 10);
            const project = document.getElementById('dialogForm').className;
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

    const add = function(obj,name) {
        tasks.categories[name].push(obj)
        tasks.addToStorage()
    }

    const addToStorage = function () {
        const arr = JSON.stringify(tasks.categories);
        localStorage.setItem("data", arr);
    };
    
    const loadFromStorage = function () {
        const arr1 = localStorage.getItem("data");
        if (arr1) {
            tasks.categories = JSON.parse(arr1);
        }
    };

    const deletetask = function(e) {
        const arr = e.target.className.split('-')
        const indextodelete = parseInt(arr[0], 10);
        const category = arr[1];
        tasks.categories[category].splice(indextodelete,1);
        addToStorage()
        render.Tasks(category)
    }
     
    const edittask = function(obj,category,indextoedit) {
        tasks.categories[category][indextoedit]['title'] = obj['title'];
        tasks.categories[category][indextoedit]['desc'] = obj['desc'];
        tasks.categories[category][indextoedit]['date'] = obj['date'];
        tasks.categories[category][indextoedit]['priority'] = obj['priority'];
        addToStorage()
        render.Tasks(category)
    }

    return {
        categories,
        add,
        addToStorage,
        loadFromStorage,
        deletetask,
        edittask,
        processFormData,
        processEditFormData
    }
})();
