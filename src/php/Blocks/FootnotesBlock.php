<?php
/**
 * Footnotes block registration.
 *
 * @package PublishFlowBlocks
 */

declare( strict_types=1 );

namespace PublishFlowBlocks\Blocks;

final class FootnotesBlock extends BaseBlock {
	protected function get_block_directory(): string {
		return 'footnotes';
	}

	protected function is_dynamic(): bool {
		return true;
	}
}
