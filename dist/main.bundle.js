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
            // Changed event listener to target the document instead of specific elements
            document.addEventListener('click', function(event) {
                const target = event.target;
                // Check if the clicked element has the id 'task-details'
                if (target && target.id === 'task-details') {
                    // Split the class name to extract index and category
                    const arr = target.className.split('-');
                    const indexToView = parseInt(arr[0], 10);
                    const categoryToView = arr[1];
    
                    const task = tasks.categories[categoryToView][indexToView];
    
                    // Update the UI with task details
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
        displaycontainer.innerHTML = ""
        displaycontainer.appendChild(btn);

        closediolog.addEventListener('click', (e) => {
            dialog.close()
        })

        dialogForm.className = project
       
        
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
            ]
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





})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7Ozs7Ozs7VUM5ZUQ7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7OztBQ055QztBQUNEO0FBQ3hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrREFBTTtBQUNOO0FBQ0E7QUFDQSxrREFBTTtBQUNOLGtEQUFNO0FBQ047QUFDQTtBQUNBLGtEQUFNO0FBQ047QUFDQTtBQUNBLGtEQUFNO0FBQ047QUFDQSxpREFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLGtEQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQSxrREFBTTtBQUNOLGlEQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvdG9kb0Z1bmN0aW9ucy5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGNvbnN0IHJlbmRlciA9IChmdW5jdGlvbigpIHtcclxuICAgIGNvbnN0IGRpYWxvZyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZGlhbG9nXCIpO1xyXG4gICAgY29uc3QgY2xvc2VkaW9sb2cgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2xvc2VkaW9sb2cnKTtcclxuXHJcbiAgICBjb25zdCBkaXNwbGF5ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJkaXNwbGF5XCIpO1xyXG4gICAgY29uc3QgZGlzcGxheWNvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZGlzcGxheWNvbnRhaW5lclwiKTtcclxuICAgIGNvbnN0IGRpYWxvZ0Zvcm0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZGlhbG9nRm9ybScpXHJcbiAgICBjb25zdCBsaUVsZW1lbnRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5wcm9qZWN0LW5hdlwiKTtcclxuICAgIGNvbnN0IGVkaXRwcm9qZWN0ZGlhbG9nZm9ybSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNlZGl0LXByb2plY3QtZGlhbG9nLWZvcm0nKTtcclxuICAgIGNvbnN0IHZpZXdkaW9sb2cgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZWRpdC1wcm9qZWN0LWRpYWxvZycpO1xyXG4gICAgY29uc3Qgdmlld2Rpb2xvZ2Nsb3NlYnRuID0gIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNlZGl0LXByb2plY3QtZGlhbG9nLWNsb3NlLWJ0bicpO1xyXG5cclxuXHJcbiAgICBcclxuICAgICAgICBjb25zdCBkZXRhaWxzID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAvLyBDaGFuZ2VkIGV2ZW50IGxpc3RlbmVyIHRvIHRhcmdldCB0aGUgZG9jdW1lbnQgaW5zdGVhZCBvZiBzcGVjaWZpYyBlbGVtZW50c1xyXG4gICAgICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKGV2ZW50KSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCB0YXJnZXQgPSBldmVudC50YXJnZXQ7XHJcbiAgICAgICAgICAgICAgICAvLyBDaGVjayBpZiB0aGUgY2xpY2tlZCBlbGVtZW50IGhhcyB0aGUgaWQgJ3Rhc2stZGV0YWlscydcclxuICAgICAgICAgICAgICAgIGlmICh0YXJnZXQgJiYgdGFyZ2V0LmlkID09PSAndGFzay1kZXRhaWxzJykge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIFNwbGl0IHRoZSBjbGFzcyBuYW1lIHRvIGV4dHJhY3QgaW5kZXggYW5kIGNhdGVnb3J5XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgYXJyID0gdGFyZ2V0LmNsYXNzTmFtZS5zcGxpdCgnLScpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGluZGV4VG9WaWV3ID0gcGFyc2VJbnQoYXJyWzBdLCAxMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgY2F0ZWdvcnlUb1ZpZXcgPSBhcnJbMV07XHJcbiAgICBcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCB0YXNrID0gdGFza3MuY2F0ZWdvcmllc1tjYXRlZ29yeVRvVmlld11baW5kZXhUb1ZpZXddO1xyXG4gICAgXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gVXBkYXRlIHRoZSBVSSB3aXRoIHRhc2sgZGV0YWlsc1xyXG4gICAgICAgICAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd2aWV3LXRpdGxlJykudGV4dENvbnRlbnQgPSB0YXNrLnRpdGxlO1xyXG4gICAgICAgICAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd2aWV3LWRlc2MnKS50ZXh0Q29udGVudCA9IHRhc2suZGVzYztcclxuICAgICAgICAgICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndmlldy1kYXRlJykudGV4dENvbnRlbnQgPSB0YXNrLmRhdGU7XHJcbiAgICAgICAgICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3ZpZXctcHJpb3JpdHknKS50ZXh0Q29udGVudCA9IHRhc2sucHJpb3JpdHk7XHJcbiAgICBcclxuICAgICAgICAgICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndmlldy10YXNrLWRpYWxvZycpLnNob3dNb2RhbCgpXHJcbiAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3ZpZXctdGFzay1kaWFsb2ctY2xvc2UtYnRuJykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PntcclxuICAgICAgICAgICAgICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3ZpZXctdGFzay1kaWFsb2cnKS5jbG9zZSgxKVxyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgY29uc3QgcHJvamVjdENvdW50ID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnByb2plY3QtY291bnQtaG9tZScpLmlubmVyVGV4dCA9IHRhc2tzLmNhdGVnb3JpZXNbXCJob21lXCJdLmxlbmd0aDtcclxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucHJvamVjdC1jb3VudC10b2RheScpLmlubmVyVGV4dCA9IHRhc2tzLmNhdGVnb3JpZXNbXCJ0b2RheVwiXS5sZW5ndGg7XHJcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnByb2plY3QtY291bnQtd2VlaycpLmlubmVyVGV4dCA9IHRhc2tzLmNhdGVnb3JpZXNbXCJ3ZWVrXCJdLmxlbmd0aDtcclxuXHJcblxyXG5cclxuICAgICAgICBkb2N1bWVudC5ib2R5LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywoKSA9PiB7XHJcbiAgICAgICAgICAgIHRhc2tzLmxvYWRGcm9tU3RvcmFnZSgpXHJcbiAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wcm9qZWN0LWNvdW50LWhvbWUnKS5pbm5lclRleHQgPSB0YXNrcy5jYXRlZ29yaWVzW1wiaG9tZVwiXS5sZW5ndGg7XHJcbiAgICAgICAgfSApXHJcbiAgICB9XHJcbiAgICBjb25zdCBuYXZQYWdpbmF0aW9uID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgbGlFbGVtZW50cy5mb3JFYWNoKChsaSkgPT4ge1xyXG4gICAgICAgICAgICBsaS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGV2ZW50KSA9PiB7XHJcbiAgICAgICAgICAgICAgICBsaUVsZW1lbnRzLmZvckVhY2goKGxpKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGkuY2xvc2VzdCgnbGknKS5jbGFzc0xpc3QucmVtb3ZlKFwibmF2LXNlbGVjdGVkXCIpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICBcclxuICAgICAgICAgICAgICAgIGNvbnN0IG5hdkRpdiA9IGV2ZW50LnRhcmdldC5jbG9zZXN0KCdsaScpO1xyXG4gICAgICAgICAgICAgICAgbmF2RGl2LmNsYXNzTGlzdC5hZGQoXCJuYXYtc2VsZWN0ZWRcIik7XHJcbiAgICBcclxuICAgICAgICAgICAgICAgIGxldCBwcm9qZWN0ID0gZXZlbnQudGFyZ2V0LmlubmVySFRNTDtcclxuICAgICAgICAgICAgICAgIHJlbmRlci5BZGRUYXNrc0J1dHRvbihwcm9qZWN0KTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBcclxuXHJcbiAgICBjb25zdCBkZWxldGVidG4gPSBmdW5jdGlvbigpIHtcclxuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKGV2ZW50KSB7XHJcbiAgICAgICAgICAgIGlmIChldmVudC50YXJnZXQgJiYgZXZlbnQudGFyZ2V0LmlkID09PSAnZGVsZXRlLXRhc2snKSB7XHJcbiAgICAgICAgICAgICAgICB0YXNrcy5kZWxldGV0YXNrKGV2ZW50KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGVkaXREaW9sZ0Zvcm0gPSBmdW5jdGlvbigpIHtcclxuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKGV2ZW50KSB7XHJcbiAgICAgICAgIGlmIChldmVudC50YXJnZXQgJiYgZXZlbnQudGFyZ2V0LmNsYXNzTmFtZSA9PT0gJ2VkaXQtdGFzaycpIHtcclxuICAgICAgICAgICAgIGNvbnN0IGluZGV4dG9lZGl0ID0gcGFyc2VJbnQoZXZlbnQudGFyZ2V0LmlkLCAxMCk7XHJcbiAgICAgICAgICAgICBjb25zdCBwcm9qZWN0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2RpYWxvZ0Zvcm0nKS5jbGFzc05hbWU7XHJcbiAgICAgICAgXHJcbiAgICAgICAgICAgICAvLyBTdG9yZSBpbmRleHRvZWRpdCBpbiBhIGRhdGEgYXR0cmlidXRlIG9mIHRoZSBlZGl0cHJvamVjdGRpYWxvZ2Zvcm1cclxuICAgICAgICBcclxuICAgICAgICAgICAgIGVkaXRwcm9qZWN0ZGlhbG9nZm9ybS5zZXRBdHRyaWJ1dGUoJ2RhdGEtaW5kZXh0b2VkaXQnLCBpbmRleHRvZWRpdCk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgICAgICBlZGl0cHJvamVjdGRpYWxvZ2Zvcm0ucmVzZXQoKTtcclxuICAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5lZGl0dGl0bGUnKS52YWx1ZSA9IHRhc2tzLmNhdGVnb3JpZXNbcHJvamVjdF1baW5kZXh0b2VkaXRdWyd0aXRsZSddO1xyXG4gICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmVkaXRkZXNjJykudmFsdWUgPSB0YXNrcy5jYXRlZ29yaWVzW3Byb2plY3RdW2luZGV4dG9lZGl0XVsnZGVzYyddO1xyXG4gICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmVkaXRkYXRlJykudmFsdWUgPSB0YXNrcy5jYXRlZ29yaWVzW3Byb2plY3RdW2luZGV4dG9lZGl0XVsnZGF0ZSddO1xyXG4gICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmVkaXRwcmlvcml0eScpLnZhbHVlID0gdGFza3MuY2F0ZWdvcmllc1twcm9qZWN0XVtpbmRleHRvZWRpdF1bJ3ByaW9yaXR5J107XHJcblxyXG4gICAgICAgICAgICAgdmlld2Rpb2xvZy5zaG93TW9kYWwoKTtcclxuICAgICAgICAgICAgIHZpZXdkaW9sb2djbG9zZWJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgdmlld2Rpb2xvZy5jbG9zZSgpO1xyXG4gICAgICAgICAgICAgICAgIH0pO1xyXG4gXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgQWRkVGFza3NCdXR0b24gPSBmdW5jdGlvbihwcm9qZWN0KSB7XHJcbiAgICAgICAgaWYocHJvamVjdCA9PSBcIm5vdGVzXCIpIHtcclxuICAgICAgICAgICAgYWxlcnQoXCJub3RlcyBmdW5jdGlvbmFsaXR5IGNvbWluZyBzb29uIC4uLi4gaSB0aGluayBcIilcclxuICAgICAgICAgICAgY29uc3QgYnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XHJcbiAgICAgICAgYnRuLmlubmVyVGV4dCA9IGBBREQgYSBOb3RlIFRPICR7cHJvamVjdC50b1VwcGVyQ2FzZSgpfWA7XHJcbiAgICAgICAgYnRuLmlkID0gcHJvamVjdDtcclxuICAgICAgICBidG4uY2xhc3NOYW1lID0gJ2FkZC10YXNrLWJ0bidcclxuICAgICAgICBidG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGRpYWxvZy5zaG93TW9kYWwoKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICBkaXNwbGF5Y29udGFpbmVyLmlubmVySFRNTCA9IFwiXCJcclxuICAgICAgICBkaXNwbGF5Y29udGFpbmVyLmFwcGVuZENoaWxkKGJ0bik7XHJcblxyXG4gICAgICAgIGNsb3NlZGlvbG9nLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcclxuICAgICAgICAgICAgZGlhbG9nLmNsb3NlKClcclxuICAgICAgICB9KVxyXG5cclxuICAgICAgICBkaWFsb2dGb3JtLmNsYXNzTmFtZSA9IHByb2plY3RcclxuICAgICAgIFxyXG4gICAgICAgIFxyXG4gICAgICAgIH0gZWxzZXtcclxuICAgICAgICBjb25zdCBidG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcclxuICAgICAgICBidG4uaW5uZXJUZXh0ID0gYEFERCBUQVNLIFRPICR7cHJvamVjdC50b1VwcGVyQ2FzZSgpfWA7XHJcbiAgICAgICAgYnRuLmlkID0gcHJvamVjdDtcclxuICAgICAgICBidG4uY2xhc3NOYW1lID0gJ2FkZC10YXNrLWJ0bidcclxuICAgICAgICBidG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGRpYWxvZy5zaG93TW9kYWwoKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICBkaXNwbGF5Y29udGFpbmVyLmlubmVySFRNTCA9IFwiXCJcclxuICAgICAgICBkaXNwbGF5Y29udGFpbmVyLmFwcGVuZENoaWxkKGJ0bik7XHJcblxyXG4gICAgICAgIGNsb3NlZGlvbG9nLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcclxuICAgICAgICAgICAgZGlhbG9nLmNsb3NlKClcclxuICAgICAgICB9KVxyXG5cclxuICAgICAgICBkaWFsb2dGb3JtLmNsYXNzTmFtZSA9IHByb2plY3RcclxuICAgICAgICByZW5kZXIuVGFza3MocHJvamVjdClcclxuICAgIH1cclxuICAgICAgICBcclxuICAgIH07XHJcblxyXG5cclxuICAgIGNvbnN0IFRhc2tzID0gZnVuY3Rpb24obmFtZSl7XHJcbiAgICAgICAgZGlzcGxheS5pbm5lckhUTUwgPSBcIlwiXHJcbiAgICAgICAgY29uc3QgbmFtZTEgPSBuYW1lXHJcbiAgICAgICAgdGFza3MubG9hZEZyb21TdG9yYWdlKCk7XHJcbiAgICAgICAgY29uc3QgZm9sZGVyID0gdGFza3MuY2F0ZWdvcmllc1tuYW1lXVxyXG4gICAgICAgIGZvbGRlci5mb3JFYWNoKChlbGVtZW50LGluZGV4KSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgICAgICAgICBkaXYuY2xhc3NOYW1lID0gXCJwcm9qZWN0XCI7XHJcbiAgICAgICAgICAgIGRpdi5pZCA9IGVsZW1lbnQucHJpb3JpdHk7IFxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgZGl2LmlubmVySFRNTCA9IGA8aDE+JHtlbGVtZW50LnRpdGxlfTwvaDE+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3M9XCJkZXNjaVwiPiR7ZWxlbWVudC5kZXNjfTwvcD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cD4ke2VsZW1lbnQuZGF0ZX08L3A+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGgzPiR7ZWxlbWVudC5wcmlvcml0eX08L2gzPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJlZGl0LXRhc2tcIiBpZD1cIiR7aW5kZXh9XCI+ZWRpdDwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gaWQ9XCJ0YXNrLWRldGFpbHNcIiBjbGFzcz1cIiR7aW5kZXh9LSR7bmFtZX1cIj5kZXRhaWxzPC9idXR0b24+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBpZD1cImRlbGV0ZS10YXNrXCIgY2xhc3M9XCIke2luZGV4fS0ke25hbWV9XCI+ZG9uZTwvYnV0dG9uPmA7XHJcbiAgICAgICAgICAgIGRpc3BsYXkuYXBwZW5kQ2hpbGQoZGl2KTtcclxuICAgICAgICAgICAgcHJvamVjdENvdW50KClcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIEFkZFRhc2tzQnV0dG9uLFxyXG4gICAgICAgIFRhc2tzLFxyXG4gICAgICAgIG5hdlBhZ2luYXRpb24sXHJcbiAgICAgICAgZGVsZXRlYnRuLFxyXG4gICAgICAgIGVkaXREaW9sZ0Zvcm0sXHJcbiAgICAgICAgcHJvamVjdENvdW50LFxyXG4gICAgICAgIGRldGFpbHNcclxuICAgIH07XHJcbn0pKCk7XHJcblxyXG5leHBvcnQgY29uc3QgdGFza3MgPSAoZnVuY3Rpb24oKSB7XHJcbiAgICBjb25zdCBjYXRlZ29yaWVzID0ge1xyXG4gICAgICAgIGhvbWU6IFtdLFxyXG4gICAgICAgIHRvZGF5OiBbXSxcclxuICAgICAgICB3ZWVrOiBbXSxcclxuICAgICAgICBwcm9qZWN0czogW11cclxuICAgIH07XHJcblxyXG5cclxuXHJcbiAgICBjb25zdCBwcm9jZXNzRm9ybURhdGEgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZGlhbG9nRm9ybScpLmFkZEV2ZW50TGlzdGVuZXIoJ3N1Ym1pdCcsKGUpID0+IHtcclxuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpXHJcbiAgICAgICAgICAgIGNvbnN0IGZvcm1kYXRhID0gbmV3IEZvcm1EYXRhKGUudGFyZ2V0KTtcclxuICAgICAgICAgICAgY29uc3QgZm9ybUNsYXNzTmFtZSA9IGUudGFyZ2V0LmNsYXNzTmFtZTtcclxuICAgICAgICBcclxuICAgICAgICAgICAgY29uc3QgZm9ybURhdGFPYmplY3QgPSB7fTtcclxuICAgICAgICAgICAgZm9ybWRhdGEuZm9yRWFjaChmdW5jdGlvbih2YWx1ZSwga2V5KXtcclxuICAgICAgICAgICAgICAgIGZvcm1EYXRhT2JqZWN0W2tleV0gPSB2YWx1ZTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgXHJcbiAgICAgICAgICAgIHRhc2tzLmFkZChmb3JtRGF0YU9iamVjdCxmb3JtQ2xhc3NOYW1lKTtcclxuICAgICAgICAgICAgcmVuZGVyLkFkZFRhc2tzQnV0dG9uKGZvcm1DbGFzc05hbWUpO1xyXG4gICAgICAgICAgICBlLnRhcmdldC5yZXNldCgpXHJcbiAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdkaWFsb2cnKS5jbG9zZSgpXHJcbiAgICAgICAgXHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcblxyXG5cclxuICAgIGNvbnN0IHByb2Nlc3NFZGl0Rm9ybURhdGEgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICBjb25zdCBlZGl0cHJvamVjdGRpYWxvZ2Zvcm0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZWRpdC1wcm9qZWN0LWRpYWxvZy1mb3JtJyk7XHJcbiAgICAgICAgY29uc3Qgdmlld2Rpb2xvZyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5lZGl0LXByb2plY3QtZGlhbG9nJyk7XHJcblxyXG5cclxuICAgICAgICBlZGl0cHJvamVjdGRpYWxvZ2Zvcm0uYWRkRXZlbnRMaXN0ZW5lcignc3VibWl0JywoZSkgPT4ge1xyXG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAvLyBSZXRyaWV2ZSBpbmRleHRvZWRpdCBmcm9tIHRoZSBkYXRhIGF0dHJpYnV0ZSBvZiBlZGl0cHJvamVjdGRpYWxvZ2Zvcm1cclxuICAgICAgICAgICAgY29uc3QgaW5kZXh0b2VkaXQgPSBwYXJzZUludChlZGl0cHJvamVjdGRpYWxvZ2Zvcm0uZ2V0QXR0cmlidXRlKCdkYXRhLWluZGV4dG9lZGl0JyksIDEwKTtcclxuICAgICAgICAgICAgY29uc3QgcHJvamVjdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdkaWFsb2dGb3JtJykuY2xhc3NOYW1lO1xyXG4gICAgICAgICAgICBjb25zdCBmb3JtRGF0YU9iamVjdCA9IHtcclxuICAgICAgICAgICAgICAgIHRpdGxlOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZWRpdHRpdGxlJykudmFsdWUsXHJcbiAgICAgICAgICAgICAgICBkZXNjOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZWRpdGRlc2MnKS52YWx1ZSxcclxuICAgICAgICAgICAgICAgIGRhdGU6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5lZGl0ZGF0ZScpLnZhbHVlLFxyXG4gICAgICAgICAgICAgICAgcHJpb3JpdHk6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5lZGl0cHJpb3JpdHknKS52YWx1ZVxyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgdGFza3MuZWRpdHRhc2soZm9ybURhdGFPYmplY3QsIHByb2plY3QsIGluZGV4dG9lZGl0KTtcclxuICAgICAgICAgICAgdmlld2Rpb2xvZy5jbG9zZSgpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGFkZCA9IGZ1bmN0aW9uKG9iaixuYW1lKSB7XHJcbiAgICAgICAgdGFza3MuY2F0ZWdvcmllc1tuYW1lXS5wdXNoKG9iailcclxuICAgICAgICB0YXNrcy5hZGRUb1N0b3JhZ2UoKVxyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGFkZFRvU3RvcmFnZSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBjb25zdCBhcnIgPSBKU09OLnN0cmluZ2lmeSh0YXNrcy5jYXRlZ29yaWVzKTtcclxuICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShcImRhdGFcIiwgYXJyKTtcclxuICAgIH07XHJcbiAgICBcclxuICAgIGNvbnN0IGxvYWRGcm9tU3RvcmFnZSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBjb25zdCBhcnIxID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJkYXRhXCIpO1xyXG4gICAgICAgIGlmIChhcnIxKSB7XHJcbiAgICAgICAgICAgIHRhc2tzLmNhdGVnb3JpZXMgPSBKU09OLnBhcnNlKGFycjEpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHBvcHVsdGUoKVxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgYWRkVG9TdG9yYWdlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIGNvbnN0IGRlbGV0ZXRhc2sgPSBmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgY29uc3QgYXJyID0gZS50YXJnZXQuY2xhc3NOYW1lLnNwbGl0KCctJyk7XHJcbiAgICAgICAgY29uc3QgaW5kZXh0b2RlbGV0ZSA9IHBhcnNlSW50KGFyclswXSwgMTApO1xyXG4gICAgICAgIGNvbnN0IGNhdGVnb3J5ID0gYXJyWzFdO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGNvbnN0IHByb2plY3REaXYgPSBlLnRhcmdldC5jbG9zZXN0KCcucHJvamVjdCcpOyBcclxuICAgICAgICBcclxuICAgICAgICAvLyBBZGQgZmFkZS1vdXQgY2xhc3MgdG8gdHJpZ2dlciB0cmFuc2l0aW9uXHJcbiAgICAgICAgcHJvamVjdERpdi5jbGFzc0xpc3QuYWRkKCdmYWRlLW91dCcpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIEFmdGVyIHRoZSB0cmFuc2l0aW9uIGNvbXBsZXRlcywgcmVtb3ZlIHRoZSBwcm9qZWN0IGRpdlxyXG4gICAgICAgIFxyXG4gICAgICAgIHRhc2tzLmNhdGVnb3JpZXNbY2F0ZWdvcnldLnNwbGljZShpbmRleHRvZGVsZXRlLCAxKTtcclxuICAgICAgICAgICAgYWRkVG9TdG9yYWdlKCk7XHJcbiAgICAgICAgICAgIHJlbmRlci5UYXNrcyhjYXRlZ29yeSk7XHJcbiAgICAgICAgLy8gQWRqdXN0IHRoZSB0aW1pbmcgdG8gbWF0Y2ggdGhlIHRyYW5zaXRpb24gZHVyYXRpb24gKGluIG1pbGxpc2Vjb25kcylcclxuXHJcbiAgICAgICAgcmVuZGVyLnByb2plY3RDb3VudCgpXHJcbiAgICB9O1xyXG4gICAgXHJcbiAgICBjb25zdCBlZGl0dGFzayA9IGZ1bmN0aW9uKG9iaixjYXRlZ29yeSxpbmRleHRvZWRpdCkge1xyXG4gICAgICAgIHRhc2tzLmNhdGVnb3JpZXNbY2F0ZWdvcnldW2luZGV4dG9lZGl0XVsndGl0bGUnXSA9IG9ialsndGl0bGUnXTtcclxuICAgICAgICB0YXNrcy5jYXRlZ29yaWVzW2NhdGVnb3J5XVtpbmRleHRvZWRpdF1bJ2Rlc2MnXSA9IG9ialsnZGVzYyddO1xyXG4gICAgICAgIHRhc2tzLmNhdGVnb3JpZXNbY2F0ZWdvcnldW2luZGV4dG9lZGl0XVsnZGF0ZSddID0gb2JqWydkYXRlJ107XHJcbiAgICAgICAgdGFza3MuY2F0ZWdvcmllc1tjYXRlZ29yeV1baW5kZXh0b2VkaXRdWydwcmlvcml0eSddID0gb2JqWydwcmlvcml0eSddO1xyXG4gICAgICAgIGFkZFRvU3RvcmFnZSgpXHJcbiAgICAgICAgcmVuZGVyLlRhc2tzKGNhdGVnb3J5KVxyXG4gICAgfVxyXG4gICAgXHJcbiAgICBjb25zdCBwb3B1bHRlID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgdGFza3MuY2F0ZWdvcmllcyA9IHtcclxuICAgICAgICAgICAgaG9tZTogW1xyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIFwidGl0bGVcIjogXCJDbGVhbiB0aGUgaG91c2VcIixcclxuICAgICAgICAgICAgICAgICAgICBcImRlc2NcIjogXCJWYWN1dW0gdGhlIGZsb29ycyBhbmQgZHVzdCB0aGUgc2hlbHZlcy5cIixcclxuICAgICAgICAgICAgICAgICAgICBcImRhdGVcIjogXCIyMDI0LTAzLTAxXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJwcmlvcml0eVwiOiBcImhpZ2hcIlxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBcInRpdGxlXCI6IFwiR3JvY2VyeSBTaG9wcGluZ1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwiZGVzY1wiOiBcIkJ1eSBmcnVpdHMsIHZlZ2V0YWJsZXMsIGFuZCBtaWxrLlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwiZGF0ZVwiOiBcIjIwMjQtMDMtMDJcIixcclxuICAgICAgICAgICAgICAgICAgICBcInByaW9yaXR5XCI6IFwibWVkaXVtXCJcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgXCJ0aXRsZVwiOiBcIkZpeCB0aGUgbGVha2luZyBmYXVjZXRcIixcclxuICAgICAgICAgICAgICAgICAgICBcImRlc2NcIjogXCJDYWxsIHRoZSBwbHVtYmVyIHRvIGZpeCB0aGUgZmF1Y2V0IGluIHRoZSBraXRjaGVuLlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwiZGF0ZVwiOiBcIjIwMjQtMDMtMDVcIixcclxuICAgICAgICAgICAgICAgICAgICBcInByaW9yaXR5XCI6IFwiaGlnaFwiXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIFwidGl0bGVcIjogXCJPcmdhbml6ZSB0aGUgY2xvc2V0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJkZXNjXCI6IFwiU29ydCBjbG90aGVzIGFuZCBkb25hdGUgdW51c2VkIGl0ZW1zLlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwiZGF0ZVwiOiBcIjIwMjQtMDMtMDdcIixcclxuICAgICAgICAgICAgICAgICAgICBcInByaW9yaXR5XCI6IFwibWVkaXVtXCJcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgXCJ0aXRsZVwiOiBcIlBheSBiaWxsc1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwiZGVzY1wiOiBcIlBheSBlbGVjdHJpY2l0eSwgd2F0ZXIsIGFuZCBpbnRlcm5ldCBiaWxscy5cIixcclxuICAgICAgICAgICAgICAgICAgICBcImRhdGVcIjogXCIyMDI0LTAzLTA5XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJwcmlvcml0eVwiOiBcImhpZ2hcIlxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBcInRpdGxlXCI6IFwiTW93IHRoZSBsYXduXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJkZXNjXCI6IFwiVHJpbSB0aGUgZ3Jhc3MgYW5kIHRpZHkgdXAgdGhlIGdhcmRlbi5cIixcclxuICAgICAgICAgICAgICAgICAgICBcImRhdGVcIjogXCIyMDI0LTAzLTExXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJwcmlvcml0eVwiOiBcIm1lZGl1bVwiXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIFwidGl0bGVcIjogXCJGaXggdGhlIGJyb2tlbiBkcmF3ZXJcIixcclxuICAgICAgICAgICAgICAgICAgICBcImRlc2NcIjogXCJSZXBhaXIgdGhlIGJyb2tlbiBkcmF3ZXIgaW4gdGhlIGJlZHJvb20uXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJkYXRlXCI6IFwiMjAyNC0wMy0xNFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwicHJpb3JpdHlcIjogXCJoaWdoXCJcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgXCJ0aXRsZVwiOiBcIlBsYW4gZmFtaWx5IG91dGluZ1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwiZGVzY1wiOiBcIkRlY2lkZSBvbiBhIGRlc3RpbmF0aW9uIGFuZCBtYWtlIHJlc2VydmF0aW9ucy5cIixcclxuICAgICAgICAgICAgICAgICAgICBcImRhdGVcIjogXCIyMDI0LTAzLTE2XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJwcmlvcml0eVwiOiBcIm1lZGl1bVwiXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIFwidGl0bGVcIjogXCJJbnN0YWxsIG5ldyBsaWdodCBmaXh0dXJlc1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwiZGVzY1wiOiBcIlJlcGxhY2Ugb2xkIGZpeHR1cmVzIHdpdGggZW5lcmd5LWVmZmljaWVudCBvbmVzLlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwiZGF0ZVwiOiBcIjIwMjQtMDMtMThcIixcclxuICAgICAgICAgICAgICAgICAgICBcInByaW9yaXR5XCI6IFwiaGlnaFwiXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIFwidGl0bGVcIjogXCJDbGVhbiB0aGUgd2luZG93c1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwiZGVzY1wiOiBcIldpcGUgZG93biBhbmQgcG9saXNoIGFsbCB3aW5kb3dzIGluIHRoZSBob3VzZS5cIixcclxuICAgICAgICAgICAgICAgICAgICBcImRhdGVcIjogXCIyMDI0LTAzLTIwXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJwcmlvcml0eVwiOiBcIm1lZGl1bVwiXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgIHRvZGF5OiBbXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgXCJ0aXRsZVwiOiBcIkZpbmlzaCByZXBvcnRcIixcclxuICAgICAgICAgICAgICAgICAgICBcImRlc2NcIjogXCJDb21wbGV0ZSB0aGUgcXVhcnRlcmx5IHJlcG9ydCBmb3IgdGhlIG1lZXRpbmcuXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJkYXRlXCI6IFwiMjAyNC0wMy0wMVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwicHJpb3JpdHlcIjogXCJoaWdoXCJcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgXCJ0aXRsZVwiOiBcIkF0dGVuZCB3ZWJpbmFyXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJkZXNjXCI6IFwiUGFydGljaXBhdGUgaW4gdGhlIHdlYmluYXIgb24gbmV3IHRlY2hub2xvZ2llcy5cIixcclxuICAgICAgICAgICAgICAgICAgICBcImRhdGVcIjogXCIyMDI0LTAzLTAxXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJwcmlvcml0eVwiOiBcIm1lZGl1bVwiXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIFwidGl0bGVcIjogXCJTdWJtaXQgZXhwZW5zZSByZXBvcnRcIixcclxuICAgICAgICAgICAgICAgICAgICBcImRlc2NcIjogXCJTdWJtaXQgdGhlIGV4cGVuc2UgcmVwb3J0IGZvciBsYXN0IG1vbnRoLlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwiZGF0ZVwiOiBcIjIwMjQtMDMtMDFcIixcclxuICAgICAgICAgICAgICAgICAgICBcInByaW9yaXR5XCI6IFwiaGlnaFwiXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIFwidGl0bGVcIjogXCJSZXZpZXcgcHJvamVjdCBwcm9wb3NhbFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwiZGVzY1wiOiBcIlJldmlldyBhbmQgcHJvdmlkZSBmZWVkYmFjayBvbiB0aGUgcHJvamVjdCBwcm9wb3NhbC5cIixcclxuICAgICAgICAgICAgICAgICAgICBcImRhdGVcIjogXCIyMDI0LTAzLTAxXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJwcmlvcml0eVwiOiBcIm1lZGl1bVwiXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIFwidGl0bGVcIjogXCJDYWxsIHdpdGggbWFuYWdlclwiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwiZGVzY1wiOiBcIlNjaGVkdWxlIGEgY2FsbCB3aXRoIHRoZSBtYW5hZ2VyIHRvIGRpc2N1c3MgcHJvamVjdCB1cGRhdGVzLlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwiZGF0ZVwiOiBcIjIwMjQtMDMtMDFcIixcclxuICAgICAgICAgICAgICAgICAgICBcInByaW9yaXR5XCI6IFwiaGlnaFwiXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIFwidGl0bGVcIjogXCJQcmVwYXJlIHByZXNlbnRhdGlvblwiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwiZGVzY1wiOiBcIlByZXBhcmUgc2xpZGVzIGZvciB0aGUgdXBjb21pbmcgcHJlc2VudGF0aW9uLlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwiZGF0ZVwiOiBcIjIwMjQtMDMtMDFcIixcclxuICAgICAgICAgICAgICAgICAgICBcInByaW9yaXR5XCI6IFwibWVkaXVtXCJcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgXCJ0aXRsZVwiOiBcIlNlbmQgZm9sbG93LXVwIGVtYWlsc1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwiZGVzY1wiOiBcIlNlbmQgZm9sbG93LXVwIGVtYWlscyB0byBjbGllbnRzIHJlZ2FyZGluZyByZWNlbnQgbWVldGluZ3MuXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJkYXRlXCI6IFwiMjAyNC0wMy0wMVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwicHJpb3JpdHlcIjogXCJoaWdoXCJcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgXCJ0aXRsZVwiOiBcIlByb2plY3Qgc3RhdHVzIG1lZXRpbmdcIixcclxuICAgICAgICAgICAgICAgICAgICBcImRlc2NcIjogXCJBdHRlbmQgdGhlIHByb2plY3Qgc3RhdHVzIG1lZXRpbmcgd2l0aCB0aGUgdGVhbS5cIixcclxuICAgICAgICAgICAgICAgICAgICBcImRhdGVcIjogXCIyMDI0LTAzLTAxXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJwcmlvcml0eVwiOiBcIm1lZGl1bVwiXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIFwidGl0bGVcIjogXCJSZXZpZXcgY29kZSBjaGFuZ2VzXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJkZXNjXCI6IFwiUmV2aWV3IHRoZSByZWNlbnQgY29kZSBjaGFuZ2VzIGFuZCBwcm92aWRlIGZlZWRiYWNrLlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwiZGF0ZVwiOiBcIjIwMjQtMDMtMDFcIixcclxuICAgICAgICAgICAgICAgICAgICBcInByaW9yaXR5XCI6IFwiaGlnaFwiXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIFwidGl0bGVcIjogXCJDb21wbGV0ZSB0cmFpbmluZyBtb2R1bGVzXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJkZXNjXCI6IFwiQ29tcGxldGUgdGhlIHRyYWluaW5nIG1vZHVsZXMgb24gbmV3IHNvZnR3YXJlIHRvb2xzLlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwiZGF0ZVwiOiBcIjIwMjQtMDMtMDFcIixcclxuICAgICAgICAgICAgICAgICAgICBcInByaW9yaXR5XCI6IFwibWVkaXVtXCJcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgXCJ0aXRsZVwiOiBcIlN1Ym1pdCBsZWF2ZSByZXF1ZXN0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJkZXNjXCI6IFwiU3VibWl0IGEgbGVhdmUgcmVxdWVzdCBmb3IgbmV4dCB3ZWVrLlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwiZGF0ZVwiOiBcIjIwMjQtMDMtMDFcIixcclxuICAgICAgICAgICAgICAgICAgICBcInByaW9yaXR5XCI6IFwiaGlnaFwiXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIFwidGl0bGVcIjogXCJQcmVwYXJlIGFnZW5kYSBmb3IgbWVldGluZ1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwiZGVzY1wiOiBcIlByZXBhcmUgdGhlIGFnZW5kYSBmb3IgdGhlIHRlYW0gbWVldGluZy5cIixcclxuICAgICAgICAgICAgICAgICAgICBcImRhdGVcIjogXCIyMDI0LTAzLTAxXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJwcmlvcml0eVwiOiBcIm1lZGl1bVwiXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIFwidGl0bGVcIjogXCJVcGRhdGUgcHJvamVjdCBkb2N1bWVudGF0aW9uXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJkZXNjXCI6IFwiVXBkYXRlIHRoZSBwcm9qZWN0IGRvY3VtZW50YXRpb24gd2l0aCByZWNlbnQgY2hhbmdlcy5cIixcclxuICAgICAgICAgICAgICAgICAgICBcImRhdGVcIjogXCIyMDI0LTAzLTAxXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJwcmlvcml0eVwiOiBcImhpZ2hcIlxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBcInRpdGxlXCI6IFwiUmV2aWV3IG1hcmtldGluZyBjYW1wYWlnblwiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwiZGVzY1wiOiBcIlJldmlldyB0aGUgcmVzdWx0cyBvZiB0aGUgcmVjZW50IG1hcmtldGluZyBjYW1wYWlnbi5cIixcclxuICAgICAgICAgICAgICAgICAgICBcImRhdGVcIjogXCIyMDI0LTAzLTAxXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJwcmlvcml0eVwiOiBcIm1lZGl1bVwiXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIFwidGl0bGVcIjogXCJTZW5kIHdlZWtseSBwcm9ncmVzcyByZXBvcnRcIixcclxuICAgICAgICAgICAgICAgICAgICBcImRlc2NcIjogXCJTZW5kIHRoZSB3ZWVrbHkgcHJvZ3Jlc3MgcmVwb3J0IHRvIHRoZSBwcm9qZWN0IHN0YWtlaG9sZGVycy5cIixcclxuICAgICAgICAgICAgICAgICAgICBcImRhdGVcIjogXCIyMDI0LTAzLTAxXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJwcmlvcml0eVwiOiBcImhpZ2hcIlxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgd2VlazogW1xyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIFwidGl0bGVcIjogXCJQcm9qZWN0IHByZXNlbnRhdGlvblwiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwiZGVzY1wiOiBcIlByZXBhcmUgc2xpZGVzIGZvciB0aGUgcHJvamVjdCBwcmVzZW50YXRpb24uXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJkYXRlXCI6IFwiMjAyNC0wMy0wNFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwicHJpb3JpdHlcIjogXCJoaWdoXCJcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgXCJ0aXRsZVwiOiBcIlRlYW0gbWVldGluZ1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwiZGVzY1wiOiBcIkRpc2N1c3MgcHJvamVjdCBwcm9ncmVzcyB3aXRoIHRoZSB0ZWFtLlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwiZGF0ZVwiOiBcIjIwMjQtMDMtMDVcIixcclxuICAgICAgICAgICAgICAgICAgICBcInByaW9yaXR5XCI6IFwibWVkaXVtXCJcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgXCJ0aXRsZVwiOiBcIkNsaWVudCBjYWxsXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJkZXNjXCI6IFwiU2NoZWR1bGUgYSBjYWxsIHdpdGggdGhlIGNsaWVudCB0byByZXZpZXcgcmVxdWlyZW1lbnRzLlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwiZGF0ZVwiOiBcIjIwMjQtMDMtMDZcIixcclxuICAgICAgICAgICAgICAgICAgICBcInByaW9yaXR5XCI6IFwiaGlnaFwiXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIFwidGl0bGVcIjogXCJQcm9qZWN0IGJyYWluc3Rvcm1pbmdcIixcclxuICAgICAgICAgICAgICAgICAgICBcImRlc2NcIjogXCJCcmFpbnN0b3JtIGlkZWFzIGZvciB0aGUgdXBjb21pbmcgcHJvamVjdC5cIixcclxuICAgICAgICAgICAgICAgICAgICBcImRhdGVcIjogXCIyMDI0LTAzLTA4XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJwcmlvcml0eVwiOiBcIm1lZGl1bVwiXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIFwidGl0bGVcIjogXCJDb2RlIHJldmlld1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwiZGVzY1wiOiBcIkNvbmR1Y3QgYSBjb2RlIHJldmlldyBzZXNzaW9uIGZvciB0aGUgdGVhbS5cIixcclxuICAgICAgICAgICAgICAgICAgICBcImRhdGVcIjogXCIyMDI0LTAzLTA5XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJwcmlvcml0eVwiOiBcImhpZ2hcIlxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBcInRpdGxlXCI6IFwiUHJvamVjdCB0ZXN0aW5nXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJkZXNjXCI6IFwiVGVzdCB0aGUgZmVhdHVyZXMgZGV2ZWxvcGVkIGluIHRoZSBwcm9qZWN0LlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwiZGF0ZVwiOiBcIjIwMjQtMDMtMTBcIixcclxuICAgICAgICAgICAgICAgICAgICBcInByaW9yaXR5XCI6IFwibWVkaXVtXCJcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgIHByb2plY3RzOiBbXHJcbiAgICAgICAgICAgICAgICAvLyBBZGQgbW9yZSBkZWZhdWx0IHRhc2tzIGZvciBwcm9qZWN0cyBoZXJlXHJcbiAgICAgICAgICAgIF1cclxuICAgICAgICB9O1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBjYXRlZ29yaWVzLFxyXG4gICAgICAgIGFkZCxcclxuICAgICAgICBwb3B1bHRlLFxyXG4gICAgICAgIGFkZFRvU3RvcmFnZSxcclxuICAgICAgICBsb2FkRnJvbVN0b3JhZ2UsXHJcbiAgICAgICAgZGVsZXRldGFzayxcclxuICAgICAgICBlZGl0dGFzayxcclxuICAgICAgICBwcm9jZXNzRm9ybURhdGEsXHJcbiAgICAgICAgcHJvY2Vzc0VkaXRGb3JtRGF0YVxyXG4gICAgfVxyXG59KSgpO1xyXG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB7IHJlbmRlciB9IGZyb20gXCIuL3RvZG9GdW5jdGlvbnNcIjtcclxuaW1wb3J0IHsgdGFza3MgfSBmcm9tIFwiLi90b2RvRnVuY3Rpb25zXCI7XHJcblxyXG5cclxuXHJcblxyXG4vLyAgIG5hdiBcclxucmVuZGVyLm5hdlBhZ2luYXRpb24oKVxyXG5cclxuLy8gaW5pdCB0aGUgaG9tZSBwYWdlXHJcbnJlbmRlci5UYXNrcyhcImhvbWVcIilcclxucmVuZGVyLkFkZFRhc2tzQnV0dG9uKFwiaG9tZVwiKVxyXG5cclxuXHJcbnJlbmRlci5wcm9qZWN0Q291bnQoKVxyXG5cclxuXHJcbnJlbmRlci5kZXRhaWxzKClcclxuLy8gcHJvY2NlcyBmb3JtIGRhdGEgXHJcbnRhc2tzLnByb2Nlc3NGb3JtRGF0YSgpXHJcblxyXG5cclxuLy8gICByZW5kZXIgZGVsZXRlICBidG5cclxucmVuZGVyLmRlbGV0ZWJ0bigpXHJcblxyXG5cclxuLy8gRURJVCAgZnVuY3Rpb25saXR5XHJcblxyXG5yZW5kZXIuZWRpdERpb2xnRm9ybSgpICAgLy8gRURJVCBESU9MT0cgRk9STSBcclxudGFza3MucHJvY2Vzc0VkaXRGb3JtRGF0YSgpICAgICAvLyBwcm9jY2VzIGVkaXQgZm9ybSBkYXRhIFxyXG5cclxuXHJcblxyXG5cclxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9