<?php
/**
 * Resource library block registration.
 *
 * @package PublishFlowBlocks
 */

declare( strict_types=1 );

namespace PublishFlowBlocks\Blocks;

use PublishFlowBlocks\Support\Html;
use PublishFlowBlocks\Support\ResourceLibraryQueryService;

final class ResourceLibraryBlock extends BaseBlock {
	private ResourceLibraryQueryService $query_service;

	public function __construct( ResourceLibraryQueryService $query_service ) {
		$this->query_service = $query_service;
	}

	protected function get_block_directory(): string {
		return 'resource-library';
	}

	protected function is_dynamic(): bool {
		return true;
	}

	/**
	 * Renders the resource library.
	 *
	 * @param array<string, mixed> $attributes Block attributes.
	 * @param string               $content Saved content.
	 * @param \WP_Block|null       $block Block instance.
	 */
	public function render( array $attributes, string $content, $block = null ): string {
		unset( $content, $block );

		$resources = $this->query_service->get_resources( $attributes );

		if ( empty( $resources ) ) {
			return '';
		}

		$heading       = isset( $attributes['heading'] ) ? wp_kses_post( (string) $attributes['heading'] ) : '';
		$description   = isset( $attributes['description'] ) ? wp_kses_post( (string) $attributes['description'] ) : '';
		$mode          = isset( $attributes['mode'] ) ? sanitize_key( (string) $attributes['mode'] ) : 'query';
		$wrapper_class = Html::class_names(
			array(
				'publishflow-resource-library',
				'manual' === $mode ? 'is-mode-manual' : 'is-mode-query',
			)
		);

		ob_start();
		?>
		<section <?php echo get_block_wrapper_attributes( array( 'class' => $wrapper_class ) ); ?>>
			<div class="publishflow-resource-library__header">
				<?php if ( $heading ) : ?>
					<h3 class="publishflow-resource-library__title"><?php echo wp_kses_post( $heading ); ?></h3>
				<?php endif; ?>
				<?php if ( $description ) : ?>
					<div class="publishflow-resource-library__description"><?php echo wpautop( wp_kses_post( $description ) ); ?></div>
				<?php endif; ?>
				<p class="publishflow-resource-library__mode-label">
					<?php echo esc_html( 'manual' === $mode ? __( 'Curated by editors', 'publishflow-blocks' ) : __( 'Related resources', 'publishflow-blocks' ) ); ?>
				</p>
			</div>
			<div class="publishflow-resource-library__grid">
				<?php foreach ( $resources as $resource ) : ?>
					<article class="publishflow-resource-library__card">
						<div class="publishflow-resource-library__card-meta">
							<?php foreach ( $resource['categories'] as $category ) : ?>
								<span><?php echo esc_html( $category['label'] ); ?></span>
							<?php endforeach; ?>
							<span><?php echo esc_html( $resource['type'] ); ?></span>
						</div>
						<h4 class="publishflow-resource-library__card-title">
							<a href="<?php echo esc_url( $resource['url'] ); ?>"><?php echo esc_html( $resource['title'] ); ?></a>
						</h4>
						<?php if ( ! empty( $resource['excerpt'] ) ) : ?>
							<p class="publishflow-resource-library__card-excerpt"><?php echo esc_html( $resource['excerpt'] ); ?></p>
						<?php endif; ?>
					</article>
				<?php endforeach; ?>
			</div>
		</section>
		<?php
		return (string) ob_get_clean();
	}
}