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


    
        const details = function () {
            document.addEventListener('click', function(event) {
                const target = event.target;
                if (target && target.id === 'task-details') {
                    const arr = target.className.split('-');
                    const indexToView = parseInt(arr[0], 10);
                    const categoryToView = arr[1];
    
                    const task = tasks.categories[categoryToView][indexToView];
    
                    document.getElementById('view-title').textContent = task.title;
                    document.getElementById('view-desc').textContent = task.desc;
                    document.getElementById('view-date').textContent = task.date;
                    document.getElementById('view-priority').textContent = task.priority;
    
                    document.getElementById('view-task-dialog').showModal()
                    
                    document.getElementById('view-task-dialog-close-btn').addEventListener('click', () =>{
                        document.getElementById('view-task-dialog').close(1)
                    })
                }
            });
    }
    const projectCount = function() {
        document.querySelector('.project-count-home').innerText = tasks.categories["home"].length;
        document.querySelector('.project-count-today').innerText = tasks.categories["today"].length;
        document.querySelector('.project-count-week').innerText = tasks.categories["week"].length;



        document.body.addEventListener('click',() => {
            tasks.loadFromStorage()
            document.querySelector('.project-count-home').innerText = tasks.categories["home"].length;
        } )
    }
    const navPagination = function() {
        liElements.forEach((li) => {
            li.addEventListener("click", (event) => {
                liElements.forEach((li) => {
                    li.closest('li').classList.remove("nav-selected");
                });
    
                const navDiv = event.target.closest('li');
                navDiv.classList.add("nav-selected");
    
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
        if(project == "notes") {
            alert("notes functionality coming soon .... i think ")
            const btn = document.createElement('button');
        btn.innerText = `ADD a Note TO ${project.toUpperCase()}`;
        btn.id = project;
        btn.className = 'add-task-btn'
        btn.addEventListener('click', () => {
            dialog.showModal();
        });
        displaycontainer.innerHTML = "";
        displaycontainer.appendChild(btn);

        closediolog.addEventListener('click', (e) => {
            dialog.close()
        })

        dialogForm.className = project
        console.log(project)
        render.Tasks(project)

       
        
        } else{
        const btn = document.createElement('button');
        btn.innerText = `ADD TASK TO ${project.toUpperCase()}`;
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
    }
        
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
                             <p class="desci">${element.desc}</p>
                             <p>${element.date}</p>
                             <h3>${element.priority}</h3>
                             <button class="edit-task" id="${index}">edit</button>
                             <button id="task-details" class="${index}-${name}">details</button>
                             <button id="delete-task" class="${index}-${name}">done</button>`;
            display.appendChild(div);
            projectCount()
        });
    }

    return {
        AddTasksButton,
        Tasks,
        navPagination,
        deletebtn,
        editDiolgForm,
        projectCount,
        details
    };
})();

export const tasks = (function() {
    const categories = {
        home: [],
        today: [],
        week: [],
        projects: [],
        notes: []
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
            e.target.reset()
            document.getElementById('dialog').close()
        
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
        } else {
            populte()
            
            addToStorage();
        }
    };
    const deletetask = function(e) {
        const arr = e.target.className.split('-');
        const indextodelete = parseInt(arr[0], 10);
        const category = arr[1];
        
        const projectDiv = e.target.closest('.project'); 
        
        // Add fade-out class to trigger transition
        projectDiv.classList.add('fade-out');
        
        // After the transition completes, remove the project div
        
        tasks.categories[category].splice(indextodelete, 1);
            addToStorage();
            render.Tasks(category);
        // Adjust the timing to match the transition duration (in milliseconds)

        render.projectCount()
    };
    
    const edittask = function(obj,category,indextoedit) {
        tasks.categories[category][indextoedit]['title'] = obj['title'];
        tasks.categories[category][indextoedit]['desc'] = obj['desc'];
        tasks.categories[category][indextoedit]['date'] = obj['date'];
        tasks.categories[category][indextoedit]['priority'] = obj['priority'];
        addToStorage()
        render.Tasks(category)
    }
    
    const populte = function() {
        tasks.categories = {
            home: [
                {
                    "title": "Clean the house",
                    "desc": "Vacuum the floors and dust the shelves.",
                    "date": "2024-03-01",
                    "priority": "high"
                },
                {
                    "title": "Grocery Shopping",
                    "desc": "Buy fruits, vegetables, and milk.",
                    "date": "2024-03-02",
                    "priority": "medium"
                },
                {
                    "title": "Fix the leaking faucet",
                    "desc": "Call the plumber to fix the faucet in the kitchen.",
                    "date": "2024-03-05",
                    "priority": "high"
                },
                {
                    "title": "Organize the closet",
                    "desc": "Sort clothes and donate unused items.",
                    "date": "2024-03-07",
                    "priority": "medium"
                },
                {
                    "title": "Pay bills",
                    "desc": "Pay electricity, water, and internet bills.",
                    "date": "2024-03-09",
                    "priority": "high"
                },
                {
                    "title": "Mow the lawn",
                    "desc": "Trim the grass and tidy up the garden.",
                    "date": "2024-03-11",
                    "priority": "medium"
                },
                {
                    "title": "Fix the broken drawer",
                    "desc": "Repair the broken drawer in the bedroom.",
                    "date": "2024-03-14",
                    "priority": "high"
                },
                {
                    "title": "Plan family outing",
                    "desc": "Decide on a destination and make reservations.",
                    "date": "2024-03-16",
                    "priority": "medium"
                },
                {
                    "title": "Install new light fixtures",
                    "desc": "Replace old fixtures with energy-efficient ones.",
                    "date": "2024-03-18",
                    "priority": "high"
                },
                {
                    "title": "Clean the windows",
                    "desc": "Wipe down and polish all windows in the house.",
                    "date": "2024-03-20",
                    "priority": "medium"
                }
            ],
            today: [
                {
                    "title": "Finish report",
                    "desc": "Complete the quarterly report for the meeting.",
                    "date": "2024-03-01",
                    "priority": "high"
                },
                {
                    "title": "Attend webinar",
                    "desc": "Participate in the webinar on new technologies.",
                    "date": "2024-03-01",
                    "priority": "medium"
                },
                {
                    "title": "Submit expense report",
                    "desc": "Submit the expense report for last month.",
                    "date": "2024-03-01",
                    "priority": "high"
                },
                {
                    "title": "Review project proposal",
                    "desc": "Review and provide feedback on the project proposal.",
                    "date": "2024-03-01",
                    "priority": "medium"
                },
                {
                    "title": "Call with manager",
                    "desc": "Schedule a call with the manager to discuss project updates.",
                    "date": "2024-03-01",
                    "priority": "high"
                },
                {
                    "title": "Prepare presentation",
                    "desc": "Prepare slides for the upcoming presentation.",
                    "date": "2024-03-01",
                    "priority": "medium"
                },
                {
                    "title": "Send follow-up emails",
                    "desc": "Send follow-up emails to clients regarding recent meetings.",
                    "date": "2024-03-01",
                    "priority": "high"
                },
                {
                    "title": "Project status meeting",
                    "desc": "Attend the project status meeting with the team.",
                    "date": "2024-03-01",
                    "priority": "medium"
                },
                {
                    "title": "Review code changes",
                    "desc": "Review the recent code changes and provide feedback.",
                    "date": "2024-03-01",
                    "priority": "high"
                },
                {
                    "title": "Complete training modules",
                    "desc": "Complete the training modules on new software tools.",
                    "date": "2024-03-01",
                    "priority": "medium"
                },
                {
                    "title": "Submit leave request",
                    "desc": "Submit a leave request for next week.",
                    "date": "2024-03-01",
                    "priority": "high"
                },
                {
                    "title": "Prepare agenda for meeting",
                    "desc": "Prepare the agenda for the team meeting.",
                    "date": "2024-03-01",
                    "priority": "medium"
                },
                {
                    "title": "Update project documentation",
                    "desc": "Update the project documentation with recent changes.",
                    "date": "2024-03-01",
                    "priority": "high"
                },
                {
                    "title": "Review marketing campaign",
                    "desc": "Review the results of the recent marketing campaign.",
                    "date": "2024-03-01",
                    "priority": "medium"
                },
                {
                    "title": "Send weekly progress report",
                    "desc": "Send the weekly progress report to the project stakeholders.",
                    "date": "2024-03-01",
                    "priority": "high"
                },
            ],
            week: [
                {
                    "title": "Project presentation",
                    "desc": "Prepare slides for the project presentation.",
                    "date": "2024-03-04",
                    "priority": "high"
                },
                {
                    "title": "Team meeting",
                    "desc": "Discuss project progress with the team.",
                    "date": "2024-03-05",
                    "priority": "medium"
                },
                {
                    "title": "Client call",
                    "desc": "Schedule a call with the client to review requirements.",
                    "date": "2024-03-06",
                    "priority": "high"
                },
                {
                    "title": "Project brainstorming",
                    "desc": "Brainstorm ideas for the upcoming project.",
                    "date": "2024-03-08",
                    "priority": "medium"
                },
                {
                    "title": "Code review",
                    "desc": "Conduct a code review session for the team.",
                    "date": "2024-03-09",
                    "priority": "high"
                },
                {
                    "title": "Project testing",
                    "desc": "Test the features developed in the project.",
                    "date": "2024-03-10",
                    "priority": "medium"
                },
            ],
            projects: [
                // Add more default tasks for projects here
            ],
            notes: []

        };
    }
    return {
        categories,
        add,
        populte,
        addToStorage,
        loadFromStorage,
        deletetask,
        edittask,
        processFormData,
        processEditFormData
    }
})();


