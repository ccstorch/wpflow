<?php
  function simple_ajax_form_submit(){
    // TODO: Envair email
    echo 1;
    die();
  }

  add_action('wp_ajax_simple_ajax_form_submit', 'simple_ajax_form_submit');
  add_action('wp_ajax_nopriv_simple_ajax_form_submit', 'simple_ajax_form_submit');
?>
