export const render = (function() {
    const dialog = document.getElementById("dialog");
    const closediolog = document.getElementById('closediolog');
    const display = document.getElementById("display");
    const displaycontainer = document.getElementById("displaycontainer");
    const dialogForm = document.getElementById('dialogForm')

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
        // Reset form fields after rendering tasks
        const editprojectdialogform = document.querySelector('#edit-project-dialog-form');
        editprojectdialogform.reset();
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
        Tasks
    };
})();

export const tasks = (function() {
    const categories = {
        home: [],
        today: [],
        week: [],
        projects: []
    };

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
        edittask
    }
})();
