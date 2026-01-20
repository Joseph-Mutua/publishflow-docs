<?php
/**
 * Base class for PublishFlow blocks.
 *
 * @package PublishFlowBlocks
 */

declare( strict_types=1 );

namespace PublishFlowBlocks\Blocks;

use PublishFlowBlocks\Contracts\BlockContract;

abstract class BaseBlock implements BlockContract {
	/**
	 * Returns the directory name that contains the block metadata.
	 */
	abstract protected function get_block_directory(): string;

	/**
	 * Indicates whether the block is rendered dynamically.
	 */
	protected function is_dynamic(): bool {
		return false;
	}

	/**
	 * Renders block content for dynamic blocks.
	 *
	 * @param array<string, mixed> $attributes Block attributes.
	 * @param string               $content Saved block content.
	 * @param \WP_Block|null       $block Full block instance.
	 */
	public function render( array $attributes, string $content, $block = null ): string {
		unset( $attributes, $content, $block );

		return '';
	}

	/**
	 * Returns the absolute metadata path.
	 */
	public function get_metadata_path(): string {
		return PUBLISHFLOW_BLOCKS_PATH . 'build/blocks/' . $this->get_block_directory();
	}

	/**
	 * Returns block registration arguments.
	 *
	 * @return array<string, mixed>
	 */
	public function get_registration_args(): array {
		$registration_args = array();

		if ( $this->is_dynamic() ) {
			$registration_args['render_callback'] = array( $this, 'render' );
		}

		/**
		 * Filters registration args before the block is registered.
		 *
		 * @param array<string, mixed> $registration_args Registration args.
		 * @param string               $block_directory   Block directory slug.
		 */
		return apply_filters(
			'publishflow_blocks_registration_args',
			$registration_args,
			$this->get_block_directory()
		);
	}
}