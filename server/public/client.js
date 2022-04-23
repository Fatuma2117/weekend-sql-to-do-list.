$( document ).ready( onReady );

function onReady() {
$('#addTask'). on('click', postTask)

}

function getTask(){
    $("#taskTableBody").empty();
    $.ajax({
      method: 'GET',
      url: '/task'
    }).then(function(response) {
      console.log("GET /task response", response);
      for (let task of response) {
        $('#taskTableBody').append(`
          <tr data-id=${task.id} >
          <td>${task.task}</td>
            <td>${task.notes}</td>
            <td>${task.priority}</td>
            <td>${task.complete_by_date}</td>
            
            <td><button class="deleteButton">DELETE</button></td>
            <td><button class="completeButton">COMPLETE</button></td>
          </tr>
        `);
      }
    }).catch(function(error) {
      console.log(error);
    })


}


function postTask(){
    console.log('add task button')

}

function updateTask(){

}

function deleteTask(){

}