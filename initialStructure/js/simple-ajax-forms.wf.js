(function($) {
  $('[data-simple-ajax-form]').submit(function(event) {
    event.preventDefault();
    var $form = $(this);
    var values = $form.serializeArray();
    var hasError = false;
    var $successMessage = $form.find('.success-form-message');
    var $failMessage = $form.find('.w-form-fail');

    // Rmove error message paragraph
    $failMessage.hide();

    // Change submit text for loading...
    var $submit = $form.find('input[type="submit"]');
    if(!$submit.length) $submit = $form.find('button');
    var originalSubmitText = $submit.val();
    $submit.val('...');

    // Check required fields
    $form.find('required').each(function () {
      // TODO: Check how webflow does the validations
      var $input = $(this);
      var name = $input.attr('name');
      const value = values.find(function(item) { return name === item.name });
      if(!value || !value.value) {
        $input.addClass('error');
        hasError = true;
      } else {
        $input.removeClass('error');
      }
    });

    const options = {
      type:"POST",
      url: serverValues.ajaxUrl,
      dataType: "json",
      data: Object.assign({ action: 'simple_ajax_form_submit', nonce: serverValues.nonce }, { answers: $form.serialize() }),
      success: function(result) {
        $submit.val(originalSubmitText);
        if(result === 1) {
          // TODO: Check how webflow does the messages
          $successMessage.display();
        } else {
          $failMessage.display();
        }
      },
      error: function(result) {
        $submit.val(originalSubmitText);
        $failMessage.display();
      }
    };

    if(!!hasError) {
      $submit.val(originalSubmitText);
      // TODO: Check how webflow does the messages
      $failMessage.display();
    } else {
      $.ajax(options);
    }
  });

}(jQuery));
