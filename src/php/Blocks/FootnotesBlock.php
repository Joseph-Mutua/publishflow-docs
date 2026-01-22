<?php
/**
 * Footnotes block registration.
 *
 * @package PublishFlowBlocks
 */

declare( strict_types=1 );

namespace PublishFlowBlocks\Blocks;

use PublishFlowBlocks\Support\Html;

final class FootnotesBlock extends BaseBlock {
	protected function get_block_directory(): string {
		return 'footnotes';
	}

	protected function is_dynamic(): bool {
		return true;
	}

	/**
	 * Renders the footnotes block.
	 *
	 * @param array<string, mixed> $attributes Block attributes.
	 * @param string               $content Saved content.
	 * @param \WP_Block|null       $block Block instance.
	 */
	public function render( array $attributes, string $content, $block = null ): string {
		unset( $content, $block );

		$items = $this->normalize_items( isset( $attributes['items'] ) && is_array( $attributes['items'] ) ? $attributes['items'] : array() );

		if ( empty( $items ) ) {
			return '';
		}

		$heading        = isset( $attributes['heading'] ) ? wp_kses_post( (string) $attributes['heading'] ) : '';
		$display_style  = isset( $attributes['displayStyle'] ) ? sanitize_key( (string) $attributes['displayStyle'] ) : 'detailed';
		$wrapper_class  = Html::class_names(
			array(
				'publishflow-footnotes',
				'compact' === $display_style ? 'is-style-compact' : 'is-style-detailed',
			)
		);

		ob_start();
		?>
		<section <?php echo Html::block_wrapper_attributes( array( 'class' => $wrapper_class ) ); ?>>
			<?php if ( $heading ) : ?>
				<h3 class="publishflow-footnotes__heading"><?php echo wp_kses_post( $heading ); ?></h3>
			<?php endif; ?>
			<ol class="publishflow-footnotes__list">
				<?php foreach ( $items as $index => $item ) : ?>
					<li class="publishflow-footnotes__list-item" id="<?php echo esc_attr( 'publishflow-footnote-' . ( $index + 1 ) ); ?>">
						<div class="publishflow-footnotes__reference">
							<span class="publishflow-footnotes__label"><?php echo esc_html( $item['label'] ); ?></span>
							<span class="publishflow-footnotes__citation"><?php echo esc_html( $item['citation'] ); ?></span>
						</div>
						<?php if ( ! empty( $item['url'] ) ) : ?>
							<a class="publishflow-footnotes__link" href="<?php echo esc_url( $item['url'] ); ?>">
								<?php echo esc_html( sprintf( __( 'View source: %s', 'publishflow-blocks' ), $item['label'] ) ); ?>
							</a>
						<?php endif; ?>
					</li>
				<?php endforeach; ?>
			</ol>
		</section>
		<?php
		return (string) ob_get_clean();
	}

	/**
	 * Sanitizes reference items.
	 *
	 * @param array<int, mixed> $items Raw items.
	 * @return array<int, array{label: string, citation: string, url: string}>
	 */
	private function normalize_items( array $items ): array {
		$normalized_items = array();

		foreach ( $items as $item ) {
			if ( ! is_array( $item ) ) {
				continue;
			}

			$label    = isset( $item['label'] ) ? sanitize_text_field( (string) $item['label'] ) : '';
			$citation = isset( $item['citation'] ) ? sanitize_textarea_field( (string) $item['citation'] ) : '';
			$url      = isset( $item['url'] ) ? esc_url_raw( (string) $item['url'] ) : '';

			if ( '' === $label || '' === $citation ) {
				continue;
			}

			$normalized_items[] = array(
				'label'    => $label,
				'citation' => $citation,
				'url'      => $url,
			);
		}

		return $normalized_items;
	}
}
