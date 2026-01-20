import {
	InspectorControls,
	RichText,
	useBlockProps,
} from '@wordpress/block-editor';
import {
	CheckboxControl,
	PanelBody,
	RangeControl,
	SelectControl,
	Spinner,
	ToggleControl,
} from '@wordpress/components';
import { store as coreDataStore } from '@wordpress/core-data';
import { useSelect } from '@wordpress/data';
import { __ } from '@wordpress/i18n';

import { resourceLibraryIcon } from '../../shared/icons';

const toggleId = ( ids, nextId ) =>
	ids.includes( nextId )
		? ids.filter( ( id ) => id !== nextId )
		: [ ...ids, nextId ];

const getEmbeddedTerms = ( post, taxonomy ) => {
	const embeddedTerms = post?._embedded?.[ 'wp:term' ] || [];
	const matchingTerms = embeddedTerms
		.flat()
		.filter( ( term ) => term?.taxonomy === taxonomy );

	return matchingTerms.map( ( term ) => term.id );
};

export default function Edit( { attributes, setAttributes } ) {
	const {
		categoryIds = [],
		description,
		enableSearch,
		heading,
		mode,
		postsToShow,
		selectedPostIds = [],
		showFilters,
		tagIds = [],
	} = attributes;
	const blockProps = useBlockProps( {
		className: 'wp-block-publishflow-blocks-resource-library',
	} );
	const { availableCategories, availablePosts, availableTags } = useSelect(
		( select ) => {
			const coreData = select( coreDataStore );

			return {
				availablePosts:
					coreData.getEntityRecords( 'postType', 'post', {
						_embed: true,
						order: 'desc',
						orderby: 'date',
						per_page: 12,
						status: 'publish',
					} ) || [],
				availableCategories:
					coreData.getEntityRecords( 'taxonomy', 'category', {
						orderby: 'name',
						order: 'asc',
						per_page: 20,
					} ) || [],
				availableTags:
					coreData.getEntityRecords( 'taxonomy', 'post_tag', {
						orderby: 'name',
						order: 'asc',
						per_page: 20,
					} ) || [],
			};
		},
		[]
	);

	const previewPosts = availablePosts
		.filter( ( post ) => {
			if ( mode === 'manual' ) {
				return selectedPostIds.includes( post.id );
			}

			const postCategoryIds = getEmbeddedTerms( post, 'category' );
			const postTagIds = getEmbeddedTerms( post, 'post_tag' );
			const matchesCategories =
				categoryIds.length === 0 ||
				categoryIds.some( ( termId ) =>
					postCategoryIds.includes( termId )
				);
			const matchesTags =
				tagIds.length === 0 ||
				tagIds.some( ( termId ) => postTagIds.includes( termId ) );

			return matchesCategories && matchesTags;
		} )
		.slice( 0, postsToShow );

	return (
		<>
			<InspectorControls>
				<PanelBody
					title={ __( 'Resource settings', 'publishflow-blocks' ) }
					initialOpen
				>
					<SelectControl
						label={ __( 'Mode', 'publishflow-blocks' ) }
						value={ mode }
						options={ [
							{
								label: __(
									'Query related posts',
									'publishflow-blocks'
								),
								value: 'query',
							},
							{
								label: __(
									'Manual curation',
									'publishflow-blocks'
								),
								value: 'manual',
							},
						] }
						onChange={ ( nextValue ) =>
							setAttributes( { mode: nextValue } )
						}
					/>
					<RangeControl
						label={ __(
							'Resources to show',
							'publishflow-blocks'
						) }
						value={ postsToShow }
						onChange={ ( nextValue ) =>
							setAttributes( { postsToShow: nextValue } )
						}
						min={ 2 }
						max={ 8 }
					/>
					<ToggleControl
						label={ __(
							'Enable frontend search',
							'publishflow-blocks'
						) }
						checked={ enableSearch }
						onChange={ ( nextValue ) =>
							setAttributes( { enableSearch: nextValue } )
						}
					/>
					<ToggleControl
						label={ __(
							'Show category/tag filters',
							'publishflow-blocks'
						) }
						checked={ showFilters }
						onChange={ ( nextValue ) =>
							setAttributes( { showFilters: nextValue } )
						}
					/>
				</PanelBody>
				{ mode === 'manual' ? (
					<PanelBody
						title={ __( 'Manual selection', 'publishflow-blocks' ) }
						initialOpen={ false }
					>
						{ availablePosts.length ? (
							availablePosts.map( ( post ) => (
								<CheckboxControl
									key={ post.id }
									label={
										post.title?.rendered ||
										__(
											'Untitled post',
											'publishflow-blocks'
										)
									}
									checked={ selectedPostIds.includes(
										post.id
									) }
									onChange={ () =>
										setAttributes( {
											selectedPostIds: toggleId(
												selectedPostIds,
												post.id
											),
										} )
									}
								/>
							) )
						) : (
							<Spinner />
						) }
					</PanelBody>
				) : (
					<>
						<PanelBody
							title={ __(
								'Category filters',
								'publishflow-blocks'
							) }
							initialOpen={ false }
						>
							{ availableCategories.length ? (
								availableCategories.map( ( term ) => (
									<CheckboxControl
										key={ term.id }
										label={ term.name }
										checked={ categoryIds.includes(
											term.id
										) }
										onChange={ () =>
											setAttributes( {
												categoryIds: toggleId(
													categoryIds,
													term.id
												),
											} )
										}
									/>
								) )
							) : (
								<Spinner />
							) }
						</PanelBody>
						<PanelBody
							title={ __( 'Tag filters', 'publishflow-blocks' ) }
							initialOpen={ false }
						>
							{ availableTags.length ? (
								availableTags.map( ( term ) => (
									<CheckboxControl
										key={ term.id }
										label={ term.name }
										checked={ tagIds.includes( term.id ) }
										onChange={ () =>
											setAttributes( {
												tagIds: toggleId(
													tagIds,
													term.id
												),
											} )
										}
									/>
								) )
							) : (
								<Spinner />
							) }
						</PanelBody>
					</>
				) }
			</InspectorControls>
			<section { ...blockProps }>
				<div className="publishflow-resource-library__editor-header">
					<div
						className="publishflow-resource-library__editor-icon"
						aria-hidden="true"
					>
						{ resourceLibraryIcon }
					</div>
					<div>
						<RichText
							tagName="h3"
							value={ heading }
							onChange={ ( nextValue ) =>
								setAttributes( { heading: nextValue } )
							}
							placeholder={ __(
								'Keep exploring',
								'publishflow-blocks'
							) }
						/>
						<RichText
							tagName="p"
							value={ description }
							onChange={ ( nextValue ) =>
								setAttributes( { description: nextValue } )
							}
							placeholder={ __(
								'Describe the related resource collection.',
								'publishflow-blocks'
							) }
						/>
					</div>
				</div>
				<p className="publishflow-resource-library__editor-mode">
					{ mode === 'manual'
						? __(
								'Manual mode: editors explicitly choose the posts.',
								'publishflow-blocks'
						  )
						: __(
								'Query mode: latest posts are filtered by selected terms.',
								'publishflow-blocks'
						  ) }
				</p>
				<div className="publishflow-resource-library__editor-preview">
					{ previewPosts.length ? (
						previewPosts.map( ( post ) => (
							<article
								key={ post.id }
								className="publishflow-resource-library__editor-card"
							>
								<h4>
									{ post.title?.rendered ||
										__(
											'Untitled post',
											'publishflow-blocks'
										) }
								</h4>
								<p>
									{ post.excerpt?.rendered
										? post.excerpt.rendered
												.replace( /<[^>]+>/g, '' )
												.trim()
										: __(
												'Preview excerpt will render on the frontend.',
												'publishflow-blocks'
										  ) }
								</p>
							</article>
						) )
					) : (
						<p>
							{ __(
								'No preview posts match the current configuration yet.',
								'publishflow-blocks'
							) }
						</p>
					) }
				</div>
			</section>
		</>
	);
}
