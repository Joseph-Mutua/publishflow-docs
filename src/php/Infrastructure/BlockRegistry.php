<?php
/**
 * Block registration service.
 *
 * @package PublishFlowBlocks
 */

declare( strict_types=1 );

namespace PublishFlowBlocks\Infrastructure;

use PublishFlowBlocks\Contracts\BlockContract;
use PublishFlowBlocks\Contracts\ServiceContract;

final class BlockRegistry implements ServiceContract {
	/**
	 * @var array<int, BlockContract>
	 */
	private array $blocks;

	/**
	 * @param array<int, BlockContract> $blocks Block instances.
	 */
	public function __construct( array $blocks ) {
		$this->blocks = $blocks;
	}

	/**
	 * Registers all plugin blocks.
	 */
	public function register(): void {
		foreach ( $this->blocks as $block ) {
			$metadata_path = $block->get_metadata_path();

			if ( ! is_dir( $metadata_path ) ) {
				continue;
			}

			register_block_type( $metadata_path, $block->get_registration_args() );
		}
	}
}
