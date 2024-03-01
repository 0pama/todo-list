import { render } from "./todoFunctions";
import { tasks } from "./todoFunctions";


//   nav 
render.navPagination()

// init the home page
render.Tasks("home")
render.AddTasksButton("home")




// procces form data 
tasks.processFormData()


//   render delete  btn
render.deletebtn()


// EDIT  functionlity

render.editDiolgForm()   // EDIT DIOLOG FORM 
tasks.processEditFormData()     // procces edit form data 


