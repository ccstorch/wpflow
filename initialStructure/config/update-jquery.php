<?php
  function modify_jquery_version() {
    if (is_admin() || $GLOBALS['pagenow'] === 'wp-login.php') return;
    wp_deregister_script('jquery');
    wp_register_script('jquery', 'http://ajax.googleapis.com/ajax/libs/jquery/2.2.0/jquery.min.js', false, '2.2.s');
    wp_enqueue_script('jquery');
  }
  add_action('init', 'modify_jquery_version');
 ?>
