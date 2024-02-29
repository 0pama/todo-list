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

const tasks = (function() {
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



let liElements = document.querySelectorAll(".project-nav");

liElements.forEach((li) => {
    li.addEventListener("click", (event) => {
        let project = event.target.innerHTML;
        _todoFunctions__WEBPACK_IMPORTED_MODULE_0__.render.AddTasksButton(project);
    });
});


_todoFunctions__WEBPACK_IMPORTED_MODULE_0__.render.Tasks("home")
_todoFunctions__WEBPACK_IMPORTED_MODULE_0__.render.AddTasksButton("home")

document.getElementById('dialogForm').addEventListener('submit',(e) => {
    e.preventDefault()
    const formdata = new FormData(e.target);
    const formClassName = e.target.className;

    const formDataObject = {};
    formdata.forEach(function(value, key){
        formDataObject[key] = value;
    });


    console.log(formClassName);
    _todoFunctions__WEBPACK_IMPORTED_MODULE_0__.tasks.add(formDataObject,formClassName);
    _todoFunctions__WEBPACK_IMPORTED_MODULE_0__.render.AddTasksButton(formClassName);


})


document.addEventListener('click', function(event) {
    if (event.target && event.target.id === 'delete-task') {
        // Assuming tasks is your object containing the deletetask method
        _todoFunctions__WEBPACK_IMPORTED_MODULE_0__.tasks.deletetask(event);
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
        
        document.querySelector('.edittitle').value = _todoFunctions__WEBPACK_IMPORTED_MODULE_0__.tasks.categories[project][indextoedit]['title'];
        document.querySelector('.editdesc').value = _todoFunctions__WEBPACK_IMPORTED_MODULE_0__.tasks.categories[project][indextoedit]['desc'];
        document.querySelector('.editdate').value = _todoFunctions__WEBPACK_IMPORTED_MODULE_0__.tasks.categories[project][indextoedit]['date'];
        document.querySelector('.editpriority').value = _todoFunctions__WEBPACK_IMPORTED_MODULE_0__.tasks.categories[project][indextoedit]['priority'];

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
        
            _todoFunctions__WEBPACK_IMPORTED_MODULE_0__.tasks.edittask(formDataObject, project, indextoedit);
            viewdiolog.close();
        });
    }
});

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5idW5kbGUuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUNBQXVDLFFBQVE7QUFDL0M7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1DQUFtQyxjQUFjO0FBQ2pELG1DQUFtQyxhQUFhO0FBQ2hELGtDQUFrQyxhQUFhO0FBQy9DLG1DQUFtQyxpQkFBaUI7QUFDcEQsNkRBQTZELE1BQU07QUFDbkU7QUFDQSwrREFBK0QsTUFBTSxHQUFHLEtBQUs7QUFDN0U7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7Ozs7OztVQzVHRDtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7O0FDTnlDO0FBQ0Q7QUFDeEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUSxrREFBTTtBQUNkLEtBQUs7QUFDTCxDQUFDO0FBQ0Q7QUFDQTtBQUNBLGtEQUFNO0FBQ04sa0RBQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsSUFBSSxpREFBSztBQUNULElBQUksa0RBQU07QUFDVjtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRLGlEQUFLO0FBQ2I7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFEQUFxRCxpREFBSztBQUMxRCxvREFBb0QsaURBQUs7QUFDekQsb0RBQW9ELGlEQUFLO0FBQ3pELHdEQUF3RCxpREFBSztBQUM3RDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWSxpREFBSztBQUNqQjtBQUNBLFNBQVM7QUFDVDtBQUNBLENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvdG9kb0Z1bmN0aW9ucy5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGNvbnN0IHJlbmRlciA9IChmdW5jdGlvbigpIHtcclxuICAgIGNvbnN0IGRpYWxvZyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZGlhbG9nXCIpO1xyXG4gICAgY29uc3QgY2xvc2VkaW9sb2cgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2xvc2VkaW9sb2cnKTtcclxuICAgIGNvbnN0IGRpc3BsYXkgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImRpc3BsYXlcIik7XHJcbiAgICBjb25zdCBkaXNwbGF5Y29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJkaXNwbGF5Y29udGFpbmVyXCIpO1xyXG4gICAgY29uc3QgZGlhbG9nRm9ybSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdkaWFsb2dGb3JtJylcclxuXHJcbiAgICBjb25zdCBBZGRUYXNrc0J1dHRvbiA9IGZ1bmN0aW9uKHByb2plY3QpIHtcclxuICAgICAgICBjb25zdCBidG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcclxuICAgICAgICBidG4uaW5uZXJUZXh0ID0gYEFERCBUQVNLIFRPICR7cHJvamVjdH1gO1xyXG4gICAgICAgIGJ0bi5pZCA9IHByb2plY3Q7XHJcbiAgICAgICAgYnRuLmNsYXNzTmFtZSA9ICdhZGQtdGFzay1idG4nXHJcbiAgICAgICAgYnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gICAgICAgICAgICBkaWFsb2cuc2hvd01vZGFsKCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgZGlzcGxheWNvbnRhaW5lci5pbm5lckhUTUwgPSBcIlwiXHJcbiAgICAgICAgZGlzcGxheWNvbnRhaW5lci5hcHBlbmRDaGlsZChidG4pO1xyXG5cclxuICAgICAgICBjbG9zZWRpb2xvZy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XHJcbiAgICAgICAgICAgIGRpYWxvZy5jbG9zZSgpXHJcbiAgICAgICAgfSlcclxuXHJcbiAgICAgICAgZGlhbG9nRm9ybS5jbGFzc05hbWUgPSBwcm9qZWN0XHJcbiAgICAgICAgcmVuZGVyLlRhc2tzKHByb2plY3QpXHJcbiAgICAgICAgLy8gUmVzZXQgZm9ybSBmaWVsZHMgYWZ0ZXIgcmVuZGVyaW5nIHRhc2tzXHJcbiAgICAgICAgY29uc3QgZWRpdHByb2plY3RkaWFsb2dmb3JtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2VkaXQtcHJvamVjdC1kaWFsb2ctZm9ybScpO1xyXG4gICAgICAgIGVkaXRwcm9qZWN0ZGlhbG9nZm9ybS5yZXNldCgpO1xyXG4gICAgfTtcclxuXHJcblxyXG4gICAgY29uc3QgVGFza3MgPSBmdW5jdGlvbihuYW1lKXtcclxuICAgICAgICBkaXNwbGF5LmlubmVySFRNTCA9IFwiXCJcclxuICAgICAgICBjb25zdCBuYW1lMSA9IG5hbWVcclxuICAgICAgICB0YXNrcy5sb2FkRnJvbVN0b3JhZ2UoKTtcclxuICAgICAgICBjb25zdCBmb2xkZXIgPSB0YXNrcy5jYXRlZ29yaWVzW25hbWVdXHJcbiAgICAgICAgZm9sZGVyLmZvckVhY2goKGVsZW1lbnQsaW5kZXgpID0+IHtcclxuICAgICAgICAgICAgY29uc3QgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgICAgICAgIGRpdi5jbGFzc05hbWUgPSBcInByb2plY3RcIjtcclxuICAgICAgICAgICAgZGl2LmlkID0gZWxlbWVudC5wcmlvcml0eTsgXHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBkaXYuaW5uZXJIVE1MID0gYDxoMT4ke2VsZW1lbnQudGl0bGV9PC9oMT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aDI+JHtlbGVtZW50LmRlc2N9PC9oMj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cD4ke2VsZW1lbnQuZGF0ZX08L3A+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGgzPiR7ZWxlbWVudC5wcmlvcml0eX08L2gzPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJlZGl0LXRhc2tcIiBpZD1cIiR7aW5kZXh9XCI+ZWRpdDwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24+ZGV0YWlsczwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gaWQ9XCJkZWxldGUtdGFza1wiIGNsYXNzPVwiJHtpbmRleH0tJHtuYW1lfVwiPmRlbGV0ZTwvYnV0dG9uPmA7XHJcbiAgICAgICAgICAgIGRpc3BsYXkuYXBwZW5kQ2hpbGQoZGl2KTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIEFkZFRhc2tzQnV0dG9uLFxyXG4gICAgICAgIFRhc2tzXHJcbiAgICB9O1xyXG59KSgpO1xyXG5cclxuZXhwb3J0IGNvbnN0IHRhc2tzID0gKGZ1bmN0aW9uKCkge1xyXG4gICAgY29uc3QgY2F0ZWdvcmllcyA9IHtcclxuICAgICAgICBob21lOiBbXSxcclxuICAgICAgICB0b2RheTogW10sXHJcbiAgICAgICAgd2VlazogW10sXHJcbiAgICAgICAgcHJvamVjdHM6IFtdXHJcbiAgICB9O1xyXG5cclxuICAgIGNvbnN0IGFkZCA9IGZ1bmN0aW9uKG9iaixuYW1lKSB7XHJcbiAgICAgICAgdGFza3MuY2F0ZWdvcmllc1tuYW1lXS5wdXNoKG9iailcclxuICAgICAgICB0YXNrcy5hZGRUb1N0b3JhZ2UoKVxyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGFkZFRvU3RvcmFnZSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBjb25zdCBhcnIgPSBKU09OLnN0cmluZ2lmeSh0YXNrcy5jYXRlZ29yaWVzKTtcclxuICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShcImRhdGFcIiwgYXJyKTtcclxuICAgIH07XHJcbiAgICBcclxuICAgIGNvbnN0IGxvYWRGcm9tU3RvcmFnZSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBjb25zdCBhcnIxID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJkYXRhXCIpO1xyXG4gICAgICAgIGlmIChhcnIxKSB7XHJcbiAgICAgICAgICAgIHRhc2tzLmNhdGVnb3JpZXMgPSBKU09OLnBhcnNlKGFycjEpO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgY29uc3QgZGVsZXRldGFzayA9IGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICBjb25zdCBhcnIgPSBlLnRhcmdldC5jbGFzc05hbWUuc3BsaXQoJy0nKVxyXG4gICAgICAgIGNvbnN0IGluZGV4dG9kZWxldGUgPSBwYXJzZUludChhcnJbMF0sIDEwKTtcclxuICAgICAgICBjb25zdCBjYXRlZ29yeSA9IGFyclsxXTtcclxuICAgICAgICB0YXNrcy5jYXRlZ29yaWVzW2NhdGVnb3J5XS5zcGxpY2UoaW5kZXh0b2RlbGV0ZSwxKTtcclxuICAgICAgICBhZGRUb1N0b3JhZ2UoKVxyXG4gICAgICAgIHJlbmRlci5UYXNrcyhjYXRlZ29yeSlcclxuICAgIH1cclxuICAgICBcclxuICAgIGNvbnN0IGVkaXR0YXNrID0gZnVuY3Rpb24ob2JqLGNhdGVnb3J5LGluZGV4dG9lZGl0KSB7XHJcbiAgICAgICAgdGFza3MuY2F0ZWdvcmllc1tjYXRlZ29yeV1baW5kZXh0b2VkaXRdWyd0aXRsZSddID0gb2JqWyd0aXRsZSddO1xyXG4gICAgICAgIHRhc2tzLmNhdGVnb3JpZXNbY2F0ZWdvcnldW2luZGV4dG9lZGl0XVsnZGVzYyddID0gb2JqWydkZXNjJ107XHJcbiAgICAgICAgdGFza3MuY2F0ZWdvcmllc1tjYXRlZ29yeV1baW5kZXh0b2VkaXRdWydkYXRlJ10gPSBvYmpbJ2RhdGUnXTtcclxuICAgICAgICB0YXNrcy5jYXRlZ29yaWVzW2NhdGVnb3J5XVtpbmRleHRvZWRpdF1bJ3ByaW9yaXR5J10gPSBvYmpbJ3ByaW9yaXR5J107XHJcbiAgICAgICAgYWRkVG9TdG9yYWdlKClcclxuICAgICAgICByZW5kZXIuVGFza3MoY2F0ZWdvcnkpXHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBjYXRlZ29yaWVzLFxyXG4gICAgICAgIGFkZCxcclxuICAgICAgICBhZGRUb1N0b3JhZ2UsXHJcbiAgICAgICAgbG9hZEZyb21TdG9yYWdlLFxyXG4gICAgICAgIGRlbGV0ZXRhc2ssXHJcbiAgICAgICAgZWRpdHRhc2tcclxuICAgIH1cclxufSkoKTtcclxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgeyByZW5kZXIgfSBmcm9tIFwiLi90b2RvRnVuY3Rpb25zXCI7XHJcbmltcG9ydCB7IHRhc2tzIH0gZnJvbSBcIi4vdG9kb0Z1bmN0aW9uc1wiO1xyXG5cclxubGV0IGxpRWxlbWVudHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnByb2plY3QtbmF2XCIpO1xyXG5cclxubGlFbGVtZW50cy5mb3JFYWNoKChsaSkgPT4ge1xyXG4gICAgbGkuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChldmVudCkgPT4ge1xyXG4gICAgICAgIGxldCBwcm9qZWN0ID0gZXZlbnQudGFyZ2V0LmlubmVySFRNTDtcclxuICAgICAgICByZW5kZXIuQWRkVGFza3NCdXR0b24ocHJvamVjdCk7XHJcbiAgICB9KTtcclxufSk7XHJcblxyXG5cclxucmVuZGVyLlRhc2tzKFwiaG9tZVwiKVxyXG5yZW5kZXIuQWRkVGFza3NCdXR0b24oXCJob21lXCIpXHJcblxyXG5kb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZGlhbG9nRm9ybScpLmFkZEV2ZW50TGlzdGVuZXIoJ3N1Ym1pdCcsKGUpID0+IHtcclxuICAgIGUucHJldmVudERlZmF1bHQoKVxyXG4gICAgY29uc3QgZm9ybWRhdGEgPSBuZXcgRm9ybURhdGEoZS50YXJnZXQpO1xyXG4gICAgY29uc3QgZm9ybUNsYXNzTmFtZSA9IGUudGFyZ2V0LmNsYXNzTmFtZTtcclxuXHJcbiAgICBjb25zdCBmb3JtRGF0YU9iamVjdCA9IHt9O1xyXG4gICAgZm9ybWRhdGEuZm9yRWFjaChmdW5jdGlvbih2YWx1ZSwga2V5KXtcclxuICAgICAgICBmb3JtRGF0YU9iamVjdFtrZXldID0gdmFsdWU7XHJcbiAgICB9KTtcclxuXHJcblxyXG4gICAgY29uc29sZS5sb2coZm9ybUNsYXNzTmFtZSk7XHJcbiAgICB0YXNrcy5hZGQoZm9ybURhdGFPYmplY3QsZm9ybUNsYXNzTmFtZSk7XHJcbiAgICByZW5kZXIuQWRkVGFza3NCdXR0b24oZm9ybUNsYXNzTmFtZSk7XHJcblxyXG5cclxufSlcclxuXHJcblxyXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKGV2ZW50KSB7XHJcbiAgICBpZiAoZXZlbnQudGFyZ2V0ICYmIGV2ZW50LnRhcmdldC5pZCA9PT0gJ2RlbGV0ZS10YXNrJykge1xyXG4gICAgICAgIC8vIEFzc3VtaW5nIHRhc2tzIGlzIHlvdXIgb2JqZWN0IGNvbnRhaW5pbmcgdGhlIGRlbGV0ZXRhc2sgbWV0aG9kXHJcbiAgICAgICAgdGFza3MuZGVsZXRldGFzayhldmVudCk7XHJcbiAgICB9XHJcbn0pO1xyXG5cclxuXHJcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oZXZlbnQpIHtcclxuICAgIGlmIChldmVudC50YXJnZXQgJiYgZXZlbnQudGFyZ2V0LmNsYXNzTmFtZSA9PT0gJ2VkaXQtdGFzaycpIHtcclxuICAgICAgICBjb25zdCBpbmRleHRvZWRpdCA9IHBhcnNlSW50KGV2ZW50LnRhcmdldC5pZCwgMTApO1xyXG4gICAgICAgIGNvbnN0IHByb2plY3QgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZGlhbG9nRm9ybScpLmNsYXNzTmFtZTtcclxuICAgICAgICBcclxuICAgICAgICAvLyBTdG9yZSBpbmRleHRvZWRpdCBpbiBhIGRhdGEgYXR0cmlidXRlIG9mIHRoZSBlZGl0cHJvamVjdGRpYWxvZ2Zvcm1cclxuICAgICAgICBjb25zdCBlZGl0cHJvamVjdGRpYWxvZ2Zvcm0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZWRpdC1wcm9qZWN0LWRpYWxvZy1mb3JtJyk7XHJcbiAgICAgICAgZWRpdHByb2plY3RkaWFsb2dmb3JtLnNldEF0dHJpYnV0ZSgnZGF0YS1pbmRleHRvZWRpdCcsIGluZGV4dG9lZGl0KTtcclxuICAgICAgICBcclxuICAgICAgICBjb25zdCB2aWV3ZGlvbG9nID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmVkaXQtcHJvamVjdC1kaWFsb2cnKTtcclxuICAgICAgICBjb25zdCB2aWV3ZGlvbG9nY2xvc2VidG4gPSAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2VkaXQtcHJvamVjdC1kaWFsb2ctY2xvc2UtYnRuJyk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmVkaXR0aXRsZScpLnZhbHVlID0gdGFza3MuY2F0ZWdvcmllc1twcm9qZWN0XVtpbmRleHRvZWRpdF1bJ3RpdGxlJ107XHJcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmVkaXRkZXNjJykudmFsdWUgPSB0YXNrcy5jYXRlZ29yaWVzW3Byb2plY3RdW2luZGV4dG9lZGl0XVsnZGVzYyddO1xyXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5lZGl0ZGF0ZScpLnZhbHVlID0gdGFza3MuY2F0ZWdvcmllc1twcm9qZWN0XVtpbmRleHRvZWRpdF1bJ2RhdGUnXTtcclxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZWRpdHByaW9yaXR5JykudmFsdWUgPSB0YXNrcy5jYXRlZ29yaWVzW3Byb2plY3RdW2luZGV4dG9lZGl0XVsncHJpb3JpdHknXTtcclxuXHJcbiAgICAgICAgdmlld2Rpb2xvZy5zaG93TW9kYWwoKTtcclxuICAgICAgICB2aWV3ZGlvbG9nY2xvc2VidG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIHZpZXdkaW9sb2cuY2xvc2UoKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgZWRpdHByb2plY3RkaWFsb2dmb3JtLmFkZEV2ZW50TGlzdGVuZXIoJ3N1Ym1pdCcsKGUpID0+IHtcclxuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgLy8gUmV0cmlldmUgaW5kZXh0b2VkaXQgZnJvbSB0aGUgZGF0YSBhdHRyaWJ1dGUgb2YgZWRpdHByb2plY3RkaWFsb2dmb3JtXHJcbiAgICAgICAgICAgIGNvbnN0IGluZGV4dG9lZGl0ID0gcGFyc2VJbnQoZWRpdHByb2plY3RkaWFsb2dmb3JtLmdldEF0dHJpYnV0ZSgnZGF0YS1pbmRleHRvZWRpdCcpLCAxMCk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBjb25zdCBmb3JtRGF0YU9iamVjdCA9IHtcclxuICAgICAgICAgICAgICAgIHRpdGxlOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZWRpdHRpdGxlJykudmFsdWUsXHJcbiAgICAgICAgICAgICAgICBkZXNjOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZWRpdGRlc2MnKS52YWx1ZSxcclxuICAgICAgICAgICAgICAgIGRhdGU6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5lZGl0ZGF0ZScpLnZhbHVlLFxyXG4gICAgICAgICAgICAgICAgcHJpb3JpdHk6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5lZGl0cHJpb3JpdHknKS52YWx1ZVxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIFxyXG4gICAgICAgICAgICB0YXNrcy5lZGl0dGFzayhmb3JtRGF0YU9iamVjdCwgcHJvamVjdCwgaW5kZXh0b2VkaXQpO1xyXG4gICAgICAgICAgICB2aWV3ZGlvbG9nLmNsb3NlKCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn0pO1xyXG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=