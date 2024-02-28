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



let liElements = document.querySelectorAll("li");

liElements.forEach((li) => {
    li.addEventListener("click", (event) => {
        let project = event.target.innerHTML;
        _todoFunctions__WEBPACK_IMPORTED_MODULE_0__.render.AddTasksButton(project);
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
    _todoFunctions__WEBPACK_IMPORTED_MODULE_0__.tasks.add(formDataObject,formClassName);
    e.target.reset()
    _todoFunctions__WEBPACK_IMPORTED_MODULE_0__.render.AddTasksButton(formClassName);


})
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5idW5kbGUuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1Q0FBdUMsUUFBUTtBQUMvQztBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1Q0FBdUM7QUFDdkMsbUNBQW1DLGNBQWM7QUFDakQsbUNBQW1DLGFBQWE7QUFDaEQsa0NBQWtDLGFBQWE7QUFDL0MsbUNBQW1DLGlCQUFpQjtBQUNwRDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQyxLQUFLO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7Ozs7OztVQy9GRDtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7O0FDTnlDO0FBQ0Q7QUFDeEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUSxrREFBTTtBQUNkLEtBQUs7QUFDTCxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxJQUFJLGlEQUFLO0FBQ1Q7QUFDQSxJQUFJLGtEQUFNO0FBQ1Y7QUFDQTtBQUNBLENBQUMsQyIsInNvdXJjZXMiOlsid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy90b2RvRnVuY3Rpb25zLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgY29uc3QgcmVuZGVyID0gKGZ1bmN0aW9uKCkge1xyXG4gICAgY29uc3QgZGlhbG9nID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJkaWFsb2dcIik7XHJcbiAgICBjb25zdCBjbG9zZWRpb2xvZyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjbG9zZWRpb2xvZycpO1xyXG4gICAgY29uc3QgZGlzcGxheSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZGlzcGxheVwiKTtcclxuICAgIGNvbnN0IGRpYWxvZ0Zvcm0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZGlhbG9nRm9ybScpXHJcbiAgICBjb25zdCBBZGRUYXNrc0J1dHRvbiA9IGZ1bmN0aW9uKHByb2plY3QpIHtcclxuICAgICAgICBjb25zdCBidG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcclxuICAgICAgICBidG4uaW5uZXJUZXh0ID0gYEFERCBUQVNLIFRPICR7cHJvamVjdH1gO1xyXG4gICAgICAgIGJ0bi5pZCA9IHByb2plY3Q7XHJcbiAgICAgICAgYnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gICAgICAgICAgICBkaWFsb2cuc2hvd01vZGFsKCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGRpc3BsYXkuaW5uZXJIVE1MID0gXCJcIjtcclxuICAgICAgICBkaXNwbGF5LmFwcGVuZENoaWxkKGJ0bik7XHJcblxyXG4gICAgICAgIGNsb3NlZGlvbG9nLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcclxuICAgICAgICAgICAgZGlhbG9nLmNsb3NlKClcclxuICAgICAgICB9KVxyXG5cclxuICAgICAgICBkaWFsb2dGb3JtLmNsYXNzTmFtZSA9IHByb2plY3RcclxuICAgICAgICByZW5kZXIuVGFza3MocHJvamVjdClcclxuICAgICAgICBjb25zb2xlLmxvZyhwcm9qZWN0KVxyXG4gICAgICAgIFxyXG4gICAgfTtcclxuXHJcblxyXG4gICAgY29uc3QgVGFza3MgPSBmdW5jdGlvbihuYW1lKXtcclxuICAgICAgICBjb25zdCBuYW1lMSA9IG5hbWVcclxuICAgICAgICB0YXNrcy5sb2FkRnJvbVN0b3JhZ2UoKTtcclxuICAgICAgICBjb25zdCBmb2xkZXIgPSB0YXNrcy5jYXRlZ29yaWVzW25hbWVdXHJcbiAgICAgICAgZm9sZGVyLmZvckVhY2goZWxlbWVudCA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgICAgICAgICBkaXYuY2xhc3NOYW1lID0gXCJwcm9qZWN0XCI7IC8vIFNldHRpbmcgY2xhc3MgZm9yIGRpdiBlbGVtZW50XHJcbiAgICAgICAgICAgIGRpdi5pbm5lckhUTUwgPSBgPGgxPiR7ZWxlbWVudC50aXRsZX08L2gxPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxoMj4ke2VsZW1lbnQuZGVzY308L2gyPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwPiR7ZWxlbWVudC5kYXRlfTwvcD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aDM+JHtlbGVtZW50LnByaW9yaXR5fTwvaDM+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbj5lZGl0PC9idXR0b24+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbj5kZXRhaWxzPC9idXR0b24+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbj5kZWxldGU8L2J1dHRvbj5gO1xyXG4gICAgICAgICAgICBkaXNwbGF5LmFwcGVuZENoaWxkKGRpdik7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgXHJcbiAgICB9XHJcblxyXG5cclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgQWRkVGFza3NCdXR0b24sXHJcbiAgICAgICAgVGFza3NcclxuICAgIH07XHJcbn0pKCk7IC8vIEFkZGVkIHBhcmVudGhlc2VzIHRvIGV4ZWN1dGUgdGhlIGZ1bmN0aW9uIGltbWVkaWF0ZWx5XHJcblxyXG5cclxuXHJcblxyXG5leHBvcnQgY29uc3QgdGFza3MgPSAoZnVuY3Rpb24oKSB7XHJcbiAgICBjb25zdCBjYXRlZ29yaWVzID0ge1xyXG4gICAgICAgIGhvbWU6IFtdLFxyXG4gICAgICAgIHRvZGF5OiBbXSxcclxuICAgICAgICB3ZWVrOiBbXSxcclxuICAgICAgICBwcm9qZWN0czogW11cclxuICAgIFxyXG4gICAgfTtcclxuXHJcbiAgICBjb25zdCBhZGQgPSBmdW5jdGlvbihvYmosbmFtZSkge1xyXG5cclxuICAgICAgICB0YXNrcy5jYXRlZ29yaWVzW25hbWVdLnB1c2gob2JqKVxyXG4gICAgICAgIHRhc2tzLmFkZFRvU3RvcmFnZSgpXHJcbiAgICB9XHJcblxyXG5cclxuICAgICAgXHJcbiAgICBjb25zdCBhZGRUb1N0b3JhZ2UgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgLy8gQ29udmVydCB0YXNrcy5jYXRlZ29yaWVzIHRvIEpTT04gYW5kIHN0b3JlIGluIGxvY2FsU3RvcmFnZVxyXG4gICAgICAgIGNvbnN0IGFyciA9IEpTT04uc3RyaW5naWZ5KHRhc2tzLmNhdGVnb3JpZXMpO1xyXG4gICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKFwiZGF0YVwiLCBhcnIpO1xyXG4gICAgfTtcclxuICAgIFxyXG4gICAgY29uc3QgbG9hZEZyb21TdG9yYWdlID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGNvbnN0IGFycjEgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShcImRhdGFcIik7XHJcbiAgICBcclxuICAgICAgICBpZiAoYXJyMSkge1xyXG4gICAgICAgICAgICB0YXNrcy5jYXRlZ29yaWVzID0gSlNPTi5wYXJzZShhcnIxKTtcclxuICAgICAgICB9IGVsc2V7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICBcclxuICAgICAgcmV0dXJuIHtcclxuICAgICAgICBjYXRlZ29yaWVzLFxyXG4gICAgICAgIGFkZCxcclxuICAgICAgICBhZGRUb1N0b3JhZ2UsXHJcbiAgICAgICAgbG9hZEZyb21TdG9yYWdlXHJcbiAgICAgICAgfVxyXG59KSgpIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgeyByZW5kZXIgfSBmcm9tIFwiLi90b2RvRnVuY3Rpb25zXCI7XHJcbmltcG9ydCB7IHRhc2tzIH0gZnJvbSBcIi4vdG9kb0Z1bmN0aW9uc1wiO1xyXG5cclxubGV0IGxpRWxlbWVudHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwibGlcIik7XHJcblxyXG5saUVsZW1lbnRzLmZvckVhY2goKGxpKSA9PiB7XHJcbiAgICBsaS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGV2ZW50KSA9PiB7XHJcbiAgICAgICAgbGV0IHByb2plY3QgPSBldmVudC50YXJnZXQuaW5uZXJIVE1MO1xyXG4gICAgICAgIHJlbmRlci5BZGRUYXNrc0J1dHRvbihwcm9qZWN0KTtcclxuICAgIH0pO1xyXG59KTtcclxuXHJcblxyXG5cclxuZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2RpYWxvZ0Zvcm0nKS5hZGRFdmVudExpc3RlbmVyKCdzdWJtaXQnLChlKSA9PiB7XHJcbiAgICBlLnByZXZlbnREZWZhdWx0KClcclxuICAgIGNvbnN0IGZvcm1kYXRhID0gbmV3IEZvcm1EYXRhKGUudGFyZ2V0KTtcclxuICAgIGNvbnN0IGZvcm1DbGFzc05hbWUgPSBlLnRhcmdldC5jbGFzc05hbWU7XHJcblxyXG4gICAgY29uc3QgZm9ybURhdGFPYmplY3QgPSB7fTtcclxuICAgIGZvcm1kYXRhLmZvckVhY2goZnVuY3Rpb24odmFsdWUsIGtleSl7XHJcbiAgICAgICAgZm9ybURhdGFPYmplY3Rba2V5XSA9IHZhbHVlO1xyXG4gICAgfSk7XHJcblxyXG5cclxuICAgIGNvbnNvbGUubG9nKGZvcm1DbGFzc05hbWUpO1xyXG4gICAgdGFza3MuYWRkKGZvcm1EYXRhT2JqZWN0LGZvcm1DbGFzc05hbWUpO1xyXG4gICAgZS50YXJnZXQucmVzZXQoKVxyXG4gICAgcmVuZGVyLkFkZFRhc2tzQnV0dG9uKGZvcm1DbGFzc05hbWUpO1xyXG5cclxuXHJcbn0pIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9