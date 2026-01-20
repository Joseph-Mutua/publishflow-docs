<?php
/**
 * Resource library block registration.
 *
 * @package PublishFlowBlocks
 */

declare( strict_types=1 );

namespace PublishFlowBlocks\Blocks;

final class ResourceLibraryBlock extends BaseBlock {
	protected function get_block_directory(): string {
		return 'resource-library';
	}

	protected function is_dynamic(): bool {
		return true;
	}
}
