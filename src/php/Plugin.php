<?php
/**
 * Plugin bootstrap orchestration.
 *
 * @package PublishFlowBlocks
 */

declare( strict_types=1 );

namespace PublishFlowBlocks;

use PublishFlowBlocks\Blocks\CalloutBlock;
use PublishFlowBlocks\Blocks\EditorialChecklistBlock;
use PublishFlowBlocks\Blocks\FootnotesBlock;
use PublishFlowBlocks\Blocks\ResourceLibraryBlock;
use PublishFlowBlocks\Contracts\ServiceContract;
use PublishFlowBlocks\Infrastructure\BlockRegistry;

final class Plugin {
	/**
	 * Boots the plugin once WordPress finishes loading.
	 */
	public static function boot(): void {
		add_action( 'init', array( __CLASS__, 'register' ) );
	}

	/**
	 * Registers plugin services.
	 */
	public static function register(): void {
		foreach ( self::get_services() as $service ) {
			$service->register();
		}
	}

	/**
	 * Returns the plugin services.
	 *
	 * @return array<int, ServiceContract>
	 */
	private static function get_services(): array {
		$blocks = array(
			new EditorialChecklistBlock(),
			new CalloutBlock(),
			new ResourceLibraryBlock(),
			new FootnotesBlock(),
		);

		/**
		 * Filters the registered PublishFlow block instances.
		 *
		 * @param array<int, \PublishFlowBlocks\Contracts\BlockContract> $blocks Registered blocks.
		 */
		$blocks = apply_filters( 'publishflow_blocks_registered_blocks', $blocks );

		return array(
			new BlockRegistry( $blocks ),
		);
	}
}
