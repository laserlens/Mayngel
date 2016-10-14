$(function () {

  getToDo();
  $('#toDo-form').on('submit', addToDo);
  $('#toDo-list').on('click','button',removeToDo);
  $('#toDo-list').on('change', 'checkbox', checkedToDo);
});//end of jquery


function getToDo() {
  $.ajax({
    type: 'GET',
    url: '/toDo',
    success: displayToDo
  });
}

function displayToDo(response) {
    var total=$(this).find('input[name="lineup[]"]:checked').length;
    $('#points').text(total);
    console.log('checked total', total);
   //console.log(response);
   var $div = $('#toDo-list');
   $div.empty();
   response.forEach(function(toDo) {
     var $li = $('<h4></h4>');
     $li.append('<input class='+ toDo.mayngelpoints +' type="checkbox">');
     $li.append('<strong>' + toDo.list + '</strong>');
     $li.append('<button Type="button" id = '+toDo.id+'>Remove</button>');
     $div.append($li);
     if (toDo.mayngelpoints == true) {
         document.getElement(this).checked = true;
       }
   });
 }
 function addToDo(event) {
   event.preventDefault();
    var toDoData = $('#theToDo').val();
    console.log('whats this toDoData',toDoData);

    $.ajax({
      type: 'POST',
      url: '/toDo',
      data: {'list':toDoData},
      success: getToDo
    });

  $(this).find('input').val('');
}
function removeToDo(event) {

   var toDoId = Number(this.id);
   //console.log('whats the toDo id', toDoId);
   $.ajax({
     type: 'DELETE',
     url: '/toDo',
     data: {'id':toDoId},
     success: getToDo
   });
}
function checkedToDo(event) {
  event.preventDefault();
   var checked = $(':checkbox').attr('class');
   console.log('checked is',checked);

   $.ajax({
     type: 'PUT',
     url: '/toDo',
     data: {'mayngelpoints':checked},
     success: getToDo
   });
 }
