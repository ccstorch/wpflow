<?php get_template_part( 'helpers/images' ); ?>
<?php get_template_part( 'helpers/files' ); ?>
<?php get_template_part( 'helpers/loops' ); ?>
<?php get_template_part( 'helpers/links' ); ?>
<?php get_template_part( 'helpers/fields' ); ?>

<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
  <meta charset="<?php bloginfo( 'charset' ); ?>">
  <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
  <title><?php echo wp_title( '|', true, 'right' ); ?></title>
  <meta content="width=device-width, initial-scale=1" name="viewport">
  <link href="<?php echoLocalImage('favicon.png') ?>" rel="shortcut icon" type="image/x-icon">
  <link href="<?php echoLocalImage('webclip.png') ?>" rel="apple-touch-icon">
  <link rel="pingback" href="<?php bloginfo( 'pingback_url' ); ?>">
  <?php wp_head(); ?>
</head>

<body <?php body_class(); ?>>
