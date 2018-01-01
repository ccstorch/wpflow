<?php
  if( !function_exists('getField') ) : function getField($name, $id = null) {
    $value = get_field($name, $id);
    // if(!$value) $value = $content_defaults[$name];
    return $value;
  } endif;

  if( !function_exists('echoField') ) : function echoField($name, $id = null) {
    echo getField($name, $id);
  } endif;

  if( !function_exists('getGloablField') ) : function getGloablField($name) {
    return getField($name, 'options');
  } endif;

  if( !function_exists('echoGlobalField') ) : function echoGlobalField($name) {
    echo getGloablField($name);
  } endif;

  if( !function_exists('getSubField') ) : function getSubField($name) {
    $value = get_sub_field($name);
    return $value;
  } endif;

  if( !function_exists('echoSubField') ) : function echoSubField($name, $id = null) {
    echo getSubField($name, $id);
  } endif;
?>
