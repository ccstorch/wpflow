<?php
  if( !function_exists('getRelatedLink') ) : function getRelatedLink($path) {
    return get_home_url() . '/' .  $path;
  } endif;

  if( !function_exists('echoRelatedLink') ) : function echoRelatedLink($path) {
    echo getRelatedLink($path);
  } endif;
?>
