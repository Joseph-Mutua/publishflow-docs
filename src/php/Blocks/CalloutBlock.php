<?php
/**
 * Callout block registration.
 *
 * @package PublishFlowBlocks
 */

declare( strict_types=1 );

namespace PublishFlowBlocks\Blocks;

final class CalloutBlock extends BaseBlock {
	protected function get_block_directory(): string {
		return 'callout';
	}
}
