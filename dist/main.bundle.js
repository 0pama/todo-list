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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5idW5kbGUuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2IsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBa0I7QUFDbEI7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUNBQXVDLFFBQVE7QUFDL0M7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUNBQW1DLGNBQWM7QUFDakQsbUNBQW1DLGFBQWE7QUFDaEQsa0NBQWtDLGFBQWE7QUFDL0MsbUNBQW1DLGlCQUFpQjtBQUNwRCw2REFBNkQsTUFBTTtBQUNuRTtBQUNBLCtEQUErRCxNQUFNLEdBQUcsS0FBSztBQUM3RTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOzs7Ozs7O1VDak5EO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7QUNOeUM7QUFDRDtBQUN4QztBQUNBO0FBQ0E7QUFDQSxrREFBTTtBQUNOO0FBQ0E7QUFDQSxrREFBTTtBQUNOLGtEQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlEQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0Esa0RBQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtEQUFNO0FBQ04saURBQUs7QUFDTDtBQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL3RvZG9GdW5jdGlvbnMuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBjb25zdCByZW5kZXIgPSAoZnVuY3Rpb24oKSB7XHJcbiAgICBjb25zdCBkaWFsb2cgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImRpYWxvZ1wiKTtcclxuICAgIGNvbnN0IGNsb3NlZGlvbG9nID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2Nsb3NlZGlvbG9nJyk7XHJcbiAgICBjb25zdCBkaXNwbGF5ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJkaXNwbGF5XCIpO1xyXG4gICAgY29uc3QgZGlzcGxheWNvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZGlzcGxheWNvbnRhaW5lclwiKTtcclxuICAgIGNvbnN0IGRpYWxvZ0Zvcm0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZGlhbG9nRm9ybScpXHJcbiAgICBjb25zdCBsaUVsZW1lbnRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5wcm9qZWN0LW5hdlwiKTtcclxuICAgIGNvbnN0IGVkaXRwcm9qZWN0ZGlhbG9nZm9ybSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNlZGl0LXByb2plY3QtZGlhbG9nLWZvcm0nKTtcclxuICAgIGNvbnN0IHZpZXdkaW9sb2cgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZWRpdC1wcm9qZWN0LWRpYWxvZycpO1xyXG4gICAgY29uc3Qgdmlld2Rpb2xvZ2Nsb3NlYnRuID0gIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNlZGl0LXByb2plY3QtZGlhbG9nLWNsb3NlLWJ0bicpO1xyXG5cclxuXHJcblxyXG5cclxuICAgIGNvbnN0IG5hdlBhZ2luYXRpb24gPSBmdW5jdGlvbigpIHtcclxuICAgICAgICBsaUVsZW1lbnRzLmZvckVhY2goKGxpKSA9PiB7XHJcbiAgICAgICAgICAgIGxpLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZXZlbnQpID0+IHtcclxuICAgICAgICAgICAgICAgIGxldCBwcm9qZWN0ID0gZXZlbnQudGFyZ2V0LmlubmVySFRNTDtcclxuICAgICAgICAgICAgICAgIHJlbmRlci5BZGRUYXNrc0J1dHRvbihwcm9qZWN0KTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgZGVsZXRlYnRuID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbihldmVudCkge1xyXG4gICAgICAgICAgICBpZiAoZXZlbnQudGFyZ2V0ICYmIGV2ZW50LnRhcmdldC5pZCA9PT0gJ2RlbGV0ZS10YXNrJykge1xyXG4gICAgICAgICAgICAgICAgdGFza3MuZGVsZXRldGFzayhldmVudCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICBcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBlZGl0RGlvbGdGb3JtID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbihldmVudCkge1xyXG4gICAgICAgICBpZiAoZXZlbnQudGFyZ2V0ICYmIGV2ZW50LnRhcmdldC5jbGFzc05hbWUgPT09ICdlZGl0LXRhc2snKSB7XHJcbiAgICAgICAgICAgICBjb25zdCBpbmRleHRvZWRpdCA9IHBhcnNlSW50KGV2ZW50LnRhcmdldC5pZCwgMTApO1xyXG4gICAgICAgICAgICAgY29uc3QgcHJvamVjdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdkaWFsb2dGb3JtJykuY2xhc3NOYW1lO1xyXG4gICAgICAgIFxyXG4gICAgICAgICAgICAgLy8gU3RvcmUgaW5kZXh0b2VkaXQgaW4gYSBkYXRhIGF0dHJpYnV0ZSBvZiB0aGUgZWRpdHByb2plY3RkaWFsb2dmb3JtXHJcbiAgICAgICAgXHJcbiAgICAgICAgICAgICBlZGl0cHJvamVjdGRpYWxvZ2Zvcm0uc2V0QXR0cmlidXRlKCdkYXRhLWluZGV4dG9lZGl0JywgaW5kZXh0b2VkaXQpO1xyXG4gICAgICAgIFxyXG4gICAgICAgICAgICAgZWRpdHByb2plY3RkaWFsb2dmb3JtLnJlc2V0KCk7XHJcbiAgICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZWRpdHRpdGxlJykudmFsdWUgPSB0YXNrcy5jYXRlZ29yaWVzW3Byb2plY3RdW2luZGV4dG9lZGl0XVsndGl0bGUnXTtcclxuICAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5lZGl0ZGVzYycpLnZhbHVlID0gdGFza3MuY2F0ZWdvcmllc1twcm9qZWN0XVtpbmRleHRvZWRpdF1bJ2Rlc2MnXTtcclxuICAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5lZGl0ZGF0ZScpLnZhbHVlID0gdGFza3MuY2F0ZWdvcmllc1twcm9qZWN0XVtpbmRleHRvZWRpdF1bJ2RhdGUnXTtcclxuICAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5lZGl0cHJpb3JpdHknKS52YWx1ZSA9IHRhc2tzLmNhdGVnb3JpZXNbcHJvamVjdF1baW5kZXh0b2VkaXRdWydwcmlvcml0eSddO1xyXG5cclxuICAgICAgICAgICAgIHZpZXdkaW9sb2cuc2hvd01vZGFsKCk7XHJcbiAgICAgICAgICAgICB2aWV3ZGlvbG9nY2xvc2VidG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgIHZpZXdkaW9sb2cuY2xvc2UoKTtcclxuICAgICAgICAgICAgICAgICB9KTtcclxuIFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IEFkZFRhc2tzQnV0dG9uID0gZnVuY3Rpb24ocHJvamVjdCkge1xyXG4gICAgICAgIGNvbnN0IGJ0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xyXG4gICAgICAgIGJ0bi5pbm5lclRleHQgPSBgQUREIFRBU0sgVE8gJHtwcm9qZWN0fWA7XHJcbiAgICAgICAgYnRuLmlkID0gcHJvamVjdDtcclxuICAgICAgICBidG4uY2xhc3NOYW1lID0gJ2FkZC10YXNrLWJ0bidcclxuICAgICAgICBidG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGRpYWxvZy5zaG93TW9kYWwoKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICBkaXNwbGF5Y29udGFpbmVyLmlubmVySFRNTCA9IFwiXCJcclxuICAgICAgICBkaXNwbGF5Y29udGFpbmVyLmFwcGVuZENoaWxkKGJ0bik7XHJcblxyXG4gICAgICAgIGNsb3NlZGlvbG9nLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcclxuICAgICAgICAgICAgZGlhbG9nLmNsb3NlKClcclxuICAgICAgICB9KVxyXG5cclxuICAgICAgICBkaWFsb2dGb3JtLmNsYXNzTmFtZSA9IHByb2plY3RcclxuICAgICAgICByZW5kZXIuVGFza3MocHJvamVjdClcclxuICAgICAgICBcclxuICAgIH07XHJcblxyXG5cclxuICAgIGNvbnN0IFRhc2tzID0gZnVuY3Rpb24obmFtZSl7XHJcbiAgICAgICAgZGlzcGxheS5pbm5lckhUTUwgPSBcIlwiXHJcbiAgICAgICAgY29uc3QgbmFtZTEgPSBuYW1lXHJcbiAgICAgICAgdGFza3MubG9hZEZyb21TdG9yYWdlKCk7XHJcbiAgICAgICAgY29uc3QgZm9sZGVyID0gdGFza3MuY2F0ZWdvcmllc1tuYW1lXVxyXG4gICAgICAgIGZvbGRlci5mb3JFYWNoKChlbGVtZW50LGluZGV4KSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgICAgICAgICBkaXYuY2xhc3NOYW1lID0gXCJwcm9qZWN0XCI7XHJcbiAgICAgICAgICAgIGRpdi5pZCA9IGVsZW1lbnQucHJpb3JpdHk7IFxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgZGl2LmlubmVySFRNTCA9IGA8aDE+JHtlbGVtZW50LnRpdGxlfTwvaDE+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGgyPiR7ZWxlbWVudC5kZXNjfTwvaDI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHA+JHtlbGVtZW50LmRhdGV9PC9wPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxoMz4ke2VsZW1lbnQucHJpb3JpdHl9PC9oMz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwiZWRpdC10YXNrXCIgaWQ9XCIke2luZGV4fVwiPmVkaXQ8L2J1dHRvbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uPmRldGFpbHM8L2J1dHRvbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGlkPVwiZGVsZXRlLXRhc2tcIiBjbGFzcz1cIiR7aW5kZXh9LSR7bmFtZX1cIj5kZWxldGU8L2J1dHRvbj5gO1xyXG4gICAgICAgICAgICBkaXNwbGF5LmFwcGVuZENoaWxkKGRpdik7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBBZGRUYXNrc0J1dHRvbixcclxuICAgICAgICBUYXNrcyxcclxuICAgICAgICBuYXZQYWdpbmF0aW9uLFxyXG4gICAgICAgIGRlbGV0ZWJ0bixcclxuICAgICAgICBlZGl0RGlvbGdGb3JtXHJcbiAgICB9O1xyXG59KSgpO1xyXG5cclxuZXhwb3J0IGNvbnN0IHRhc2tzID0gKGZ1bmN0aW9uKCkge1xyXG4gICAgY29uc3QgY2F0ZWdvcmllcyA9IHtcclxuICAgICAgICBob21lOiBbXSxcclxuICAgICAgICB0b2RheTogW10sXHJcbiAgICAgICAgd2VlazogW10sXHJcbiAgICAgICAgcHJvamVjdHM6IFtdXHJcbiAgICB9O1xyXG5cclxuXHJcblxyXG4gICAgY29uc3QgcHJvY2Vzc0Zvcm1EYXRhID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2RpYWxvZ0Zvcm0nKS5hZGRFdmVudExpc3RlbmVyKCdzdWJtaXQnLChlKSA9PiB7XHJcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKVxyXG4gICAgICAgICAgICBjb25zdCBmb3JtZGF0YSA9IG5ldyBGb3JtRGF0YShlLnRhcmdldCk7XHJcbiAgICAgICAgICAgIGNvbnN0IGZvcm1DbGFzc05hbWUgPSBlLnRhcmdldC5jbGFzc05hbWU7XHJcbiAgICAgICAgXHJcbiAgICAgICAgICAgIGNvbnN0IGZvcm1EYXRhT2JqZWN0ID0ge307XHJcbiAgICAgICAgICAgIGZvcm1kYXRhLmZvckVhY2goZnVuY3Rpb24odmFsdWUsIGtleSl7XHJcbiAgICAgICAgICAgICAgICBmb3JtRGF0YU9iamVjdFtrZXldID0gdmFsdWU7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIFxyXG4gICAgICAgIFxyXG4gICAgICAgICAgICB0YXNrcy5hZGQoZm9ybURhdGFPYmplY3QsZm9ybUNsYXNzTmFtZSk7XHJcbiAgICAgICAgICAgIHJlbmRlci5BZGRUYXNrc0J1dHRvbihmb3JtQ2xhc3NOYW1lKTtcclxuICAgICAgICBcclxuICAgICAgICBcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuXHJcblxyXG4gICAgY29uc3QgcHJvY2Vzc0VkaXRGb3JtRGF0YSA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGNvbnN0IGVkaXRwcm9qZWN0ZGlhbG9nZm9ybSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNlZGl0LXByb2plY3QtZGlhbG9nLWZvcm0nKTtcclxuICAgICAgICBjb25zdCB2aWV3ZGlvbG9nID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmVkaXQtcHJvamVjdC1kaWFsb2cnKTtcclxuXHJcblxyXG4gICAgICAgIGVkaXRwcm9qZWN0ZGlhbG9nZm9ybS5hZGRFdmVudExpc3RlbmVyKCdzdWJtaXQnLChlKSA9PiB7XHJcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIC8vIFJldHJpZXZlIGluZGV4dG9lZGl0IGZyb20gdGhlIGRhdGEgYXR0cmlidXRlIG9mIGVkaXRwcm9qZWN0ZGlhbG9nZm9ybVxyXG4gICAgICAgICAgICBjb25zdCBpbmRleHRvZWRpdCA9IHBhcnNlSW50KGVkaXRwcm9qZWN0ZGlhbG9nZm9ybS5nZXRBdHRyaWJ1dGUoJ2RhdGEtaW5kZXh0b2VkaXQnKSwgMTApO1xyXG4gICAgICAgICAgICBjb25zdCBwcm9qZWN0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2RpYWxvZ0Zvcm0nKS5jbGFzc05hbWU7XHJcbiAgICAgICAgICAgIGNvbnN0IGZvcm1EYXRhT2JqZWN0ID0ge1xyXG4gICAgICAgICAgICAgICAgdGl0bGU6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5lZGl0dGl0bGUnKS52YWx1ZSxcclxuICAgICAgICAgICAgICAgIGRlc2M6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5lZGl0ZGVzYycpLnZhbHVlLFxyXG4gICAgICAgICAgICAgICAgZGF0ZTogZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmVkaXRkYXRlJykudmFsdWUsXHJcbiAgICAgICAgICAgICAgICBwcmlvcml0eTogZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmVkaXRwcmlvcml0eScpLnZhbHVlXHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICB0YXNrcy5lZGl0dGFzayhmb3JtRGF0YU9iamVjdCwgcHJvamVjdCwgaW5kZXh0b2VkaXQpO1xyXG4gICAgICAgICAgICB2aWV3ZGlvbG9nLmNsb3NlKCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgYWRkID0gZnVuY3Rpb24ob2JqLG5hbWUpIHtcclxuICAgICAgICB0YXNrcy5jYXRlZ29yaWVzW25hbWVdLnB1c2gob2JqKVxyXG4gICAgICAgIHRhc2tzLmFkZFRvU3RvcmFnZSgpXHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgYWRkVG9TdG9yYWdlID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGNvbnN0IGFyciA9IEpTT04uc3RyaW5naWZ5KHRhc2tzLmNhdGVnb3JpZXMpO1xyXG4gICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKFwiZGF0YVwiLCBhcnIpO1xyXG4gICAgfTtcclxuICAgIFxyXG4gICAgY29uc3QgbG9hZEZyb21TdG9yYWdlID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGNvbnN0IGFycjEgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShcImRhdGFcIik7XHJcbiAgICAgICAgaWYgKGFycjEpIHtcclxuICAgICAgICAgICAgdGFza3MuY2F0ZWdvcmllcyA9IEpTT04ucGFyc2UoYXJyMSk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICBjb25zdCBkZWxldGV0YXNrID0gZnVuY3Rpb24oZSkge1xyXG4gICAgICAgIGNvbnN0IGFyciA9IGUudGFyZ2V0LmNsYXNzTmFtZS5zcGxpdCgnLScpXHJcbiAgICAgICAgY29uc3QgaW5kZXh0b2RlbGV0ZSA9IHBhcnNlSW50KGFyclswXSwgMTApO1xyXG4gICAgICAgIGNvbnN0IGNhdGVnb3J5ID0gYXJyWzFdO1xyXG4gICAgICAgIHRhc2tzLmNhdGVnb3JpZXNbY2F0ZWdvcnldLnNwbGljZShpbmRleHRvZGVsZXRlLDEpO1xyXG4gICAgICAgIGFkZFRvU3RvcmFnZSgpXHJcbiAgICAgICAgcmVuZGVyLlRhc2tzKGNhdGVnb3J5KVxyXG4gICAgfVxyXG4gICAgIFxyXG4gICAgY29uc3QgZWRpdHRhc2sgPSBmdW5jdGlvbihvYmosY2F0ZWdvcnksaW5kZXh0b2VkaXQpIHtcclxuICAgICAgICB0YXNrcy5jYXRlZ29yaWVzW2NhdGVnb3J5XVtpbmRleHRvZWRpdF1bJ3RpdGxlJ10gPSBvYmpbJ3RpdGxlJ107XHJcbiAgICAgICAgdGFza3MuY2F0ZWdvcmllc1tjYXRlZ29yeV1baW5kZXh0b2VkaXRdWydkZXNjJ10gPSBvYmpbJ2Rlc2MnXTtcclxuICAgICAgICB0YXNrcy5jYXRlZ29yaWVzW2NhdGVnb3J5XVtpbmRleHRvZWRpdF1bJ2RhdGUnXSA9IG9ialsnZGF0ZSddO1xyXG4gICAgICAgIHRhc2tzLmNhdGVnb3JpZXNbY2F0ZWdvcnldW2luZGV4dG9lZGl0XVsncHJpb3JpdHknXSA9IG9ialsncHJpb3JpdHknXTtcclxuICAgICAgICBhZGRUb1N0b3JhZ2UoKVxyXG4gICAgICAgIHJlbmRlci5UYXNrcyhjYXRlZ29yeSlcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIGNhdGVnb3JpZXMsXHJcbiAgICAgICAgYWRkLFxyXG4gICAgICAgIGFkZFRvU3RvcmFnZSxcclxuICAgICAgICBsb2FkRnJvbVN0b3JhZ2UsXHJcbiAgICAgICAgZGVsZXRldGFzayxcclxuICAgICAgICBlZGl0dGFzayxcclxuICAgICAgICBwcm9jZXNzRm9ybURhdGEsXHJcbiAgICAgICAgcHJvY2Vzc0VkaXRGb3JtRGF0YVxyXG4gICAgfVxyXG59KSgpO1xyXG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB7IHJlbmRlciB9IGZyb20gXCIuL3RvZG9GdW5jdGlvbnNcIjtcclxuaW1wb3J0IHsgdGFza3MgfSBmcm9tIFwiLi90b2RvRnVuY3Rpb25zXCI7XHJcblxyXG5cclxuLy8gICBuYXYgXHJcbnJlbmRlci5uYXZQYWdpbmF0aW9uKClcclxuXHJcbi8vIGluaXQgdGhlIGhvbWUgcGFnZVxyXG5yZW5kZXIuVGFza3MoXCJob21lXCIpXHJcbnJlbmRlci5BZGRUYXNrc0J1dHRvbihcImhvbWVcIilcclxuXHJcblxyXG5cclxuXHJcbi8vIHByb2NjZXMgZm9ybSBkYXRhIFxyXG50YXNrcy5wcm9jZXNzRm9ybURhdGEoKVxyXG5cclxuXHJcbi8vICAgcmVuZGVyIGRlbGV0ZSAgYnRuXHJcbnJlbmRlci5kZWxldGVidG4oKVxyXG5cclxuXHJcbi8vIEVESVQgIGZ1bmN0aW9ubGl0eVxyXG5cclxucmVuZGVyLmVkaXREaW9sZ0Zvcm0oKSAgIC8vIEVESVQgRElPTE9HIEZPUk0gXHJcbnRhc2tzLnByb2Nlc3NFZGl0Rm9ybURhdGEoKSAgICAgLy8gcHJvY2NlcyBlZGl0IGZvcm0gZGF0YSBcclxuXHJcblxyXG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=