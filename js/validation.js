/* 
 * validation.js
 * Validates form inputs.
 * Angela Panfil 
 * panfia1@gmail.com
 * 
 */

/* Checks if the field is empty
 * Checks against value and placeholder attribute for 
 * browsers that do not support placeholder 
 */
function isEmpty(field) {
  if (field.val() == '' || field.val() == field.attr('placeholder')) {
    return true;
  }
  return false;
}

/* Checks if the email entered is valid.
 * Begins with alphanumeric, has an @ and atleast one .
 * and ends with appropriate domain suffix.
 */
function isInvalidEmail(field) {
  var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
  if (!emailReg.test(field.val())) {
    return true;
  }
  return false;
}

/* Appends error message to proper field */
function appendMessage(field, message) {
  field.text(message);
}

(function($) {
  /* Validates on submit */
  $('form').submit(function(event) {
    var message = '';
    var noError = true;
    var errorField = '';
    var input = $('input');
    
    /* Clears all span errors from previous submit */
    $('span').text('');
    
    /* Checks for empty fields and appends error message */
    input.each(function() {
      field = $(this);
      if (isEmpty(field)) {
        message = '必填';
        var errorField = field.parent('p').children('span');
        appendMessage(errorField, message);
        noError = false;
      }
    });
    
    /* Validates email and appends error message */
    var email = $('div#signin input');
    if (!isEmpty(email)) {
      if (isInvalidEmail(email)) {
        message = '邮箱格式输入错误';
        errorField = $('div#signin span.email-error');
        appendMessage(errorField, message);
        noError = false;
      }
    }
    
    /* Prevents form from being submitted */
    if (!noError) {
      event.preventDefault();
    }
    
    return noError;
    
  });

}(jQuery));
