<?php
  function load_scripts(){
    wp_enqueue_style( 'normalize', get_stylesheet_directory_uri() . '/css/normalize.wf.css' );
    wp_enqueue_style( 'wf', get_stylesheet_directory_uri() . '/css/wf.css' );
    wp_enqueue_style( 'theme.wf', get_stylesheet_directory_uri() . '/css/theme.wf.css' );
    wp_enqueue_style( 'override', get_stylesheet_directory_uri() . '/css/override.css' );
    wp_enqueue_script( 'modernizr', get_stylesheet_directory_uri() . '/js/modernizr.js' );
    wp_enqueue_script( 'wf', get_stylesheet_directory_uri() . '/js/wf.js', array( 'jquery' ) );
    wp_enqueue_script( 'simple_ajax_form.wf', get_stylesheet_directory_uri() . '/js/simple-ajax-form.wf.js', array( 'jquery' ) );

    wp_localize_script( "simple_ajax_form.wf",
      'serverValues',
      array(
        'ajaxUrl' => admin_url( 'admin-ajax.php' ), // url for php file that process ajax request to WP
        'nonce' => wp_create_nonce( "unique_id_nonce" ), // this is a unique token to prevent form hijacking
      )
    );
  }
  add_action( 'wp_enqueue_scripts', 'load_scripts' );
?>
