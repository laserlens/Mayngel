$(function () {

  getToDo();
  $('#toDo-form').on('submit', addToDo);
  $('#toDo-list').on('click','.remove',removeToDo);
  $('#toDo-list').on('click', '.checkbox', addChecked);
});//end of jquery


function getToDo() {
  $.ajax({
    type: 'GET',
    url: '/toDo',
    success: displayToDo
  });
}

function displayToDo(response) {
   var $div = $('#toDo-list');
   $div.empty();
   response.forEach(function(toDo) {
     var $ul = $('<ul></ul>');
     if (toDo.mayngelpoints == true) {
       var $button = $('<div><button type="button" class="btn-default checkbox" id="'+toDo.id+'">X</button></div>');
       $button.data('id', toDo.id);
       console.log('true data ', toDo.id);
       $ul.append($button);
       $ul.append('<div><strong><s>' + toDo.list + '</s></strong></div>');
     }else {
       var $button = $('<div><button type="button" class="btn-default checkbox" id="'+toDo.id+'">&nbsp;&nbsp;</button></div>');
       $button.data('id', toDo.id);
       console.log('false data ', toDo.id);
       $ul.append($button);
       $ul.append('<div><strong>' + toDo.list + '</strong></div>');
     }
     $ul.append('<div><button type="button" class="btn-default remove" id ="'+toDo.id+'">Remove</button></div>');
     $div.append($ul);
   });
    }

 function addToDo(event) {
   event.preventDefault();
    var toDoData = $('#theToDo').val();
    console.log('whats this toDoData',toDoData);
    $.ajax({
      type: 'POST',
      url: '/toDo',
      data: {'list':toDoData, 'mayngelpoints':'false'},
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
function addChecked(event) {
  event.preventDefault();
  var $button = $(this).attr('id');
  console.log('whats this button', $button);
  var truthyness;
   if ($(this).text()== 'X') {
     truthyness = false;
   }else{
     truthyness = true;
   }
   console.log('whats the truth ',truthyness);
   $.ajax({
     type: 'PUT',
     url: '/toDo/',
     data: {'id':$button, 'mayngelpoints':truthyness },
     success: setTimeout(getToDo, 10)
   });
}
