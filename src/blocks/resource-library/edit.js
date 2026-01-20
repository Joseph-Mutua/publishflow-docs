import {
	InspectorControls,
	RichText,
	useBlockProps,
} from '@wordpress/block-editor';
import {
	PanelBody,
	Placeholder,
	RangeControl,
	ToggleControl,
} from '@wordpress/components';
import { __ } from '@wordpress/i18n';

import { resourceLibraryIcon } from '../../shared/icons';

export default function Edit( { attributes, setAttributes } ) {
	const { description, enableSearch, heading, postsToShow, showFilters } =
		attributes;
	const blockProps = useBlockProps( {
		className: 'wp-block-publishflow-blocks-resource-library',
	} );

	return (
		<>
			<InspectorControls>
				<PanelBody
					title={ __( 'Resource settings', 'publishflow-blocks' ) }
					initialOpen
				>
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
							'Show category filters',
							'publishflow-blocks'
						) }
						checked={ showFilters }
						onChange={ ( nextValue ) =>
							setAttributes( { showFilters: nextValue } )
						}
					/>
				</PanelBody>
			</InspectorControls>
			<section { ...blockProps }>
				<Placeholder
					icon={ resourceLibraryIcon }
					label={ __( 'Resource library', 'publishflow-blocks' ) }
					instructions={ __(
						'Choose related posts or let the block pull them automatically.',
						'publishflow-blocks'
					) }
				>
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
					<p>
						{ __(
							'This block will render a searchable, filterable resource list on the frontend.',
							'publishflow-blocks'
						) }
					</p>
				</Placeholder>
			</section>
		</>
	);
}
