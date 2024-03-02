/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/todoFunctions.js":
/*!******************************!*\
  !*** ./src/todoFunctions.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* binding */ render),
/* harmony export */   tasks: () => (/* binding */ tasks)
/* harmony export */ });
const render = (function() {
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

const tasks = (function() {
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




/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _todoFunctions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./todoFunctions */ "./src/todoFunctions.js");






//   nav 
_todoFunctions__WEBPACK_IMPORTED_MODULE_0__.render.navPagination()

// init the home page
_todoFunctions__WEBPACK_IMPORTED_MODULE_0__.render.Tasks("home")
_todoFunctions__WEBPACK_IMPORTED_MODULE_0__.render.AddTasksButton("home")


_todoFunctions__WEBPACK_IMPORTED_MODULE_0__.render.projectCount()


_todoFunctions__WEBPACK_IMPORTED_MODULE_0__.render.details()
// procces form data 
_todoFunctions__WEBPACK_IMPORTED_MODULE_0__.tasks.processFormData()


//   render delete  btn
_todoFunctions__WEBPACK_IMPORTED_MODULE_0__.render.deletebtn()


// EDIT  functionlity

_todoFunctions__WEBPACK_IMPORTED_MODULE_0__.render.editDiolgForm()   // EDIT DIOLOG FORM 
_todoFunctions__WEBPACK_IMPORTED_MODULE_0__.tasks.processEditFormData()     // procces edit form data 



function costomProjects() {
    _todoFunctions__WEBPACK_IMPORTED_MODULE_0__.tasks.loadFromStorage();
    let node = document.querySelector('.projects-folder');
    node.innerHTML = "";
    for (let i = 0; i < _todoFunctions__WEBPACK_IMPORTED_MODULE_0__.tasks.categories['projects'].length; i++) {
        let div = document.createElement('div');
        let projectName = _todoFunctions__WEBPACK_IMPORTED_MODULE_0__.tasks.categories['projects'][i];
        let projectCount = _todoFunctions__WEBPACK_IMPORTED_MODULE_0__.tasks.categories[projectName].length;
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
            _todoFunctions__WEBPACK_IMPORTED_MODULE_0__.render.AddTasksButton(projectName);
            _todoFunctions__WEBPACK_IMPORTED_MODULE_0__.render.projectCount(); // Update project count
        });
    });
}

function addCategory(categoryName) {
    _todoFunctions__WEBPACK_IMPORTED_MODULE_0__.tasks.loadFromStorage();
    if (!_todoFunctions__WEBPACK_IMPORTED_MODULE_0__.tasks.categories.hasOwnProperty(categoryName)) {
        _todoFunctions__WEBPACK_IMPORTED_MODULE_0__.tasks.categories[categoryName] = [];
        if (!_todoFunctions__WEBPACK_IMPORTED_MODULE_0__.tasks.categories["projects"].includes(categoryName)) {
            _todoFunctions__WEBPACK_IMPORTED_MODULE_0__.tasks.categories["projects"].push(categoryName); // Adding to projects array
        }
        console.log(`Category '${categoryName}' added successfully.`);
        _todoFunctions__WEBPACK_IMPORTED_MODULE_0__.tasks.addToStorage();
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

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5idW5kbGUuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYixTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQjtBQUNsQjtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUNBQXlDLHNCQUFzQjtBQUMvRDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0EsdUNBQXVDLHNCQUFzQjtBQUM3RDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1DQUFtQyxjQUFjO0FBQ2pELGdEQUFnRCxhQUFhO0FBQzdELGtDQUFrQyxhQUFhO0FBQy9DLG1DQUFtQyxpQkFBaUI7QUFDcEQsNkRBQTZELE1BQU07QUFDbkUsZ0VBQWdFLE1BQU0sR0FBRyxLQUFLO0FBQzlFLCtEQUErRCxNQUFNLEdBQUcsS0FBSztBQUM3RTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTs7Ozs7OztVQ2xmQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7O0FDTnlDO0FBQ0Q7QUFDeEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtEQUFNO0FBQ047QUFDQTtBQUNBLGtEQUFNO0FBQ04sa0RBQU07QUFDTjtBQUNBO0FBQ0Esa0RBQU07QUFDTjtBQUNBO0FBQ0Esa0RBQU07QUFDTjtBQUNBLGlEQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0Esa0RBQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtEQUFNO0FBQ04saURBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUksaURBQUs7QUFDVDtBQUNBO0FBQ0Esb0JBQW9CLElBQUksaURBQUssZ0NBQWdDO0FBQzdEO0FBQ0EsMEJBQTBCLGlEQUFLO0FBQy9CLDJCQUEyQixpREFBSztBQUNoQyxtQ0FBbUMsWUFBWTtBQUMvQyx3REFBd0QsWUFBWTtBQUNwRSxpRUFBaUUsYUFBYTtBQUM5RTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZLGtEQUFNO0FBQ2xCLFlBQVksa0RBQU0saUJBQWlCO0FBQ25DLFNBQVM7QUFDVCxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsSUFBSSxpREFBSztBQUNULFNBQVMsaURBQUs7QUFDZCxRQUFRLGlEQUFLO0FBQ2IsYUFBYSxpREFBSztBQUNsQixZQUFZLGlEQUFLLDRDQUE0QztBQUM3RDtBQUNBLGlDQUFpQyxhQUFhO0FBQzlDLFFBQVEsaURBQUs7QUFDYjtBQUNBLE1BQU07QUFDTixpQ0FBaUMsYUFBYTtBQUM5QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL3RvZG9GdW5jdGlvbnMuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBjb25zdCByZW5kZXIgPSAoZnVuY3Rpb24oKSB7XHJcbiAgICBjb25zdCBkaWFsb2cgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImRpYWxvZ1wiKTtcclxuICAgIGNvbnN0IGNsb3NlZGlvbG9nID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2Nsb3NlZGlvbG9nJyk7XHJcblxyXG4gICAgY29uc3QgZGlzcGxheSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZGlzcGxheVwiKTtcclxuICAgIGNvbnN0IGRpc3BsYXljb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImRpc3BsYXljb250YWluZXJcIik7XHJcbiAgICBjb25zdCBkaWFsb2dGb3JtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2RpYWxvZ0Zvcm0nKVxyXG4gICAgY29uc3QgbGlFbGVtZW50cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIucHJvamVjdC1uYXZcIik7XHJcbiAgICBjb25zdCBlZGl0cHJvamVjdGRpYWxvZ2Zvcm0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZWRpdC1wcm9qZWN0LWRpYWxvZy1mb3JtJyk7XHJcbiAgICBjb25zdCB2aWV3ZGlvbG9nID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmVkaXQtcHJvamVjdC1kaWFsb2cnKTtcclxuICAgIGNvbnN0IHZpZXdkaW9sb2djbG9zZWJ0biA9ICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZWRpdC1wcm9qZWN0LWRpYWxvZy1jbG9zZS1idG4nKTtcclxuXHJcblxyXG4gICAgXHJcbiAgICAgICAgY29uc3QgZGV0YWlscyA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbihldmVudCkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgdGFyZ2V0ID0gZXZlbnQudGFyZ2V0O1xyXG4gICAgICAgICAgICAgICAgaWYgKHRhcmdldCAmJiB0YXJnZXQuaWQgPT09ICd0YXNrLWRldGFpbHMnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgYXJyID0gdGFyZ2V0LmNsYXNzTmFtZS5zcGxpdCgnLScpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGluZGV4VG9WaWV3ID0gcGFyc2VJbnQoYXJyWzBdLCAxMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgY2F0ZWdvcnlUb1ZpZXcgPSBhcnJbMV07XHJcbiAgICBcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCB0YXNrID0gdGFza3MuY2F0ZWdvcmllc1tjYXRlZ29yeVRvVmlld11baW5kZXhUb1ZpZXddO1xyXG4gICAgXHJcbiAgICAgICAgICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3ZpZXctdGl0bGUnKS50ZXh0Q29udGVudCA9IHRhc2sudGl0bGU7XHJcbiAgICAgICAgICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3ZpZXctZGVzYycpLnRleHRDb250ZW50ID0gdGFzay5kZXNjO1xyXG4gICAgICAgICAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd2aWV3LWRhdGUnKS50ZXh0Q29udGVudCA9IHRhc2suZGF0ZTtcclxuICAgICAgICAgICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndmlldy1wcmlvcml0eScpLnRleHRDb250ZW50ID0gdGFzay5wcmlvcml0eTtcclxuICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd2aWV3LXRhc2stZGlhbG9nJykuc2hvd01vZGFsKClcclxuICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndmlldy10YXNrLWRpYWxvZy1jbG9zZS1idG4nKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+e1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndmlldy10YXNrLWRpYWxvZycpLmNsb3NlKDEpXHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBjb25zdCBwcm9qZWN0Q291bnQgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucHJvamVjdC1jb3VudC1ob21lJykuaW5uZXJUZXh0ID0gdGFza3MuY2F0ZWdvcmllc1tcImhvbWVcIl0ubGVuZ3RoO1xyXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wcm9qZWN0LWNvdW50LXRvZGF5JykuaW5uZXJUZXh0ID0gdGFza3MuY2F0ZWdvcmllc1tcInRvZGF5XCJdLmxlbmd0aDtcclxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucHJvamVjdC1jb3VudC13ZWVrJykuaW5uZXJUZXh0ID0gdGFza3MuY2F0ZWdvcmllc1tcIndlZWtcIl0ubGVuZ3RoO1xyXG5cclxuXHJcblxyXG4gICAgICAgIGRvY3VtZW50LmJvZHkuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCgpID0+IHtcclxuICAgICAgICAgICAgdGFza3MubG9hZEZyb21TdG9yYWdlKClcclxuICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnByb2plY3QtY291bnQtaG9tZScpLmlubmVyVGV4dCA9IHRhc2tzLmNhdGVnb3JpZXNbXCJob21lXCJdLmxlbmd0aDtcclxuICAgICAgICB9IClcclxuICAgIH1cclxuICAgIGNvbnN0IG5hdlBhZ2luYXRpb24gPSBmdW5jdGlvbigpIHtcclxuICAgICAgICBsaUVsZW1lbnRzLmZvckVhY2goKGxpKSA9PiB7XHJcbiAgICAgICAgICAgIGxpLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZXZlbnQpID0+IHtcclxuICAgICAgICAgICAgICAgIGxpRWxlbWVudHMuZm9yRWFjaCgobGkpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBsaS5jbG9zZXN0KCdsaScpLmNsYXNzTGlzdC5yZW1vdmUoXCJuYXYtc2VsZWN0ZWRcIik7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgIFxyXG4gICAgICAgICAgICAgICAgY29uc3QgbmF2RGl2ID0gZXZlbnQudGFyZ2V0LmNsb3Nlc3QoJ2xpJyk7XHJcbiAgICAgICAgICAgICAgICBuYXZEaXYuY2xhc3NMaXN0LmFkZChcIm5hdi1zZWxlY3RlZFwiKTtcclxuICAgIFxyXG4gICAgICAgICAgICAgICAgbGV0IHByb2plY3QgPSBldmVudC50YXJnZXQuaW5uZXJIVE1MO1xyXG4gICAgICAgICAgICAgICAgcmVuZGVyLkFkZFRhc2tzQnV0dG9uKHByb2plY3QpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIFxyXG5cclxuICAgIGNvbnN0IGRlbGV0ZWJ0biA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oZXZlbnQpIHtcclxuICAgICAgICAgICAgaWYgKGV2ZW50LnRhcmdldCAmJiBldmVudC50YXJnZXQuaWQgPT09ICdkZWxldGUtdGFzaycpIHtcclxuICAgICAgICAgICAgICAgIHRhc2tzLmRlbGV0ZXRhc2soZXZlbnQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgZWRpdERpb2xnRm9ybSA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oZXZlbnQpIHtcclxuICAgICAgICAgaWYgKGV2ZW50LnRhcmdldCAmJiBldmVudC50YXJnZXQuY2xhc3NOYW1lID09PSAnZWRpdC10YXNrJykge1xyXG4gICAgICAgICAgICAgY29uc3QgaW5kZXh0b2VkaXQgPSBwYXJzZUludChldmVudC50YXJnZXQuaWQsIDEwKTtcclxuICAgICAgICAgICAgIGNvbnN0IHByb2plY3QgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZGlhbG9nRm9ybScpLmNsYXNzTmFtZTtcclxuICAgICAgICBcclxuICAgICAgICAgICAgIC8vIFN0b3JlIGluZGV4dG9lZGl0IGluIGEgZGF0YSBhdHRyaWJ1dGUgb2YgdGhlIGVkaXRwcm9qZWN0ZGlhbG9nZm9ybVxyXG4gICAgICAgIFxyXG4gICAgICAgICAgICAgZWRpdHByb2plY3RkaWFsb2dmb3JtLnNldEF0dHJpYnV0ZSgnZGF0YS1pbmRleHRvZWRpdCcsIGluZGV4dG9lZGl0KTtcclxuICAgICAgICBcclxuICAgICAgICAgICAgIGVkaXRwcm9qZWN0ZGlhbG9nZm9ybS5yZXNldCgpO1xyXG4gICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmVkaXR0aXRsZScpLnZhbHVlID0gdGFza3MuY2F0ZWdvcmllc1twcm9qZWN0XVtpbmRleHRvZWRpdF1bJ3RpdGxlJ107XHJcbiAgICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZWRpdGRlc2MnKS52YWx1ZSA9IHRhc2tzLmNhdGVnb3JpZXNbcHJvamVjdF1baW5kZXh0b2VkaXRdWydkZXNjJ107XHJcbiAgICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZWRpdGRhdGUnKS52YWx1ZSA9IHRhc2tzLmNhdGVnb3JpZXNbcHJvamVjdF1baW5kZXh0b2VkaXRdWydkYXRlJ107XHJcbiAgICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZWRpdHByaW9yaXR5JykudmFsdWUgPSB0YXNrcy5jYXRlZ29yaWVzW3Byb2plY3RdW2luZGV4dG9lZGl0XVsncHJpb3JpdHknXTtcclxuXHJcbiAgICAgICAgICAgICB2aWV3ZGlvbG9nLnNob3dNb2RhbCgpO1xyXG4gICAgICAgICAgICAgdmlld2Rpb2xvZ2Nsb3NlYnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICB2aWV3ZGlvbG9nLmNsb3NlKCk7XHJcbiAgICAgICAgICAgICAgICAgfSk7XHJcbiBcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBBZGRUYXNrc0J1dHRvbiA9IGZ1bmN0aW9uKHByb2plY3QpIHtcclxuICAgICAgICBpZihwcm9qZWN0ID09IFwibm90ZXNcIikge1xyXG4gICAgICAgICAgICBhbGVydChcIm5vdGVzIGZ1bmN0aW9uYWxpdHkgY29taW5nIHNvb24gLi4uLiBpIHRoaW5rIFwiKVxyXG4gICAgICAgICAgICBjb25zdCBidG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcclxuICAgICAgICBidG4uaW5uZXJUZXh0ID0gYEFERCBhIE5vdGUgVE8gJHtwcm9qZWN0LnRvVXBwZXJDYXNlKCl9YDtcclxuICAgICAgICBidG4uaWQgPSBwcm9qZWN0O1xyXG4gICAgICAgIGJ0bi5jbGFzc05hbWUgPSAnYWRkLXRhc2stYnRuJ1xyXG4gICAgICAgIGJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICAgICAgICAgICAgZGlhbG9nLnNob3dNb2RhbCgpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGRpc3BsYXljb250YWluZXIuaW5uZXJIVE1MID0gXCJcIjtcclxuICAgICAgICBkaXNwbGF5Y29udGFpbmVyLmFwcGVuZENoaWxkKGJ0bik7XHJcblxyXG4gICAgICAgIGNsb3NlZGlvbG9nLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcclxuICAgICAgICAgICAgZGlhbG9nLmNsb3NlKClcclxuICAgICAgICB9KVxyXG5cclxuICAgICAgICBkaWFsb2dGb3JtLmNsYXNzTmFtZSA9IHByb2plY3RcclxuICAgICAgICBjb25zb2xlLmxvZyhwcm9qZWN0KVxyXG4gICAgICAgIHJlbmRlci5UYXNrcyhwcm9qZWN0KVxyXG5cclxuICAgICAgIFxyXG4gICAgICAgIFxyXG4gICAgICAgIH0gZWxzZXtcclxuICAgICAgICBjb25zdCBidG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcclxuICAgICAgICBidG4uaW5uZXJUZXh0ID0gYEFERCBUQVNLIFRPICR7cHJvamVjdC50b1VwcGVyQ2FzZSgpfWA7XHJcbiAgICAgICAgYnRuLmlkID0gcHJvamVjdDtcclxuICAgICAgICBidG4uY2xhc3NOYW1lID0gJ2FkZC10YXNrLWJ0bidcclxuICAgICAgICBidG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGRpYWxvZy5zaG93TW9kYWwoKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICBkaXNwbGF5Y29udGFpbmVyLmlubmVySFRNTCA9IFwiXCJcclxuICAgICAgICBkaXNwbGF5Y29udGFpbmVyLmFwcGVuZENoaWxkKGJ0bik7XHJcblxyXG4gICAgICAgIGNsb3NlZGlvbG9nLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcclxuICAgICAgICAgICAgZGlhbG9nLmNsb3NlKClcclxuICAgICAgICB9KVxyXG5cclxuICAgICAgICBkaWFsb2dGb3JtLmNsYXNzTmFtZSA9IHByb2plY3RcclxuICAgICAgICByZW5kZXIuVGFza3MocHJvamVjdClcclxuICAgIH1cclxuICAgICAgICBcclxuICAgIH07XHJcblxyXG5cclxuICAgIGNvbnN0IFRhc2tzID0gZnVuY3Rpb24obmFtZSl7XHJcbiAgICAgICAgZGlzcGxheS5pbm5lckhUTUwgPSBcIlwiXHJcbiAgICAgICAgY29uc3QgbmFtZTEgPSBuYW1lXHJcbiAgICAgICAgdGFza3MubG9hZEZyb21TdG9yYWdlKCk7XHJcbiAgICAgICAgY29uc3QgZm9sZGVyID0gdGFza3MuY2F0ZWdvcmllc1tuYW1lXVxyXG4gICAgICAgIGZvbGRlci5mb3JFYWNoKChlbGVtZW50LGluZGV4KSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgICAgICAgICBkaXYuY2xhc3NOYW1lID0gXCJwcm9qZWN0XCI7XHJcbiAgICAgICAgICAgIGRpdi5pZCA9IGVsZW1lbnQucHJpb3JpdHk7IFxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgZGl2LmlubmVySFRNTCA9IGA8aDE+JHtlbGVtZW50LnRpdGxlfTwvaDE+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3M9XCJkZXNjaVwiPiR7ZWxlbWVudC5kZXNjfTwvcD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cD4ke2VsZW1lbnQuZGF0ZX08L3A+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGgzPiR7ZWxlbWVudC5wcmlvcml0eX08L2gzPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJlZGl0LXRhc2tcIiBpZD1cIiR7aW5kZXh9XCI+ZWRpdDwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gaWQ9XCJ0YXNrLWRldGFpbHNcIiBjbGFzcz1cIiR7aW5kZXh9LSR7bmFtZX1cIj5kZXRhaWxzPC9idXR0b24+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBpZD1cImRlbGV0ZS10YXNrXCIgY2xhc3M9XCIke2luZGV4fS0ke25hbWV9XCI+ZG9uZTwvYnV0dG9uPmA7XHJcbiAgICAgICAgICAgIGRpc3BsYXkuYXBwZW5kQ2hpbGQoZGl2KTtcclxuICAgICAgICAgICAgcHJvamVjdENvdW50KClcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIEFkZFRhc2tzQnV0dG9uLFxyXG4gICAgICAgIFRhc2tzLFxyXG4gICAgICAgIG5hdlBhZ2luYXRpb24sXHJcbiAgICAgICAgZGVsZXRlYnRuLFxyXG4gICAgICAgIGVkaXREaW9sZ0Zvcm0sXHJcbiAgICAgICAgcHJvamVjdENvdW50LFxyXG4gICAgICAgIGRldGFpbHNcclxuICAgIH07XHJcbn0pKCk7XHJcblxyXG5leHBvcnQgY29uc3QgdGFza3MgPSAoZnVuY3Rpb24oKSB7XHJcbiAgICBjb25zdCBjYXRlZ29yaWVzID0ge1xyXG4gICAgICAgIGhvbWU6IFtdLFxyXG4gICAgICAgIHRvZGF5OiBbXSxcclxuICAgICAgICB3ZWVrOiBbXSxcclxuICAgICAgICBwcm9qZWN0czogW10sXHJcbiAgICAgICAgbm90ZXM6IFtdXHJcbiAgICB9O1xyXG5cclxuICAgIFxyXG5cclxuICAgIGNvbnN0IHByb2Nlc3NGb3JtRGF0YSA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdkaWFsb2dGb3JtJykuYWRkRXZlbnRMaXN0ZW5lcignc3VibWl0JywoZSkgPT4ge1xyXG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KClcclxuICAgICAgICAgICAgY29uc3QgZm9ybWRhdGEgPSBuZXcgRm9ybURhdGEoZS50YXJnZXQpO1xyXG4gICAgICAgICAgICBjb25zdCBmb3JtQ2xhc3NOYW1lID0gZS50YXJnZXQuY2xhc3NOYW1lO1xyXG4gICAgICAgIFxyXG4gICAgICAgICAgICBjb25zdCBmb3JtRGF0YU9iamVjdCA9IHt9O1xyXG4gICAgICAgICAgICBmb3JtZGF0YS5mb3JFYWNoKGZ1bmN0aW9uKHZhbHVlLCBrZXkpe1xyXG4gICAgICAgICAgICAgICAgZm9ybURhdGFPYmplY3Rba2V5XSA9IHZhbHVlO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICBcclxuICAgICAgICBcclxuICAgICAgICAgICAgdGFza3MuYWRkKGZvcm1EYXRhT2JqZWN0LGZvcm1DbGFzc05hbWUpO1xyXG4gICAgICAgICAgICByZW5kZXIuQWRkVGFza3NCdXR0b24oZm9ybUNsYXNzTmFtZSk7XHJcbiAgICAgICAgICAgIGUudGFyZ2V0LnJlc2V0KClcclxuICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2RpYWxvZycpLmNsb3NlKClcclxuICAgICAgICBcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuXHJcblxyXG4gICAgY29uc3QgcHJvY2Vzc0VkaXRGb3JtRGF0YSA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGNvbnN0IGVkaXRwcm9qZWN0ZGlhbG9nZm9ybSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNlZGl0LXByb2plY3QtZGlhbG9nLWZvcm0nKTtcclxuICAgICAgICBjb25zdCB2aWV3ZGlvbG9nID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmVkaXQtcHJvamVjdC1kaWFsb2cnKTtcclxuXHJcblxyXG4gICAgICAgIGVkaXRwcm9qZWN0ZGlhbG9nZm9ybS5hZGRFdmVudExpc3RlbmVyKCdzdWJtaXQnLChlKSA9PiB7XHJcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIC8vIFJldHJpZXZlIGluZGV4dG9lZGl0IGZyb20gdGhlIGRhdGEgYXR0cmlidXRlIG9mIGVkaXRwcm9qZWN0ZGlhbG9nZm9ybVxyXG4gICAgICAgICAgICBjb25zdCBpbmRleHRvZWRpdCA9IHBhcnNlSW50KGVkaXRwcm9qZWN0ZGlhbG9nZm9ybS5nZXRBdHRyaWJ1dGUoJ2RhdGEtaW5kZXh0b2VkaXQnKSwgMTApO1xyXG4gICAgICAgICAgICBjb25zdCBwcm9qZWN0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2RpYWxvZ0Zvcm0nKS5jbGFzc05hbWU7XHJcbiAgICAgICAgICAgIGNvbnN0IGZvcm1EYXRhT2JqZWN0ID0ge1xyXG4gICAgICAgICAgICAgICAgdGl0bGU6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5lZGl0dGl0bGUnKS52YWx1ZSxcclxuICAgICAgICAgICAgICAgIGRlc2M6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5lZGl0ZGVzYycpLnZhbHVlLFxyXG4gICAgICAgICAgICAgICAgZGF0ZTogZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmVkaXRkYXRlJykudmFsdWUsXHJcbiAgICAgICAgICAgICAgICBwcmlvcml0eTogZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmVkaXRwcmlvcml0eScpLnZhbHVlXHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICB0YXNrcy5lZGl0dGFzayhmb3JtRGF0YU9iamVjdCwgcHJvamVjdCwgaW5kZXh0b2VkaXQpO1xyXG4gICAgICAgICAgICB2aWV3ZGlvbG9nLmNsb3NlKCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgYWRkID0gZnVuY3Rpb24ob2JqLG5hbWUpIHtcclxuICAgICAgICB0YXNrcy5jYXRlZ29yaWVzW25hbWVdLnB1c2gob2JqKVxyXG4gICAgICAgIHRhc2tzLmFkZFRvU3RvcmFnZSgpXHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgYWRkVG9TdG9yYWdlID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGNvbnN0IGFyciA9IEpTT04uc3RyaW5naWZ5KHRhc2tzLmNhdGVnb3JpZXMpO1xyXG4gICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKFwiZGF0YVwiLCBhcnIpO1xyXG4gICAgfTtcclxuICAgIFxyXG4gICAgY29uc3QgbG9hZEZyb21TdG9yYWdlID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGNvbnN0IGFycjEgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShcImRhdGFcIik7XHJcbiAgICAgICAgaWYgKGFycjEpIHtcclxuICAgICAgICAgICAgdGFza3MuY2F0ZWdvcmllcyA9IEpTT04ucGFyc2UoYXJyMSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcG9wdWx0ZSgpXHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBhZGRUb1N0b3JhZ2UoKTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgY29uc3QgZGVsZXRldGFzayA9IGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICBjb25zdCBhcnIgPSBlLnRhcmdldC5jbGFzc05hbWUuc3BsaXQoJy0nKTtcclxuICAgICAgICBjb25zdCBpbmRleHRvZGVsZXRlID0gcGFyc2VJbnQoYXJyWzBdLCAxMCk7XHJcbiAgICAgICAgY29uc3QgY2F0ZWdvcnkgPSBhcnJbMV07XHJcbiAgICAgICAgXHJcbiAgICAgICAgY29uc3QgcHJvamVjdERpdiA9IGUudGFyZ2V0LmNsb3Nlc3QoJy5wcm9qZWN0Jyk7IFxyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIEFkZCBmYWRlLW91dCBjbGFzcyB0byB0cmlnZ2VyIHRyYW5zaXRpb25cclxuICAgICAgICBwcm9qZWN0RGl2LmNsYXNzTGlzdC5hZGQoJ2ZhZGUtb3V0Jyk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8gQWZ0ZXIgdGhlIHRyYW5zaXRpb24gY29tcGxldGVzLCByZW1vdmUgdGhlIHByb2plY3QgZGl2XHJcbiAgICAgICAgXHJcbiAgICAgICAgdGFza3MuY2F0ZWdvcmllc1tjYXRlZ29yeV0uc3BsaWNlKGluZGV4dG9kZWxldGUsIDEpO1xyXG4gICAgICAgICAgICBhZGRUb1N0b3JhZ2UoKTtcclxuICAgICAgICAgICAgcmVuZGVyLlRhc2tzKGNhdGVnb3J5KTtcclxuICAgICAgICAvLyBBZGp1c3QgdGhlIHRpbWluZyB0byBtYXRjaCB0aGUgdHJhbnNpdGlvbiBkdXJhdGlvbiAoaW4gbWlsbGlzZWNvbmRzKVxyXG5cclxuICAgICAgICByZW5kZXIucHJvamVjdENvdW50KClcclxuICAgIH07XHJcbiAgICBcclxuICAgIGNvbnN0IGVkaXR0YXNrID0gZnVuY3Rpb24ob2JqLGNhdGVnb3J5LGluZGV4dG9lZGl0KSB7XHJcbiAgICAgICAgdGFza3MuY2F0ZWdvcmllc1tjYXRlZ29yeV1baW5kZXh0b2VkaXRdWyd0aXRsZSddID0gb2JqWyd0aXRsZSddO1xyXG4gICAgICAgIHRhc2tzLmNhdGVnb3JpZXNbY2F0ZWdvcnldW2luZGV4dG9lZGl0XVsnZGVzYyddID0gb2JqWydkZXNjJ107XHJcbiAgICAgICAgdGFza3MuY2F0ZWdvcmllc1tjYXRlZ29yeV1baW5kZXh0b2VkaXRdWydkYXRlJ10gPSBvYmpbJ2RhdGUnXTtcclxuICAgICAgICB0YXNrcy5jYXRlZ29yaWVzW2NhdGVnb3J5XVtpbmRleHRvZWRpdF1bJ3ByaW9yaXR5J10gPSBvYmpbJ3ByaW9yaXR5J107XHJcbiAgICAgICAgYWRkVG9TdG9yYWdlKClcclxuICAgICAgICByZW5kZXIuVGFza3MoY2F0ZWdvcnkpXHJcbiAgICB9XHJcbiAgICBcclxuICAgIGNvbnN0IHBvcHVsdGUgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICB0YXNrcy5jYXRlZ29yaWVzID0ge1xyXG4gICAgICAgICAgICBob21lOiBbXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgXCJ0aXRsZVwiOiBcIkNsZWFuIHRoZSBob3VzZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwiZGVzY1wiOiBcIlZhY3V1bSB0aGUgZmxvb3JzIGFuZCBkdXN0IHRoZSBzaGVsdmVzLlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwiZGF0ZVwiOiBcIjIwMjQtMDMtMDFcIixcclxuICAgICAgICAgICAgICAgICAgICBcInByaW9yaXR5XCI6IFwiaGlnaFwiXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIFwidGl0bGVcIjogXCJHcm9jZXJ5IFNob3BwaW5nXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJkZXNjXCI6IFwiQnV5IGZydWl0cywgdmVnZXRhYmxlcywgYW5kIG1pbGsuXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJkYXRlXCI6IFwiMjAyNC0wMy0wMlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwicHJpb3JpdHlcIjogXCJtZWRpdW1cIlxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBcInRpdGxlXCI6IFwiRml4IHRoZSBsZWFraW5nIGZhdWNldFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwiZGVzY1wiOiBcIkNhbGwgdGhlIHBsdW1iZXIgdG8gZml4IHRoZSBmYXVjZXQgaW4gdGhlIGtpdGNoZW4uXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJkYXRlXCI6IFwiMjAyNC0wMy0wNVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwicHJpb3JpdHlcIjogXCJoaWdoXCJcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgXCJ0aXRsZVwiOiBcIk9yZ2FuaXplIHRoZSBjbG9zZXRcIixcclxuICAgICAgICAgICAgICAgICAgICBcImRlc2NcIjogXCJTb3J0IGNsb3RoZXMgYW5kIGRvbmF0ZSB1bnVzZWQgaXRlbXMuXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJkYXRlXCI6IFwiMjAyNC0wMy0wN1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwicHJpb3JpdHlcIjogXCJtZWRpdW1cIlxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBcInRpdGxlXCI6IFwiUGF5IGJpbGxzXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJkZXNjXCI6IFwiUGF5IGVsZWN0cmljaXR5LCB3YXRlciwgYW5kIGludGVybmV0IGJpbGxzLlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwiZGF0ZVwiOiBcIjIwMjQtMDMtMDlcIixcclxuICAgICAgICAgICAgICAgICAgICBcInByaW9yaXR5XCI6IFwiaGlnaFwiXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIFwidGl0bGVcIjogXCJNb3cgdGhlIGxhd25cIixcclxuICAgICAgICAgICAgICAgICAgICBcImRlc2NcIjogXCJUcmltIHRoZSBncmFzcyBhbmQgdGlkeSB1cCB0aGUgZ2FyZGVuLlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwiZGF0ZVwiOiBcIjIwMjQtMDMtMTFcIixcclxuICAgICAgICAgICAgICAgICAgICBcInByaW9yaXR5XCI6IFwibWVkaXVtXCJcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgXCJ0aXRsZVwiOiBcIkZpeCB0aGUgYnJva2VuIGRyYXdlclwiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwiZGVzY1wiOiBcIlJlcGFpciB0aGUgYnJva2VuIGRyYXdlciBpbiB0aGUgYmVkcm9vbS5cIixcclxuICAgICAgICAgICAgICAgICAgICBcImRhdGVcIjogXCIyMDI0LTAzLTE0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJwcmlvcml0eVwiOiBcImhpZ2hcIlxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBcInRpdGxlXCI6IFwiUGxhbiBmYW1pbHkgb3V0aW5nXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJkZXNjXCI6IFwiRGVjaWRlIG9uIGEgZGVzdGluYXRpb24gYW5kIG1ha2UgcmVzZXJ2YXRpb25zLlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwiZGF0ZVwiOiBcIjIwMjQtMDMtMTZcIixcclxuICAgICAgICAgICAgICAgICAgICBcInByaW9yaXR5XCI6IFwibWVkaXVtXCJcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgXCJ0aXRsZVwiOiBcIkluc3RhbGwgbmV3IGxpZ2h0IGZpeHR1cmVzXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJkZXNjXCI6IFwiUmVwbGFjZSBvbGQgZml4dHVyZXMgd2l0aCBlbmVyZ3ktZWZmaWNpZW50IG9uZXMuXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJkYXRlXCI6IFwiMjAyNC0wMy0xOFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwicHJpb3JpdHlcIjogXCJoaWdoXCJcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgXCJ0aXRsZVwiOiBcIkNsZWFuIHRoZSB3aW5kb3dzXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJkZXNjXCI6IFwiV2lwZSBkb3duIGFuZCBwb2xpc2ggYWxsIHdpbmRvd3MgaW4gdGhlIGhvdXNlLlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwiZGF0ZVwiOiBcIjIwMjQtMDMtMjBcIixcclxuICAgICAgICAgICAgICAgICAgICBcInByaW9yaXR5XCI6IFwibWVkaXVtXCJcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgdG9kYXk6IFtcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBcInRpdGxlXCI6IFwiRmluaXNoIHJlcG9ydFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwiZGVzY1wiOiBcIkNvbXBsZXRlIHRoZSBxdWFydGVybHkgcmVwb3J0IGZvciB0aGUgbWVldGluZy5cIixcclxuICAgICAgICAgICAgICAgICAgICBcImRhdGVcIjogXCIyMDI0LTAzLTAxXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJwcmlvcml0eVwiOiBcImhpZ2hcIlxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBcInRpdGxlXCI6IFwiQXR0ZW5kIHdlYmluYXJcIixcclxuICAgICAgICAgICAgICAgICAgICBcImRlc2NcIjogXCJQYXJ0aWNpcGF0ZSBpbiB0aGUgd2ViaW5hciBvbiBuZXcgdGVjaG5vbG9naWVzLlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwiZGF0ZVwiOiBcIjIwMjQtMDMtMDFcIixcclxuICAgICAgICAgICAgICAgICAgICBcInByaW9yaXR5XCI6IFwibWVkaXVtXCJcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgXCJ0aXRsZVwiOiBcIlN1Ym1pdCBleHBlbnNlIHJlcG9ydFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwiZGVzY1wiOiBcIlN1Ym1pdCB0aGUgZXhwZW5zZSByZXBvcnQgZm9yIGxhc3QgbW9udGguXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJkYXRlXCI6IFwiMjAyNC0wMy0wMVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwicHJpb3JpdHlcIjogXCJoaWdoXCJcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgXCJ0aXRsZVwiOiBcIlJldmlldyBwcm9qZWN0IHByb3Bvc2FsXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJkZXNjXCI6IFwiUmV2aWV3IGFuZCBwcm92aWRlIGZlZWRiYWNrIG9uIHRoZSBwcm9qZWN0IHByb3Bvc2FsLlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwiZGF0ZVwiOiBcIjIwMjQtMDMtMDFcIixcclxuICAgICAgICAgICAgICAgICAgICBcInByaW9yaXR5XCI6IFwibWVkaXVtXCJcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgXCJ0aXRsZVwiOiBcIkNhbGwgd2l0aCBtYW5hZ2VyXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJkZXNjXCI6IFwiU2NoZWR1bGUgYSBjYWxsIHdpdGggdGhlIG1hbmFnZXIgdG8gZGlzY3VzcyBwcm9qZWN0IHVwZGF0ZXMuXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJkYXRlXCI6IFwiMjAyNC0wMy0wMVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwicHJpb3JpdHlcIjogXCJoaWdoXCJcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgXCJ0aXRsZVwiOiBcIlByZXBhcmUgcHJlc2VudGF0aW9uXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJkZXNjXCI6IFwiUHJlcGFyZSBzbGlkZXMgZm9yIHRoZSB1cGNvbWluZyBwcmVzZW50YXRpb24uXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJkYXRlXCI6IFwiMjAyNC0wMy0wMVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwicHJpb3JpdHlcIjogXCJtZWRpdW1cIlxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBcInRpdGxlXCI6IFwiU2VuZCBmb2xsb3ctdXAgZW1haWxzXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJkZXNjXCI6IFwiU2VuZCBmb2xsb3ctdXAgZW1haWxzIHRvIGNsaWVudHMgcmVnYXJkaW5nIHJlY2VudCBtZWV0aW5ncy5cIixcclxuICAgICAgICAgICAgICAgICAgICBcImRhdGVcIjogXCIyMDI0LTAzLTAxXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJwcmlvcml0eVwiOiBcImhpZ2hcIlxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBcInRpdGxlXCI6IFwiUHJvamVjdCBzdGF0dXMgbWVldGluZ1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwiZGVzY1wiOiBcIkF0dGVuZCB0aGUgcHJvamVjdCBzdGF0dXMgbWVldGluZyB3aXRoIHRoZSB0ZWFtLlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwiZGF0ZVwiOiBcIjIwMjQtMDMtMDFcIixcclxuICAgICAgICAgICAgICAgICAgICBcInByaW9yaXR5XCI6IFwibWVkaXVtXCJcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgXCJ0aXRsZVwiOiBcIlJldmlldyBjb2RlIGNoYW5nZXNcIixcclxuICAgICAgICAgICAgICAgICAgICBcImRlc2NcIjogXCJSZXZpZXcgdGhlIHJlY2VudCBjb2RlIGNoYW5nZXMgYW5kIHByb3ZpZGUgZmVlZGJhY2suXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJkYXRlXCI6IFwiMjAyNC0wMy0wMVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwicHJpb3JpdHlcIjogXCJoaWdoXCJcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgXCJ0aXRsZVwiOiBcIkNvbXBsZXRlIHRyYWluaW5nIG1vZHVsZXNcIixcclxuICAgICAgICAgICAgICAgICAgICBcImRlc2NcIjogXCJDb21wbGV0ZSB0aGUgdHJhaW5pbmcgbW9kdWxlcyBvbiBuZXcgc29mdHdhcmUgdG9vbHMuXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJkYXRlXCI6IFwiMjAyNC0wMy0wMVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwicHJpb3JpdHlcIjogXCJtZWRpdW1cIlxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBcInRpdGxlXCI6IFwiU3VibWl0IGxlYXZlIHJlcXVlc3RcIixcclxuICAgICAgICAgICAgICAgICAgICBcImRlc2NcIjogXCJTdWJtaXQgYSBsZWF2ZSByZXF1ZXN0IGZvciBuZXh0IHdlZWsuXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJkYXRlXCI6IFwiMjAyNC0wMy0wMVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwicHJpb3JpdHlcIjogXCJoaWdoXCJcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgXCJ0aXRsZVwiOiBcIlByZXBhcmUgYWdlbmRhIGZvciBtZWV0aW5nXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJkZXNjXCI6IFwiUHJlcGFyZSB0aGUgYWdlbmRhIGZvciB0aGUgdGVhbSBtZWV0aW5nLlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwiZGF0ZVwiOiBcIjIwMjQtMDMtMDFcIixcclxuICAgICAgICAgICAgICAgICAgICBcInByaW9yaXR5XCI6IFwibWVkaXVtXCJcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgXCJ0aXRsZVwiOiBcIlVwZGF0ZSBwcm9qZWN0IGRvY3VtZW50YXRpb25cIixcclxuICAgICAgICAgICAgICAgICAgICBcImRlc2NcIjogXCJVcGRhdGUgdGhlIHByb2plY3QgZG9jdW1lbnRhdGlvbiB3aXRoIHJlY2VudCBjaGFuZ2VzLlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwiZGF0ZVwiOiBcIjIwMjQtMDMtMDFcIixcclxuICAgICAgICAgICAgICAgICAgICBcInByaW9yaXR5XCI6IFwiaGlnaFwiXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIFwidGl0bGVcIjogXCJSZXZpZXcgbWFya2V0aW5nIGNhbXBhaWduXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJkZXNjXCI6IFwiUmV2aWV3IHRoZSByZXN1bHRzIG9mIHRoZSByZWNlbnQgbWFya2V0aW5nIGNhbXBhaWduLlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwiZGF0ZVwiOiBcIjIwMjQtMDMtMDFcIixcclxuICAgICAgICAgICAgICAgICAgICBcInByaW9yaXR5XCI6IFwibWVkaXVtXCJcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgXCJ0aXRsZVwiOiBcIlNlbmQgd2Vla2x5IHByb2dyZXNzIHJlcG9ydFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwiZGVzY1wiOiBcIlNlbmQgdGhlIHdlZWtseSBwcm9ncmVzcyByZXBvcnQgdG8gdGhlIHByb2plY3Qgc3Rha2Vob2xkZXJzLlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwiZGF0ZVwiOiBcIjIwMjQtMDMtMDFcIixcclxuICAgICAgICAgICAgICAgICAgICBcInByaW9yaXR5XCI6IFwiaGlnaFwiXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICB3ZWVrOiBbXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgXCJ0aXRsZVwiOiBcIlByb2plY3QgcHJlc2VudGF0aW9uXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJkZXNjXCI6IFwiUHJlcGFyZSBzbGlkZXMgZm9yIHRoZSBwcm9qZWN0IHByZXNlbnRhdGlvbi5cIixcclxuICAgICAgICAgICAgICAgICAgICBcImRhdGVcIjogXCIyMDI0LTAzLTA0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJwcmlvcml0eVwiOiBcImhpZ2hcIlxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBcInRpdGxlXCI6IFwiVGVhbSBtZWV0aW5nXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJkZXNjXCI6IFwiRGlzY3VzcyBwcm9qZWN0IHByb2dyZXNzIHdpdGggdGhlIHRlYW0uXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJkYXRlXCI6IFwiMjAyNC0wMy0wNVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwicHJpb3JpdHlcIjogXCJtZWRpdW1cIlxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBcInRpdGxlXCI6IFwiQ2xpZW50IGNhbGxcIixcclxuICAgICAgICAgICAgICAgICAgICBcImRlc2NcIjogXCJTY2hlZHVsZSBhIGNhbGwgd2l0aCB0aGUgY2xpZW50IHRvIHJldmlldyByZXF1aXJlbWVudHMuXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJkYXRlXCI6IFwiMjAyNC0wMy0wNlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwicHJpb3JpdHlcIjogXCJoaWdoXCJcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgXCJ0aXRsZVwiOiBcIlByb2plY3QgYnJhaW5zdG9ybWluZ1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwiZGVzY1wiOiBcIkJyYWluc3Rvcm0gaWRlYXMgZm9yIHRoZSB1cGNvbWluZyBwcm9qZWN0LlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwiZGF0ZVwiOiBcIjIwMjQtMDMtMDhcIixcclxuICAgICAgICAgICAgICAgICAgICBcInByaW9yaXR5XCI6IFwibWVkaXVtXCJcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgXCJ0aXRsZVwiOiBcIkNvZGUgcmV2aWV3XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJkZXNjXCI6IFwiQ29uZHVjdCBhIGNvZGUgcmV2aWV3IHNlc3Npb24gZm9yIHRoZSB0ZWFtLlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwiZGF0ZVwiOiBcIjIwMjQtMDMtMDlcIixcclxuICAgICAgICAgICAgICAgICAgICBcInByaW9yaXR5XCI6IFwiaGlnaFwiXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIFwidGl0bGVcIjogXCJQcm9qZWN0IHRlc3RpbmdcIixcclxuICAgICAgICAgICAgICAgICAgICBcImRlc2NcIjogXCJUZXN0IHRoZSBmZWF0dXJlcyBkZXZlbG9wZWQgaW4gdGhlIHByb2plY3QuXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJkYXRlXCI6IFwiMjAyNC0wMy0xMFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwicHJpb3JpdHlcIjogXCJtZWRpdW1cIlxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgcHJvamVjdHM6IFtcclxuICAgICAgICAgICAgICAgIC8vIEFkZCBtb3JlIGRlZmF1bHQgdGFza3MgZm9yIHByb2plY3RzIGhlcmVcclxuICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgbm90ZXM6IFtdXHJcblxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIGNhdGVnb3JpZXMsXHJcbiAgICAgICAgYWRkLFxyXG4gICAgICAgIHBvcHVsdGUsXHJcbiAgICAgICAgYWRkVG9TdG9yYWdlLFxyXG4gICAgICAgIGxvYWRGcm9tU3RvcmFnZSxcclxuICAgICAgICBkZWxldGV0YXNrLFxyXG4gICAgICAgIGVkaXR0YXNrLFxyXG4gICAgICAgIHByb2Nlc3NGb3JtRGF0YSxcclxuICAgICAgICBwcm9jZXNzRWRpdEZvcm1EYXRhXHJcbiAgICB9XHJcbn0pKCk7XHJcblxyXG5cclxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgeyByZW5kZXIgfSBmcm9tIFwiLi90b2RvRnVuY3Rpb25zXCI7XHJcbmltcG9ydCB7IHRhc2tzIH0gZnJvbSBcIi4vdG9kb0Z1bmN0aW9uc1wiO1xyXG5cclxuXHJcblxyXG5cclxuLy8gICBuYXYgXHJcbnJlbmRlci5uYXZQYWdpbmF0aW9uKClcclxuXHJcbi8vIGluaXQgdGhlIGhvbWUgcGFnZVxyXG5yZW5kZXIuVGFza3MoXCJob21lXCIpXHJcbnJlbmRlci5BZGRUYXNrc0J1dHRvbihcImhvbWVcIilcclxuXHJcblxyXG5yZW5kZXIucHJvamVjdENvdW50KClcclxuXHJcblxyXG5yZW5kZXIuZGV0YWlscygpXHJcbi8vIHByb2NjZXMgZm9ybSBkYXRhIFxyXG50YXNrcy5wcm9jZXNzRm9ybURhdGEoKVxyXG5cclxuXHJcbi8vICAgcmVuZGVyIGRlbGV0ZSAgYnRuXHJcbnJlbmRlci5kZWxldGVidG4oKVxyXG5cclxuXHJcbi8vIEVESVQgIGZ1bmN0aW9ubGl0eVxyXG5cclxucmVuZGVyLmVkaXREaW9sZ0Zvcm0oKSAgIC8vIEVESVQgRElPTE9HIEZPUk0gXHJcbnRhc2tzLnByb2Nlc3NFZGl0Rm9ybURhdGEoKSAgICAgLy8gcHJvY2NlcyBlZGl0IGZvcm0gZGF0YSBcclxuXHJcblxyXG5cclxuZnVuY3Rpb24gY29zdG9tUHJvamVjdHMoKSB7XHJcbiAgICB0YXNrcy5sb2FkRnJvbVN0b3JhZ2UoKTtcclxuICAgIGxldCBub2RlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnByb2plY3RzLWZvbGRlcicpO1xyXG4gICAgbm9kZS5pbm5lckhUTUwgPSBcIlwiO1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0YXNrcy5jYXRlZ29yaWVzWydwcm9qZWN0cyddLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgbGV0IGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgICAgIGxldCBwcm9qZWN0TmFtZSA9IHRhc2tzLmNhdGVnb3JpZXNbJ3Byb2plY3RzJ11baV07XHJcbiAgICAgICAgbGV0IHByb2plY3RDb3VudCA9IHRhc2tzLmNhdGVnb3JpZXNbcHJvamVjdE5hbWVdLmxlbmd0aDtcclxuICAgICAgICBkaXYuaW5uZXJIVE1MID0gYDxsaSBpZD1cIiR7cHJvamVjdE5hbWV9XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInByb2plY3QtbmF2XCI+JHtwcm9qZWN0TmFtZX08L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInByb2plY3QtY291bnQtY3VzdG9tXCI+JHtwcm9qZWN0Q291bnR9PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2xpPmA7XHJcbiAgICAgICAgbm9kZS5hcHBlbmRDaGlsZChkaXYpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIEFkZCBldmVudCBsaXN0ZW5lcnMgZm9yIG5ld2x5IGNyZWF0ZWQgY3VzdG9tIHByb2plY3QgY2F0ZWdvcmllc1xyXG4gICAgY29uc3QgY3VzdG9tUHJvamVjdExpbmtzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnByb2plY3RzLWZvbGRlciBsaScpO1xyXG4gICAgY3VzdG9tUHJvamVjdExpbmtzLmZvckVhY2gobGluayA9PiB7XHJcbiAgICAgICAgbGluay5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChldmVudCkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBwcm9qZWN0TmFtZSA9IGxpbmsuaWQ7XHJcbiAgICAgICAgICAgIHJlbmRlci5BZGRUYXNrc0J1dHRvbihwcm9qZWN0TmFtZSk7XHJcbiAgICAgICAgICAgIHJlbmRlci5wcm9qZWN0Q291bnQoKTsgLy8gVXBkYXRlIHByb2plY3QgY291bnRcclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG59XHJcblxyXG5mdW5jdGlvbiBhZGRDYXRlZ29yeShjYXRlZ29yeU5hbWUpIHtcclxuICAgIHRhc2tzLmxvYWRGcm9tU3RvcmFnZSgpO1xyXG4gICAgaWYgKCF0YXNrcy5jYXRlZ29yaWVzLmhhc093blByb3BlcnR5KGNhdGVnb3J5TmFtZSkpIHtcclxuICAgICAgICB0YXNrcy5jYXRlZ29yaWVzW2NhdGVnb3J5TmFtZV0gPSBbXTtcclxuICAgICAgICBpZiAoIXRhc2tzLmNhdGVnb3JpZXNbXCJwcm9qZWN0c1wiXS5pbmNsdWRlcyhjYXRlZ29yeU5hbWUpKSB7XHJcbiAgICAgICAgICAgIHRhc2tzLmNhdGVnb3JpZXNbXCJwcm9qZWN0c1wiXS5wdXNoKGNhdGVnb3J5TmFtZSk7IC8vIEFkZGluZyB0byBwcm9qZWN0cyBhcnJheVxyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zb2xlLmxvZyhgQ2F0ZWdvcnkgJyR7Y2F0ZWdvcnlOYW1lfScgYWRkZWQgc3VjY2Vzc2Z1bGx5LmApO1xyXG4gICAgICAgIHRhc2tzLmFkZFRvU3RvcmFnZSgpO1xyXG4gICAgICAgIGNvc3RvbVByb2plY3RzKCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGBDYXRlZ29yeSAnJHtjYXRlZ29yeU5hbWV9JyBhbHJlYWR5IGV4aXN0cy5gKTtcclxuICAgIH1cclxufVxyXG5cclxuZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2N1c3RvbS1wcm9qZWN0JykuYWRkRXZlbnRMaXN0ZW5lcignc3VibWl0JywgKGUpID0+IHtcclxuICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgIGNvbnN0IHZhbHVlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2N1c3RvbS1wcm9qZWN0LWlucHV0JykudmFsdWU7XHJcbiAgICBhZGRDYXRlZ29yeSh2YWx1ZSk7XHJcbn0pO1xyXG5cclxuXHJcblxyXG5cclxuXHJcbmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNjdXN0b20tcHJvamVjdCcpLmFkZEV2ZW50TGlzdGVuZXIoJ3N1Ym1pdCcsIChlKSA9PiB7XHJcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICBjb25zdCB2YWx1ZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNjdXN0b20tcHJvamVjdC1pbnB1dCcpLnZhbHVlO1xyXG4gICAgYWRkQ2F0ZWdvcnkodmFsdWUpO1xyXG59KTtcclxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9