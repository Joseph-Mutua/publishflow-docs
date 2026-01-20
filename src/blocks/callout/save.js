import { RichText, useBlockProps } from '@wordpress/block-editor';

import { getCalloutSymbol } from '../../shared/icons';

export default function save( { attributes } ) {
	const { body, ctaLabel, ctaUrl, eyebrow, icon, layout, title, tone } =
		attributes;
	const blockProps = useBlockProps.save( {
		className: `wp-block-publishflow-blocks-callout is-tone-${ tone } is-layout-${ layout }`,
	} );

	return (
		<aside { ...blockProps }>
			<div className="publishflow-callout__icon" aria-hidden="true">
				{ getCalloutSymbol( icon ) }
			</div>
			<div className="publishflow-callout__content">
				{ eyebrow ? (
					<RichText.Content
						tagName="p"
						className="publishflow-callout__eyebrow"
						value={ eyebrow }
					/>
				) : null }
				{ title ? (
					<RichText.Content
						tagName="h3"
						className="publishflow-callout__title"
						value={ title }
					/>
				) : null }
				{ body ? (
					<RichText.Content
						tagName="p"
						className="publishflow-callout__body"
						value={ body }
					/>
				) : null }
				{ ctaLabel && ctaUrl ? (
					<p className="publishflow-callout__cta">
						<a
							className="publishflow-callout__cta-link"
							href={ ctaUrl }
						>
							{ ctaLabel }
						</a>
					</p>
				) : null }
			</div>
		</aside>
	);
}
