<?php
/**
 * Plugin bootstrap orchestration.
 *
 * @package PublishFlowBlocks
 */

declare( strict_types=1 );

namespace PublishFlowBlocks;

final class Plugin {
	/**
	 * Boots the plugin once WordPress finishes loading.
	 */
	public static function boot(): void {
		add_action( 'init', array( __CLASS__, 'register' ) );
	}

	/**
	 * Placeholder for block registration.
	 */
	public static function register(): void {
		// Block registration is added in subsequent milestones.
	}
}
