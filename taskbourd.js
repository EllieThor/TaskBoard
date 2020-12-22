var notes= [];

function addtask(){
    // validatino form
    var validTask = document.getElementById("taskDetails").value;
        if (validTask == "") {
            alert("Task Details must be filled out");
            return false;
        }
    var validDate = document.getElementById("dateDetails").value;
        if (validDate == "") {
            alert("Date must be filled out");
            return false;
        }

    var theTask= document.getElementById("taskDetails").value;
    var theDate= document.getElementById("dateDetails").value;
    var theTime= document.getElementById("timeDetails").value;

    notes.push({
        theTask: theTask,
        theDate: theDate,
        theTime: theTime
    })

    localStorage.setItem("notes", JSON.stringify(notes));
    
    addNote({
        theTask: theTask,
        theDate: theDate,
        theTime: theTime
    });

    reset();

}

function reset(){
    document.getElementById("taskDetails").value="";
    document.getElementById("dateDetails").value="";
    document.getElementById("timeDetails").value="";
}

function addNote(newNote){
    // catch row
    var rowNotes= document.getElementById("noteRow");
    // create div
    var col= document.createElement("div");
    // assign attribute to col
    col.setAttribute("class","col-lg-3 col-md-4 col-sm-6 col-12 d-flex justify-content-center");
    // appending the col to the row
    rowNotes.appendChild(col);
    // create sticky container container
    var createSticky=document.createElement("div");
    // assign attribute to the container
    createSticky.setAttribute("class","stickyContainer");
    // appending the createSticky to col
    col.appendChild(createSticky);


    //create icon for delete task
    var createIcon= document.createElement("i");
    // assign attribute to i
    createIcon.setAttribute("class", "fas fa-calendar-times fa-2x deleteTask");
    // appending the icon to createSticky
    createSticky.appendChild(createIcon);
    



    // create textarea to stickyContainer
    var createTA= document.createElement("textarea");
    // assign attributes to textarea
    createTA.setAttribute("class", "taskTA");
    createTA.setAttribute("disabled","disabled");
    createTA.setAttribute("cols", "15");
    createTA.setAttribute("rows", "4");
    // appending the textarea to stickyContainer
    createSticky.appendChild(createTA);
    // appending the task to textarea
    var taskData= document.createTextNode(newNote.theTask);
    createTA.appendChild(taskData);

    // create span for date
    var createDateSpan=document.createElement("span");
    // assign attribute to the date span
    createDateSpan.setAttribute("class", "dateTime");
    // appending the date span to stickyContainer
    createSticky.appendChild(createDateSpan);
    // appending the date to the span
    var dateData=document.createTextNode(newNote.theDate);
    createDateSpan.append(dateData);

    // create span for time
    var createTimeSpan=document.createElement("span");
    // assign attribute to the time span
    createTimeSpan.setAttribute("class", "dateTime");
    // appending the date span to stickyContainer
    createSticky.appendChild(createTimeSpan);
    // appending the time to the span
    var timeData=document.createTextNode(newNote.theTime);
    createTimeSpan.append(timeData);



}

function createnotes(){
    // create var thet take data fron locelStorage when the page is reload
    var allNotes = localStorage.getItem("notes");
    // Returning content to objects
    allNotes = JSON.parse(allNotes);
    // if there is notes
    if(allNotes != undefined ){
        // update the array
        notes= allNotes;
        // create all notes
        for(var i=0; i<allNotes.length; i++){
            addNote(allNotes[i]);
        }
    }

}

$(document).on('click', '.deleteTask',function (){
    var index= $('.deleteTask').index(this);
    notes.splice(index,1);
    localStorage.setItem("notes", JSON.stringify(notes));
    location.reload();


    
})
