import {
	InspectorControls,
	RichText,
	useBlockProps,
} from '@wordpress/block-editor';
import { PanelBody, Placeholder, SelectControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

import { DEFAULT_FOOTNOTES } from '../../shared/footnote-defaults';
import { footnotesIcon } from '../../shared/icons';

export default function Edit( { attributes, setAttributes } ) {
	const { heading, items = DEFAULT_FOOTNOTES, displayStyle } = attributes;
	const blockProps = useBlockProps( {
		className: 'wp-block-publishflow-blocks-footnotes',
	} );

	return (
		<>
			<InspectorControls>
				<PanelBody
					title={ __( 'Reference settings', 'publishflow-blocks' ) }
					initialOpen
				>
					<SelectControl
						label={ __( 'Display style', 'publishflow-blocks' ) }
						value={ displayStyle }
						options={ [
							{
								label: __( 'Detailed', 'publishflow-blocks' ),
								value: 'detailed',
							},
							{
								label: __( 'Compact', 'publishflow-blocks' ),
								value: 'compact',
							},
						] }
						onChange={ ( nextValue ) =>
							setAttributes( { displayStyle: nextValue } )
						}
					/>
				</PanelBody>
			</InspectorControls>
			<section { ...blockProps }>
				<Placeholder
					icon={ footnotesIcon }
					label={ __(
						'Footnotes and references',
						'publishflow-blocks'
					) }
					instructions={ __(
						'Capture citations in a consistent, structured format.',
						'publishflow-blocks'
					) }
				>
					<RichText
						tagName="h3"
						value={ heading }
						onChange={ ( nextValue ) =>
							setAttributes( { heading: nextValue } )
						}
						placeholder={ __( 'References', 'publishflow-blocks' ) }
					/>
					<ol className="publishflow-footnotes-preview">
						{ items.map( ( item ) => (
							<li key={ item.id }>
								<strong>{ item.label }</strong>
								<span>{ item.citation }</span>
							</li>
						) ) }
					</ol>
				</Placeholder>
			</section>
		</>
	);
}
