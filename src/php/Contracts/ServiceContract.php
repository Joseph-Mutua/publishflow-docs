<?php
/**
 * Shared contract for plugin services.
 *
 * @package PublishFlowBlocks
 */

declare( strict_types=1 );

namespace PublishFlowBlocks\Contracts;

interface ServiceContract {
	/**
	 * Registers hooks for the service.
	 */
	public function register(): void;
}
