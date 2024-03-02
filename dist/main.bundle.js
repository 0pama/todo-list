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





})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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LGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBOzs7Ozs7O1VDdGZBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7QUNOeUM7QUFDRDtBQUN4QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0RBQU07QUFDTjtBQUNBO0FBQ0Esa0RBQU07QUFDTixrREFBTTtBQUNOO0FBQ0E7QUFDQSxrREFBTTtBQUNOO0FBQ0E7QUFDQSxrREFBTTtBQUNOO0FBQ0EsaURBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxrREFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0RBQU07QUFDTixpREFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL3RvZG9GdW5jdGlvbnMuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBjb25zdCByZW5kZXIgPSAoZnVuY3Rpb24oKSB7XHJcbiAgICBjb25zdCBkaWFsb2cgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImRpYWxvZ1wiKTtcclxuICAgIGNvbnN0IGNsb3NlZGlvbG9nID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2Nsb3NlZGlvbG9nJyk7XHJcblxyXG4gICAgY29uc3QgZGlzcGxheSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZGlzcGxheVwiKTtcclxuICAgIGNvbnN0IGRpc3BsYXljb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImRpc3BsYXljb250YWluZXJcIik7XHJcbiAgICBjb25zdCBkaWFsb2dGb3JtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2RpYWxvZ0Zvcm0nKVxyXG4gICAgY29uc3QgbGlFbGVtZW50cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIucHJvamVjdC1uYXZcIik7XHJcbiAgICBjb25zdCBlZGl0cHJvamVjdGRpYWxvZ2Zvcm0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZWRpdC1wcm9qZWN0LWRpYWxvZy1mb3JtJyk7XHJcbiAgICBjb25zdCB2aWV3ZGlvbG9nID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmVkaXQtcHJvamVjdC1kaWFsb2cnKTtcclxuICAgIGNvbnN0IHZpZXdkaW9sb2djbG9zZWJ0biA9ICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZWRpdC1wcm9qZWN0LWRpYWxvZy1jbG9zZS1idG4nKTtcclxuXHJcblxyXG4gICAgXHJcbiAgICAgICAgY29uc3QgZGV0YWlscyA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgLy8gQ2hhbmdlZCBldmVudCBsaXN0ZW5lciB0byB0YXJnZXQgdGhlIGRvY3VtZW50IGluc3RlYWQgb2Ygc3BlY2lmaWMgZWxlbWVudHNcclxuICAgICAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbihldmVudCkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgdGFyZ2V0ID0gZXZlbnQudGFyZ2V0O1xyXG4gICAgICAgICAgICAgICAgLy8gQ2hlY2sgaWYgdGhlIGNsaWNrZWQgZWxlbWVudCBoYXMgdGhlIGlkICd0YXNrLWRldGFpbHMnXHJcbiAgICAgICAgICAgICAgICBpZiAodGFyZ2V0ICYmIHRhcmdldC5pZCA9PT0gJ3Rhc2stZGV0YWlscycpIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBTcGxpdCB0aGUgY2xhc3MgbmFtZSB0byBleHRyYWN0IGluZGV4IGFuZCBjYXRlZ29yeVxyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGFyciA9IHRhcmdldC5jbGFzc05hbWUuc3BsaXQoJy0nKTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBpbmRleFRvVmlldyA9IHBhcnNlSW50KGFyclswXSwgMTApO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGNhdGVnb3J5VG9WaWV3ID0gYXJyWzFdO1xyXG4gICAgXHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgdGFzayA9IHRhc2tzLmNhdGVnb3JpZXNbY2F0ZWdvcnlUb1ZpZXddW2luZGV4VG9WaWV3XTtcclxuICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIC8vIFVwZGF0ZSB0aGUgVUkgd2l0aCB0YXNrIGRldGFpbHNcclxuICAgICAgICAgICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndmlldy10aXRsZScpLnRleHRDb250ZW50ID0gdGFzay50aXRsZTtcclxuICAgICAgICAgICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndmlldy1kZXNjJykudGV4dENvbnRlbnQgPSB0YXNrLmRlc2M7XHJcbiAgICAgICAgICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3ZpZXctZGF0ZScpLnRleHRDb250ZW50ID0gdGFzay5kYXRlO1xyXG4gICAgICAgICAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd2aWV3LXByaW9yaXR5JykudGV4dENvbnRlbnQgPSB0YXNrLnByaW9yaXR5O1xyXG4gICAgXHJcbiAgICAgICAgICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3ZpZXctdGFzay1kaWFsb2cnKS5zaG93TW9kYWwoKVxyXG4gICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd2aWV3LXRhc2stZGlhbG9nLWNsb3NlLWJ0bicpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT57XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd2aWV3LXRhc2stZGlhbG9nJykuY2xvc2UoMSlcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIGNvbnN0IHByb2plY3RDb3VudCA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wcm9qZWN0LWNvdW50LWhvbWUnKS5pbm5lclRleHQgPSB0YXNrcy5jYXRlZ29yaWVzW1wiaG9tZVwiXS5sZW5ndGg7XHJcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnByb2plY3QtY291bnQtdG9kYXknKS5pbm5lclRleHQgPSB0YXNrcy5jYXRlZ29yaWVzW1widG9kYXlcIl0ubGVuZ3RoO1xyXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wcm9qZWN0LWNvdW50LXdlZWsnKS5pbm5lclRleHQgPSB0YXNrcy5jYXRlZ29yaWVzW1wid2Vla1wiXS5sZW5ndGg7XHJcblxyXG5cclxuXHJcbiAgICAgICAgZG9jdW1lbnQuYm9keS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsKCkgPT4ge1xyXG4gICAgICAgICAgICB0YXNrcy5sb2FkRnJvbVN0b3JhZ2UoKVxyXG4gICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucHJvamVjdC1jb3VudC1ob21lJykuaW5uZXJUZXh0ID0gdGFza3MuY2F0ZWdvcmllc1tcImhvbWVcIl0ubGVuZ3RoO1xyXG4gICAgICAgIH0gKVxyXG4gICAgfVxyXG4gICAgY29uc3QgbmF2UGFnaW5hdGlvbiA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGxpRWxlbWVudHMuZm9yRWFjaCgobGkpID0+IHtcclxuICAgICAgICAgICAgbGkuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChldmVudCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgbGlFbGVtZW50cy5mb3JFYWNoKChsaSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGxpLmNsb3Nlc3QoJ2xpJykuY2xhc3NMaXN0LnJlbW92ZShcIm5hdi1zZWxlY3RlZFwiKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgXHJcbiAgICAgICAgICAgICAgICBjb25zdCBuYXZEaXYgPSBldmVudC50YXJnZXQuY2xvc2VzdCgnbGknKTtcclxuICAgICAgICAgICAgICAgIG5hdkRpdi5jbGFzc0xpc3QuYWRkKFwibmF2LXNlbGVjdGVkXCIpO1xyXG4gICAgXHJcbiAgICAgICAgICAgICAgICBsZXQgcHJvamVjdCA9IGV2ZW50LnRhcmdldC5pbm5lckhUTUw7XHJcbiAgICAgICAgICAgICAgICByZW5kZXIuQWRkVGFza3NCdXR0b24ocHJvamVjdCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgXHJcblxyXG4gICAgY29uc3QgZGVsZXRlYnRuID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbihldmVudCkge1xyXG4gICAgICAgICAgICBpZiAoZXZlbnQudGFyZ2V0ICYmIGV2ZW50LnRhcmdldC5pZCA9PT0gJ2RlbGV0ZS10YXNrJykge1xyXG4gICAgICAgICAgICAgICAgdGFza3MuZGVsZXRldGFzayhldmVudCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICBcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBlZGl0RGlvbGdGb3JtID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbihldmVudCkge1xyXG4gICAgICAgICBpZiAoZXZlbnQudGFyZ2V0ICYmIGV2ZW50LnRhcmdldC5jbGFzc05hbWUgPT09ICdlZGl0LXRhc2snKSB7XHJcbiAgICAgICAgICAgICBjb25zdCBpbmRleHRvZWRpdCA9IHBhcnNlSW50KGV2ZW50LnRhcmdldC5pZCwgMTApO1xyXG4gICAgICAgICAgICAgY29uc3QgcHJvamVjdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdkaWFsb2dGb3JtJykuY2xhc3NOYW1lO1xyXG4gICAgICAgIFxyXG4gICAgICAgICAgICAgLy8gU3RvcmUgaW5kZXh0b2VkaXQgaW4gYSBkYXRhIGF0dHJpYnV0ZSBvZiB0aGUgZWRpdHByb2plY3RkaWFsb2dmb3JtXHJcbiAgICAgICAgXHJcbiAgICAgICAgICAgICBlZGl0cHJvamVjdGRpYWxvZ2Zvcm0uc2V0QXR0cmlidXRlKCdkYXRhLWluZGV4dG9lZGl0JywgaW5kZXh0b2VkaXQpO1xyXG4gICAgICAgIFxyXG4gICAgICAgICAgICAgZWRpdHByb2plY3RkaWFsb2dmb3JtLnJlc2V0KCk7XHJcbiAgICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZWRpdHRpdGxlJykudmFsdWUgPSB0YXNrcy5jYXRlZ29yaWVzW3Byb2plY3RdW2luZGV4dG9lZGl0XVsndGl0bGUnXTtcclxuICAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5lZGl0ZGVzYycpLnZhbHVlID0gdGFza3MuY2F0ZWdvcmllc1twcm9qZWN0XVtpbmRleHRvZWRpdF1bJ2Rlc2MnXTtcclxuICAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5lZGl0ZGF0ZScpLnZhbHVlID0gdGFza3MuY2F0ZWdvcmllc1twcm9qZWN0XVtpbmRleHRvZWRpdF1bJ2RhdGUnXTtcclxuICAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5lZGl0cHJpb3JpdHknKS52YWx1ZSA9IHRhc2tzLmNhdGVnb3JpZXNbcHJvamVjdF1baW5kZXh0b2VkaXRdWydwcmlvcml0eSddO1xyXG5cclxuICAgICAgICAgICAgIHZpZXdkaW9sb2cuc2hvd01vZGFsKCk7XHJcbiAgICAgICAgICAgICB2aWV3ZGlvbG9nY2xvc2VidG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgIHZpZXdkaW9sb2cuY2xvc2UoKTtcclxuICAgICAgICAgICAgICAgICB9KTtcclxuIFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IEFkZFRhc2tzQnV0dG9uID0gZnVuY3Rpb24ocHJvamVjdCkge1xyXG4gICAgICAgIGlmKHByb2plY3QgPT0gXCJub3Rlc1wiKSB7XHJcbiAgICAgICAgICAgIGFsZXJ0KFwibm90ZXMgZnVuY3Rpb25hbGl0eSBjb21pbmcgc29vbiAuLi4uIGkgdGhpbmsgXCIpXHJcbiAgICAgICAgICAgIGNvbnN0IGJ0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xyXG4gICAgICAgIGJ0bi5pbm5lclRleHQgPSBgQUREIGEgTm90ZSBUTyAke3Byb2plY3QudG9VcHBlckNhc2UoKX1gO1xyXG4gICAgICAgIGJ0bi5pZCA9IHByb2plY3Q7XHJcbiAgICAgICAgYnRuLmNsYXNzTmFtZSA9ICdhZGQtdGFzay1idG4nXHJcbiAgICAgICAgYnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gICAgICAgICAgICBkaWFsb2cuc2hvd01vZGFsKCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgZGlzcGxheWNvbnRhaW5lci5pbm5lckhUTUwgPSBcIlwiO1xyXG4gICAgICAgIGRpc3BsYXljb250YWluZXIuYXBwZW5kQ2hpbGQoYnRuKTtcclxuXHJcbiAgICAgICAgY2xvc2VkaW9sb2cuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xyXG4gICAgICAgICAgICBkaWFsb2cuY2xvc2UoKVxyXG4gICAgICAgIH0pXHJcblxyXG4gICAgICAgIGRpYWxvZ0Zvcm0uY2xhc3NOYW1lID0gcHJvamVjdFxyXG4gICAgICAgIGNvbnNvbGUubG9nKHByb2plY3QpXHJcbiAgICAgICAgcmVuZGVyLlRhc2tzKHByb2plY3QpXHJcblxyXG4gICAgICAgXHJcbiAgICAgICAgXHJcbiAgICAgICAgfSBlbHNle1xyXG4gICAgICAgIGNvbnN0IGJ0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xyXG4gICAgICAgIGJ0bi5pbm5lclRleHQgPSBgQUREIFRBU0sgVE8gJHtwcm9qZWN0LnRvVXBwZXJDYXNlKCl9YDtcclxuICAgICAgICBidG4uaWQgPSBwcm9qZWN0O1xyXG4gICAgICAgIGJ0bi5jbGFzc05hbWUgPSAnYWRkLXRhc2stYnRuJ1xyXG4gICAgICAgIGJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICAgICAgICAgICAgZGlhbG9nLnNob3dNb2RhbCgpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGRpc3BsYXljb250YWluZXIuaW5uZXJIVE1MID0gXCJcIlxyXG4gICAgICAgIGRpc3BsYXljb250YWluZXIuYXBwZW5kQ2hpbGQoYnRuKTtcclxuXHJcbiAgICAgICAgY2xvc2VkaW9sb2cuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xyXG4gICAgICAgICAgICBkaWFsb2cuY2xvc2UoKVxyXG4gICAgICAgIH0pXHJcblxyXG4gICAgICAgIGRpYWxvZ0Zvcm0uY2xhc3NOYW1lID0gcHJvamVjdFxyXG4gICAgICAgIHJlbmRlci5UYXNrcyhwcm9qZWN0KVxyXG4gICAgfVxyXG4gICAgICAgIFxyXG4gICAgfTtcclxuXHJcblxyXG4gICAgY29uc3QgVGFza3MgPSBmdW5jdGlvbihuYW1lKXtcclxuICAgICAgICBkaXNwbGF5LmlubmVySFRNTCA9IFwiXCJcclxuICAgICAgICBjb25zdCBuYW1lMSA9IG5hbWVcclxuICAgICAgICB0YXNrcy5sb2FkRnJvbVN0b3JhZ2UoKTtcclxuICAgICAgICBjb25zdCBmb2xkZXIgPSB0YXNrcy5jYXRlZ29yaWVzW25hbWVdXHJcbiAgICAgICAgZm9sZGVyLmZvckVhY2goKGVsZW1lbnQsaW5kZXgpID0+IHtcclxuICAgICAgICAgICAgY29uc3QgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgICAgICAgIGRpdi5jbGFzc05hbWUgPSBcInByb2plY3RcIjtcclxuICAgICAgICAgICAgZGl2LmlkID0gZWxlbWVudC5wcmlvcml0eTsgXHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBkaXYuaW5uZXJIVE1MID0gYDxoMT4ke2VsZW1lbnQudGl0bGV9PC9oMT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cCBjbGFzcz1cImRlc2NpXCI+JHtlbGVtZW50LmRlc2N9PC9wPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwPiR7ZWxlbWVudC5kYXRlfTwvcD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aDM+JHtlbGVtZW50LnByaW9yaXR5fTwvaDM+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cImVkaXQtdGFza1wiIGlkPVwiJHtpbmRleH1cIj5lZGl0PC9idXR0b24+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBpZD1cInRhc2stZGV0YWlsc1wiIGNsYXNzPVwiJHtpbmRleH0tJHtuYW1lfVwiPmRldGFpbHM8L2J1dHRvbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGlkPVwiZGVsZXRlLXRhc2tcIiBjbGFzcz1cIiR7aW5kZXh9LSR7bmFtZX1cIj5kb25lPC9idXR0b24+YDtcclxuICAgICAgICAgICAgZGlzcGxheS5hcHBlbmRDaGlsZChkaXYpO1xyXG4gICAgICAgICAgICBwcm9qZWN0Q291bnQoKVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgQWRkVGFza3NCdXR0b24sXHJcbiAgICAgICAgVGFza3MsXHJcbiAgICAgICAgbmF2UGFnaW5hdGlvbixcclxuICAgICAgICBkZWxldGVidG4sXHJcbiAgICAgICAgZWRpdERpb2xnRm9ybSxcclxuICAgICAgICBwcm9qZWN0Q291bnQsXHJcbiAgICAgICAgZGV0YWlsc1xyXG4gICAgfTtcclxufSkoKTtcclxuXHJcbmV4cG9ydCBjb25zdCB0YXNrcyA9IChmdW5jdGlvbigpIHtcclxuICAgIGNvbnN0IGNhdGVnb3JpZXMgPSB7XHJcbiAgICAgICAgaG9tZTogW10sXHJcbiAgICAgICAgdG9kYXk6IFtdLFxyXG4gICAgICAgIHdlZWs6IFtdLFxyXG4gICAgICAgIHByb2plY3RzOiBbXSxcclxuICAgICAgICBub3RlczogW11cclxuICAgIH07XHJcblxyXG5cclxuXHJcbiAgICBjb25zdCBwcm9jZXNzRm9ybURhdGEgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZGlhbG9nRm9ybScpLmFkZEV2ZW50TGlzdGVuZXIoJ3N1Ym1pdCcsKGUpID0+IHtcclxuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpXHJcbiAgICAgICAgICAgIGNvbnN0IGZvcm1kYXRhID0gbmV3IEZvcm1EYXRhKGUudGFyZ2V0KTtcclxuICAgICAgICAgICAgY29uc3QgZm9ybUNsYXNzTmFtZSA9IGUudGFyZ2V0LmNsYXNzTmFtZTtcclxuICAgICAgICBcclxuICAgICAgICAgICAgY29uc3QgZm9ybURhdGFPYmplY3QgPSB7fTtcclxuICAgICAgICAgICAgZm9ybWRhdGEuZm9yRWFjaChmdW5jdGlvbih2YWx1ZSwga2V5KXtcclxuICAgICAgICAgICAgICAgIGZvcm1EYXRhT2JqZWN0W2tleV0gPSB2YWx1ZTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgXHJcbiAgICAgICAgICAgIHRhc2tzLmFkZChmb3JtRGF0YU9iamVjdCxmb3JtQ2xhc3NOYW1lKTtcclxuICAgICAgICAgICAgcmVuZGVyLkFkZFRhc2tzQnV0dG9uKGZvcm1DbGFzc05hbWUpO1xyXG4gICAgICAgICAgICBlLnRhcmdldC5yZXNldCgpXHJcbiAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdkaWFsb2cnKS5jbG9zZSgpXHJcbiAgICAgICAgXHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcblxyXG5cclxuICAgIGNvbnN0IHByb2Nlc3NFZGl0Rm9ybURhdGEgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICBjb25zdCBlZGl0cHJvamVjdGRpYWxvZ2Zvcm0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZWRpdC1wcm9qZWN0LWRpYWxvZy1mb3JtJyk7XHJcbiAgICAgICAgY29uc3Qgdmlld2Rpb2xvZyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5lZGl0LXByb2plY3QtZGlhbG9nJyk7XHJcblxyXG5cclxuICAgICAgICBlZGl0cHJvamVjdGRpYWxvZ2Zvcm0uYWRkRXZlbnRMaXN0ZW5lcignc3VibWl0JywoZSkgPT4ge1xyXG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAvLyBSZXRyaWV2ZSBpbmRleHRvZWRpdCBmcm9tIHRoZSBkYXRhIGF0dHJpYnV0ZSBvZiBlZGl0cHJvamVjdGRpYWxvZ2Zvcm1cclxuICAgICAgICAgICAgY29uc3QgaW5kZXh0b2VkaXQgPSBwYXJzZUludChlZGl0cHJvamVjdGRpYWxvZ2Zvcm0uZ2V0QXR0cmlidXRlKCdkYXRhLWluZGV4dG9lZGl0JyksIDEwKTtcclxuICAgICAgICAgICAgY29uc3QgcHJvamVjdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdkaWFsb2dGb3JtJykuY2xhc3NOYW1lO1xyXG4gICAgICAgICAgICBjb25zdCBmb3JtRGF0YU9iamVjdCA9IHtcclxuICAgICAgICAgICAgICAgIHRpdGxlOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZWRpdHRpdGxlJykudmFsdWUsXHJcbiAgICAgICAgICAgICAgICBkZXNjOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZWRpdGRlc2MnKS52YWx1ZSxcclxuICAgICAgICAgICAgICAgIGRhdGU6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5lZGl0ZGF0ZScpLnZhbHVlLFxyXG4gICAgICAgICAgICAgICAgcHJpb3JpdHk6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5lZGl0cHJpb3JpdHknKS52YWx1ZVxyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgdGFza3MuZWRpdHRhc2soZm9ybURhdGFPYmplY3QsIHByb2plY3QsIGluZGV4dG9lZGl0KTtcclxuICAgICAgICAgICAgdmlld2Rpb2xvZy5jbG9zZSgpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGFkZCA9IGZ1bmN0aW9uKG9iaixuYW1lKSB7XHJcbiAgICAgICAgdGFza3MuY2F0ZWdvcmllc1tuYW1lXS5wdXNoKG9iailcclxuICAgICAgICB0YXNrcy5hZGRUb1N0b3JhZ2UoKVxyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGFkZFRvU3RvcmFnZSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBjb25zdCBhcnIgPSBKU09OLnN0cmluZ2lmeSh0YXNrcy5jYXRlZ29yaWVzKTtcclxuICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShcImRhdGFcIiwgYXJyKTtcclxuICAgIH07XHJcbiAgICBcclxuICAgIGNvbnN0IGxvYWRGcm9tU3RvcmFnZSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBjb25zdCBhcnIxID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJkYXRhXCIpO1xyXG4gICAgICAgIGlmIChhcnIxKSB7XHJcbiAgICAgICAgICAgIHRhc2tzLmNhdGVnb3JpZXMgPSBKU09OLnBhcnNlKGFycjEpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHBvcHVsdGUoKVxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgYWRkVG9TdG9yYWdlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIGNvbnN0IGRlbGV0ZXRhc2sgPSBmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgY29uc3QgYXJyID0gZS50YXJnZXQuY2xhc3NOYW1lLnNwbGl0KCctJyk7XHJcbiAgICAgICAgY29uc3QgaW5kZXh0b2RlbGV0ZSA9IHBhcnNlSW50KGFyclswXSwgMTApO1xyXG4gICAgICAgIGNvbnN0IGNhdGVnb3J5ID0gYXJyWzFdO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGNvbnN0IHByb2plY3REaXYgPSBlLnRhcmdldC5jbG9zZXN0KCcucHJvamVjdCcpOyBcclxuICAgICAgICBcclxuICAgICAgICAvLyBBZGQgZmFkZS1vdXQgY2xhc3MgdG8gdHJpZ2dlciB0cmFuc2l0aW9uXHJcbiAgICAgICAgcHJvamVjdERpdi5jbGFzc0xpc3QuYWRkKCdmYWRlLW91dCcpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIEFmdGVyIHRoZSB0cmFuc2l0aW9uIGNvbXBsZXRlcywgcmVtb3ZlIHRoZSBwcm9qZWN0IGRpdlxyXG4gICAgICAgIFxyXG4gICAgICAgIHRhc2tzLmNhdGVnb3JpZXNbY2F0ZWdvcnldLnNwbGljZShpbmRleHRvZGVsZXRlLCAxKTtcclxuICAgICAgICAgICAgYWRkVG9TdG9yYWdlKCk7XHJcbiAgICAgICAgICAgIHJlbmRlci5UYXNrcyhjYXRlZ29yeSk7XHJcbiAgICAgICAgLy8gQWRqdXN0IHRoZSB0aW1pbmcgdG8gbWF0Y2ggdGhlIHRyYW5zaXRpb24gZHVyYXRpb24gKGluIG1pbGxpc2Vjb25kcylcclxuXHJcbiAgICAgICAgcmVuZGVyLnByb2plY3RDb3VudCgpXHJcbiAgICB9O1xyXG4gICAgXHJcbiAgICBjb25zdCBlZGl0dGFzayA9IGZ1bmN0aW9uKG9iaixjYXRlZ29yeSxpbmRleHRvZWRpdCkge1xyXG4gICAgICAgIHRhc2tzLmNhdGVnb3JpZXNbY2F0ZWdvcnldW2luZGV4dG9lZGl0XVsndGl0bGUnXSA9IG9ialsndGl0bGUnXTtcclxuICAgICAgICB0YXNrcy5jYXRlZ29yaWVzW2NhdGVnb3J5XVtpbmRleHRvZWRpdF1bJ2Rlc2MnXSA9IG9ialsnZGVzYyddO1xyXG4gICAgICAgIHRhc2tzLmNhdGVnb3JpZXNbY2F0ZWdvcnldW2luZGV4dG9lZGl0XVsnZGF0ZSddID0gb2JqWydkYXRlJ107XHJcbiAgICAgICAgdGFza3MuY2F0ZWdvcmllc1tjYXRlZ29yeV1baW5kZXh0b2VkaXRdWydwcmlvcml0eSddID0gb2JqWydwcmlvcml0eSddO1xyXG4gICAgICAgIGFkZFRvU3RvcmFnZSgpXHJcbiAgICAgICAgcmVuZGVyLlRhc2tzKGNhdGVnb3J5KVxyXG4gICAgfVxyXG4gICAgXHJcbiAgICBjb25zdCBwb3B1bHRlID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgdGFza3MuY2F0ZWdvcmllcyA9IHtcclxuICAgICAgICAgICAgaG9tZTogW1xyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIFwidGl0bGVcIjogXCJDbGVhbiB0aGUgaG91c2VcIixcclxuICAgICAgICAgICAgICAgICAgICBcImRlc2NcIjogXCJWYWN1dW0gdGhlIGZsb29ycyBhbmQgZHVzdCB0aGUgc2hlbHZlcy5cIixcclxuICAgICAgICAgICAgICAgICAgICBcImRhdGVcIjogXCIyMDI0LTAzLTAxXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJwcmlvcml0eVwiOiBcImhpZ2hcIlxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBcInRpdGxlXCI6IFwiR3JvY2VyeSBTaG9wcGluZ1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwiZGVzY1wiOiBcIkJ1eSBmcnVpdHMsIHZlZ2V0YWJsZXMsIGFuZCBtaWxrLlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwiZGF0ZVwiOiBcIjIwMjQtMDMtMDJcIixcclxuICAgICAgICAgICAgICAgICAgICBcInByaW9yaXR5XCI6IFwibWVkaXVtXCJcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgXCJ0aXRsZVwiOiBcIkZpeCB0aGUgbGVha2luZyBmYXVjZXRcIixcclxuICAgICAgICAgICAgICAgICAgICBcImRlc2NcIjogXCJDYWxsIHRoZSBwbHVtYmVyIHRvIGZpeCB0aGUgZmF1Y2V0IGluIHRoZSBraXRjaGVuLlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwiZGF0ZVwiOiBcIjIwMjQtMDMtMDVcIixcclxuICAgICAgICAgICAgICAgICAgICBcInByaW9yaXR5XCI6IFwiaGlnaFwiXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIFwidGl0bGVcIjogXCJPcmdhbml6ZSB0aGUgY2xvc2V0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJkZXNjXCI6IFwiU29ydCBjbG90aGVzIGFuZCBkb25hdGUgdW51c2VkIGl0ZW1zLlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwiZGF0ZVwiOiBcIjIwMjQtMDMtMDdcIixcclxuICAgICAgICAgICAgICAgICAgICBcInByaW9yaXR5XCI6IFwibWVkaXVtXCJcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgXCJ0aXRsZVwiOiBcIlBheSBiaWxsc1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwiZGVzY1wiOiBcIlBheSBlbGVjdHJpY2l0eSwgd2F0ZXIsIGFuZCBpbnRlcm5ldCBiaWxscy5cIixcclxuICAgICAgICAgICAgICAgICAgICBcImRhdGVcIjogXCIyMDI0LTAzLTA5XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJwcmlvcml0eVwiOiBcImhpZ2hcIlxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBcInRpdGxlXCI6IFwiTW93IHRoZSBsYXduXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJkZXNjXCI6IFwiVHJpbSB0aGUgZ3Jhc3MgYW5kIHRpZHkgdXAgdGhlIGdhcmRlbi5cIixcclxuICAgICAgICAgICAgICAgICAgICBcImRhdGVcIjogXCIyMDI0LTAzLTExXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJwcmlvcml0eVwiOiBcIm1lZGl1bVwiXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIFwidGl0bGVcIjogXCJGaXggdGhlIGJyb2tlbiBkcmF3ZXJcIixcclxuICAgICAgICAgICAgICAgICAgICBcImRlc2NcIjogXCJSZXBhaXIgdGhlIGJyb2tlbiBkcmF3ZXIgaW4gdGhlIGJlZHJvb20uXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJkYXRlXCI6IFwiMjAyNC0wMy0xNFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwicHJpb3JpdHlcIjogXCJoaWdoXCJcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgXCJ0aXRsZVwiOiBcIlBsYW4gZmFtaWx5IG91dGluZ1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwiZGVzY1wiOiBcIkRlY2lkZSBvbiBhIGRlc3RpbmF0aW9uIGFuZCBtYWtlIHJlc2VydmF0aW9ucy5cIixcclxuICAgICAgICAgICAgICAgICAgICBcImRhdGVcIjogXCIyMDI0LTAzLTE2XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJwcmlvcml0eVwiOiBcIm1lZGl1bVwiXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIFwidGl0bGVcIjogXCJJbnN0YWxsIG5ldyBsaWdodCBmaXh0dXJlc1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwiZGVzY1wiOiBcIlJlcGxhY2Ugb2xkIGZpeHR1cmVzIHdpdGggZW5lcmd5LWVmZmljaWVudCBvbmVzLlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwiZGF0ZVwiOiBcIjIwMjQtMDMtMThcIixcclxuICAgICAgICAgICAgICAgICAgICBcInByaW9yaXR5XCI6IFwiaGlnaFwiXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIFwidGl0bGVcIjogXCJDbGVhbiB0aGUgd2luZG93c1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwiZGVzY1wiOiBcIldpcGUgZG93biBhbmQgcG9saXNoIGFsbCB3aW5kb3dzIGluIHRoZSBob3VzZS5cIixcclxuICAgICAgICAgICAgICAgICAgICBcImRhdGVcIjogXCIyMDI0LTAzLTIwXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJwcmlvcml0eVwiOiBcIm1lZGl1bVwiXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgIHRvZGF5OiBbXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgXCJ0aXRsZVwiOiBcIkZpbmlzaCByZXBvcnRcIixcclxuICAgICAgICAgICAgICAgICAgICBcImRlc2NcIjogXCJDb21wbGV0ZSB0aGUgcXVhcnRlcmx5IHJlcG9ydCBmb3IgdGhlIG1lZXRpbmcuXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJkYXRlXCI6IFwiMjAyNC0wMy0wMVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwicHJpb3JpdHlcIjogXCJoaWdoXCJcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgXCJ0aXRsZVwiOiBcIkF0dGVuZCB3ZWJpbmFyXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJkZXNjXCI6IFwiUGFydGljaXBhdGUgaW4gdGhlIHdlYmluYXIgb24gbmV3IHRlY2hub2xvZ2llcy5cIixcclxuICAgICAgICAgICAgICAgICAgICBcImRhdGVcIjogXCIyMDI0LTAzLTAxXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJwcmlvcml0eVwiOiBcIm1lZGl1bVwiXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIFwidGl0bGVcIjogXCJTdWJtaXQgZXhwZW5zZSByZXBvcnRcIixcclxuICAgICAgICAgICAgICAgICAgICBcImRlc2NcIjogXCJTdWJtaXQgdGhlIGV4cGVuc2UgcmVwb3J0IGZvciBsYXN0IG1vbnRoLlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwiZGF0ZVwiOiBcIjIwMjQtMDMtMDFcIixcclxuICAgICAgICAgICAgICAgICAgICBcInByaW9yaXR5XCI6IFwiaGlnaFwiXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIFwidGl0bGVcIjogXCJSZXZpZXcgcHJvamVjdCBwcm9wb3NhbFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwiZGVzY1wiOiBcIlJldmlldyBhbmQgcHJvdmlkZSBmZWVkYmFjayBvbiB0aGUgcHJvamVjdCBwcm9wb3NhbC5cIixcclxuICAgICAgICAgICAgICAgICAgICBcImRhdGVcIjogXCIyMDI0LTAzLTAxXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJwcmlvcml0eVwiOiBcIm1lZGl1bVwiXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIFwidGl0bGVcIjogXCJDYWxsIHdpdGggbWFuYWdlclwiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwiZGVzY1wiOiBcIlNjaGVkdWxlIGEgY2FsbCB3aXRoIHRoZSBtYW5hZ2VyIHRvIGRpc2N1c3MgcHJvamVjdCB1cGRhdGVzLlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwiZGF0ZVwiOiBcIjIwMjQtMDMtMDFcIixcclxuICAgICAgICAgICAgICAgICAgICBcInByaW9yaXR5XCI6IFwiaGlnaFwiXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIFwidGl0bGVcIjogXCJQcmVwYXJlIHByZXNlbnRhdGlvblwiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwiZGVzY1wiOiBcIlByZXBhcmUgc2xpZGVzIGZvciB0aGUgdXBjb21pbmcgcHJlc2VudGF0aW9uLlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwiZGF0ZVwiOiBcIjIwMjQtMDMtMDFcIixcclxuICAgICAgICAgICAgICAgICAgICBcInByaW9yaXR5XCI6IFwibWVkaXVtXCJcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgXCJ0aXRsZVwiOiBcIlNlbmQgZm9sbG93LXVwIGVtYWlsc1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwiZGVzY1wiOiBcIlNlbmQgZm9sbG93LXVwIGVtYWlscyB0byBjbGllbnRzIHJlZ2FyZGluZyByZWNlbnQgbWVldGluZ3MuXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJkYXRlXCI6IFwiMjAyNC0wMy0wMVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwicHJpb3JpdHlcIjogXCJoaWdoXCJcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgXCJ0aXRsZVwiOiBcIlByb2plY3Qgc3RhdHVzIG1lZXRpbmdcIixcclxuICAgICAgICAgICAgICAgICAgICBcImRlc2NcIjogXCJBdHRlbmQgdGhlIHByb2plY3Qgc3RhdHVzIG1lZXRpbmcgd2l0aCB0aGUgdGVhbS5cIixcclxuICAgICAgICAgICAgICAgICAgICBcImRhdGVcIjogXCIyMDI0LTAzLTAxXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJwcmlvcml0eVwiOiBcIm1lZGl1bVwiXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIFwidGl0bGVcIjogXCJSZXZpZXcgY29kZSBjaGFuZ2VzXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJkZXNjXCI6IFwiUmV2aWV3IHRoZSByZWNlbnQgY29kZSBjaGFuZ2VzIGFuZCBwcm92aWRlIGZlZWRiYWNrLlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwiZGF0ZVwiOiBcIjIwMjQtMDMtMDFcIixcclxuICAgICAgICAgICAgICAgICAgICBcInByaW9yaXR5XCI6IFwiaGlnaFwiXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIFwidGl0bGVcIjogXCJDb21wbGV0ZSB0cmFpbmluZyBtb2R1bGVzXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJkZXNjXCI6IFwiQ29tcGxldGUgdGhlIHRyYWluaW5nIG1vZHVsZXMgb24gbmV3IHNvZnR3YXJlIHRvb2xzLlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwiZGF0ZVwiOiBcIjIwMjQtMDMtMDFcIixcclxuICAgICAgICAgICAgICAgICAgICBcInByaW9yaXR5XCI6IFwibWVkaXVtXCJcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgXCJ0aXRsZVwiOiBcIlN1Ym1pdCBsZWF2ZSByZXF1ZXN0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJkZXNjXCI6IFwiU3VibWl0IGEgbGVhdmUgcmVxdWVzdCBmb3IgbmV4dCB3ZWVrLlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwiZGF0ZVwiOiBcIjIwMjQtMDMtMDFcIixcclxuICAgICAgICAgICAgICAgICAgICBcInByaW9yaXR5XCI6IFwiaGlnaFwiXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIFwidGl0bGVcIjogXCJQcmVwYXJlIGFnZW5kYSBmb3IgbWVldGluZ1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwiZGVzY1wiOiBcIlByZXBhcmUgdGhlIGFnZW5kYSBmb3IgdGhlIHRlYW0gbWVldGluZy5cIixcclxuICAgICAgICAgICAgICAgICAgICBcImRhdGVcIjogXCIyMDI0LTAzLTAxXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJwcmlvcml0eVwiOiBcIm1lZGl1bVwiXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIFwidGl0bGVcIjogXCJVcGRhdGUgcHJvamVjdCBkb2N1bWVudGF0aW9uXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJkZXNjXCI6IFwiVXBkYXRlIHRoZSBwcm9qZWN0IGRvY3VtZW50YXRpb24gd2l0aCByZWNlbnQgY2hhbmdlcy5cIixcclxuICAgICAgICAgICAgICAgICAgICBcImRhdGVcIjogXCIyMDI0LTAzLTAxXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJwcmlvcml0eVwiOiBcImhpZ2hcIlxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBcInRpdGxlXCI6IFwiUmV2aWV3IG1hcmtldGluZyBjYW1wYWlnblwiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwiZGVzY1wiOiBcIlJldmlldyB0aGUgcmVzdWx0cyBvZiB0aGUgcmVjZW50IG1hcmtldGluZyBjYW1wYWlnbi5cIixcclxuICAgICAgICAgICAgICAgICAgICBcImRhdGVcIjogXCIyMDI0LTAzLTAxXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJwcmlvcml0eVwiOiBcIm1lZGl1bVwiXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIFwidGl0bGVcIjogXCJTZW5kIHdlZWtseSBwcm9ncmVzcyByZXBvcnRcIixcclxuICAgICAgICAgICAgICAgICAgICBcImRlc2NcIjogXCJTZW5kIHRoZSB3ZWVrbHkgcHJvZ3Jlc3MgcmVwb3J0IHRvIHRoZSBwcm9qZWN0IHN0YWtlaG9sZGVycy5cIixcclxuICAgICAgICAgICAgICAgICAgICBcImRhdGVcIjogXCIyMDI0LTAzLTAxXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJwcmlvcml0eVwiOiBcImhpZ2hcIlxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgd2VlazogW1xyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIFwidGl0bGVcIjogXCJQcm9qZWN0IHByZXNlbnRhdGlvblwiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwiZGVzY1wiOiBcIlByZXBhcmUgc2xpZGVzIGZvciB0aGUgcHJvamVjdCBwcmVzZW50YXRpb24uXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJkYXRlXCI6IFwiMjAyNC0wMy0wNFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwicHJpb3JpdHlcIjogXCJoaWdoXCJcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgXCJ0aXRsZVwiOiBcIlRlYW0gbWVldGluZ1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwiZGVzY1wiOiBcIkRpc2N1c3MgcHJvamVjdCBwcm9ncmVzcyB3aXRoIHRoZSB0ZWFtLlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwiZGF0ZVwiOiBcIjIwMjQtMDMtMDVcIixcclxuICAgICAgICAgICAgICAgICAgICBcInByaW9yaXR5XCI6IFwibWVkaXVtXCJcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgXCJ0aXRsZVwiOiBcIkNsaWVudCBjYWxsXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJkZXNjXCI6IFwiU2NoZWR1bGUgYSBjYWxsIHdpdGggdGhlIGNsaWVudCB0byByZXZpZXcgcmVxdWlyZW1lbnRzLlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwiZGF0ZVwiOiBcIjIwMjQtMDMtMDZcIixcclxuICAgICAgICAgICAgICAgICAgICBcInByaW9yaXR5XCI6IFwiaGlnaFwiXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIFwidGl0bGVcIjogXCJQcm9qZWN0IGJyYWluc3Rvcm1pbmdcIixcclxuICAgICAgICAgICAgICAgICAgICBcImRlc2NcIjogXCJCcmFpbnN0b3JtIGlkZWFzIGZvciB0aGUgdXBjb21pbmcgcHJvamVjdC5cIixcclxuICAgICAgICAgICAgICAgICAgICBcImRhdGVcIjogXCIyMDI0LTAzLTA4XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJwcmlvcml0eVwiOiBcIm1lZGl1bVwiXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIFwidGl0bGVcIjogXCJDb2RlIHJldmlld1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwiZGVzY1wiOiBcIkNvbmR1Y3QgYSBjb2RlIHJldmlldyBzZXNzaW9uIGZvciB0aGUgdGVhbS5cIixcclxuICAgICAgICAgICAgICAgICAgICBcImRhdGVcIjogXCIyMDI0LTAzLTA5XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJwcmlvcml0eVwiOiBcImhpZ2hcIlxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBcInRpdGxlXCI6IFwiUHJvamVjdCB0ZXN0aW5nXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJkZXNjXCI6IFwiVGVzdCB0aGUgZmVhdHVyZXMgZGV2ZWxvcGVkIGluIHRoZSBwcm9qZWN0LlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwiZGF0ZVwiOiBcIjIwMjQtMDMtMTBcIixcclxuICAgICAgICAgICAgICAgICAgICBcInByaW9yaXR5XCI6IFwibWVkaXVtXCJcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgIHByb2plY3RzOiBbXHJcbiAgICAgICAgICAgICAgICAvLyBBZGQgbW9yZSBkZWZhdWx0IHRhc2tzIGZvciBwcm9qZWN0cyBoZXJlXHJcbiAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgIG5vdGVzOiBbXVxyXG5cclxuICAgICAgICB9O1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBjYXRlZ29yaWVzLFxyXG4gICAgICAgIGFkZCxcclxuICAgICAgICBwb3B1bHRlLFxyXG4gICAgICAgIGFkZFRvU3RvcmFnZSxcclxuICAgICAgICBsb2FkRnJvbVN0b3JhZ2UsXHJcbiAgICAgICAgZGVsZXRldGFzayxcclxuICAgICAgICBlZGl0dGFzayxcclxuICAgICAgICBwcm9jZXNzRm9ybURhdGEsXHJcbiAgICAgICAgcHJvY2Vzc0VkaXRGb3JtRGF0YVxyXG4gICAgfVxyXG59KSgpO1xyXG5cclxuXHJcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHsgcmVuZGVyIH0gZnJvbSBcIi4vdG9kb0Z1bmN0aW9uc1wiO1xyXG5pbXBvcnQgeyB0YXNrcyB9IGZyb20gXCIuL3RvZG9GdW5jdGlvbnNcIjtcclxuXHJcblxyXG5cclxuXHJcbi8vICAgbmF2IFxyXG5yZW5kZXIubmF2UGFnaW5hdGlvbigpXHJcblxyXG4vLyBpbml0IHRoZSBob21lIHBhZ2VcclxucmVuZGVyLlRhc2tzKFwiaG9tZVwiKVxyXG5yZW5kZXIuQWRkVGFza3NCdXR0b24oXCJob21lXCIpXHJcblxyXG5cclxucmVuZGVyLnByb2plY3RDb3VudCgpXHJcblxyXG5cclxucmVuZGVyLmRldGFpbHMoKVxyXG4vLyBwcm9jY2VzIGZvcm0gZGF0YSBcclxudGFza3MucHJvY2Vzc0Zvcm1EYXRhKClcclxuXHJcblxyXG4vLyAgIHJlbmRlciBkZWxldGUgIGJ0blxyXG5yZW5kZXIuZGVsZXRlYnRuKClcclxuXHJcblxyXG4vLyBFRElUICBmdW5jdGlvbmxpdHlcclxuXHJcbnJlbmRlci5lZGl0RGlvbGdGb3JtKCkgICAvLyBFRElUIERJT0xPRyBGT1JNIFxyXG50YXNrcy5wcm9jZXNzRWRpdEZvcm1EYXRhKCkgICAgIC8vIHByb2NjZXMgZWRpdCBmb3JtIGRhdGEgXHJcblxyXG5cclxuXHJcblxyXG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=