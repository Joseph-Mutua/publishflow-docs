<?php
/**
 * Plugin Name:       PublishFlow Blocks
 * Plugin URI:        http://publishflow-test.local/publishflow-blocks
 * Description:       Editorial workflow blocks for modern publishing teams using Gutenberg.
 * Version:           0.1.0
 * Requires at least: 6.6
 * Requires PHP:      7.4
 * Author:            Portfolio Engineering
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       publishflow-blocks
 *
 * @package PublishFlowBlocks
 */

declare( strict_types=1 );

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

define( 'PUBLISHFLOW_BLOCKS_VERSION', '0.1.0' );
define( 'PUBLISHFLOW_BLOCKS_FILE', __FILE__ );
define( 'PUBLISHFLOW_BLOCKS_PATH', plugin_dir_path( __FILE__ ) );
define( 'PUBLISHFLOW_BLOCKS_URL', plugin_dir_url( __FILE__ ) );

require_once PUBLISHFLOW_BLOCKS_PATH . 'src/php/Autoloader.php';

PublishFlowBlocks\Autoloader::register();
PublishFlowBlocks\Plugin::boot();
