<?php
/**
 * Editorial checklist block registration.
 *
 * @package PublishFlowBlocks
 */

declare( strict_types=1 );

namespace PublishFlowBlocks\Blocks;

final class EditorialChecklistBlock extends BaseBlock {
	protected function get_block_directory(): string {
		return 'editorial-checklist';
	}

	protected function is_dynamic(): bool {
		return true;
	}
}
