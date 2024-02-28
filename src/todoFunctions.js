export const render = (function() {
    const dialog = document.getElementById("dialog");
    const closediolog = document.getElementById('closediolog');
    const display = document.getElementById("display");
    const dialogForm = document.getElementById('dialogForm')
    const AddTasksButton = function(project) {
        const btn = document.createElement('button');
        btn.innerText = `ADD TASK TO ${project}`;
        btn.id = project;
        btn.addEventListener('click', () => {
            dialog.showModal();
        });

        display.innerHTML = "";
        display.appendChild(btn);

        closediolog.addEventListener('click', (e) => {
            dialog.close()
        })

        dialogForm.className = project
        render.Tasks(project)
        console.log(project)
        
    };


    const Tasks = function(name){
        const name1 = name
        tasks.loadFromStorage();
        const folder = tasks.categories[name]
        folder.forEach(element => {
            const div = document.createElement('div');
            div.className = "project"; // Setting class for div element
            div.innerHTML = `<h1>${element.title}</h1>
                             <h2>${element.desc}</h2>
                             <p>${element.date}</p>
                             <h3>${element.priority}</h3>
                             <button>edit</button>
                             <button>details</button>
                             <button>delete</button>`;
            display.appendChild(div);
        });
        
    }


    return {
        AddTasksButton,
        Tasks
    };
})(); // Added parentheses to execute the function immediately




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
        // Convert tasks.categories to JSON and store in localStorage
        const arr = JSON.stringify(tasks.categories);
        localStorage.setItem("data", arr);
    };
    
    const loadFromStorage = function () {
        const arr1 = localStorage.getItem("data");
    
        if (arr1) {
            tasks.categories = JSON.parse(arr1);
        } else{
            
        }
    };
    
      return {
        categories,
        add,
        addToStorage,
        loadFromStorage
        }
})()