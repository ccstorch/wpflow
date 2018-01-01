<?php
  if( !function_exists('getFieldFile') ) : function getFieldFile($name) {
    $file = get_field($name);
    // TODO: Check result
    return $file;
  } endif;

  if( !function_exists('getGlobalFieldFile') ) : function getGlobalFieldFile($name) {
    $file = get_field($name, 'options');
    // TODO: Check result
    return $file;
  } endif;

  if( !function_exists('getSubFieldFile') ) : function getSubFieldFile($name) {
    $file = get_sub_field($name);
    return $file;
  } endif;

  if( !function_exists('echoFieldFile') ) : function echoFieldFile($name) {
    echo getFieldFile($name);
  } endif;

  if( !function_exists('echoGlobalFieldFile') ) : function echoGlobalFieldFile($name) {
    echo getGlobalFieldFile($name);
  } endif;

  if( !function_exists('echoSubFieldFile') ) : function echoSubFieldFile($name) {
    echo getSubFieldFile($name);
  } endif;
?>
