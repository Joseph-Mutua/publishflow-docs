import {
	InspectorControls,
	RichText,
	URLInputButton,
	useBlockProps,
} from '@wordpress/block-editor';
import { PanelBody, SelectControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

export default function Edit( { attributes, setAttributes } ) {
	const { body, ctaLabel, ctaUrl, eyebrow, title, tone } = attributes;
	const blockProps = useBlockProps( {
		className: `wp-block-publishflow-blocks-callout is-tone-${ tone }`,
	} );

	return (
		<>
			<InspectorControls>
				<PanelBody
					title={ __( 'Callout settings', 'publishflow-blocks' ) }
					initialOpen
				>
					<SelectControl
						label={ __( 'Tone', 'publishflow-blocks' ) }
						value={ tone }
						options={ [
							{
								label: __( 'Insight', 'publishflow-blocks' ),
								value: 'insight',
							},
							{
								label: __( 'Warning', 'publishflow-blocks' ),
								value: 'warning',
							},
							{
								label: __( 'Success', 'publishflow-blocks' ),
								value: 'success',
							},
						] }
						onChange={ ( nextValue ) =>
							setAttributes( { tone: nextValue } )
						}
					/>
				</PanelBody>
			</InspectorControls>
			<aside { ...blockProps }>
				<RichText
					tagName="p"
					className="publishflow-callout__eyebrow"
					value={ eyebrow }
					onChange={ ( nextValue ) =>
						setAttributes( { eyebrow: nextValue } )
					}
					placeholder={ __( 'Key insight', 'publishflow-blocks' ) }
				/>
				<RichText
					tagName="h3"
					className="publishflow-callout__title"
					value={ title }
					onChange={ ( nextValue ) =>
						setAttributes( { title: nextValue } )
					}
					placeholder={ __(
						'Add a strong content takeaway',
						'publishflow-blocks'
					) }
				/>
				<RichText
					tagName="p"
					className="publishflow-callout__body"
					value={ body }
					onChange={ ( nextValue ) =>
						setAttributes( { body: nextValue } )
					}
					placeholder={ __(
						'Write a concise editorial callout.',
						'publishflow-blocks'
					) }
				/>
				<div className="publishflow-callout__cta">
					<RichText
						tagName="span"
						value={ ctaLabel }
						onChange={ ( nextValue ) =>
							setAttributes( { ctaLabel: nextValue } )
						}
						placeholder={ __( 'Read more', 'publishflow-blocks' ) }
					/>
					<URLInputButton
						url={ ctaUrl }
						onChange={ ( nextValue ) =>
							setAttributes( { ctaUrl: nextValue } )
						}
					/>
				</div>
			</aside>
		</>
	);
}
