$(document).ready(function() {

  $('textarea').on('input', function() {
    let charCount = $(this).val().length;
    let remaining = 140 - charCount;

    let counter = $(this).parent().next('div').find('.counter');
    counter.text(remaining);

    if (remaining < 0) {
     counter.css({'color': 'red'});
    } else {
      counter.css({'color': 'black'});
    }   
  });

});

