<?php
  if( !function_exists('getLocalImage') ) : function getLocalImage($name) {
    return get_bloginfo('template_directory') . '/images/' . $name;
  } endif;

  if( !function_exists('echoLocalImage') ) : function echoLocalImage($name) {
    echo getLocalImage($name);
  } endif;


  if( !function_exists('getFieldImage') ) : function getFieldImage($name, $size='large') {
    $image = get_field($name);
    return $image['sizes'][$size];
  } endif;

  if( !function_exists('getGlobalFieldImage') ) : function getGlobalFieldImage($name, $size='large') {
    $image = get_field($name, 'options');
    return $image['sizes'][$size];
  } endif;

  if( !function_exists('getSubFieldImage') ) : function getSubFieldImage($name, $size='large') {
    $image = get_sub_field($name);
    return $image['sizes'][$size];
  } endif;

  if( !function_exists('echoFieldImage') ) : function echoFieldImage($name, $size='large') {
    echo getFieldImage($name, $size);
  } endif;

  if( !function_exists('echoGlobalFieldImage') ) : function echoGlobalFieldImage($name, $size='large') {
    echo getGlobalFieldImage($name, $size);
  } endif;

  if( !function_exists('echoSubFieldImage') ) : function echoSubFieldImage($name, $size='large') {
    echo getSubFieldImage($name, $size);
  } endif;

  if( !function_exists('echoFieldImageTag') ) : function echoFieldImageTag($name, $size='large', $class='') {
    $image = get_field($name);
    echo "<img class='" . $class . "' src='" . $image['sizes'][$size] . "' alt='" . $image['alt'] . "' />";
  } endif;

  if( !function_exists('echoGlobalFieldImageTag') ) : function echoGlobalFieldImageTag($name, $size='large', $class='') {
    $image = get_field($name, 'options');
    echo "<img class='" . $class . "' src='" . $image['sizes'][$size] . "' alt='" . $image['alt'] . "' />";
  } endif;

  if( !function_exists('echoSubFieldImageTag') ) : function echoSubFieldImageTag($name, $size='large', $class='') {
    $image = get_sub_field($name);
    echo "<img class='" . $class . "' src='" . $image['sizes'][$size] . "' alt='" . $image['alt'] . "' />";
  } endif;
?>
