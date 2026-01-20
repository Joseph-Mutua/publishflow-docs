<?php
/**
 * Lightweight PSR-4 autoloader for the plugin.
 *
 * @package PublishFlowBlocks
 */

declare( strict_types=1 );

namespace PublishFlowBlocks;

final class Autoloader {
	/**
	 * Registers the autoloader with SPL.
	 */
	public static function register(): void {
		spl_autoload_register( array( __CLASS__, 'autoload' ) );
	}

	/**
	 * Resolves classes within the plugin namespace.
	 *
	 * @param string $class_name Fully-qualified class name.
	 */
	private static function autoload( string $class_name ): void {
		$namespace_prefix = __NAMESPACE__ . '\\';

		if ( 0 !== strpos( $class_name, $namespace_prefix ) ) {
			return;
		}

		$relative_class = substr( $class_name, strlen( $namespace_prefix ) );
		$relative_path  = str_replace( '\\', DIRECTORY_SEPARATOR, $relative_class );
		$file_path      = PUBLISHFLOW_BLOCKS_PATH . 'src/php/' . $relative_path . '.php';

		if ( is_readable( $file_path ) ) {
			require_once $file_path;
		}
	}
}
