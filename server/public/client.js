$(document).ready(onReady);

function onReady() {
    $('#addTask').on('click', postTask)
    $("#taskTableBody").on('click','.deleteButton', deleteTask)
    $(document).on('click','.completeButton', updateTask)
}

function getTask() {
    $("#taskTableBody").empty();
    $.ajax({
        method: 'GET',
        url: '/task'
    }).then(function (response) {
        // console.log("GET /task response", response);
        for (let task of response) {
        if(task.Done === true ){
            $('#taskTableBody').append(`
          <tr class= done data-id=${task.id}>
          <td>${task.task}</td>
          <td>${task.priority}</td>
            <td>${task.notes}</td>
            <td>${task.complete_by_date}</td>
            <td data-done=${task.Done}>${task.Done}</td>

            <td><button class="deleteButton">DELETE</button></td>
            <td><button  class="completeButton">COMPLETE</button></td>
          </tr>
        
        `)} else {
            $('#taskTableBody').append(`
            <tr data-id=${task.id}>
            <td>${task.task}</td>
            <td>${task.priority}</td>
              <td>${task.notes}</td>
              <td>${task.complete_by_date}</td>
              <td data-done=${task.Done}>${task.Done}</td>
  
              <td><button class="deleteButton">DELETE</button></td>
              <td><button class="completeButton">COMPLETE</button></td>
            </tr>
          
          `)
        }
        
        
        
        
        
        ;
        }
    }).catch(function (error) {
        console.log(error);
    })


}


function postTask() {
    console.log('add task button')
    let newTask = {
        task: $('#taskInput').val(),
        priority: $('#priorityInput').val(),
        notes: $('#notesInput').val(),
        complete_by_date: $('#cbdInput').val()
    }
    $.ajax({
        method: 'POST',
        url: '/task',
        data: newTask
    }).then(function (response) {
        $('input').val(''),
            getTask();
    }).catch(function (error) {
        console.log(error);
    })
}

function updateTask() {
    let id = $(this).closest('tr').data('id');
    let done = $(this).closest('tr').data('done');
    if (done === true) {
        $(this).addClass('.done')
    } 
    
    console.log( 'in updateTask', id);
    $.ajax({
        type: 'PUT',
        url: `/task/${id}`
    }).then( function( response ){
        console.log( 'back from PUT:', response );
        getTask();
    }).catch( function (err){
        console.log('error on client-side')
    })
}

function deleteTask() {
    let deleteTask= $(this).closest('tr').data('id');
    $.ajax({
      type: 'DELETE',
      url: `/task/${deleteTask}`
    }).then(function(response) {
      console.log(response);
        getTask();
  
    }).catch(function(error){
      console.log('error in DELETE', error);
    });
}