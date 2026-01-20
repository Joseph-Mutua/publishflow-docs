<?php
/**
 * Shared contract for Gutenberg block registrations.
 *
 * @package PublishFlowBlocks
 */

declare( strict_types=1 );

namespace PublishFlowBlocks\Contracts;

interface BlockContract {
	/**
	 * Returns the block metadata directory.
	 */
	public function get_metadata_path(): string;

	/**
	 * Returns registration arguments merged with block metadata.
	 *
	 * @return array<string, mixed>
	 */
	public function get_registration_args(): array;
}
