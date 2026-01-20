<?php
/**
 * HTML utility helpers.
 *
 * @package PublishFlowBlocks
 */

declare( strict_types=1 );

namespace PublishFlowBlocks\Support;

final class Html {
	/**
	 * Joins class names while removing empty values.
	 *
	 * @param array<int, string> $class_names Candidate class names.
	 */
	public static function class_names( array $class_names ): string {
		$class_names = array_filter( array_map( 'trim', $class_names ) );

		return implode( ' ', array_unique( $class_names ) );
	}
}
