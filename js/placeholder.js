/* 
 * placeholder.js
 * Performs placeholder if not supported.
 * Angela Panfil 
 * panfia1@gmail.com
 * 
 */

/* Determines if browser supports placeholder */
function supportPlaceholder() {
  var input = document.createElement('input');
  return ('placeholder' in input);
}

/* Performs placeholder if not supported */
(function($) {
  
  if (!supportPlaceholder()) {
    
    /* Initializes all input values */
    $('input').each(function() {
      var input = $(this);
      if (input.val() == '') {
        input.val(input.attr('placeholder'));
      }
    });
   
    
    /* Empties placeholder from selected field */
    $('[placeholder]').focus(function() {
      var input = $(this);
      if (input.val() == input.attr('placeholder')) {
        input.val('');
      }
    /* Fills field with placeholder when focus is removed */
    }).blur(function() {
      var input = $(this);
      if (input.val() == '' || input.val() == input.attr('placeholder')) {
        input.val(input.attr('placeholder'));
      }
    });
    
  }
}(jQuery));
