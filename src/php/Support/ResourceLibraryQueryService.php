<?php
/**
 * Queries and normalizes related content resources.
 *
 * @package PublishFlowBlocks
 */

declare( strict_types=1 );

namespace PublishFlowBlocks\Support;

final class ResourceLibraryQueryService {
	private const TRANSIENT_TTL = 300;

	/**
	 * Returns the resource cards for a given block configuration.
	 *
	 * @param array<string, mixed> $attributes Block attributes.
	 * @return array<int, array<string, mixed>>
	 */
	public function get_resources( array $attributes ): array {
		$query_arguments = $this->build_query_arguments( $attributes );
		$cache_key       = 'publishflow_resources_' . md5( wp_json_encode( $query_arguments ) );
		$cached_result   = get_transient( $cache_key );

		if ( is_array( $cached_result ) ) {
			return $cached_result;
		}

		$resource_query = new \WP_Query( $query_arguments );
		$resources      = array();

		foreach ( $resource_query->posts as $post ) {
			$category_terms = get_the_terms( $post, 'category' );
			$tag_terms      = get_the_terms( $post, 'post_tag' );
			$categories     = $this->normalize_terms( is_array( $category_terms ) ? $category_terms : array() );
			$tags           = $this->normalize_terms( is_array( $tag_terms ) ? $tag_terms : array() );
			$post_type      = get_post_type_object( $post->post_type );

			$resources[] = array(
				'id'          => (int) $post->ID,
				'title'       => html_entity_decode( wp_strip_all_tags( get_the_title( $post ) ), ENT_QUOTES, get_bloginfo( 'charset' ) ),
				'excerpt'     => html_entity_decode( wp_strip_all_tags( get_the_excerpt( $post ) ), ENT_QUOTES, get_bloginfo( 'charset' ) ),
				'url'         => get_permalink( $post ),
				'type'        => $post_type ? $post_type->labels->singular_name : __( 'Post', 'publishflow-blocks' ),
				'categories'  => $categories,
				'tags'        => $tags,
				'filterTerms' => array_values(
					array_unique(
						array_merge(
							wp_list_pluck( $categories, 'slug' ),
							wp_list_pluck( $tags, 'slug' )
						)
					)
				),
			);
		}

		set_transient( $cache_key, $resources, self::TRANSIENT_TTL );

		return $resources;
	}

	/**
	 * Builds WP_Query arguments from block attributes.
	 *
	 * @param array<string, mixed> $attributes Block attributes.
	 * @return array<string, mixed>
	 */
	private function build_query_arguments( array $attributes ): array {
		$mode          = isset( $attributes['mode'] ) ? sanitize_key( (string) $attributes['mode'] ) : 'query';
		$posts_to_show = isset( $attributes['postsToShow'] ) ? max( 2, min( 8, (int) $attributes['postsToShow'] ) ) : 4;
		$post_ids      = array_values(
			array_filter(
				array_map( 'intval', isset( $attributes['selectedPostIds'] ) && is_array( $attributes['selectedPostIds'] ) ? $attributes['selectedPostIds'] : array() )
			)
		);

		$query_arguments = array(
			'post_type'           => 'post',
			'post_status'         => 'publish',
			'ignore_sticky_posts' => true,
			'posts_per_page'      => $posts_to_show,
			'no_found_rows'       => true,
		);

		if ( 'manual' === $mode && ! empty( $post_ids ) ) {
			$query_arguments['post__in']       = $post_ids;
			$query_arguments['orderby']        = 'post__in';
			$query_arguments['posts_per_page'] = count( $post_ids );
		}

		return $query_arguments;
	}

	/**
	 * Normalizes term data for rendering and filtering.
	 *
	 * @param array<int, \WP_Term> $terms Term objects.
	 * @return array<int, array{label: string, slug: string}>
	 */
	private function normalize_terms( array $terms ): array {
		return array_values(
			array_map(
				static fn( \WP_Term $term ): array => array(
					'label' => $term->name,
					'slug'  => $term->slug,
				),
				$terms
			)
		);
	}
}