$(document).ready(function() {
    console.log("LFG");

      var gandDTasks= function () {
    
    $.ajax({
        type:'GET',
        url: 'https://fewd-todolist-api.onrender.com/tasks?api_key=213',
        dataType: 'json',
        success: function(response, textStatus) {
            $('#toDoItems').empty();
            response.tasks.forEach(function(task) {
            $('#toDoItems').append('<div class="row"><p class= "col-xs-8">' + task.content + '</p><button class= "delete" data-id="' + task.id + '"> BYE </button><input type="checkbox" class= " mark-complete" data-id="' + task.id + '"' + (task.completed ? 'checked' : '') + '>');
            })
        },
        error: function (request, textStatus, errorMessage) {
            console.log(errorMessage);
        }
        });   
    }   
       gandDTasks();
    
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
    

    var allDone= function (id) {
       $.ajax({
        type: 'DELETE',
        url: 'https://fewd-todolist-api.onrender.com/tasks/' + id + '?api_key=213',
        success: function (response, textStatus) {
            console.log(response);
            gandDTasks();
        },
        error: function(request, textStatus, errorMessage) {
            console.log(errorMessage);
        }
    });  
    }

    $(document).on('click', '.delete', function() {
        allDone($(this).data('id'));
    });


    var doneDone= function(id) {
        $.ajax({
            type: 'PUT',
            url: 'https://fewd-todolist-api.onrender.com/tasks/'+ id+ '/mark_complete?api_key=213',
            dataType: 'json',
            success: function( response, textStatus){
                console.log(response);
                gandDTasks();
            },
            error: function( request, textStatus, errorMessage){
                console.log(errorMessage);
            }
        })
    }

    $(document).on('change', '.mark-complete', function (){
        if (this.checked) {
            doneDone($(this).data('id'));
        }
        else{
            activeTasks($(this).data('id'));
        }
    });

    activeTasks= function (id) {
        $.ajax({
            type: 'PUT',
            url: 'https://fewd-todolist-api.onrender.com/tasks/'+ id+ '/mark_active?api_key=213',
            dataType: 'json',
            success: function( response, textStatus){
                console.log(response);
                gandDTasks();
            },
            error: function( request, textStatus, errorMessage){
                console.log(errorMessage);
            }
        })
    }
    
    });  

    