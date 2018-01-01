<?php
  if( !function_exists('loopQuery') ) : function loopQuery($args, $columnsCount, $rowClass, $callback) {
    $the_query = new WP_Query($args);
    if ( $the_query->have_posts() ) :
      $col = 1;
      while ( $the_query->have_posts() ) :
        $the_query->the_post();
        $callback();
        if($rowClass && $col === $columnsCount) {
          echo '</div><div class="' . $rowClass . '">';
          $col = 0;
        }
        $col++;
      endwhile;
    wp_reset_postdata();
    endif;
  } endif;


  if( !function_exists('loopRepeater') ) : function loopRepeater($fieldName, $global, $columnsCount, $rowClass, $callback) {
    $options = $global ? 'options' : FALSE;
    if ( have_rows($fieldName, $options) ) :
      $col = 1;
      while ( have_rows($fieldName, $options) ) :
        the_row();
        $callback();
        if($rowClass && $col === $columnsCount) {
          echo '</div><div class="' . $rowClass . '">';
          $col = 0;
        }
        $col++;
      endwhile;
    endif;
  } endif;
?>
