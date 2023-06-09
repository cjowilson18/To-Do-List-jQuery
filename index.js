$(document).ready(function() {
console.log("LFG");
 


var addToList= function () {
    $.ajax({
        type:'POST',
        url: 'https://fewd-todolist-api.onrender.com/tasks?api_key=213',
        contentType: 'application/json',
        dataType: 'json',
        data:JSON.stringify({
            task: {
                content: $('#new-task-additions').val()
            }
        }),
        success: function(response, textStatus) {
            console.log(response);
            $('#new-task-additions').val(' ');
            gandDTasks();
        },
        error: function( request, textStatus, errorMessage) {
            console.log(errorMessage);
        }
    });
}

$('#add-tasks').on('submit', function(e) {
    e.preventDefault();
    addToList();
});

var gandDTasks= function () {

$.ajax({
    type:'GET',
    url: 'https://fewd-todolist-api.onrender.com/tasks?api_key=213',
    dataType: 'json',
    success: function(response, textStatus) {
        $('#toDoItems').empty();
        response.tasks.forEach(function(task) {
            $('#toDoItems').append("<p>" + task.content + "<p>"); 
        })
    },
    error: function (request, textStatus, errorMessage) {
        console.log(errorMessage);
    }
    });   
}


});  




