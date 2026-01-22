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

		$resources      = $this->query_service->get_resources( $attributes );
		$enable_search  = ! isset( $attributes['enableSearch'] ) || (bool) $attributes['enableSearch'];
		$show_filters   = ! isset( $attributes['showFilters'] ) || (bool) $attributes['showFilters'];
		$available_tags = $this->get_filter_options( $resources );

		if ( empty( $resources ) ) {
			return '';
		}

		$heading          = isset( $attributes['heading'] ) ? wp_kses_post( (string) $attributes['heading'] ) : '';
		$description      = isset( $attributes['description'] ) ? wp_kses_post( (string) $attributes['description'] ) : '';
		$mode             = isset( $attributes['mode'] ) ? sanitize_key( (string) $attributes['mode'] ) : 'query';
		$wrapper_class    = Html::class_names(
			array(
				'publishflow-resource-library',
				'manual' === $mode ? 'is-mode-manual' : 'is-mode-query',
			)
		);
		$context_payload  = wp_json_encode(
			array(
				'activeFilter' => 'all',
				'searchTerm'   => '',
			)
		) ?: '{}';

		ob_start();
		?>
		<section
			<?php echo Html::block_wrapper_attributes( array( 'class' => $wrapper_class ) ); ?>
			data-wp-interactive="publishflow/resource-library"
			data-wp-context="<?php echo esc_attr( $context_payload ); ?>"
		>
			<div class="publishflow-resource-library__header">
				<?php if ( $heading ) : ?>
					<h3 class="publishflow-resource-library__title"><?php echo wp_kses_post( $heading ); ?></h3>
				<?php endif; ?>
				<?php if ( $description ) : ?>
					<div class="publishflow-resource-library__description"><?php echo wp_kses_post( wpautop( $description ) ); ?></div>
				<?php endif; ?>
				<p class="publishflow-resource-library__mode-label">
					<?php echo esc_html( 'manual' === $mode ? __( 'Curated by editors', 'publishflow-blocks' ) : __( 'Related resources', 'publishflow-blocks' ) ); ?>
				</p>
			</div>
			<?php if ( $enable_search || ( $show_filters && ! empty( $available_tags ) ) ) : ?>
				<div class="publishflow-resource-library__controls">
					<?php if ( $enable_search ) : ?>
						<label class="publishflow-resource-library__search">
							<span class="screen-reader-text"><?php esc_html_e( 'Search resources', 'publishflow-blocks' ); ?></span>
							<input
								type="search"
								placeholder="<?php echo esc_attr__( 'Search this library', 'publishflow-blocks' ); ?>"
								data-wp-bind--value="context.searchTerm"
								data-wp-on--input="actions.updateSearch"
							/>
						</label>
					<?php endif; ?>
					<?php if ( $show_filters && ! empty( $available_tags ) ) : ?>
						<div class="publishflow-resource-library__filters" role="toolbar" aria-label="<?php echo esc_attr__( 'Resource filters', 'publishflow-blocks' ); ?>">
							<button type="button" class="publishflow-resource-library__filter" data-filter-value="all" data-wp-class--is-active="state.isCurrentFilter" data-wp-on--click="actions.setFilter"><?php esc_html_e( 'All', 'publishflow-blocks' ); ?></button>
							<?php foreach ( $available_tags as $filter ) : ?>
								<button type="button" class="publishflow-resource-library__filter" data-filter-value="<?php echo esc_attr( $filter['slug'] ); ?>" data-wp-class--is-active="state.isCurrentFilter" data-wp-on--click="actions.setFilter"><?php echo esc_html( $filter['label'] ); ?></button>
							<?php endforeach; ?>
						</div>
					<?php endif; ?>
				</div>
			<?php endif; ?>
			<div class="publishflow-resource-library__grid">
				<?php foreach ( $resources as $resource ) : ?>
					<article
						class="publishflow-resource-library__card"
						data-resource-title="<?php echo esc_attr( wp_strip_all_tags( $resource['title'] ) ); ?>"
						data-resource-excerpt="<?php echo esc_attr( wp_strip_all_tags( $resource['excerpt'] ) ); ?>"
						data-resource-terms="<?php echo esc_attr( implode( ' ', $resource['filterTerms'] ) ); ?>"
						data-wp-class--is-hidden="state.isResourceHidden"
						data-wp-bind--hidden="state.isResourceHidden"
					>
						<div class="publishflow-resource-library__card-meta">
							<?php foreach ( $resource['categories'] as $category ) : ?>
								<span><?php echo esc_html( $category['label'] ); ?></span>
							<?php endforeach; ?>
							<?php foreach ( $resource['tags'] as $tag ) : ?>
								<span><?php echo esc_html( $tag['label'] ); ?></span>
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

	/**
	 * Collects the filter buttons from rendered resources.
	 *
	 * @param array<int, array<string, mixed>> $resources Resource cards.
	 * @return array<int, array{label: string, slug: string}>
	 */
	private function get_filter_options( array $resources ): array {
		$filters = array();

		foreach ( $resources as $resource ) {
			foreach ( array_merge( $resource['categories'], $resource['tags'] ) as $term ) {
				if ( isset( $filters[ $term['slug'] ] ) ) {
					continue;
				}

				$filters[ $term['slug'] ] = array(
					'label' => $term['label'],
					'slug'  => $term['slug'],
				);
			}
		}

		return array_values( $filters );
	}
}
