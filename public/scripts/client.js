$(function () {

  getToDo();
  $('#toDo-form').on('submit', addToDo);
  $('#toDo-list').on('click','.remove',removeToDo);
  $('#toDo-list').on('click', '.checkbox', addChecked);
});//end of jquery

//function that gets the table information
function getToDo() {
  $.ajax({
    type: 'GET',
    url: '/toDo',
    success: displayToDo
  });
}
// function that takes the information from the database and adds it to the landing page
function displayToDo(response) {
   var $div = $('#toDo-list');
   $div.empty();
   response.forEach(function(toDo) {
     var $ul = $('<ul></ul>');
     if (toDo.mayngelpoints == true) {
       var $button = $('<div><button type="button" class="btn-default btn-primary checkbox" id="'+toDo.id+'">X</button></div>');
       $button.data('id', toDo.id);
       console.log('true data ', toDo.id);
       $ul.append($button);
       $ul.append('<div class="list"><strong><s>' + toDo.list + '</s></strong></div>');
     }else {
       var $button = $('<div><button type="button" class="btn-default checkbox" id="'+toDo.id+'">&nbsp;&nbsp;</button></div>');
       $button.data('id', toDo.id);
       console.log('false data ', toDo.id);
       $ul.append($button);
       $ul.append('<div class="list"><strong>' + toDo.list + '</strong></div>');
     }
     $ul.append('<div class="list"><button type="button" class="btn-default btn-danger btn-xs remove" id ="'+toDo.id+'">Remove</button></div>');
     $div.append($ul);
     var points = $( "s" ).length;
     $('#points').text(points);
   });
    }
//funtion that takes user input task and adds to the list
 function addToDo(event) {
   event.preventDefault();
    var toDoData = $('#theToDo').val();
    $.ajax({
      type: 'POST',
      url: '/toDo',
      data: {'list':toDoData, 'mayngelpoints':'false'},
      success: getToDo
    });

  $(this).find('input').val('');
}
// funtion that deletes a task from list
function removeToDo(event) {

   var toDoId = Number(this.id);
   $.ajax({
     type: 'DELETE',
     url: '/toDo',
     data: {'id':toDoId},
     success: getToDo
   });
}
// funtion that allows user to switch a task from not done to done or vise versa
function addChecked(event) {
  event.preventDefault();
  var $button = $(this).attr('id');
  var truthyness;
   if ($(this).text()== 'X') {
     truthyness = false;
   }else{
     truthyness = true;
   }
   $.ajax({
     type: 'PUT',
     url: '/toDo/',
     data: {'id':$button, 'mayngelpoints':truthyness },
     success: displayToDo
   });
}
