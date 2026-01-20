<?php
/**
 * Editorial checklist block registration.
 *
 * @package PublishFlowBlocks
 */

declare( strict_types=1 );

namespace PublishFlowBlocks\Blocks;

use PublishFlowBlocks\Support\Html;

final class EditorialChecklistBlock extends BaseBlock {
	/**
	 * Returns the metadata directory.
	 */
	protected function get_block_directory(): string {
		return 'editorial-checklist';
	}

	/**
	 * The block is rendered dynamically.
	 */
	protected function is_dynamic(): bool {
		return true;
	}

	/**
	 * Renders the editorial checklist block.
	 *
	 * @param array<string, mixed> $attributes Block attributes.
	 * @param string               $content Saved content.
	 * @param \WP_Block|null       $block Block instance.
	 */
	public function render( array $attributes, string $content, $block = null ): string {
		unset( $content, $block );

		$visibility = isset( $attributes['visibility'] ) ? sanitize_key( (string) $attributes['visibility'] ) : 'private';

		if ( 'public' !== $visibility ) {
			return '';
		}

		$items = $this->normalize_items( isset( $attributes['items'] ) && is_array( $attributes['items'] ) ? $attributes['items'] : array() );

		if ( empty( $items ) ) {
			return '';
		}

		$heading          = isset( $attributes['heading'] ) ? wp_kses_post( (string) $attributes['heading'] ) : '';
		$description      = isset( $attributes['description'] ) ? wp_kses_post( (string) $attributes['description'] ) : '';
		$show_progress    = ! isset( $attributes['showProgress'] ) || (bool) $attributes['showProgress'];
		$completed_count  = count( array_filter( $items, static fn( array $item ): bool => ! empty( $item['checked'] ) ) );
		$progress_percent = (int) round( ( $completed_count / count( $items ) ) * 100 );
		$wrapper_classes  = Html::class_names(
			array(
				'publishflow-editorial-checklist',
				'is-public',
			)
		);
		$wrapper_attributes = get_block_wrapper_attributes(
			array(
				'class' => $wrapper_classes,
			)
		);

		ob_start();
		?>
		<section <?php echo $wrapper_attributes; ?>>
			<div class="publishflow-editorial-checklist__header">
				<p class="publishflow-editorial-checklist__eyebrow"><?php esc_html_e( 'PublishFlow checklist', 'publishflow-blocks' ); ?></p>
				<?php if ( $heading ) : ?>
					<h3 class="publishflow-editorial-checklist__title"><?php echo wp_kses_post( $heading ); ?></h3>
				<?php endif; ?>
				<?php if ( $description ) : ?>
					<div class="publishflow-editorial-checklist__description"><?php echo wpautop( wp_kses_post( $description ) ); ?></div>
				<?php endif; ?>
			</div>
			<?php if ( $show_progress ) : ?>
				<div class="publishflow-editorial-checklist__progress" role="status" aria-live="polite">
					<div class="publishflow-editorial-checklist__progress-copy">
						<span><?php echo esc_html( sprintf( __( '%1$d of %2$d complete', 'publishflow-blocks' ), $completed_count, count( $items ) ) ); ?></span>
						<strong><?php echo esc_html( $progress_percent ); ?>%</strong>
					</div>
					<progress max="100" value="<?php echo esc_attr( (string) $progress_percent ); ?>">
						<?php echo esc_html( $progress_percent ); ?>%
					</progress>
				</div>
			<?php endif; ?>
			<ol class="publishflow-editorial-checklist__list">
				<?php foreach ( $items as $item ) : ?>
					<li class="<?php echo esc_attr( Html::class_names( array( 'publishflow-editorial-checklist__list-item', ! empty( $item['checked'] ) ? 'is-complete' : 'is-open' ) ) ); ?>">
						<span class="publishflow-editorial-checklist__status"><?php echo esc_html( ! empty( $item['checked'] ) ? __( 'Done', 'publishflow-blocks' ) : __( 'Open', 'publishflow-blocks' ) ); ?></span>
						<span class="publishflow-editorial-checklist__label"><?php echo esc_html( $item['label'] ); ?></span>
					</li>
				<?php endforeach; ?>
			</ol>
		</section>
		<?php
		return (string) ob_get_clean();
	}

	/**
	 * Sanitizes checklist items.
	 *
	 * @param array<int, mixed> $items Raw checklist items.
	 * @return array<int, array{id: string, label: string, checked: bool}>
	 */
	private function normalize_items( array $items ): array {
		$normalized_items = array();

		foreach ( $items as $item ) {
			if ( ! is_array( $item ) ) {
				continue;
			}

			$label = isset( $item['label'] ) ? sanitize_text_field( (string) $item['label'] ) : '';

			if ( '' === $label ) {
				continue;
			}

			$normalized_items[] = array(
				'id'      => isset( $item['id'] ) ? sanitize_key( (string) $item['id'] ) : uniqid( 'checklist-', false ),
				'label'   => $label,
				'checked' => ! empty( $item['checked'] ),
			);
		}

		return $normalized_items;
	}
}